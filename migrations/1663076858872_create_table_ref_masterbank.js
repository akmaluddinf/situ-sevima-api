module.exports = {
    "up": "CREATE TABLE ref_masterbank (`idswitchingbank` VARCHAR(5) NOT NULL, `namaswitchingbank` VARCHAR(100) NULL, PRIMARY KEY (`idswitchingbank`))",
    "down": "DROP TABLE ref_masterbank"
}
