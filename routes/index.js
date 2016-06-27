var User = require('../models/user.js');
var Post = require('../models/post.js');
var Med = require('../models/med.js');
var Port = require('../models/port.js');
var Cruisecompany = require('../models/cruisecompany.js');
var Cruiseship = require('../models/cruiseship.js');
var Cruiselineinfo = require('../models/cruiselineinfo.js');
var CruiselineinfoAll = require('../models/cruiselineinfoall.js');
var Cruiselineinfosearch = require('../models/cruiselineinfosearch.js');
var CruiselineinfosearchbyKey = require('../models/cruiselineinfosearchbyKey.js');
var Cruiselineroutesearch = require('../models/cruiselineroutesearch.js');
var Shipcabin = require('../models/shipcabin.js');
var Shipservice = require('../models/shipservice.js');
var Shipdinner = require('../models/shipdinner.js');
var Travelnotes = require('../models/travelnotes.js');
var Product = require('../models/product.js');
var Currency = require('../models/currency.js');
var Theme = require('../models/theme.js');
var PromotionalTheme = require('../models/promotionaltheme.js');
var PromotionalProduce = require('../models/promotionalproduce.js');
var Share = require('../models/share.js');
var nodemailer = require('nodemailer');
var Question = require('../models/question');
var Linetimes = require('../models/linetimes');
var mysql = require('../models/db');
var mysql1 = require('../models/b2bdb');
var settings = require('../settings');
var ejs = require('ejs');
var crypto = require("crypto");
    xml=require("node-xml");
    Message = require("./message");


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

function getNow(){
var date = new Date(); //日期对象
var now = "";
now = date.getFullYear()+"-";
now = now + (date.getMonth()+1)+"-";//取月的时候取的是当前月-1如果想取当前月+1就可以了
now = now + date.getDate()+" ";
now = now + date.getHours()+":";
now = now + date.getMinutes()+":";
now = now + date.getSeconds()+"";
return now;
}

function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};

exports.calendar12months = function (req, res) {
    // 12 months calendar
    var MONTH_MAX_ITEM = 5;//max. visible items each month
    var month12 = [];
    var calDataStore = {};//data store shared by the two calendario objects
    var today = {};
    var now = new Date();
    today.month = now.getMonth()+1;
    today.year = now.getFullYear();

    for( var i = 0; i < 12; i++ ){
        month12[i] = {year:today.year, month:(today.month+i)};
        if ( today.month + i > 12 ){
            month12[i].year = today.year+1;
            month12[i].month = (today.month+i)%12;
        }
    }
    //fetchProduct4Calendar
    var url = settings.SERVICE_HOST+"/product/get4calendar";
    var request = require('request');
    request(url, function (err, serviceRes, body) {
        if (err || serviceRes.statusCode != 200) {
            console.log('fetch product err: ' + serviceRes.statusCode + '#' + err);
            return;
        }
        var productList = JSON.parse(body);

        for (var i in productList) {

            var startDate = productList[i].startDate;

            if (!calDataStore[startDate]) {
                calDataStore[startDate] = [];
            }
            calDataStore[startDate].push(productList[i]);
            var date = startDate.split('-');
            var y = date[0];
            var m = parseInt(date[1]);

            for (var k in month12) {
                if (month12[k].year == y && month12[k].month == m) {

                    var itemFound = false;
                    if (!month12[k].dataStore) {
                        month12[k].dataStore = [];
                    }
                    for (var d in month12[k].dataStore) {
                        if (month12[k].dataStore[d].cruiseArea == productList[i].cruiseArea) {
                            if (month12[k].dataStore[d].price > productList[i].price) {
                                month12[k].dataStore[d].price = productList[i].price;
                            }
                            itemFound = true;
                            break;
                        }
                    }
                    if (!itemFound) {
                        month12[k].dataStore.push({cruiseArea: productList[i].cruiseArea, price: productList[i].price});
                    }

                    break;
                }
            }
        }
        require('ejs').renderFile('views/cruise_calendar/calendar/month12view.ejs', {months: month12, MONTH_MAX_ITEM: MONTH_MAX_ITEM}, function(err, html){
            res.send(html);
        });

    });

};

exports.privacy = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('隐私声明','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('privacy', {title: '隐私声明'});
};

exports.user = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('使用条款','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('user', {title: '使用条款'});
};

