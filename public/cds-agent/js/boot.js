/**
 * Created by teng on 11.01.2015.
 */

$(function() {
    // disable ejs caching
    EJS.config({cache: false});

    loading('加载邮轮航线数据...');

    try{
        createSearchView();
    } catch (err) {
        showError('对不起，发生错误:'+err+'<br/>页面无法加载，请稍候再试或更换其它浏览器尝试打开页面');
        return false;
    }

    var thisYear = new Date().getFullYear();
    var html = new EJS({url: 'views/calendar/calendar.ejs'}).render({years:[thisYear, thisYear+1, thisYear+2]});
    
    var url = window.location.href;
    var tmp = url.split("?p=");
    if(tmp.length == 2){
        $('#calendar-view').css("display","none");
        $('#calendar-view').html(html);
        if($('#copyright-year')){
            $('#copyright-year').text(thisYear);
        }
        showProduct(tmp[1]);
    }else{
        $('#calendar-view').html(html);
        if($('#copyright-year')){
            $('#copyright-year').text(thisYear);
        }
    }
});