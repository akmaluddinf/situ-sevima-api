module.exports = {
    "up": "CREATE TABLE trn_pesertates (`kode` VARCHAR(255) NOT NULL, `kodependaftar` VARCHAR(255) NOT NULL, `noujian` VARCHAR(255) NULL, `namapendaftar` VARCHAR(255) NULL, `nilaiseleksi` VARCHAR(255) NULL, `lulus` VARCHAR(255) NULL, `hadir` VARCHAR(255) NULL, `jenisprogram` VARCHAR(255) NULL, `namajenisseleksi` VARCHAR(255) NULL, `namaruang` VARCHAR(255) NULL, `tgljadwal` DATE NULL, `tgljadwalselesai` DATE NULL, `waktumulai` TIME NULL, `waktuselesai` TIME NULL, PRIMARY KEY (`kode`))",
    "down": "DROP TABLE trn_pesertates"
}