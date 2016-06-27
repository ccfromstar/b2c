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

function getToday(){
    var date = new Date(); //日期对象
    var now = "";
    now = date.getFullYear()+"-";
    var m =  (date.getMonth()+1)+"";
    if(m.length==1){m="0"+m;}
    now = now + m+"-";//取月的时候取的是当前月-1如果想取当前月+1就可以了
    var d =  date.getDate()+"";
    if(d.length==1){d="0"+d;}
    now = now + d;
    return now;
}

function Cruiselineinfosearch(key1, key2, key3, key4, key5, key6,orderby1,nstart) {
    this.key1 = key1;
    this.key2 = key2;
    this.key3 = key3;
    this.key4 = key4;
    this.key5 = key5;
    this.key6 = key6;
    this.orderby1 = orderby1;
    this.nstart = nstart;
};


Cruiselineinfosearch.prototype.get = function get(callback) {
    var cruiselineinfosearch = {
        key1: this.key1,
        key2: this.key2,
        key3: this.key3,
        key4: this.key4,
        key5: this.key5,
        key6: this.key6,
        orderby1: this.orderby1,
        nstart:this.nstart
    };

    if(cruiselineinfosearch.orderby1 == "2"){
        if(cruiselineinfosearch.key2=="10天以上"){
            var selectSQL = "select * from linetimes where txtSailingDate1 > '"+getToday()+"' and numPriceLast > 0 and length(txtCruiselineDays) > 8 and txtSailingDate1 like '%" + cruiselineinfosearch.key1 + "%' and txtRoutingArea like '%" + cruiselineinfosearch.key3 + "%' and txtCompanyNo like '%" + cruiselineinfosearch.key4 + "%' and txtShipNo like '%" + cruiselineinfosearch.key5 + "%' and txtDeparturePort like '%" + cruiselineinfosearch.key6 + "%' order by txtisSales desc,txtSailingDate1 asc limit "+cruiselineinfosearch.nstart+", 6";
        }else{
            var selectSQL = "select * from linetimes where txtSailingDate1 > '"+getToday()+"' and numPriceLast > 0 and txtCruiselineDays like '%" + cruiselineinfosearch.key2 + "%' and txtSailingDate1 like '%" + cruiselineinfosearch.key1 + "%' and txtRoutingArea like '%" + cruiselineinfosearch.key3 + "%' and txtCompanyNo like '%" + cruiselineinfosearch.key4 + "%' and txtShipNo like '%" + cruiselineinfosearch.key5 + "%' and txtDeparturePort like '%" + cruiselineinfosearch.key6 + "%' order by txtisSales desc,txtSailingDate1 asc limit "+cruiselineinfosearch.nstart+", 6";
        }


    }else{

        if(cruiselineinfosearch.key2=="10天以上"){
            var selectSQL = "select * from linetimes where txtSailingDate1 > '"+getToday()+"' and numPriceLast > 0 and length(txtCruiselineDays) > 8 and txtSailingDate1 like '%" + cruiselineinfosearch.key1 + "%' and txtRoutingArea like '%" + cruiselineinfosearch.key3 + "%' and txtCompanyNo like '%" + cruiselineinfosearch.key4 + "%' and txtShipNo like '%" + cruiselineinfosearch.key5 + "%' and txtDeparturePort like '%" + cruiselineinfosearch.key6 + "%' order by txtisSales desc,numPriceLast asc,txtSailingDate1 asc limit "+cruiselineinfosearch.nstart+", 6 ";
        }else{
            var selectSQL = "select * from linetimes where txtSailingDate1 > '"+getToday()+"' and numPriceLast > 0 and txtCruiselineDays like '%" + cruiselineinfosearch.key2 + "%' and txtSailingDate1 like '%" + cruiselineinfosearch.key1 + "%' and txtRoutingArea like '%" + cruiselineinfosearch.key3 + "%' and txtCompanyNo like '%" + cruiselineinfosearch.key4 + "%' and txtShipNo like '%" + cruiselineinfosearch.key5 + "%' and txtDeparturePort like '%" + cruiselineinfosearch.key6 + "%' order by txtisSales desc,numPriceLast asc,txtSailingDate1 asc limit "+cruiselineinfosearch.nstart+", 6";
        }


    }

    console.log(selectSQL);
    mysql.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);

        //return callback(err);
        conn.query(selectSQL, function (err, rows, fields) {

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

module.exports = Cruiselineinfosearch;