exports.mycuriseresult = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('航次搜索结果列表页面','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.locals.datstart = req.session.datstart;
    res.locals.txtcruiseday = req.session.txtcruiseday;
    res.locals.txtplace = req.session.txtplace;
    res.locals.txtcurisecompany = req.session.txtcurisecompany;
    res.locals.txtcurise = req.session.txtcurise;
    res.locals.txtport = req.session.txtport;
    if(req.session.pse2){
        res.locals.pse2 = req.session.pse2;
    }else{
        res.locals.pse2 = "*";
    }
    var numStart =  "";
    if(req.session.numStart){
        res.locals.numStart = req.session.numStart;
        numStart =  req.session.numStart;
    }else{
        res.locals.numStart = "0";
        numStart = "0";
    }
    console.log(res.locals.pse2);
    var txtcruiseday = req.session.txtcruiseday;
    var datstart = req.session.datstart;
    var txtplace = req.session.txtplace;
    var txtcurisecompany = req.session.txtcurisecompany;
    var txtcurise = req.session.txtcurise;
    var txtport = req.session.txtport;
    var orderby1 = req.session.pse2;

    if (datstart == "*" || !datstart) {
        datstart = "";
    }
    if (txtcruiseday == "*" || !txtcruiseday) {
        txtcruiseday = "";
    }
    if (txtplace == "*" || !txtplace) {
        txtplace = "";
    }
    if (txtcurisecompany == "*" || !txtcurisecompany) {
        txtcurisecompany = "";
    }
    if (txtcurise == "*" || !txtcurise) {
        txtcurise = "";
    }
    if (txtport == "*" || !txtport) {
        txtport = "";
    }
    var cruisecompany = new Cruisecompany();
    cruisecompany.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var cruiseship = new Cruiseship();
            cruiseship.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruiselineinfo = new Cruiselineinfo();
                    cruiselineinfo.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var cruiselineinfosearch = new Cruiselineinfosearch(datstart, txtcruiseday, txtplace, txtcurisecompany, txtcurise, txtport,orderby1,numStart);
                            cruiselineinfosearch.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    var med = new Med();
                                    med.get(function (result4) {
                                        if (result4[1] == "r") {
                                            console.log("get info error!");
                                        } else {
                                            var product = new Product();
                                            product.get(function (result5) {
                                                if (result5[1] == "r") {
                                                    console.log("get info error!");
                                                } else {
                                                    var port = new Port();
                                                    port.get(function (result6) {
                                                        if (result6[1] == "r") {
                                                            console.log("get info error!");
                                                        } else {
                                                            var linetimes = new Linetimes();
                                                            linetimes.get(function (result7) {
                                                                if (result7[1] == "r") {
                                                                    console.log("get info error!");
                                                                } else {
                                                                    var totalcount = 0;
                                                                    if(txtcruiseday=="10天以上"){
                                                                        mysql.query("select * from linetimes where txtSailingDate1 > '"+getToday()+"' and  numPriceLast > 0 and length(txtCruiselineDays) > 8 and  txtSailingDate1 like '%" + datstart + "%' and txtRoutingArea like '%" + txtplace + "%' and txtCompanyNo like '%" + txtcurisecompany + "%' and txtShipNo like '%" + txtcurise + "%' and txtDeparturePort like '%" + txtport + "%'",function (err, rows) {
                                                                            totalcount = (rows.length);
                                                                            res.render('mycuriseresult', { title: '搜索结果', cruisecompany: result, cruiseship: result1, cruiselineinfo: result2, cruiselineinfosearch: result3,med:result4,product:result5,port:result6,lines1:result7,totalcount:totalcount});
                                                                        });

                                                                    }else{
                                                                        mysql.query("select * from linetimes where txtSailingDate1 > '"+getToday()+"' and  numPriceLast > 0 and txtCruiselineDays like '%" + txtcruiseday + "%' and txtSailingDate1 like '%" + datstart + "%' and txtRoutingArea like '%" + txtplace + "%' and txtCompanyNo like '%" + txtcurisecompany + "%' and txtShipNo like '%" + txtcurise + "%' and txtDeparturePort like '%" + txtport + "%'",function (err, rows) {
                                                                            totalcount = (rows.length);
                                                                            res.render('mycuriseresult', { title: '搜索结果', cruisecompany: result, cruiseship: result1, cruiselineinfo: result2, cruiselineinfosearch: result3,med:result4,product:result5,port:result6,lines1:result7,totalcount:totalcount});
                                                                        });
                                                                    }



                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.home = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('首页','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="主页-邮轮时代 www.youlunshidai.com";
    res.locals.mt2 ="邮轮公司名，邮轮公司英文名，度假目的地，度假主题， 游轮特价，邮轮特价，邮轮时代，CRUISETIME,邮轮时代微信";
    res.locals.mt3 ="邮轮公司名，邮轮公司英文名，度假目的地，度假主题， 游轮特价，邮轮特价，邮轮时代，CRUISETIME,邮轮时代微信";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    /*
    var cruisecompany = new Cruisecompany();
    cruisecompany.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
            var cruisecompany1 = new Cruisecompany();
            cruisecompany1.get(function (result3) {
                if (result3[1] == "r") {
                    console.log("get info error!");

                } else {
                    var cruiseship = new Cruiseship();
                    cruiseship.get(function (result1) {
                        if (result1[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var cruiselineinfo = new Cruiselineinfo();
                            cruiselineinfo.get(function (result2) {
                                if (result2[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    res.render('home', { layout:false,title: '首页', cruisecompany: result3, cruiseship: result1, cruiselineinfo: result2});
                                }
                            });
                        }
                    });
                }
            });
        } else {
            var cruiseship = new Cruiseship();
            cruiseship.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruiselineinfo = new Cruiselineinfo();
                    cruiselineinfo.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            res.render('home', { title: '首页', layout:false,cruisecompany: result, cruiseship: result1, cruiselineinfo: result2});
                        }
                    });
                }
            });
        }
    });*/
            var myDate = new Date();
            var y = myDate.getFullYear(); 
            var m = (((myDate.getMonth()+1)+"").length==1)?"0"+(myDate.getMonth()+1):(myDate.getMonth()+1);
            var d = (((myDate.getDate())+"").length==1)?"0"+(myDate.getDate()):(myDate.getDate());
            var _today = y +"-"+ m +"-"+ d;
            var sql1 = "select * from product_list where status_id = 3 and start_date > '"+_today+"' and special = 1 order by start_date asc";
            var sql2 = "select * from product_list where status_id = 3 and start_date > '"+_today+"' and early_booking = 1 order by start_date asc";
            var sql3 = "select * from product_list where status_id = 3 and start_date > '"+_today+"' and cheap = 1 order by start_date asc";
            var sql4 = "select product_id,location from travel_schedule order by day_number asc";
            var sql5 = "select product_id,price as retail_price from product_position";
            var sql6 = "select * from product_list where status_id = 3 and start_date > '"+_today+"' and merchants = 1 order by start_date asc";
            mysql1.query(sql1, function (err, r1) {
                
                mysql1.query(sql2, function (err, r2) {
                    
                    mysql1.query(sql3, function (err, r3) {
                        
                        mysql1.query(sql4, function (err, r4) {
                           
                            mysql1.query(sql5, function (err, r5) {
                                mysql1.query(sql6, function (err, r6) {

                                mysql.query("select * from travel_notes where txtCategory1 = '邮轮游记'",function (err, rows) {
        if(err){console.log(err);return false;}
    mysql.query("select * from cruise_port where rtfPortImg != 'NULL' and txtisLine = '是'",function (err1, rows1) {
        if(err1){console.log(err1);return false;}
    mysql.query("select * from travel_notes where txtCategory1 = '邮轮视频'",function (err2, rows2) {
        if(err2){console.log(err2);return false;}
        res.render('home', { title: '首页', layout:false,r1:rows,port:rows1,sp:rows2,p1:r1,p2:r2,p3:r3,ts:r4,pj:r5,p4:r6});
    });
    });
    });
                                }); 

                            });    
                        });
                    });
                });
            });        

    
};

exports.mycurise = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('我的度假邮轮','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.locals.datstart = "";
    res.locals.txtcruiseday = "";
    res.locals.txtplace = "";
    res.locals.txtcurisecompany = "";
    res.locals.txtcurise = "";
    res.locals.txtport = "";

    var cruisecompany = new Cruisecompany();
    cruisecompany.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var cruiseship = new Cruiseship();
            cruiseship.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruiselineinfo = new Cruiselineinfo();
                    cruiselineinfo.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var med = new Med();
                            med.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    var port = new Port();
                                    port.get(function (result4) {
                                        if (result4[1] == "r") {
                                            console.log("get info error!");
                                        } else {
                                            res.render('mycurise', { layout:false,title: '我的度假邮轮', cruisecompany: result, cruiseship: result1, cruiselineinfo: result2,med:result3,port:result4});
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.destination = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮度假目的地','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var med = new Med();
    med.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var port = new Port();
            port.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruiselineinfo = new Cruiselineinfo();
                    cruiselineinfo.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var product = new Product();
                            product.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    var lineTimes = new Linetimes();
                                    lineTimes.get(function (result4) {
                                        if (result4[1] == "r") {
                                            console.log("get info error!");
                                        } else {
                                            res.render('destination', {layout:'layouts',title: '邮轮度假目的地', med: result, port: result1, lines: result2,product:result3,lines1:result4});
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.curiseship = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('产品信息页','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var id1 = req.session.pid;
    if(req.query.p){
        id1 =  req.query.p;
    }
    var id2 = "";
    if(req.query.q){
        id2 =  req.query.q;
    }
	if(id1){
    var cruiselineinfosearchbyKey = new CruiselineinfosearchbyKey(id1);
    cruiselineinfosearchbyKey.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var cruiselineroutesearch = new Cruiselineroutesearch(id1);
            cruiselineroutesearch.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cn = result[0].txtCompanyNo;
                    var cruisecompany = new Cruisecompany(cn);
                    cruisecompany.getbyid(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var shipcabin = new Shipcabin();
                            shipcabin.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    var shipservice = new Shipservice();
                                    shipservice.get(function (result4) {
                                        if (result4[1] == "r") {
                                            console.log("get info error!");
                                        } else {
                                            var port = new Port();
                                            port.get(function (result5) {
                                                if (result5[1] == "r") {
                                                    console.log("get info error!");
                                                } else {
                                                    var cruiselineinfo = new Cruiselineinfo();
                                                    cruiselineinfo.get(function (result6) {
                                                        if (result6[1] == "r") {
                                                            console.log("get info error!");
                                                        } else {
                                                            var cruiseship = new Cruiseship();
                                                            cruiseship.get(function (result7) {
                                                                if (result7[1] == "r") {
                                                                    console.log("get info error!");
                                                                } else {
                                                                    var product = new Product();
                                                                    product.get(function (result8) {
                                                                        if (result8[1] == "r") {
                                                                            console.log("get info error!");
                                                                        } else {
                                                                            var shipdinner = new Shipdinner();
                                                                            shipdinner.get(function (result9) {
                                                                                if (result9[1] == "r") {
                                                                                    console.log("get info error!");
                                                                                } else {
                                                                                    var product = new Product();
                                                                                    product.get(function (result10) {
                                                                                        if (result10[1] == "r") {
                                                                                            console.log("get info error!");
                                                                                        } else {
                                                                                            var linetimes = new Linetimes();
                                                                                            linetimes.get(function (result11) {
                                                                                                if (result11[1] == "r") {
                                                                                                    console.log("get info error!");
                                                                                                } else {
                                                                                                    var promotionalproduce = new PromotionalProduce(id1,id2);
                                                                                                    promotionalproduce.getByid(function (result12) {
                                                                                                        if (result12[1] == "r") {
                                                                                                            console.log("get info error!");
                                                                                                        } else {
                                                                                                            res.render('curiseship', { title: '邮轮航线', csk: result, crs: result1, cuc: result2, croom: result3, cent: result4,port:result5,lines:result6,ship:result7,product:result8,sd:result9,product:result10,lines1:result11,cx:result12});
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
	}else{
		res.redirect('/');
	}
};

exports.destination_sec_mid = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    req.session.pid = req.params.id;
    res.redirect('/destination_sec');
};

exports.curisecompany_sec_mid = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    req.session.pid = req.params.id;
    res.redirect('/curisecompany_sec');
};

exports.curiseship_mid = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    req.session.pid = req.params.id;
    res.redirect('/curiseship');
};

exports.destination_sp_mid = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    req.session.pid = req.params.id;
    res.redirect('/destinationsp_sec');
};

exports.curisecompany_sp_mid = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    req.session.pid = req.params.id;
    res.redirect('/curisecompanysp_sec');
};

exports.destination_port_mid = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    req.session.pid = req.params.id;
    res.redirect('/destinationport_sec');
};

exports.share_mid = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    req.session.pid = req.params.id;
    res.redirect('/share_sec');
};

exports.share_mid1 = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    req.session.pid = req.params.id;
    res.redirect('/theme1');
};

exports.curisecompany_ship_mid = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    req.session.pid = req.params.id;
    res.redirect('/curisecship_sec');
};

exports.destinationsp_sec = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮度假目的地的卖点','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var pathid = req.session.pid;
    var med = new Med();
    med.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var port = new Port();
            port.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruiselineinfo = new Cruiselineinfo();
                    cruiselineinfo.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var cruiseship = new Cruiseship();
                            cruiseship.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    var product = new Product();
                                    product.get(function (result4) {
                                        if (result4[1] == "r") {
                                            console.log("get info error!");
                                        } else {
                                            var linetimes = new Linetimes();
                                            linetimes.get(function (result5) {
                                                if (result5[1] == "r") {
                                                    console.log("get info error!");
                                                } else {
                                                    var travelnotes = new Travelnotes();
                                                    travelnotes.get(function (result6) {
                                                        if (result6[1] == "r") {
                                                            console.log("get info error!");
                                                        } else {
                                                            res.render('destinationsp_sec', {
                                                                title: '邮轮度假目的地卖点',
                                                                menu_path: pathid,
                                                                med: result, port: result1, lines: result2 ,cship:result3,product:result4,lines1:result5,r1:result6
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.curisecompanysp_sec = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮公司特色','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var pathid = req.session.pid;
    var cruisecompany = new Cruisecompany();
    cruisecompany.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var cruiseship = new Cruiseship();
            cruiseship.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruiselineinfo = new Cruiselineinfo();
                    cruiselineinfo.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var med = new Med();
                            med.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    var product = new Product();
                                    product.get(function (result4) {
                                        if (result4[1] == "r") {
                                            console.log("get info error!");
                                        } else {
                                            var travelnotes = new Travelnotes();
                                            travelnotes.get(function (result5) {
                                                if (result5[1] == "r") {
                                                    console.log("get info error!");
                                                } else {
                                                    var linetimes = new Linetimes();
                                                    linetimes.get(function (result6) {
                                                        if (result6[1] == "r") {
                                                            console.log("get info error!");
                                                        } else {
                                                            res.render('curisecompanysp_sec', {
                                                                title: '邮轮公司荟萃',
                                                                menu_path: pathid,
                                                                ccompany: result, cship: result1,lines: result2,med:result3,product:result4,r1:result5,lines1:result6
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.share_sec = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('游记文章','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var pathid = req.session.pid;
    var share = new Share();
    share.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var travelnotes = new Travelnotes();
            travelnotes.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    res.render('share_sec', {
                        title: '游记文章',
                        menu_path: pathid,
                        share: result, r1: result1
                    });
                }
            });
        }
    });
};

exports.theme1 = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('游记文章','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var pathid = req.session.pid;
    var share = new Share();
    share.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var travelnotes = new Travelnotes();
            travelnotes.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    res.render('theme1', {
                        title: '游记文章',
                        menu_path: pathid,
                        share: result, r1: result1
                    });
                }
            });
        }
    });
};

exports.theme_sec = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮度假主题','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var pathid = req.query.id;
    var theme = new Theme();
    theme.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var travelnotes = new Travelnotes();
            travelnotes.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    res.render('theme_sec', {title: '邮轮度假主题',menu_path: pathid, share: result,r1:result1});
                }
            });
        }
    });
};

exports.sharetheme_sec = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮生活分享','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var pathid = req.query.id;
    var share = new Share();
    share.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var travelnotes = new Travelnotes();
            travelnotes.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    res.render('sharetheme_sec', {
                        title: '游记文章',
                        menu_path: pathid,
                        share: result, r1: result1
                    });
                }
            });
        }
    });
};

exports.destinationport_sec = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮度假目的地港口','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var pathid = req.session.pid;
    var med = new Med();
    med.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var port = new Port();
            port.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruiselineinfo = new Cruiselineinfo();
                    cruiselineinfo.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var cruiseship = new Cruiseship();
                            cruiseship.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    var product = new Product();
                                    product.get(function (result4) {
                                        if (result4[1] == "r") {
                                            console.log("get info error!");
                                        } else {
                                            var linetimes = new Linetimes();
                                            linetimes.get(function (result5) {
                                                if (result5[1] == "r") {
                                                    console.log("get info error!");
                                                } else {
                                                    var travelnotes = new Travelnotes();
                                                    travelnotes.get(function (result6) {
                                                        if (result6[1] == "r") {
                                                            console.log("get info error!");
                                                        } else {
                                                            res.render('destinationport_sec', {
                                                                title: '邮轮度假目的港口',
                                                                menu_path: pathid,
                                                                med: result, port: result1, lines: result2 ,cship:result3,product:result4,lines1: result5,r1:result6
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.curisecship_sec = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮介绍','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var pathid = req.session.pid;
    var cruisecompany = new Cruisecompany();
    cruisecompany.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var cruiseship = new Cruiseship();
            cruiseship.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var shipcabin = new Shipcabin();
                    shipcabin.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var shipservice = new Shipservice();
                            shipservice.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    var cruiselineinfo = new Cruiselineinfo();
                                    cruiselineinfo.get(function (result4) {
                                        if (result4[1] == "r") {
                                            console.log("get info error!");
                                        } else {
                                            var shipdinner = new Shipdinner();
                                            shipdinner.get(function (result5) {
                                                if (result5[1] == "r") {
                                                    console.log("get info error!");
                                                } else {
                                                    var product = new Product();
                                                    product.get(function (result6) {
                                                        if (result6[1] == "r") {
                                                            console.log("get info error!");
                                                        } else {
                                                            var travelnotes = new Travelnotes();
                                                            travelnotes.get(function (result7) {
                                                                if (result7[1] == "r") {
                                                                    console.log("get info error!");
                                                                } else {
                                                                    var linetimes = new Linetimes();
                                                                    linetimes.get(function (result8) {
                                                                        if (result8[1] == "r") {
                                                                            console.log("get info error!");
                                                                        } else {
                                                                            res.render('curisecship_sec', {
                                                                                title: '邮轮公司荟萃',
                                                                                menu_path: pathid,
                                                                                ccompany: result, cship: result1,croom:result2,cent:result3,lines:result4,sd:result5,product:result6,r1:result7,lines1:result8
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.destination_sec = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮度假目的地','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var pathid = req.session.pid;
    var med = new Med();
    med.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var port = new Port();
            port.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruiselineinfo = new Cruiselineinfo();
                    cruiselineinfo.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var cruiseship = new Cruiseship();
                            cruiseship.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    var product = new Product();
                                    product.get(function (result4) {
                                        if (result4[1] == "r") {
                                            console.log("get info error!");
                                        } else {
                                            var linetimes = new Linetimes();
                                            linetimes.get(function (result5) {
                                                if (result5[1] == "r") {
                                                    console.log("get info error!");
                                                } else {
                                                    var travelnotes = new Travelnotes();
                                                    travelnotes.get(function (result6) {
                                                        if (result6[1] == "r") {
                                                            console.log("get info error!");
                                                        } else {
                                                            res.render('destination_sec', {
                                                                title: '邮轮度假目的地',
                                                                menu_path: pathid,
                                                                med: result, port: result1, lines: result2 ,cship:result3,product:result4,lines1:result5,r1:result6
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });

                }
            });
        }
    });
};

exports.curisecompany_sec = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮公司','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var pathid = req.session.pid;
    var cruisecompany = new Cruisecompany();
    cruisecompany.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var cruiseship = new Cruiseship();
            cruiseship.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruiselineinfo = new Cruiselineinfo();
                    cruiselineinfo.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var med = new Med();
                            med.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    var product = new Product();
                                    product.get(function (result4) {
                                        if (result4[1] == "r") {
                                            console.log("get info error!");
                                        } else {
                                            var travelnotes = new Travelnotes();
                                            travelnotes.get(function (result5) {
                                                if (result5[1] == "r") {
                                                    console.log("get info error!");
                                                } else {
                                                    var linetimes = new Linetimes();
                                                    linetimes.get(function (result6) {
                                                        if (result6[1] == "r") {
                                                            console.log("get info error!");
                                                        } else {
                                                            res.render('curisecompany_sec', {
                                                                title: '邮轮公司荟萃',
                                                                menu_path: pathid,
                                                                ccompany: result, cship: result1,lines: result2,med:result3,product:result4,r1:result5,lines1:result6
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.curisecompany = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮公司','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var cruisecompany = new Cruisecompany();
    cruisecompany.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var cruiseship = new Cruiseship();
            cruiseship.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruiselineinfo = new Cruiselineinfo();
                    cruiselineinfo.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var product = new Product();
                            product.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    var linetimes = new Linetimes();
                                    linetimes.get(function (result4) {
                                        if (result4[1] == "r") {
                                            console.log("get info error!");
                                        } else {
                                            res.render('curisecompany', {layout:'layouts',title: '邮轮公司荟萃', ccompany: result, cship: result1,lines: result2,product:result3,lines1:result4});
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.theme = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮度假主题','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var theme = new Theme();
    theme.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var travelnotes = new Travelnotes();
            travelnotes.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruiselineinfo = new Cruiselineinfo();
                    cruiselineinfo.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var med = new Med();
                            med.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {
                                    res.render('theme', {layout:'layouts',title: '邮轮度假主题', theme: result,r1:result1,r2:result2,med:result3});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.share = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮生活分享','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var share = new Share();
    share.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var travelnotes = new Travelnotes();
            travelnotes.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    res.render('share', {title: '邮轮生活分享', theme: result,r1:result1});
                }
            });
        }
    });
};

exports.sales = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮促销信息','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";

    req.session.error = null;
    var ptheme = new PromotionalTheme();
    ptheme.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            console.log(result);
            var pproduce = new PromotionalProduce();
            pproduce.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruiseship = new Cruiseship();
                    cruiseship.get(function (result2) {
                        if (result1[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var c1 = "游轮特价，邮轮特价，邮轮时代，CRUISETIME";
                            for(var i in result1){
                                c1 = c1 + ";" + result1[i].txtProduceName+";"+result1[i].txtDay+";RMB:"+result1[i].numPriceLast;
                            }
                            res.render('sales', {title: '邮轮促销信息', theme: result,produce:result1,mt1:'邮轮促销信息-邮轮时代 www.youlunshidai.com',mt2:c1,mt3:c1,ship:result2});
                        }
                    });
                }
            });
        }
    });
};

exports.sales_sec = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('邮轮促销信息','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var pathid = req.query.p;
    var pproduce = new PromotionalProduce(pathid);
    pproduce.getByid(function (result10) {
        if (result10[1] == "r") {
            console.log("get info error!");
        } else {
            res.render('sales_sec', { title: '邮轮促销信息',r10: result10});
        }
    });
};

exports.help = function (req, res) {
    mysql.query("insert into log(pagename,time,ip) values('帮助','"+getNow()+"','"+getClientIp(req)+"')",function (err, rows) {});
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var question = new Question();
    question.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            res.render('help', { title: '帮助',r: result});
        }
    });
};

exports.adv = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('adv', { title: '广告'});     
};

exports.advmerchants = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var myDate = new Date();
    var y = myDate.getFullYear(); 
    var m = (((myDate.getMonth()+1)+"").length==1)?"0"+(myDate.getMonth()+1):(myDate.getMonth()+1);
    var d = (((myDate.getDate())+"").length==1)?"0"+(myDate.getDate()):(myDate.getDate());
    var _today = y +"-"+ m +"-"+ d;

    var sql4 = "select product_id,location from travel_schedule order by day_number asc";
    var sql5 = "select product_id,price from product_position";
    var sql6 = "select * from product_list where merchants = 1 and start_date > '"+_today+"' order by start_date asc ";
    mysql1.query(sql4, function (err, r4) {
        mysql1.query(sql5, function (err, r5) {
            mysql1.query(sql6, function (err, r6) {
                res.render('advmerchants', { title: '招行特惠', ts:r4,pj:r5,p4:r6});
            });
        }); 
    });           
    //res.render('advmerchants', { title: '招行特惠'});     
};

exports.cbmpay = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var sql1 = "select * from CMB where BillNo = " + req.query.billno;
    mysql1.query(sql1, function (err, r) {
        res.render('cbmpay', {layout:false, title: '招行支付',r:r}); 
    });     
};

exports.advdetail1 = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('advdetail1', { title: '广告'});     
};

exports.advdetail2 = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('advdetail2', { title: '广告'});     
};

exports.advdetail3 = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('advdetail3', { title: '广告'});     
};

exports.advdetail4 = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('advdetail4', { title: '广告'});     
};

exports.post = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('post', {
        title: '用户发言'
    });
};

exports.login = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('login', {
        title: '用户登入'
    });
};

exports.logout = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    req.session.user = null;
    return res.redirect('/');
};

exports.regdo = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    //检验用户两次输入的口令是否一致
    if (req.body['password-repeat'] != req.body['password']) {
        req.session.error = "两次输入的口令不一致!";
        console.log("两次输入的口令不一致!");
        return res.redirect('/reg');
    }
    //var md5 = crypto.createHash('md5');
    //var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name: req.body.username,
        password: req.body.password,
    });
    newUser.save(function (err) {

        if (err == "error") {
            console.log("error!");
            return res.redirect('/reg');
        }
        //req.session.user = newUser;
        console.log("注册成功!");
        req.session.success = "用户注册成功!";
        res.redirect('/');
    });
};

exports.postdo = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    var post = new Post(req.session.user, req.body.post);
    post.save(function (err) {

        if (err == "error") {
            console.log("error!");
            return res.redirect('/');
        }
        //req.session.user = newUser;
        console.log("发布成功!");
        req.session.success = "发布成功!";
        res.redirect('/');
    });
};

exports.homedo = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";

    var input1 = req.body['input1'];
    var input2 = req.body['input2'];
    var input3 = req.body['input3'];
    var input4 = req.body['input4'];

    // 开启一个 SMTP 连接池
    var smtpTransport = nodemailer.createTransport("SMTP",{
        host: "smtp.126.com", // 主机
        secureConnection: false, // 使用 SSL
        port: 25, // SMTP 端口
        auth: {
            user: "youlunshidai@126.com", // 账号
            pass: "password123" // 密码
        }
    });

// 设置邮件内容
    var mailOptions = {
        from: "邮轮时代网上预定 <youlunshidai@126.com>", // 发件地址
        to: "booking@youlunshidai.com", // 收件列表
        subject: "Booking", // 标题
        html: "<b>姓名:</b> "+input1+"<br/><b>联系电话:</b>"+input2+"<br/><b>E-Mail:</b>"+input3+"<br/><b>咨询产品:</b>"+input4+"<br/>IP:"+getClientIp(req) // html 内容
    }

// 发送邮件
    /*
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close(); // 如果没用，关闭连接池
    });
    */
    res.redirect('/');
    /*
    req.session.datstart = req.body['datStart'];
    req.session.txtcruiseday = req.body['txtCruiseDay'];
    req.session.txtplace = req.body['txtPlace'];
    req.session.txtcurisecompany = req.body['txtCuriseCompany'];
    req.session.txtcurise = req.body['txtCurise'];
    req.session.txtport = "";
    res.redirect('/mycuriseresult');*/
};

exports.productbookingdo = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    
    var input1 = req.body['input1'];
    var input2 = req.body['input2'];
    var input3 = req.body['input3'];
    var input4 = req.body['input4'];
    var input5 = req.body['input5'];

    // 开启一个 SMTP 连接池
    var smtpTransport = nodemailer.createTransport("SMTP",{
        host: "smtp.126.com", // 主机
        secureConnection: false, // 使用 SSL
        port: 25, // SMTP 端口
        auth: {
            user: "youlunshidai@126.com", // 账号
            pass: "password123" // 密码
        }
    });

// 设置邮件内容
    var mailOptions = {
        from: "邮轮时代网上预定 <youlunshidai@126.com>", // 发件地址
        to: "booking@youlunshidai.com", // 收件列表
        subject: "Booking", // 标题
        html: "<b>姓名:</b> "+input1+"<br/><b>联系电话:</b>"+input2+"<br/>"+input5+"<br/><b>产品名称:</b>"+input3+"<br/><b>预订备注:</b>"+input4+"<br/>IP:"+getClientIp(req) // html 内容
    }

// 发送邮件
    /*
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close(); // 如果没用，关闭连接池
    });
    */
    res.redirect('/cds-agent/index.html');
    /*
    req.session.datstart = req.body['datStart'];
    req.session.txtcruiseday = req.body['txtCruiseDay'];
    req.session.txtplace = req.body['txtPlace'];
    req.session.txtcurisecompany = req.body['txtCuriseCompany'];
    req.session.txtcurise = req.body['txtCurise'];
    req.session.txtport = "";
    res.redirect('/mycuriseresult');*/
};

exports.helpdo = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    var input1 = req.body['input1'];
    var input2 = req.body['input2'];
    var input3 = req.body['input3'];
    var input4 = req.body['input4'];

    // 开启一个 SMTP 连接池
    var smtpTransport = nodemailer.createTransport("SMTP",{
        host: "smtp.126.com", // 主机
        secureConnection: false, // 使用 SSL
        port: 25, // SMTP 端口
        auth: {
            user: "youlunshidai@126.com", // 账号
            pass: "password123" // 密码
        }
    });

// 设置邮件内容
    var mailOptions = {
        from: "邮轮时代网上预定 <youlunshidai@126.com>", // 发件地址
        to: "booking@youlunshidai.com", // 收件列表
        subject: "Booking", // 标题
        html: "<b>姓名:</b> "+input1+"<br/><b>联系电话:</b>"+input2+"<br/><b>E-Mail:</b>"+input3+"<br/><b>内容:</b>"+input4+"<br/>IP:"+getClientIp(req) // html 内容
    }

// 发送邮件
    /*
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close(); // 如果没用，关闭连接池
    });
    */
    res.redirect('/help?p=a2');
};

exports.mycuriseresultdo = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    req.session.datstart = req.body['datStart'];
    req.session.txtcruiseday = req.body['txtCruiseDay'];
    req.session.txtplace = req.body['txtPlace'];
    req.session.txtcurisecompany = req.body['txtCuriseCompany'];
    req.session.txtcurise = req.body['txtCurise'];
    req.session.txtport = req.body['txtPort'];
    req.session.orderby1 = req.body['orderby1'];
    req.session.pse2 = req.body['pse2'];
    req.session.numStart = req.body['numStart'];

    res.redirect('loading?page=/mycuriseresult');
};

exports.destinationdo = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    req.session.datstart = "";
    req.session.txtcruiseday = "";
    req.session.txtplace = req.body['mdd'];
    req.session.txtcurisecompany = "";
    req.session.txtcurise = "";
    req.session.txtport = "";
    res.redirect('/mycuriseresult');
};

exports.destinationdo1 = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    req.session.datstart = "";
    req.session.txtcruiseday = "";
    req.session.txtplace = "";
    req.session.txtcurisecompany = req.body['mdd'];
    req.session.txtcurise = "";
    req.session.txtport = "";
    res.redirect('/mycuriseresult');
};

exports.destinationdo2 = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    req.session.datstart = "";
    req.session.txtcruiseday = "";
    req.session.txtplace = "";
    req.session.txtcurisecompany = req.body['mddc'];
    req.session.txtcurise = req.body['mdd'];
    req.session.txtport = "";
    res.redirect('/mycuriseresult');
};

exports.curiseshipdo = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    if(req.body['mdd']){
        req.session.datstart = "";
        req.session.txtcruiseday = "";
        req.session.txtplace = req.body['mdd'];
        req.session.txtcurisecompany = "";
        req.session.txtcurise = "";
        req.session.txtport = "";
        res.redirect('/mycuriseresult');
    }else{
        var input1 = req.body['input1'];
        var input2 = req.body['input2'];
        var input3 = req.body['input3'];
        var input4 = req.body['input4'];

        // 开启一个 SMTP 连接池
        var smtpTransport = nodemailer.createTransport("SMTP",{
            host: "smtp.126.com", // 主机
            secureConnection: false, // 使用 SSL
            port: 25, // SMTP 端口
            auth: {
                user: "youlunshidai@126.com", // 账号
                pass: "password123" // 密码
            }
        });

// 设置邮件内容
        var mailOptions = {
            from: "邮轮时代网上预定 <youlunshidai@126.com>", // 发件地址
            to: "booking@youlunshidai.com", // 收件列表
            subject: "Booking", // 标题
            html: "<b>姓名:</b> "+input1+"<br/><b>联系电话:</b>"+input2+"<br/><b>E-Mail:</b>"+input3+"<br/><b>内容:</b>"+input4+"<br/>IP:"+getClientIp(req)// html 内容
        }

// 发送邮件
/*
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }
            smtpTransport.close(); // 如果没用，关闭连接池
        });*/
        res.redirect(req.body['input5']);
    }

};

//后台管理端操作
exports.b_youji = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var travelnotes = new Travelnotes("","","","","","","");
    travelnotes.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            res.render('b_youji', {datasource:result,layout:"b_layout"});
        }
    });
};

exports.b_shipservice = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var shipservice = new Shipservice();
    shipservice.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            res.render('b_shipservice', {datasource:result,layout:"b_layout"});
        }
    });
};

exports.b_product = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var product = new Product();
    product.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            res.render('b_product', {datasource:result,layout:"b_layout"});
        }
    });
};

exports.b_youjido = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    var docid = req.body['docid'];
    var travelnotes = new Travelnotes(docid,"","","","","","");
    travelnotes.delete(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            res.redirect('/b_youji');
        }
    });
};

exports.b_productdo = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    var docid = req.body['docid'];
    var product = new Product(docid);
    product.delete(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            res.redirect('/b_product');
        }
    });
};


exports.b_newproduct = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var id = req.query.id;
    var product = new Product();
    product.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var currency = new Currency();
            currency.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    res.render('b_newproduct', {re3:result,layout:"b_layout",id:id,hb:result1});
                }
            });
        }
    });
}

exports.b_newyouji = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var med = new Med();
    var id = req.query.id;
    med.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var cruiseship = new Cruiseship();
            cruiseship.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                    var cruisecompany = new Cruisecompany();
                    cruisecompany.get(function (result2) {
                        if (result2[1] == "r") {
                            console.log("get info error!");
                        } else {
                            var travelnotes = new Travelnotes("","","","","","","");
                            travelnotes.get(function (result3) {
                                if (result3[1] == "r") {
                                    console.log("get info error!");
                                } else {

                                    var theme = new Theme();
                                    theme.get(function (result4) {
                                        if (result4[1] == "r") {
                                            console.log("get info error!");
                                        } else {
                                            res.render('b_newyouji', {layout:"b_layout",med:result,cruiseship:result1,cruisecompany:result2,id:id,re3:result3,theme:result4});
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

};

exports.b_newyoujido = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    var txtCategory1 = req.body['txtCategory1'];
    var txtCategory2 = req.body['txtCategory2'];
    var txtCategory3 = req.body['txtCategory3'];
    var rtfImg = req.body['rtfImg'];
    var txtText = req.body['editor01'];
    var txtTitle = req.body['txtTitle'];
    var stype =  req.body['stype'];
    var txtAbbr =  req.body['txtAbbr'];


    if(stype=="1"){
        var travelnotes = new Travelnotes("",txtCategory1,txtCategory2,txtCategory3,rtfImg,txtText,txtTitle,txtAbbr);
        travelnotes.save(function (err) {

            if (err == "error") {
                console.log("error!");
            }
            res.redirect('/b_youji');
        });
    }else{
        var travelnotes = new Travelnotes(req.body['docid'],txtCategory1,txtCategory2,txtCategory3,rtfImg,txtText,txtTitle,txtAbbr);
        travelnotes.update(function (err) {

            if (err == "error") {
                console.log("error!");
            }
            res.redirect('/b_youji');
        });
    }
};

exports.b_newproductdo = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    var txtCruiselineNo = req.body['txtCruiselineNo'];
    var txtSailingDate = req.body['txtSailingDate'];
    var currencyNo = req.body['currencyNo'];
    var numPrice1 = req.body['numPrice1'];
    var numPrice2 = req.body['numPrice2'];
    var numPrice3 = req.body['numPrice3'];
    var numPrice4 = req.body['numPrice4'];

    var numTax1 = req.body['numTax1'];
    var numTax2 = req.body['numTax2'];
    var numTax3 = req.body['numTax3'];
    var numTax4 = req.body['numTax4'];

    var numTip1 = req.body['numTip1'];
    var numTip2 = req.body['numTip2'];
    var numTip3 = req.body['numTip3'];
    var numTip4 = req.body['numTip4'];
    var rtfCruiselineJourneyImg = req.body['rtfCruiselineJourneyImg'];
    var stype =  req.body['stype'];

    if(stype=="1"){
        var product = new Product("",txtCruiselineNo, currencyNo,txtSailingDate,numPrice1,numPrice2,numPrice3,numPrice4,numTax1,numTax2,numTax3,numTax4,numTip1,numTip2,numTip3,numTip4,rtfCruiselineJourneyImg);
        product.save(function (err) {

            if (err == "error") {
                console.log("error!");
            }
            res.redirect('/b_product');
        });
    }else{
        var product = new Product(req.body['docid'],txtCruiselineNo, currencyNo,txtSailingDate, numPrice1,numPrice2,numPrice3,numPrice4,numTax1,numTax2,numTax3,numTax4,numTip1,numTip2,numTip3,numTip4,rtfCruiselineJourneyImg);
        product.update(function (err) {

            if (err == "error") {
                console.log("error!");
            }
            res.redirect('/b_product');
        });
    }
};

exports.getdata = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var travelnotes = new Travelnotes("","","","","","","");
    travelnotes.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            res.render('getdata', {datasource:result,layout:false,page:req.param("page"),rows:req.param("rows")});
        }
    });
};

exports.getdata4 = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var shipservice = new Shipservice();
    shipservice.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            res.render('getdata4', {datasource:result,layout:false,page:req.param("page"),rows:req.param("rows")});
        }
    });
};

exports.getdata19 = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var product = new Product();
    product.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            res.render('getdata19', {datasource:result,layout:false,page:req.param("page"),rows:req.param("rows")});
        }
    });
};

exports.getsearchdata = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var travelnotes = new Travelnotes(req.query.sid,"","","","","","");
    travelnotes.getbykey(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            res.render('getdata', {datasource:result,layout:false,page:req.param("page"),rows:req.param("rows")});
        }
    });
};

exports.getsearchdata19 = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    var product = new Product(req.query.sid);
    product.getbykey(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            res.render('getdata19', {datasource:result,layout:false,page:req.param("page"),rows:req.param("rows")});
        }
    });
};

//b2b操作
exports.useradmin = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.render('useradmin', {layout:"b_layout"});
};

exports.getprice = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    var cruiselineinfo = new Cruiselineinfo();
    cruiselineinfo.get(function (result) {
        if (result[1] == "r") {
            console.log("get info error!");
        } else {
            var product = new Product();
            product.get(function (result1) {
                if (result1[1] == "r") {
                    console.log("get info error!");
                } else {
                     for(var i in result){
                         var lineno = result[i].txtCruiselineNo;
                         var price = 999999;
                         for(var j in result1){
                              if(result1[j].txtCruiselineNo == lineno){
                                   if(result1[j].numPrice1 < price){
                                       price = result1[j].numPrice1;
                                   }
                              }
                         }

                     }
                }
            });
        }
    });
};

exports.filtertime = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
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
                        var deleteSQL = 'delete from travel_notes where txtCruiselineNo="'+result[i].txtCruiselineNo+'"';

                    }
                }else{
                    for(var j=0;j<tmp.length;j++){

                    }
                }
            }
        }
    });
};

