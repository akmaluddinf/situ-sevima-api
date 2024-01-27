module.exports = {
    "up": "CREATE TABLE trn_kurikulum (`kode` VARCHAR(255) NOT NULL, `jenispaket` VARCHAR(255) NULL, `jeniswajibpilihan` VARCHAR(255) NULL, `kodemk` VARCHAR(255) NULL, `namamk` VARCHAR(255) NULL, `programstudi` VARCHAR(255) NULL, `semester` INT NULL,`sksmk` INT NULL, `tahunkurikulum` VARCHAR(255) NULL , PRIMARY KEY (`kode`))",
    "down": "DROP TABLE trn_kurikulum"
}