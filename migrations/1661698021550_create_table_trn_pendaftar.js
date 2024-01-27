module.exports = {
    "up": "CREATE TABLE trn_pendaftar (`kodependaftar` VARCHAR(255) NOT NULL, `idperiodedaftar` INT NOT NULL, `namapendaftar` VARCHAR(255) NULL, `tgllahir` DATE NULL, `jk` VARCHAR(255) NULL, `email` VARCHAR(255) NULL, `nohp` VARCHAR(255) NULL, `nim` VARCHAR(255) NULL, `tgldaftarulang` DATE NULL,  PRIMARY KEY (`kodependaftar`))",
    "down": "DROP TABLE trn_pendaftar"
}