module.exports = {
    "up": "CREATE TABLE ref_gelombang (`idgelombang` INT NOT NULL, `namagelombang` VARCHAR(255) NULL, PRIMARY KEY (`idgelombang`))",
    "down": "DROP TABLE ref_gelombang"
}