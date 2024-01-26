const axios = require('axios');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cron = require('node-cron');
const fs = require('fs');

const tokenUrl = 'https://unpas.siakadcloud.com/live/token';
const clientId = 'unpas';
const clientSecret = 'gM5S5N%4';
const apiUrl = 'https://unpas.siakadcloud.com/live/dosen';

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
    const totalPageResponse = await axios.get(`${apiUrl}?showpage=1&page=1&limit=1000`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const totalPage = totalPageResponse.data.totalpage;
    console.log("Total Page:", totalPage);

    let processedData = [];

    for (let currentPage = 1; currentPage <= totalPage; currentPage++) {
      const dynamicApiUrl = `${apiUrl}?showpage=1&page=${currentPage}&limit=1000`;

      try {
        // Mendapatkan data dari API per halaman
        const dynamicApiResponse = await axios.get(dynamicApiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const dataFromApi = dynamicApiResponse.data.data;

        // Loop data pada halaman
        for (const item of dataFromApi) {
          const nip = item.nip;

          const checkQuery = 'SELECT COUNT(*) as count FROM mst_dosen WHERE nip = ?';

          try {
            const [countResult] = await connection.query(checkQuery, [nip]);

            if (countResult && countResult[0] && countResult[0].count === 0) {
              // Data belum ada di database, maka disimpan
              processedData.push([
                item.agama,
                item.alamat,
                item.email,
                item.golpangkat,
                item.homebase,
                item.jabatanfungsional,
                item.jabatanstruktural,
                item.jeniskelamin,
                item.jenispegawai,
                item.nama,
                item.nidn,
                nip,
                item.nohp,
                item.pendidikanterakhir,
                item.tanggallahir,
                item.tempatlahir,
              ]);

              const logSuccessMessage = `${getCurrentTimestamp()} - Data dengan nip ${nip} berhasil disimpan ke database.`;
              console.log(logSuccessMessage);

              // Menulis log ke file untuk data yang berhasil disimpan
              fs.appendFileSync('log_success.txt', logSuccessMessage + '\n');
            } else {
              // Data sudah ada di database, maka dilewati
              const logDuplicateMessage = `${getCurrentTimestamp()} - Data dengan nip ${nip} sudah ada di database. Lewati.`;
              console.log(logDuplicateMessage);

              // Menulis log ke file untuk data yang duplikat
              fs.appendFileSync('log_duplicate.txt', logDuplicateMessage + '\n');
            }
          } catch (error) {
            console.error('Error saat mengecek nip di database:', error.message);
          }
        }

        // Tambahkan pengecekan dan penyimpanan setiap halaman
        if (processedData.length > 0) {
          const insertQuery = 'INSERT INTO mst_dosen (agama, alamat, email, golpangkat, homebase, jabatanfungsional, jabatanstruktural, jeniskelamin, jenispegawai, nama, nidn, nip, nohp, pendidikanterakhir, tanggallahir, tempatlahir) VALUES ?';
          await connection.query(insertQuery, [processedData]);

          const urlEndpointPerPage = `${getCurrentTimestamp()} - url endpoint: ${dynamicApiUrl} => berhasil disimpan di database.`;
          console.log(urlEndpointPerPage);
          fs.appendFileSync('log_success_save_per_page.txt', urlEndpointPerPage + '\n');

          // Reset processedData setelah disimpan
          processedData = [];
        } else {
          const statusDuplicateData = ` ${getCurrentTimestamp()} - Tidak ada penambahan data atau semua data pada page ${currentPage} memiliki nip duplikat.`;
          console.log(statusDuplicateData);
          fs.appendFileSync('log_duplicate_save_per_page.txt', statusDuplicateData + '\n');
        }
      } catch (error) {
        console.error(`Error saat mengambil data dari page ${currentPage}:`, error.message);
      }
    }

    console.log('Proses selesai.');

  } catch (error) {
    console.error('Error saat menjalankan cron job:', error.message);
  }
};

// Fungsi untuk menjalankan fetchDataAndSaveToDB setiap satu jam
// cron.schedule('0 * * * *', async () => {
//   console.log('Fetching new token and processing data...');
//   await fetchDataAndSaveToDB();
// });

// Menjalankan fetchDataAndSaveToDB untuk pertama kalinya
fetchDataAndSaveToDB();
