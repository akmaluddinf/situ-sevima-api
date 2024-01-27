module.exports = {
    "up": "CREATE TABLE ref_periodedaftar (`idperiodedaftar` INT NOT NULL, `idgelombang` INT NOT NULL, `idjalurpendaftaran` INT NOT NULL, `idsistemkuliah` INT NOT NULL, `idperiode` INT NOT NULL, `namaperiodedaftar` VARCHAR(255) NULL, PRIMARY KEY (`idperiodedaftar`))",
    "down": "DROP TABLE ref_periodedaftar"
}