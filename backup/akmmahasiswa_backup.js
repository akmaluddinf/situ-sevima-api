const axios = require('axios');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cron = require('node-cron');
const fs = require('fs');

const tokenUrl = 'https://unpas.siakadcloud.com/live/token';
const clientId = 'unpas';
const clientSecret = 'gM5S5N%4';
const apiUrl = 'https://unpas.siakadcloud.com/live/akmmahasiswa';
const IdPeriode = 20231;

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
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'cron_job_api',
    });

    const token = await fetchToken();

    // Mendapatkan total page
    const totalPageResponse = await axios.get(`${apiUrl}?showpage=1&page=1&limit=10000&idperiode=${IdPeriode}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const totalPage = totalPageResponse.data.totalpage;
    console.log("Total Page:", totalPage);

    for (let currentPage = 1; currentPage <= totalPage; currentPage++) {
      const dynamicApiUrl = `${apiUrl}?showpage=1&page=${currentPage}&limit=10000&idperiode=${IdPeriode}`;

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

          const checkQuery = 'SELECT COUNT(*) as count FROM trn_akmmahasiswa WHERE nim = ?';

          try {
            const [countResult] = await connection.query(checkQuery, [nim]);

            if (countResult[0].count === 0) {
              // Data belum ada di database, maka disimpan
              const logSuccessMessage = `${getCurrentTimestamp()} - Data dengan nim ${nim} berhasil disimpan ke database.`;
              console.log(logSuccessMessage);

              // Menulis log ke file untuk data yang berhasil disimpan
              fs.appendFileSync('log_success.txt', logSuccessMessage + '\n');

              // Disimpan ke dalam database
              const insertQuery = 'INSERT INTO trn_akmmahasiswa (nim, nama, idperiode, statusmhs, nip, dosenpa, ips, ipk, skssemester, skstotal, ipklulus, skslulus, batassks, skstempuh, semmhs, tglsk, nosk) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
            } else {
              // Data sudah ada di database, maka dilewati
              const logDuplicateMessage = `${getCurrentTimestamp()} - Data dengan nim ${nim} sudah ada di database. Lewati.`;
              console.log(logDuplicateMessage);

              // Menulis log ke file untuk data yang duplikat
              fs.appendFileSync('log_duplicate.txt', logDuplicateMessage + '\n');
            }
          } catch (error) {
            console.error('Error saat mengecek nim di database:', error.message);
          }
        }));

        const urlEndpointPerPage = `${getCurrentTimestamp()} - url endpoint: ${dynamicApiUrl} => berhasil disimpan di database.`;
        console.log(urlEndpointPerPage);
        fs.appendFileSync('log_success_save_per_page.txt', urlEndpointPerPage + '\n');
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

    //membaca data dari tabel trn_akmmahasiswa
    const [rows] = await connection.execute('SELECT count(*) FROM trn_akmmahasiswa where idperiode = 20231');
    const totalDataDatabase = rows[0]['count(*)']
    console.log("total data database:", totalDataDatabase);
    fs.appendFileSync('log_total_data.txt', `${getCurrentTimestamp()} - total data database: ${totalDataDatabase}` + '\n');

    //membaca data dari api
    const token = await fetchToken();

    const totalDataApiResponse = await axios.get(`${apiUrl}?showpage=1&page=1&limit=1&idperiode=${IdPeriode}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const totalDataApi = totalDataApiResponse.data.count;
    console.log("total data api:", totalDataApi);
    fs.appendFileSync('log_total_data.txt', `${getCurrentTimestamp()} - total data api: ${totalDataApi}` + '\n');

    //cek total data dan jalankan proses migrasi
    if (totalDataDatabase < totalDataApi) {
      console.log('Fetching new token and processing data...');
      fetchDataAndSaveToDB();
    } else {
      console.log('Total data di database sudah sama atau lebih besar dari fetch data api');
      await connection.execute("UPDATE prc_periode SET akm = 'Y' WHERE idperiode = 20231")
    }

    await connection.end();
  } catch (error) {
    console.error('Error saat mengecek dan menjalankan fetchDataAndSaveToDB:', error.message);
  }
};
// checkAndRunFetchData()


const checkStatusDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'cron_job_api',
    });

    //membaca data dari tabel prc_periode
    const responseDatabase = await connection.execute('SELECT * FROM prc_periode');
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
checkStatusDatabase()


// Fungsi untuk menjalankan checkStatusDatabase setiap satu jam
// cron.schedule('0 * * * *', async () => {
//   console.log('Checking total data and run fetch data...');
//   await checkStatusDatabase();
// });

