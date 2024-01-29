module.exports = {
    "up": "CREATE TABLE ref_gelombang (`kode` VARCHAR(150) NOT NULL, `idgelombang` INT NOT NULL, `namagelombang` VARCHAR(150) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE ref_gelombang"
}