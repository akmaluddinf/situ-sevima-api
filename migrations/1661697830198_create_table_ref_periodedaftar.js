module.exports = {
    "up": "CREATE TABLE ref_periodedaftar (`kode` VARCHAR(150) NOT NULL, `idgelombang` INT NOT NULL, `idjalurpendaftaran` INT NOT NULL, `idperiodedaftar` INT NOT NULL, `idsistemkuliah` INT NOT NULL, `idperiode` INT NOT NULL, `namaperiodedaftar` VARCHAR(150) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE ref_periodedaftar"
}