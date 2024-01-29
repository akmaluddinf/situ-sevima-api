module.exports = {
    "up": "CREATE TABLE trn_pesertaregistrasi (`kode` VARCHAR(150) NOT NULL, `kodependaftar` VARCHAR(150) NOT NULL, `namapendaftar` VARCHAR(150) NULL, `prodipilihan` VARCHAR(150) NULL, `prodiditerima` VARCHAR(150) NULL, `namaperiodedaftar` VARCHAR(150) NULL, `namagelombang` VARCHAR(150) NULL, `namajalurpendaftaran` VARCHAR(150) NULL, `namasistemkuliah` VARCHAR(150) NULL, `nim` VARCHAR(150) NULL, `daftarulang` VARCHAR(150) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE trn_pesertaregistrasi"
}