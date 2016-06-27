var mysql = require('./db');

function PromotionalProduce(docid,docid1) {
    this.docid = docid;
    this.docid1 = docid1;
};


PromotionalProduce.prototype.get = function get(callback) {
	var selectSQL  = 'select * from promotional_lines order by txtDay asc';
	console.log(selectSQL);
	mysql.getConnection(function (err, conn) {
		if (err) console.log("POOL ==> " + err);
		
		//return callback(err);
		conn.query(selectSQL, function(err, rows, fields) {
			
			if (err) {
				console.log("error:" + err);
				return callback("error");
			}
			console.log("SELECT ==> ");
            //console.log(rows);
			conn.release();
			return callback(rows);
		});
	});
}

PromotionalProduce.prototype.getByid = function get(callback) {
    var pp = {
        docid: this.docid,
        docid1: this.docid1
    };
    var selectSQL  = "select * from promotional_lines where txtCruiselineNo = '" + pp.docid  +"' and txtDay='"+ pp.docid1  +"' order by txtDay asc";
    console.log(selectSQL);
    mysql.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);

        //return callback(err);
        conn.query(selectSQL, function(err, rows, fields) {

            if (err) {
                console.log("error:" + err);
                return callback("error");
            }
            console.log("SELECT ==> ");
            //console.log(rows);
            conn.release();
            return callback(rows);
        });
    });
}

module.exports = PromotionalProduce;