const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const { createPoolConnection } = require('./db');
const axios = require('axios');
const getToken = require('./getToken');

app.use(cors());

const dosen = require('./mst_dosen');
const mahasiswa = require('./mst_mahasiswa');
const kurikulum = require('./mst_kurikulum');
const matakuliah = require('./mst_matakuliah');
const akmmahasiswa = require('./trn_akmmahasiswa');
const jadwalperkuliahan = require('./trn_jadwalperkuliahan');
const jadwalujian = require('./trn_jadwalujian');
const kelaskuliah = require('./trn_kelaskuliah');
const krsmahasiswa = require('./trn_krsmahasiswa');
const datapendaftar = require('./trn_datapendaftar');
const pesertaditerima = require('./trn_pesertaditerima');
const pesertaregistrasi = require('./trn_pesertaregistrasi');
const pesertates = require('./trn_pesertates');
const pesertaujian = require('./trn_pesertaujian');
const presensi = require('./trn_presensi');
const rekappendaftar = require('./trn_rekappendaftar');
const pendaftar = require('./trn_pendaftar');
const dataperiode = require('./ref_dataperiode');
const periodedaftar = require('./ref_periodedaftar');
const gelombang = require('./ref_gelombang');
const jalurpendaftaran = require('./ref_jalurpendaftaran');
const sistemkuliah = require('./ref_sistemkuliah');
const masterbank = require('./ref_masterbank');

//endpoint run module
app.post('/runModule/:moduleName', async (req, res) => {
  const moduleName = req.params.moduleName;

  try {
    if (moduleName === 'dosen') {
      await dosen.fetchDataAndSaveToDB();
    } else if (moduleName === 'mahasiswa') {
      await mahasiswa.fetchDataAndSaveToDB();
    } else if (moduleName === 'kurikulum') {
      await kurikulum.fetchDataAndSaveToDB();
    } else if (moduleName === 'matakuliah') {
      await matakuliah.fetchDataAndSaveToDB();
    } else if (moduleName === 'akmmahasiswa') {
      await akmmahasiswa.fetchDataAndSaveToDB();
    } else if (moduleName === 'jadwalperkuliahan') {
      await jadwalperkuliahan.fetchDataAndSaveToDB();
    } else if (moduleName === 'jadwalujian') {
      await jadwalujian.fetchDataAndSaveToDB();
    } else if (moduleName === 'kelaskuliah') {
      await kelaskuliah.fetchDataAndSaveToDB();
    } else if (moduleName === 'krsmahasiswa') {
      await krsmahasiswa.fetchDataAndSaveToDB();
    } else if (moduleName === 'datapendaftar') {
      await datapendaftar.fetchDataAndSaveToDB();
    } else if (moduleName === 'pesertaditerima') {
      await pesertaditerima.fetchDataAndSaveToDB();
    } else if (moduleName === 'pesertaregistrasi') {
      await pesertaregistrasi.fetchDataAndSaveToDB();
    } else if (moduleName === 'pesertates') {
      await pesertates.fetchDataAndSaveToDB();
    } else if (moduleName === 'pesertaujian') {
      await pesertaujian.fetchDataAndSaveToDB();
    } else if (moduleName === 'presensi') {
      await presensi.fetchDataAndSaveToDB();
    } else if (moduleName === 'rekappendaftar') {
      await rekappendaftar.fetchDataAndSaveToDB();
    } else if (moduleName === 'pendaftar') {
      await pendaftar.fetchDataAndSaveToDB();
    } else if (moduleName === 'dataperiode') {
      await dataperiode.fetchDataAndSaveToDB();
    } else if (moduleName === 'periodedaftar') {
      await periodedaftar.fetchDataAndSaveToDB();
    } else if (moduleName === 'gelombang') {
      await gelombang.fetchDataAndSaveToDB();
    } else if (moduleName === 'jalurpendaftaran') {
      await jalurpendaftaran.fetchDataAndSaveToDB();
    } else if (moduleName === 'sistemkuliah') {
      await sistemkuliah.fetchDataAndSaveToDB();
    } else if (moduleName === 'masterbank') {
      await masterbank.fetchDataAndSaveToDB();
    }
    else {
      res.status(400).json({ success: false, message: `Invalid moduleName: ${moduleName}` });
      return;
    }

    res.status(200).json({ success: true, message: `Proses migrasi data ${moduleName} selesai.` });

  } catch (error) {
    res.status(500).send(`Error executing module ${moduleName}: ${error.message}`);
  }
});

