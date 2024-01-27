const dosen = require('./dosen');
const mahasiswa = require('./mahasiswa');
const matakuliah = require('./matakuliah');
const kurikulum = require('./kurikulum');
const akmmahasiswa_idperiode = require('./akmmahasiswa_idperiode');
const akmmahasiswa = require('./akmmahasiswa');
const kelaskuliah = require('./kelaskuliah');


async function jalankanTugasAsync() {
  try {
    console.log('Processing data dosen...');
    await dosen.fetchDataAndSaveToDB();

    // console.log('Processing data mahasiswa...');
    // await mahasiswa.fetchDataAndSaveToDB();

    // console.log('Processing data mata kuliah...');
    // await matakuliah.fetchDataAndSaveToDB();

    // console.log('Processing data kurikulum...');
    // await kurikulum.fetchDataAndSaveToDB();

    // console.log('Processing data akm...');
    // await akmmahasiswa.fetchDataAndSaveToDB();

    // console.log('Processing data kelas kuliah...');
    // await kelaskuliah.fetchDataAndSaveToDB();

    // console.log('Processing data akm per id periode...');
    // await akmmahasiswa_idperiode.fetchDataAndSaveToDB();

    console.log('Semua tugas selesai.');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

jalankanTugasAsync();