var settings = require('../settings');
var mysql = require('mysql');
module.exports = mysql.createPool({
    host: settings.host,
    user: settings.user,
    password: settings.password,
    database:'cds_b2b1',
    port: settings.port
});
