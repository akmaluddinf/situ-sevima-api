module.exports = {
    "up": "CREATE TABLE mst_mahasiswa (`kode` VARCHAR(255) NOT NULL, `agama` VARCHAR(255) NULL, `alamat` VARCHAR(255) NULL, `email` VARCHAR(255) NULL, `emailkampus` VARCHAR(255) NULL, `gelombang` VARCHAR(255) NULL, `jalurpendaftaran` VARCHAR(255) NULL,`jeniskelamin` VARCHAR(255) NULL, `kelasperkuliahan` VARCHAR(255) NULL, `konsentrasi` VARCHAR(255) NULL, `nama` VARCHAR(255) NULL, `namaibu` VARCHAR(255) NULL, `nik` VARCHAR(255) NULL, `nim` VARCHAR(255) NULL, `nohp` VARCHAR(255) NULL, `periodemasuk` VARCHAR(255) NULL, `programstudi` VARCHAR(255) NULL, `sistemkuliah` VARCHAR(255) NULL, `statusmahasiswa` VARCHAR(255) NULL, `tanggallahir` DATE NULL, `tempatlahir` VARCHAR(255) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE mst_mahasiswa"
}