exports.welcome = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    req.session.user = null;
    res.render('welcome', {layout:"b_layout",title: '欢迎'});
};

exports.logindo = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    var newUser = new User({
        name: req.body.username,
        password: req.body.password,
    });

    newUser.checkRole(function (err) {
        if (err == "error") {
            console.log("error!");
            return res.redirect('/welcome');
        }
        //req.session.user = newUser;
        if (err == "error1") {
            console.log("用户名或密码错误,请重新登录!");
            req.session.error = "用户名或密码错误,请重新登录!";
            return res.redirect('/welcome');
        }
        console.log("登录成功!");
        req.session.success = "用户登录成功!";
        req.session.user = newUser.name;
        res.redirect('/admin');
    });
}

exports.test = function (req, res) {
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
        res.render('test', {
            title: '主界面',
            layout:false
        });
};

/* GET home page. */
exports.index = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.success = req.session.success;
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    req.session.success = null;

    var post = new Post("", "");
    post.get(function (err) {
        //for (var i in err) {
        //console.log(err[i]);
        //}
        console.log(err[1]);
        if (err[1] == "r") {
            var post1 = new Post("", "");
            post1.get(function (err) {
                console.log(err[1]);
                res.render('index', { title: '首页', posts: err});
            });
        } else {
            res.render('index', { title: '首页', posts: err});
        }
        //res.locals.posts = err;

    });
};

