var mysql = require('./db');

function Product(docid,txtCruiselineNo, currencyNo,txtSailingDate, numPrice1,numPrice2,numPrice3,numPrice4,numTax1,numTax2,numTax3,numTax4,numTip1,numTip2,numTip3,numTip4,rtfCruiselineJourneyImg) {
    this.txtCruiselineNo = txtCruiselineNo;
    this.txtSailingDate = txtSailingDate;
    this.numPrice1 = numPrice1;
    this.numPrice2 = numPrice2;
    this.numPrice3 = numPrice3;
    this.numPrice4 = numPrice4;

    this.numTax1 = numTax1;
    this.numTax2 = numTax2;
    this.numTax3 = numTax3;
    this.numTax4 = numTax4;

    this.numTip1 = numTip1;
    this.numTip2 = numTip2;
    this.numTip3 = numTip3;
    this.numTip4 = numTip4;

    this.currencyNo = currencyNo;
    this.rtfCruiselineJourneyImg = rtfCruiselineJourneyImg;
    this.docid = docid;
};

module.exports = Product;

Product.prototype.save = function save(callback) {
	var product = {
        txtCruiselineNo: this.txtCruiselineNo,
        txtSailingDate: this.txtSailingDate,
        currencyNo: this.currencyNo,

        numPrice1:this.numPrice1,
        numPrice2:this.numPrice2,
        numPrice3:this.numPrice3,
        numPrice4:this.numPrice4,

        numTax1: this.numTax1,
        numTax2: this.numTax2,
        numTax3: this.numTax3,
        numTax4: this.numTax4,

        numTip1: this.numTip1,
        numTip2: this.numTip2,
        numTip3: this.numTip3,
        numTip4: this.numTip4,

        rtfCruiselineJourneyImg: this.rtfCruiselineJourneyImg ,
	};
	var insertSQL = 'insert into product_price(txtCruiselineNo, currencyNo,txtSailingDate, numPrice1,numPrice2,numPrice3,numPrice4,numTax1,numTax2,numTax3,numTax4,numTip1,numTip2,numTip3,numTip4,rtfCruiselineJourneyImg) values("'+product.txtCruiselineNo+'","'+product.currencyNo+'","'+product.txtSailingDate+'","'+product.numPrice1+'","'+product.numPrice2+'","'+product.numPrice3+'","'+product.numPrice4+'","'+product.numTax1+'","'+product.numTax2+'","'+product.numTax3+'","'+product.numTax4+'","'+product.numTip1+'","'+product.numTip2+'","'+product.numTip3+'","'+product.numTip4+'","'+product.rtfCruiselineJourneyImg+'")';
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

Product.prototype.delete = function save(callback) {
    var travelnotes = {
        docid: this.docid,
    };
    var deleteSQL = 'delete from product_price where ';
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

Product.prototype.update = function save(callback) {
    var product = {
        docid: this.docid,
        txtCruiselineNo: this.txtCruiselineNo,
        txtSailingDate: this.txtSailingDate,
        currencyNo: this.currencyNo,

        numPrice1:this.numPrice1,
        numPrice2:this.numPrice2,
        numPrice3:this.numPrice3,
        numPrice4:this.numPrice4,

        numTax1: this.numTax1,
        numTax2: this.numTax2,
        numTax3: this.numTax3,
        numTax4: this.numTax4,

        numTip1: this.numTip1,
        numTip2: this.numTip2,
        numTip3: this.numTip3,
        numTip4: this.numTip4,
        rtfCruiselineJourneyImg: this.rtfCruiselineJourneyImg,
    };
    var updateSQL  = 'update product_price set ';
    updateSQL = updateSQL + 'txtCruiselineNo="'+product.txtCruiselineNo+'",';
    updateSQL = updateSQL + 'txtSailingDate="'+product.txtSailingDate+'",';
    updateSQL = updateSQL + 'numPrice1="'+product.numPrice1+'",';
    updateSQL = updateSQL + 'numPrice2="'+product.numPrice2+'",';
    updateSQL = updateSQL + 'numPrice3="'+product.numPrice3+'",';
    updateSQL = updateSQL + 'rtfCruiselineJourneyImg="'+product.rtfCruiselineJourneyImg+'",';
    updateSQL = updateSQL + 'numPrice4="'+product.numPrice4+'",';
    updateSQL = updateSQL + 'currencyNo="'+product.currencyNo+'",';
    updateSQL = updateSQL + 'numTax1="'+product.numTax1+'",';
    updateSQL = updateSQL + 'numTax2="'+product.numTax2+'",';
    updateSQL = updateSQL + 'numTax3="'+product.numTax3+'",';
    updateSQL = updateSQL + 'numTax4="'+product.numTax4+'",';
    updateSQL = updateSQL + 'numTip1="'+product.numTip1+'",';
    updateSQL = updateSQL + 'numTip2="'+product.numTip2+'",';
    updateSQL = updateSQL + 'numTip3="'+product.numTip3+'",';
    updateSQL = updateSQL + 'numTip4="'+product.numTip4+'"';
    updateSQL = updateSQL + ' where id='+product.docid;
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

Product.prototype.get = function get(callback) {
    var selectSQL  = 'select * from product_price';
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

Product.prototype.getbykey = function get(callback) {
    var product = {
        docid: this.docid,
    };
    var selectSQL  = 'select * from product_price where ';
    selectSQL = selectSQL + 'id like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or txtCruiselineNo like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or txtSailingDate like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or numPrice1 like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or numPrice2 like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or numPrice3 like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or numPrice4 like "%'+product.docid+'%"';

    selectSQL = selectSQL + ' or numTax1 like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or numTax2 like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or numTax3 like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or numTax4 like "%'+product.docid+'%"';

    selectSQL = selectSQL + ' or numTip1 like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or numTip2 like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or numTip3 like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or numTip4 like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or currencyNo like "%'+product.docid+'%"';
    selectSQL = selectSQL + ' or rtfCruiselineJourneyImg like "%'+product.docid+'%"';
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