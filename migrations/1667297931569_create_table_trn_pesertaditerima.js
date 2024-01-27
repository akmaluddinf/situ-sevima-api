module.exports = {
    "up": "CREATE TABLE trn_pesertaditerima (`kode` VARCHAR(255) NOT NULL, `kodependaftar` VARCHAR(255) NOT NULL, `nama` VARCHAR(255) NULL, `noujian` VARCHAR(255) NULL, `prodipilihan` VARCHAR(255) NULL, `nilaiseleksi` VARCHAR(255) NULL, `seleksi` VARCHAR(255) NULL, `rek` VARCHAR(255) NULL, `cad` VARCHAR(255) NULL, `set` VARCHAR(255) NULL, `prodiditerima` VARCHAR(255) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE trn_pesertaditerima"
}