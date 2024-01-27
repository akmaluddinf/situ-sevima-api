module.exports = {
    "up": "CREATE TABLE sys_pagetrack (`tablename` VARCHAR(255) NOT NULL, `pagenum` INT NULL, PRIMARY KEY (`tablename`))",
    "down": "DROP TABLE sys_pagetrack"
}