module.exports = {
    "up": "CREATE TABLE ref_periode (`kodeperiode` VARCHAR(255) NOT NULL, `namaperiode` VARCHAR(255) NULL, PRIMARY KEY (`kodeperiode`))",
    "down": "DROP TABLE ref_periode"
}