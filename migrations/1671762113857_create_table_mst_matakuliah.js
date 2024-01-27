module.exports = {
    "up": "CREATE TABLE mst_matakuliah (`kode` VARCHAR(255) NOT NULL, `kodemk` VARCHAR(255) NOT NULL, `namamk` VARCHAR(255) NULL, `kurikulum` VARCHAR(255) NULL, `sksmk` INT NULL, `skstatapmuka` INT NULL, `skspraktikum` INT NULL,`jenismk` VARCHAR(255) NULL, `prodipengampu` VARCHAR(255) NULL, `dosenpengampu` VARCHAR(255) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE mst_matakuliah"
}