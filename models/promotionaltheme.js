var mysql = require('./db');

function PromotionalTheme() {
	
};


PromotionalTheme.prototype.get = function get(callback) {
	var selectSQL  = 'select * from promotional_theme';
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

module.exports = PromotionalTheme;