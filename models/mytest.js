var mysql = require('easymysql');
var Cruiselineinfo = require('./cruiselineinfo.js');

var conn = mysql.createConnection({
    host: '117.121.25.131',
    user: 'root',
    password: 'password123',
    database:'cds_basicinfo',
    port: 3306
});
conn.connect();

var cruiselineinfo = new Cruiselineinfo();
var dta1 = "2014-06-12"
cruiselineinfo.get(function (result) {
    if (result[1] == "r") {
        console.log("get info error!");
    } else {
        for(var i in result){
            var datlist = result[i].txtSailingDate;
            var tmp = datlist.split("；");
            var deleteSQL = 'select * from travel_notes'
            if(tmp.length==1){
                if(datlist<dta1){
                    //delete
                    console.log(result[i].txtCruiselineNo);
                    var deleteSQL = 'delete from cruise_line_info_filter where txtCruiselineNo="'+result[i].txtCruiselineNo+'"';
                    conn.query(deleteSQL, function(err, res) {
                        if (err) throw err;
                        console.log(res);
                    });
                }
            }else{
                for(var j=0;j<tmp.length;j++){

                }
            }
        }
    }
});

conn.end();