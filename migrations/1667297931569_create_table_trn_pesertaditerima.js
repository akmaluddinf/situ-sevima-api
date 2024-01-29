module.exports = {
    "up": "CREATE TABLE trn_pesertaditerima (`kode` VARCHAR(150) NOT NULL, `kodependaftar` VARCHAR(150) NOT NULL, `nama` VARCHAR(150) NULL, `noujian` VARCHAR(150) NULL, `prodipilihan` VARCHAR(150) NULL, `nilaiseleksi` VARCHAR(150) NULL, `seleksi` VARCHAR(150) NULL, `rek` VARCHAR(150) NULL, `cad` VARCHAR(150) NULL, `set` VARCHAR(150) NULL, `prodiditerima` VARCHAR(150) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE trn_pesertaditerima"
}