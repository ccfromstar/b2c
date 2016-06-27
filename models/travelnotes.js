var mysql = require('./db');

function Travelnotes(docid,txtCategory1, txtCategory2, txtCategory3,rtfImg,txtText,txtTitle,txtAbbr) {
	this.txtCategory1 = txtCategory1;
	this.txtCategory2 = txtCategory2;
    this.txtCategory3 = txtCategory3;
    this.rtfImg = rtfImg;
    this.txtText = txtText;
    this.txtTitle = txtTitle;
    this.docid = docid;
    this.txtAbbr = txtAbbr;
};
module.exports = Travelnotes;

Travelnotes.prototype.save = function save(callback) {
	var travelnotes = {
        txtCategory1: this.txtCategory1,
        txtCategory2: this.txtCategory2,
        txtCategory3: this.txtCategory3,
        rtfImg: this.rtfImg,
        txtText: this.txtText,
        txtTitle: this.txtTitle,
        txtAbbr: this.txtAbbr,
	};
	var insertSQL = 'insert into travel_notes(txtCategory1,txtCategory2,txtCategory3,rtfImg,txtText,txtTitle,txtAbbr) values("'+travelnotes.txtCategory1+'","'+travelnotes.txtCategory2+'","'+travelnotes.txtCategory3+'","'+travelnotes.rtfImg+'","'+travelnotes.txtText.replace(/"/g,"'")+'","'+travelnotes.txtTitle+'","'+travelnotes.txtAbbr+'")';
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

Travelnotes.prototype.delete = function save(callback) {
    var travelnotes = {
        docid: this.docid,
    };
    var deleteSQL = 'delete from travel_notes where ';
    var docids = travelnotes.docid;
    var tmp = docids.split(";");
    for(var i=0;i<tmp.length;i++){
        if(i==0){
            deleteSQL = deleteSQL + 'id = '+tmp[i];
        }else{
            deleteSQL = deleteSQL + ' or id = '+tmp[i];
        }
    }
    console.log(deleteSQL);
    mysql.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        //return callback(err);

        conn.query(deleteSQL, function(err, res) {
            if (err) return callback("error");
            console.log("DELETE Return ==> ");
            console.log(res);
            conn.release();
            return callback(res);
        });
    });
}

Travelnotes.prototype.update = function save(callback) {
    var travelnotes = {
        docid: this.docid,
        txtCategory1: this.txtCategory1,
        txtCategory2: this.txtCategory2,
        txtCategory3: this.txtCategory3,
        rtfImg: this.rtfImg,
        txtText: this.txtText,
        txtTitle: this.txtTitle,
        txtAbbr: this.txtAbbr,
    };
    var updateSQL  = 'update travel_notes set ';
    updateSQL = updateSQL + 'txtCategory1="'+travelnotes.txtCategory1+'",';
    updateSQL = updateSQL + 'txtCategory2="'+travelnotes.txtCategory2+'",';
    updateSQL = updateSQL + 'txtCategory3="'+travelnotes.txtCategory3+'",';
    updateSQL = updateSQL + 'rtfImg="'+travelnotes.rtfImg+'",';
    updateSQL = updateSQL + 'txtAbbr="'+travelnotes.txtAbbr+'",';
    updateSQL = updateSQL + 'txtText="'+travelnotes.txtText.replace(/"/g,"'")+'",';
    updateSQL = updateSQL + 'txtTitle="'+travelnotes.txtTitle+'"';
    updateSQL = updateSQL + ' where id='+travelnotes.docid;
    console.log(updateSQL);
    mysql.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        //return callback(err);

        conn.query(updateSQL, function(err, res) {
            if (err) return callback("error");
            console.log("UPDATE Return ==> ");
            console.log(res);
            conn.release();
            return callback(res);
        });
    });
}

Travelnotes.prototype.get = function get(callback) {
    var selectSQL  = 'select * from travel_notes order by id desc';
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

Travelnotes.prototype.getbykey = function get(callback) {
    var travelnotes = {
        docid: this.docid,
    };
    var selectSQL  = 'select * from travel_notes where ';
    selectSQL = selectSQL + 'id like "%'+travelnotes.docid+'%"';
    selectSQL = selectSQL + ' or txtCategory1 like "%'+travelnotes.docid+'%"';
    selectSQL = selectSQL + ' or txtCategory2 like "%'+travelnotes.docid+'%"';
    selectSQL = selectSQL + ' or txtCategory3 like "%'+travelnotes.docid+'%"';
    selectSQL = selectSQL + ' or rtfImg like "%'+travelnotes.docid+'%"';
    selectSQL = selectSQL + ' or txtText like "%'+travelnotes.docid+'%"';
    selectSQL = selectSQL + ' or txtTitle like "%'+travelnotes.docid+'%"';
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