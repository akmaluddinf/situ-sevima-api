module.exports = {
    "up": "CREATE TABLE ref_masterbank (`kode` VARCHAR(150) NOT NULL, `idswitchingbank` VARCHAR(5) NOT NULL, `namaswitchingbank` VARCHAR(100) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE ref_masterbank"
}
