module.exports = {
    "up": "CREATE TABLE ref_jalurpendaftaran (`kode` VARCHAR(150) NOT NULL, `idjalurpendaftaran` INT NOT NULL, `namajalurpendaftaran` VARCHAR(150) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE ref_jalurpendaftaran"
}