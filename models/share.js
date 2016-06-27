var mysql = require('./db');

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//目的地
function Share() {
	
};


Share.prototype.get = function get(callback) {
	var selectSQL  = 'select * from share';
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

module.exports = Share;