exports.reg = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.render('reg', {
        title: '用户注册'
    });
};

exports.admin = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    if(req.session.user){
        res.render('admin', {
            title: '管理员主界面',
            layout:false
        });
    }else{
        res.render('cerror', {
            title: '错误',
            layout:false
        });
    }

};

exports.b_home = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    req.session.error = null;
    res.render('b_home', {layout:false});
};

exports.loading = function (req, res) {
    res.locals.user = req.session.user;
    res.locals.error = req.session.error;
    req.session.error = null;

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
	res.locals.mt1 ="";
    res.locals.mt2 ="";
    res.locals.mt3 ="";
    res.render('loading', {layout:false});
};
exports.productlist = function (req, res){
    console.log("index -> productlist");
    require('./service.js').getProductList(function(status, result){
        console.log(status);
        res.json(result);
    });
}

exports.wechat = function (req, res) {
    
    var echostr, nonce, signature, timestamp;
    signature = req.query.signature;
    timestamp = req.query.timestamp;
    nonce = req.query.nonce;
    echostr = req.query.echostr;
    if(check(timestamp,nonce,signature,"weixin")){
        return res.send(echostr);
    }else{
        return res.end();
    }
};

exports.wechatdo = function (req, res) {
    var _da;
    req.on("data",function(data){
        _da = data;

    });
    req.on("end",function(){
        processMessage(_da,res);
        console.log("end");
    });
};

