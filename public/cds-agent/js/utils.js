/**
 * Created by teng on 14.01.2015.
 */

//using this to solve the IE10 issue (IE10 does not send the ajax request to the same url again)
function ieAjaxWorkaround(){
    return "time='"+new Date().getTime() + "'";
}
/* delete all properties of the object */
function resetObject(obj){
    for(var k in obj) {
        //console.log("reset:"+k);
        if(!obj[k].constructor.toString().match(/^function Function\(/)) delete obj[k];
    }
}
function resetArray(arr) {
    arr.length = 0;
}
function getToday(){
    var today = {};
    var now = new Date();
    today.month = now.getMonth()+1;
    today.year = now.getFullYear();
    return today;
}
//check IE version
function _checkIE(){
    var browser=navigator.appName; 
    var b_version=navigator.appVersion; 
    var version=b_version.split(";"); 
    var trim_Version=version[1].replace(/[ ]/g,""); 
    if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") { 
        //alert("IE 6.0"); 
        _showNotAllow();
    } else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") { 
        //alert("IE 7.0"); window.location.href="http://xxxx.com";
        _showNotAllow();
    } else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0") { 
        //alert("IE 8.0"); 
        _showNotAllow();
    } else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") { 
        //alert("IE 9.0"); 
        _showNotAllow();
    }else{
        //your code goes here
        window.location='/cds';
    }
}

function _showNotAllow(){
    alert("对不起，您的浏览器不支持，请升级IE或改用其他浏览器访问！");
    window.location = "/cds-agent/ieupdate.html";
}