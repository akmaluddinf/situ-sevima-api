module.exports = {
    "up": "CREATE TABLE trn_pesertaregistrasi (`kode` VARCHAR(255) NOT NULL, `kodependaftar` VARCHAR(255) NOT NULL, `namapendaftar` VARCHAR(255) NULL, `prodipilihan` VARCHAR(255) NULL, `prodiditerima` VARCHAR(255) NULL, `namaperiodedaftar` VARCHAR(255) NULL, `namagelombang` VARCHAR(255) NULL, `namajalurpendaftaran` VARCHAR(255) NULL, `namasistemkuliah` VARCHAR(255) NULL, `nim` VARCHAR(255) NULL, `daftarulang` VARCHAR(255) NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE trn_pesertaregistrasi"
}