//endpoint check total data
app.post('/cekTotalData/:moduleName', async (req, res) => {
  const moduleName = req.params.moduleName;

  try {
    let totalDataDatabase;
    let totalDataApi;

    if (moduleName === 'dosen' || moduleName === "kurikulum" || moduleName === "matakuliah") {
      // Membaca total data dari database
      const connection = await createPoolConnection();
      const [rows] = await connection.execute(`SELECT count(*) FROM mst_${moduleName}`);
      totalDataDatabase = rows[0]['count(*)'];
      await connection.end();
      // Membaca total data dari API
      const token = await getToken.fetchToken();
      const totalDataApiResponse = await axios.get(`https://unpas.siakadcloud.com/live/${moduleName}?showpage=1&page=1&limit=1`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      totalDataApi = totalDataApiResponse.data.count;
    } else if (moduleName === 'akmmahasiswa' || moduleName === 'jadwalperkuliahan' || moduleName === "jadwalujian" || moduleName === "kelaskuliah" || moduleName === 'krsmahasiswa' || moduleName === "datapendaftar" || moduleName === "pesertaditerima" || moduleName === 'pesertaregistrasi' || moduleName === "pesertates" || moduleName === "pesertaujian" || moduleName === 'presensi' || moduleName === "rekappendaftar" || moduleName === "pendaftar" ) {
      // Membaca total data dari database
      const connection = await createPoolConnection();
      const [rows] = await connection.execute(`SELECT count(*) FROM trn_${moduleName}`);
      totalDataDatabase = rows[0]['count(*)'];
      await connection.end();
      // Membaca total data dari API
      const token = await getToken.fetchToken();
      const totalDataApiResponse = await axios.get(`https://unpas.siakadcloud.com/live/${moduleName}?showpage=1&page=1&limit=1`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      totalDataApi = totalDataApiResponse.data.count;
    } else if (moduleName === 'periodedaftar' || moduleName === "gelombang" || moduleName === "jalurpendaftaran" || moduleName === "sistemkuliah") {
      // Membaca total data dari database
      const connection = await createPoolConnection();
      const [rows] = await connection.execute(`SELECT count(*) FROM ref_${moduleName}`);
      totalDataDatabase = rows[0]['count(*)'];
      await connection.end();
      // Membaca total data dari API
      const token = await getToken.fetchToken();
      const totalDataApiResponse = await axios.get(`https://unpastrial.siakadcloud.com/live/${moduleName}?showpage=1&page=1&limit=1`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      totalDataApi = totalDataApiResponse.data.count;
    } else if (moduleName === "mahasiswa") {
      // Membaca total data dari database
      const connection = await createPoolConnection();
      const [rows] = await connection.execute(`SELECT count(*) FROM mst_${moduleName}`);
      totalDataDatabase = rows[0]['count(*)'];
      await connection.end();
      // Membaca total data dari API
      const token = await getToken.fetchToken();
      const totalDataApiResponse = await axios.get(`https://unpas.siakadcloud.com/live/biodatamhs?showpage=1&page=1&limit=1`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      totalDataApi = totalDataApiResponse.data.count;
    } else if (moduleName === "dataperiode") {
      // Membaca total data dari database
      const connection = await createPoolConnection();
      const [rows] = await connection.execute(`SELECT count(*) FROM ref_${moduleName}`);
      totalDataDatabase = rows[0]['count(*)'];
      await connection.end();
      // Membaca total data dari API
      const token = await getToken.fetchToken();
      const totalDataApiResponse = await axios.get(`https://unpas.siakadcloud.com/live/${moduleName}?showpage=1&page=1&limit=1`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      totalDataApi = totalDataApiResponse.data.count;
    } else if (moduleName === "masterbank") {
      // Membaca total data dari database
      const connection = await createPoolConnection();
      const [rows] = await connection.execute(`SELECT count(*) FROM ref_${moduleName}`);
      totalDataDatabase = rows[0]['count(*)'];
      await connection.end();
      // Membaca total data dari API
      const token = await getToken.fetchToken();
      const totalDataApiResponse = await axios.get(`https://unpastrial.siakadcloud.com/live/swithingbank?showpage=1&page=1&limit=1`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      totalDataApi = totalDataApiResponse.data.count;
    }
    else {
      res.status(400).json({ success: false, message: `Invalid moduleName: ${moduleName}` });
      return;
    }

    res.status(200).json({ success: true, message: "berhasil mengambil total data", totalDataDatabase: totalDataDatabase, totalDataApi: totalDataApi });

  } catch (error) {
    res.status(500).send(`Error executing module ${moduleName}: ${error.message}`);
  }
});

//endpoint delete data
app.delete('/deleteData/:moduleName', async (req, res) => {
  const moduleName = req.params.moduleName;

  try {
    let tableName;

    // Menentukan nama tabel berdasarkan moduleName
    if (moduleName === 'dosen' || moduleName === 'mahasiswa' || moduleName === 'kurikulum' || moduleName === 'matakuliah') {
      tableName = `mst_${moduleName}`;
    } else if (moduleName === 'dataperiode' || moduleName === 'gelombang' || moduleName === 'jalurpendaftaran' || moduleName === 'periodedaftar' || moduleName === 'sistemkuliah' || moduleName === 'masterbank'){
      tableName = `ref_${moduleName}`;
    } else {
      tableName = `trn_${moduleName}`;
    }

    // Mengeksekusi kueri DELETE
    const connection = await createPoolConnection();
    const [result] = await connection.execute(`DELETE FROM ${tableName}`);
    await connection.end();

    // Memeriksa apakah ada data yang dihapus
    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: `Data di tabel ${moduleName} berhasil dihapus.` });
    } else {
      res.status(404).json({ success: false, message: `Tidak ada data di tabel ${moduleName}.` });
    }

  } catch (error) {
    res.status(500).send(`Error saat menghapus data dari tabel ${moduleName}: ${error.message}`);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
