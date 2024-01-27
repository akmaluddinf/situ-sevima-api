module.exports = {
  "up": "CREATE TABLE mst_dosen (`kode` VARCHAR(150) NOT NULL, `agama` VARCHAR(150) NULL, `alamat` VARCHAR(150) NULL, `email` VARCHAR(150) NULL, `golpangkat` VARCHAR(150) NULL, `homebase` VARCHAR(150) NULL, `jabatanfungsional` VARCHAR(150) NULL,`jabatanstruktural` VARCHAR(150) NULL, `jeniskelamin` VARCHAR(150) NULL, `jenispegawai` VARCHAR(150) NULL, `nama` VARCHAR(150) NOT NULL, `nidn` VARCHAR(150) NULL, `nip` VARCHAR(150) NOT NULL, `nohp` VARCHAR(150) NULL, `pendidikanterakhir` VARCHAR(150) NULL, `tanggallahir` DATE NULL, `tempatlahir` VARCHAR(150) NULL, PRIMARY KEY (`kode`))",
  "down": "DROP TABLE mst_dosen"
}