const dosen = require('./dosen');
const mahasiswa = require('./mahasiswa');
const matakuliah = require('./matakuliah');
const kurikulum = require('./kurikulum');
const akmmahasiswa = require('./akmmahasiswa');


async function jalankanTugasAsync() {
  try {
    console.log('Processing data dosen...');
    await dosen.checkAndRunFetchData();

    console.log('Processing data mahasiswa...');
    await mahasiswa.checkAndRunFetchData();

    console.log('Processing data mata kuliah...');
    await matakuliah.checkAndRunFetchData();

    console.log('Processing data kurikulum...');
    await kurikulum.checkAndRunFetchData();

    console.log('Processing data akm...');
    await akmmahasiswa.checkStatusDatabase();

    console.log('Semua tugas selesai.');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

jalankanTugasAsync();