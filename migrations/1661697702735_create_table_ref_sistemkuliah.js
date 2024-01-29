module.exports = {
    "up": "CREATE TABLE ref_sistemkuliah (`kode` VARCHAR(150) NOT NULL, `idsistemkuliah` INT NOT NULL, `namasistemkuliah` VARCHAR(150) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE ref_sistemkuliah"
}