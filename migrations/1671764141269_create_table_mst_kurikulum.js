module.exports = {
    "up": "CREATE TABLE mst_kurikulum (`kode` VARCHAR(150) NOT NULL, `jenispaket` VARCHAR(150) NULL, `jeniswajibpilihan` VARCHAR(150) NULL, `kodemk` VARCHAR(150) NULL, `namamk` VARCHAR(150) NULL, `programstudi` VARCHAR(150) NULL, `semester` INT NULL,`sksmk` INT NULL, `tahunkurikulum` VARCHAR(150) NULL , PRIMARY KEY (`kode`))",
    "down": "DROP TABLE mst_kurikulum"
}