module.exports = {
    "up": "CREATE TABLE ref_dataperiode (`kode` VARCHAR(150) NOT NULL, `kode_periode` VARCHAR(150) NULL, `nama_periode` VARCHAR(150) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE ref_dataperiode"
}