module.exports = {
    "up": "CREATE TABLE sys_session (`client_id` VARCHAR(255) NOT NULL, `token` TEXT NULL, PRIMARY KEY (`client_id`))",
    "down": "DROP TABLE sys_session"
}