module.exports = {
    "up": "CREATE TABLE trn_akmmahasiswa (`kode` VARCHAR(255) NOT NULL, `nim` VARCHAR(255) NOT NULL, `nama` VARCHAR(255) NULL, `idperiode` VARCHAR(255) NOT NULL, `statusmhs` VARCHAR(255) NULL, `nip` VARCHAR(255) NULL, `dosenpa` VARCHAR(255) NULL, `ips` DECIMAL(4,3) NULL, `ipk` DECIMAL(4,3) NULL, `skssemester` INT NULL, `skstotal` INT NULL, `ipklulus` DECIMAL(4,3) NULL, `skslulus` INT NULL, `batassks` INT NULL, `skstempuh` INT NULL, `semmhs` INT NULL, `tglsk` DATE NULL, `nosk` VARCHAR(255) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE trn_akmmahasiswa"
}