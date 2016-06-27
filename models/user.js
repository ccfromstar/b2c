var mysql = require('./db');
function User(user) {
	this.name = user.name;
	this.password = user.password;
};
module.exports = User;

User.prototype.checkRole = function checkRole(callback) {
	var user = {
		name: this.name,
		password: this.password,
	};
	var selectSQL  = 'select password from user where login_name = "'+user.name+'"';
	console.log(selectSQL);
	mysql.getConnection(function (err, conn) {
		if (err) console.log("POOL ==> " + err);
		//return callback(err);
	
		conn.query(selectSQL, function(err, rows) {
			if (err) return callback("error");
			console.log("SELECT ==> ");
			var pwd = "";
            for (var i in rows) {
                pwd = (rows[i].password);
            }
			if(pwd==user.password){
				return callback("success");
			}else{
				return callback("error1");
			}
			conn.release();
		});
	});
}

User.prototype.save = function save(callback) {
	var user = {
		name: this.name,
		password: this.password,
	};
	
	var insertSQL = 'insert into nodejsuser(username,pwd) values("'+user.name+'","'+user.password+'")';
	console.log(insertSQL);
	mysql.getConnection(function (err, conn) {
		if (err) console.log("POOL ==> " + err);
		//return callback(err);
	
		conn.query(insertSQL, function(err, res) {
			if (err) return callback("error");
			console.log("INSERT Return ==> ");
			console.log(res);
			conn.release();
			return callback(res);
		});
	});
}