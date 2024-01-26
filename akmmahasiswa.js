const axios = require('axios');
const cron = require('node-cron');
const fs = require('fs');
const { createConnection } = require('./db');
require('dotenv').config()

const tokenUrl = process.env.SEVIMA_API_GET_TOKEN;
const clientId = process.env.SEVIMA_CLIENT_ID;
const clientSecret = process.env.SEVIMA_CLIENT_SECRET;
const apiBaseUrl = process.env.SEVIMA_API_BASE_URL;
const apiUrl = `${apiBaseUrl}live/akmmahasiswa`;
const namaApi = apiUrl.split('/').pop();
const namaTabel = "trn_akmmahasiswa"
const idPeriode = 20231;

const getCurrentTimestamp = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return timestamp;
};

const fetchToken = async () => {
  try {
    const tokenResponse = await axios.post(tokenUrl, {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    });

    return tokenResponse.data.access_token;
  } catch (error) {
    console.error('Error saat mengambil token:', error.message);
    throw error;
  }
};

const fetchDataAndSaveToDB = async () => {
  try {
    const connection = await createConnection();

    const token = await fetchToken();

    // Mendapatkan total page
    const totalPageResponse = await axios.get(`${apiUrl}?showpage=1&page=1&limit=10000&idperiode=${idPeriode}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const totalPage = totalPageResponse.data.totalpage;
    // console.log("Total Page:", totalPage);

    for (let currentPage = 1; currentPage <= totalPage; currentPage++) {
      const dynamicApiUrl = `${apiUrl}?showpage=1&page=${currentPage}&limit=10000&idperiode=${idPeriode}`;

      try {
        // Mendapatkan data dari API per halaman
        const dynamicApiResponse = await axios.get(dynamicApiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const dataFromApi = dynamicApiResponse.data.data;

        // Menggunakan Promise.all untuk menjalankan operasi penyimpanan secara asinkron
        await Promise.all(dataFromApi.map(async (item) => {
          const nim = item.nim;

          const checkQuery = `SELECT COUNT(*) as count FROM ${namaTabel} WHERE nim = ?`;

          try {
            const [countResult] = await connection.query(checkQuery, [nim]);

            if (countResult[0].count === 0) {
              // Data belum ada di database, maka disimpan
              const logSuccessMessage = `${getCurrentTimestamp()} - Data dengan nim ${nim} berhasil disimpan ke database.`;
              console.log(logSuccessMessage);

              // Menulis log ke file untuk data yang berhasil disimpan
              fs.appendFileSync('log_success.txt', logSuccessMessage + '\n');

              // Disimpan ke dalam database
              const insertQuery = `INSERT INTO ${namaTabel} (nim, nama, idperiode, statusmhs, nip, dosenpa, ips, ipk, skssemester, skstotal, ipklulus, skslulus, batassks, skstempuh, semmhs, tglsk, nosk) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
              await connection.query(insertQuery, [
                nim,
                item.nama,
                item.idperiode,
                item.statusmhs,
                item.nip,
                item.dosenpa,
                item.ips,
                item.ipk,
                item.skssemester,
                item.skstotal,
                item.ipklulus,
                item.skslulus,
                item.batassks,
                item.skstempuh,
                item.semmhs,
                item.tglsk,
                item.nosk,
              ]);

              const urlEndpointPerPage = `${getCurrentTimestamp()} - url endpoint: ${dynamicApiUrl} => berhasil disimpan di database.`;
              console.log(urlEndpointPerPage);
              fs.appendFileSync('log_success_save_per_page.txt', urlEndpointPerPage + '\n');

            } else {
              // Data sudah ada di database, maka dilewati
              // const logDuplicateMessage = `${getCurrentTimestamp()} - Data dengan nim ${nim} sudah ada di database. Lewati.`;
              // console.log(logDuplicateMessage);
              console.log("data sudah ada di database.");

              // Menulis log ke file untuk data yang duplikat
              // fs.appendFileSync('log_duplicate.txt', logDuplicateMessage + '\n');
            }
          } catch (error) {
            console.error('Error saat mengecek nim di database:', error.message);
          }
        }));

        // const urlEndpointPerPage = `${getCurrentTimestamp()} - url endpoint: ${dynamicApiUrl} => berhasil disimpan di database.`;
        // console.log(urlEndpointPerPage);
        // fs.appendFileSync('log_success_save_per_page.txt', urlEndpointPerPage + '\n');
      } catch (error) {
        console.error(`Error saat mengambil data dari page ${currentPage}:`, error.message);
      }
    }
    console.log('Proses selesai.');
    await connection.end();

  } catch (error) {
    console.error('Error saat menjalankan cron job:', error.message);
  }
};
// fetchDataAndSaveToDB();


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const checkAndRunFetchData = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'cron_job_api',
    });

    while (true) {
      // Membaca data dari tabel trn_akmmahasiswa
      const [rows] = await connection.execute(`SELECT count(*) FROM ${namaTabel} where idperiode = ${idPeriode}`);
      const totalDataDatabase = rows[0]['count(*)'];
      console.log(`total data di tabel ${namaTabel}:`, totalDataDatabase);
      fs.appendFileSync('log_total_data.txt', `${getCurrentTimestamp()} - total data di tabel ${namaTabel}: ${totalDataDatabase}` + '\n');

      // Membaca data dari API
      const token = await fetchToken();

      const totalDataApiResponse = await axios.get(`${apiUrl}?showpage=1&page=1&limit=1&idperiode=${idPeriode}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const totalDataApi = totalDataApiResponse.data.count;
      console.log(`total data di api ${namaApi}`, totalDataApi);
      fs.appendFileSync('log_total_data.txt', `${getCurrentTimestamp()} - total data di api ${namaApi}: ${totalDataApi}` + '\n');

      // Cek total data dan jalankan proses migrasi jika perlu
      if (totalDataDatabase < totalDataApi) {
        console.log('Fetching new token and processing data...');
        await fetchDataAndSaveToDB();
      } else {
        console.log('Total data di database sudah sama atau lebih besar dari fetch data api');
        await connection.execute("UPDATE prc_periode SET akm = 'Y' WHERE idperiode = 20231");
        break; // Keluar dari loop jika kondisi tidak terpenuhi
      }

      // Tunggu beberapa detik sebelum iterasi selanjutnya
      await delay(5000); // 5000 ms = 5 detik
    }

    await connection.end();
  } catch (error) {
    console.error('Error saat mengecek dan menjalankan fetchDataAndSaveToDB:', error.message);
  }
};
// checkAndRunFetchData()


const checkStatusDatabase = async () => {
  try {
    const connection = await createConnection();

    //membaca data dari tabel prc_periode
    const responseDatabase = await connection.execute('SELECT * FROM prc_periode WHERE idperiode = 20231');
    const statusAkm = responseDatabase[0][0]['akm'];
    console.log("status akm:", statusAkm);

    //cek status di database jalankan proses migrasi
    if (statusAkm === "T") {
      console.log('Checking total data and run fetch data...');
      checkAndRunFetchData();
    } else {
      console.log('Total data di database sudah sama atau lebih besar dari fetch data api');
      // await connection.execute("UPDATE prc_periode SET akm = 'T' WHERE idperiode = 20231")
    }

    await connection.end();
  } catch (error) {
    console.error('Error saat mengecek dan memproses data', error.message);
  }
};
// checkStatusDatabase()


// Fungsi untuk menjalankan checkStatusDatabase setiap satu jam
// cron.schedule('0 * * * *', async () => {
//   console.log('Checking total data and run fetch data...');
//   await checkStatusDatabase();
// });

module.exports = {
  checkStatusDatabase,
};