/*!
 * 响应模版
 */
var tpl = ['<xml>',
    '<ToUserName><![CDATA[<%-toUsername%>]]></ToUserName>',
    '<FromUserName><![CDATA[<%-fromUsername%>]]></FromUserName>',
    '<CreateTime><%=createTime%></CreateTime>',
    '<MsgType><![CDATA[<%=msgType%>]]></MsgType>',
  '<% if (msgType === "news") { %>',
    '<ArticleCount><%=content.length%></ArticleCount>',
    '<Articles>',
    '<% content.forEach(function(item){ %>',
      '<item>',
        '<Title><![CDATA[<%-item.title%>]]></Title>',
        '<Description><![CDATA[<%-item.description%>]]></Description>',
        '<PicUrl><![CDATA[<%-item.picUrl || item.picurl || item.pic %>]]></PicUrl>',
        '<Url><![CDATA[<%-item.url%>]]></Url>',
      '</item>',
    '<% }); %>',
    '</Articles>',
  '<% } else if (msgType === "music") { %>',
    '<Music>',
      '<Title><![CDATA[<%-content.title%>]]></Title>',
      '<Description><![CDATA[<%-content.description%>]]></Description>',
      '<MusicUrl><![CDATA[<%-content.musicUrl || content.url %>]]></MusicUrl>',
      '<HQMusicUrl><![CDATA[<%-content.hqMusicUrl || content.hqUrl %>]]></HQMusicUrl>',
    '</Music>',
  '<% } else if (msgType === "voice") { %>',
    '<Voice>',
      '<MediaId><![CDATA[<%-content.mediaId%>]]></MediaId>',
    '</Voice>',
  '<% } else if (msgType === "image") { %>',
    '<Image>',
      '<MediaId><![CDATA[<%-content.mediaId%>]]></MediaId>',
    '</Image>',
  '<% } else if (msgType === "video") { %>',
    '<Video>',
      '<MediaId><![CDATA[<%-content.mediaId%>]]></MediaId>',
      '<Title><![CDATA[<%-content.title%>]]></Title>',
      '<Description><![CDATA[<%-content.description%>]]></Description>',
    '</Video>',
  '<% } else if (msgType === "transfer_customer_service") { %>',
    '<% if (content && content.kfAccount) { %>',
      '<TransInfo>',
        '<KfAccount><![CDATA[<%-content.kfAccount%>]]></KfAccount>',
      '</TransInfo>',
    '<% } %>',
  '<% } else { %>',
    '<Content><![CDATA[<%-content%>]]></Content>',
  '<% } %>',
  '</xml>'].join('');

