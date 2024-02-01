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


async function jalankanTugasAsync() {
  try {
    console.log('Processing data: dosen...');
    await dosen.fetchDataAndSaveToDB();

    // console.log('Processing data: mahasiswa...');
    // await mahasiswa.fetchDataAndSaveToDB();

    // console.log('Processing data: kurikulum...');
    // await kurikulum.fetchDataAndSaveToDB();

    // console.log('Processing data: mata kuliah...');
    // await matakuliah.fetchDataAndSaveToDB();

    // console.log('Processing data: akm...');
    // await akmmahasiswa.fetchDataAndSaveToDB();

    // console.log('Processing data: jadwal perkuliahan...');
    // await jadwalperkuliahan.fetchDataAndSaveToDB();
    
    // console.log('Processing data: jadwal ujian...');
    // await jadwalujian.fetchDataAndSaveToDB();
    
    // console.log('Processing data: kelas kuliah...');
    // await kelaskuliah.fetchDataAndSaveToDB();
    
    // console.log('Processing data: krs mahasiswa...');
    // await krsmahasiswa.fetchDataAndSaveToDB();

    // console.log('Processing data: data pendaftar...');
    // await datapendaftar.fetchDataAndSaveToDB();
    
    // console.log('Processing data: peserta diterima...');
    // await pesertaditerima.fetchDataAndSaveToDB();
    
    // console.log('Processing data: peserta registrasi...');
    // await pesertaregistrasi.fetchDataAndSaveToDB();
    
    // console.log('Processing data: peserta tes...');
    // await pesertates.fetchDataAndSaveToDB();
    
    // console.log('Processing data: peserta ujian...');
    // await pesertaujian.fetchDataAndSaveToDB();

    // console.log('Processing data: presensi...');
    // await presensi.fetchDataAndSaveToDB();

    // console.log('Processing data: rekap pendaftar...');
    // await rekappendaftar.fetchDataAndSaveToDB();
    
    // console.log('Processing data: pendaftar...');
    // await pendaftar.fetchDataAndSaveToDB();
    
    // console.log('Processing data: data periode...');
    // await dataperiode.fetchDataAndSaveToDB();

    // console.log('Processing data: periode daftar...');
    // await periodedaftar.fetchDataAndSaveToDB();

    // console.log('Processing data: gelombang...');
    // await gelombang.fetchDataAndSaveToDB();

    // console.log('Processing data: jalur pendaftaran...');
    // await jalurpendaftaran.fetchDataAndSaveToDB();

    // console.log('Processing data: sistem kuliah...');
    // await sistemkuliah.fetchDataAndSaveToDB();

    // console.log('Processing data: master bank...');
    // await masterbank.fetchDataAndSaveToDB();


    console.log('Semua tugas selesai.');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

jalankanTugasAsync();