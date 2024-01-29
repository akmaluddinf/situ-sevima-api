module.exports = {
  "up": "CREATE TABLE trn_rekappendaftar (`kode` VARCHAR(150) NOT NULL, `idprodi` VARCHAR(150) NULL, `jenjang` VARCHAR(150) NULL, `namaprodi` VARCHAR(150) NULL, `tahunakademik` INT NULL, `pendaftar` INT NULL, `lulusseleksi` INT NULL, PRIMARY KEY (`kode`))",
  "down": "DROP TABLE trn_rekappendaftar"
}