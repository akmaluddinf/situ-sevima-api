module.exports = {
    "up": "CREATE TABLE ref_sistemkuliah (`idsistemkuliah` INT NOT NULL, `namasistemkuliah` VARCHAR(255) NULL, PRIMARY KEY (`idsistemkuliah`))",
    "down": "DROP TABLE ref_sistemkuliah"
}