/*!
 * 编译过后的模版
 */
var compiled = ejs.compile(tpl);

function check(timestamp, nonce, signature ,token) {
    var currSign, tmp;
    tmp = [token, timestamp, nonce].sort().join("");
    currSign = crypto.createHash("sha1").update(tmp).digest("hex");
    return currSign === signature;
};

function processMessage(data,response){
var ToUserName="";
var FromUserName="";
var CreateTime="";
var MsgType="";
var Content="";
var Location_X="";
var Location_Y="";
var Scale=1;
var Label="";
var PicUrl="";
var FuncFlag="";
 
var tempName="";
var parse=new xml.SaxParser(function(cb){
    cb.onStartElementNS(function(elem,attra,prefix,uri,namespaces){
        tempName=elem;
    });
     
    cb.onCharacters(function(chars){
        chars=chars.replace(/(^\s*)|(\s*$)/g, "");
        if(tempName=="CreateTime"){
            CreateTime=chars;
        }else if(tempName=="Location_X"){
            Location_X=cdata;
        }else if(tempName=="Location_Y"){
            Location_Y=cdata;
        }else if(tempName=="Scale"){
            Scale=cdata;
        }
         
         
    });
     
    cb.onCdata(function(cdata){
         
        if(tempName=="ToUserName"){
            ToUserName=cdata;
        }else if(tempName=="FromUserName"){
            FromUserName=cdata;
        }else if(tempName=="MsgType"){
            MsgType=cdata;
        }else if(tempName=="Content"){
            Content=cdata;
        }else if(tempName=="PicUrl"){
            PicUrl=cdata;
        }else if(tempName=="Label"){
            Label=cdata;
        }
        console.log(tempName+":"+cdata);
    });
     
    cb.onEndElementNS(function(elem,prefix,uri){
        tempName="";
    });
     
    cb.onEndDocument(function(){
        console.log("onEndDocument");
        tempName="";
        var date=new Date(); 
        var yy=date.getYear(); 
        var MM=date.getMonth() + 1; 
        var dd=date.getDay(); 
        var hh=date.getHours(); 
        var mm=date.getMinutes(); 
        var ss=date.getSeconds(); 
        var sss=date.getMilliseconds();  
        var result=Date.UTC(yy,MM,dd,hh,mm,ss,sss); 
        var msg="";
        if(MsgType=="text"){
            msg=""+Content;
        }else if (MsgType="location"){
            msg="你所在的位置: 经度："+Location_X+"纬度："+Location_Y;
        }else if (MsgType="image"){
            msg="你发的图片是："+PicUrl;
        }
        sendTextMessage(FromUserName,ToUserName,CreateTime,msg,FuncFlag,response);
        console.log(msg); 
    });
});
    parse.parseString(data);
}

function sendTextMessage(FromUserName,ToUserName,CreateTime,msg,FuncFlag,response){
    /*
    var message     =       ["<xml>\
    <ToUserName><![CDATA["+ToUserName+"]]></ToUserName>\
    <FromUserName><![CDATA["+FromUserName+"]]></FromUserName>\
    <CreateTime>"+CreateTime+"</CreateTime>\
                            <MsgType><![CDATA[text]]></MsgType>\
                            <Content><![CDATA["+msg+"]]></Content>\
                            </xml>"].join("");
    console.log(message);
    response.setHeader("Content-Type", "application/xml");                        
    response.send(message);
    
    var obj = {
        ToUserName:ToUserName,
        FromUserName:FromUserName,
        CreateTime:new Date().getTime(),
        MsgType:'text',
        Content:msg
    };
    var retMsg = new Message(obj);
    retMsg.send(response);*/
    var info = {};
    info.msgType = 'text';
    info.createTime = new Date().getTime();
    info.toUsername = ToUserName;
    info.fromUsername = FromUserName;
    info.content = msg;
    console.log(compiled(info));
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(compiled(info));
}