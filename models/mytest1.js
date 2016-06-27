var Client = require('easymysql');

var mysql = Client.create({
    'maxconnections' : 10
});

mysql.addserver({
    'host' : '117.121.25.131',
    'user' : 'root',
    'password' : 'password123',
    'database':'cds_basicinfo',
    'port': 3306
});

mysql.on('busy', function (queuesize, maxconnections, which) {
    // XXX: write log and monitor it
});

mysql.query('select * from product_price',function (err, rows) {
    var price = 0;
    for(var i in rows){
       if(rows[i].currencyNo == "USD"){
           if(rows[i].numPrice1 != -1){
               price = rows[i].numPrice1*6.4
           }else if(rows[i].numPrice2 != -1){
               price = rows[i].numPrice2*6.4
           }else if(rows[i].numPrice3 != -1){
               price = rows[i].numPrice3*6.4
           }else if(rows[i].numPrice4 != -1){
               price = rows[i].numPrice4*6.4
           }
           var SQL = "update product_price set numPriceLast = '"+price+"' where id = '"+rows[i].id+"'";
           mysql.query(SQL,function (err, rows1) {
               console.log(rows1);
           });
       }else{
           if(rows[i].numPrice1 != -1){
               price = rows[i].numPrice1
           }else if(rows[i].numPrice2 != -1){
               price = rows[i].numPrice2
           }else if(rows[i].numPrice3 != -1){
               price = rows[i].numPrice3
           }else if(rows[i].numPrice4 != -1){
               price = rows[i].numPrice4
           }
           var SQL = "update product_price set numPriceLast = '"+price+"' where id = '"+rows[i].id+"'";
           mysql.query(SQL,function (err, rows2) {
               console.log(rows2);
           });
       }
    }
});

/*
mysql.query('select * from product_price where currencyNo IS NULL',function (err, rows) {
    for(var i in rows){
        var SQL = "update product_price set numPrice1 = '99999' where id = '"+rows[i].id+"'";
        mysql.query(SQL,function (err, rows1) {
            console.log(rows1);
        });
    }
});

// bind params

mysql.query('select * from cruise_line_info',function (err, rows) {
    for(var i in rows){
        var datlist = rows[i].txtSailingDate;
        var lineno = rows[i].txtCruiselineNo;
        var tmp = datlist.split("；");
        if(tmp.length==1){
                var SQL = "insert into product_price(id,txtCruiselineNo,txtSailingDate) values('"+lineno+"@"+datlist+"','"+lineno+"','"+datlist+"')";
            mysql.query(SQL,function (err, rows1) {
                console.log(rows1);
            });

        }else{
            for(var j=0;j<tmp.length;j++){
                if(tmp[j]!=""){
                    var SQL = "insert into product_price(id,txtCruiselineNo,txtSailingDate) values('"+lineno+"@"+tmp[j]+"','"+lineno+"','"+tmp[j]+"')";
                    mysql.query(SQL,function (err, rows2) {
                        console.log(rows2);
                    });
                }
            }
        }
    }
});
*/