module.exports = {
    "up": "CREATE TABLE ref_jalurpendaftaran (`idjalurpendaftaran` INT NOT NULL, `namajalurpendaftaran` VARCHAR(255) NULL, PRIMARY KEY (`idjalurpendaftaran`))",
    "down": "DROP TABLE ref_jalurpendaftaran"
}