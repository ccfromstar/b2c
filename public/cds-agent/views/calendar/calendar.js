/**
 * Created by teng on 19.01.2015.
 */
var MONTH_MAX_ITEM = 5;//max. visible items each month
var CRUISE_AREAS_BG = {default:'bg-img', '加勒比海':'bg-img-caribbean', '地中海':'bg-img-mediterran', '日韩':'bg-img-jk', '日本':'bg-img-jk', '韩国':'bg-img-kr', '澳洲新西兰':'bg-img-auz', '东南亚':'bg-img-sa'};
var cal;//calendario object for the first displayed month
var cal2;//calendario object for the second displayed month
var $month;
var $year;
var $month2;
var $year2;
var calDataStore = {};//data store shared by the two calendario objects
var month12 = [];
var currentArea = {key:'default'};

var productList = [];

function initMonth12() {
    // 12 months calendar
    var today = getToday();
    for( var i = 0; i < 12; i++ ){
        month12[i] = {year:today.year, month:(today.month+i)};
        if ( today.month + i > 12 ){
            month12[i].year = today.year+1;
            month12[i].month = (today.month+i)%12;
        }
    }
}

function setCalendarMonthData() {

    resetObject(calDataStore);
    for(var i in month12) {
        if (month12[i].dataStore) {
            resetArray(month12[i].dataStore);
        }
    }

    for (var i in productList) {

        var startDate = productList[i].startDate;

        if(!calDataStore[startDate]){
            calDataStore[startDate]=[];
        }
        calDataStore[startDate].push(productList[i]);

        var date = startDate.split('-');
        var y = date[0];
        var m = parseInt(date[1]);

        for( var k in month12 ) {
            if( month12[k].year == y && month12[k].month == m ){

                var itemFound=false;
                if(!month12[k].dataStore) {
                    month12[k].dataStore = [];
                }
                for ( var d in month12[k].dataStore ){
                    if ( month12[k].dataStore[d].cruiseArea == productList[i].cruiseArea ){
                        if( month12[k].dataStore[d].price > productList[i].price ) {
                            month12[k].dataStore[d].price = productList[i].price;
                        }
                        itemFound = true;
                        break;
                    }
                }
                if ( !itemFound ){
                    month12[k].dataStore.push({cruiseArea:productList[i].cruiseArea, price:productList[i].price});
                }

                break;
            }
        }
    }
}

function showMonth12(){
    $('#tooltip2').hide();
    $('#calendar-nav').hide();
    $('#month-12-view-link').hide();
    $('#month-twin-view').hide();
    changeArea('default');
    showCalendar();
    showSearchFilter();
    $('#month-12-view').show('fast');
}
function showMonthTwin(year, month){
    $("#selected-year").val(year);
    $("#selected-month").val(month);
    year = parseInt(year);
    month = parseInt(month);
    cal.goto(month-1, year);
    if( month == 12 ) {
        year++;
        month=0;
    }
    cal2.goto(month, year, updateMonthYear);
    $('#month-12-view').hide('fast');
    //hideSearchFilter();
    $('#calendar-nav').show('fast');
    $('#month-twin-view').show('fast');
    $('#month-12-view-link').show('fast');
}

function _getDayContent(dayData){
    if( dayData ) {
        var countVisible = 0;
        var countInvisible = 0;
        var content = '';
        var txt;
        var showArea = !isFilterArea();
        var showDeparture = !isFilterDeparture();
        for (var k in dayData) {
            if ( currentArea.key != 'default' && currentArea.key != dayData[k].cruiseArea){
                continue;
            }

            if ( showArea && showDeparture ){
                txt = '【' + dayData[k].cruiseArea + '航线】' + dayData[k].startLocation + '出发';
            } else if ( showDeparture ) {
                txt = dayData[k].startLocation + '出发';
            } else if ( showArea ) {
                txt = '【' + dayData[k].cruiseArea + '航线】';
            } else {
                txt = '';
            }

            txt = '<span class="day-content" onclick="showProduct(' + dayData[k].id + ')">' + txt + dayData[k].price + '￥起</span>';
            if (countVisible < 3) {
                content += txt;
                countVisible++;
            } else {
                content += '<span class="product-hidden">'+txt+'</span>';
                countInvisible++;
            }
        }
        if ( countInvisible > 0 ) {
            content += '<span class="day-more">更多...</span>';
        }
        return '<div style="font-size:12px">' + content + '</div>';
    }
    return '';
}
function _createMonth12View(){
    var month12View = new EJS({url:'views/calendar/month12view.ejs'}).render({months:month12, MONTH_MAX_ITEM:MONTH_MAX_ITEM});
    $('#month-12-view').html(month12View);
}
function createCalendar(){

    _createMonth12View();

    // calendario
    cal = $('#calendar').calendario({
        onDayClick: function ($el, $contentEl, dateProperties) {
        },
        onMouseoverDay: function (event, cellWidth, dataKey) {
            showDayTooltip(event, cellWidth, calDataStore[dataKey]);
        },
        getDayContent: function (dayKey, dayData) {
            return _getDayContent(dayKey, dayData);
        },
        caldata: calDataStore
    });
    $month = $('#custom-month').html(cal.getMonthName());
    $year = $('#custom-year').html(cal.getYear()+'年');
    $('#selected-month').val(cal.getMonth());
    $('#selected-year').val(cal.getYear());

    var year2 = cal.getYear();
    var month2 = cal.getMonth() + 1;
    if (month2 > 12) {
        month2 = 1;
        year2 = year2 + 1;
    }
    cal2 = $('#calendar2').calendario({
        year: year2,
        month: month2,
        onDayClick: function ($el, $contentEl, dateProperties) {},
        onMouseoverDay: function (event, cellWidth, dataKey) {
            showDayTooltip(event, cellWidth, calDataStore[dataKey]);
        },
        getDayContent: function (dayKey, dayData) {
            return _getDayContent(dayKey, dayData);
        },
        caldata: calDataStore
    });
    $month2 = $('#custom-month2').html(cal2.getMonthName());
    $year2 = $('#custom-year2').html(cal2.getYear()+'年');

    $('#custom-next').on('click', function () {
        cal.gotoNextMonth();
        cal2.gotoNextMonth(updateMonthYear);
    });
    $('#custom-prev').on('click', function () {
        var today = new Date();
        if( (cal.getYear()*10+cal.getMonth()) ==(today.getFullYear()*10+today.getMonth()+1)){
            return false;
        }
        cal.gotoPreviousMonth();
        cal2.gotoPreviousMonth(updateMonthYear);
    });
}
function updateMonthYear() {
    $month.html(cal.getMonthName());
    $year.html(cal.getYear()+'&nbsp;年');
    $month2.html(cal2.getMonthName());
    $year2.html(cal2.getYear()+'&nbsp;年');
    $("#selected-year").val(cal.getYear());
    $("#selected-month").val(cal.getMonth());
}

function selectCalendar() {
    var y = parseInt($("#selected-year").val());
    var m = parseInt($("#selected-month").val());
    cal.goto(m-1, y);
    if( m == 12 ) {
        y++;
        m=0;
    }
    cal2.goto(m, y, updateMonthYear);
}

function showDayTooltip(e, cellWidth, products){

    if(products){
        //tooltip needed only for narrow cell
        if ( cellWidth > 350){
            return false;
        }

        var productsOfArea;
        if ( currentArea.key != 'default' ) {
            productsOfArea = [];
            for (var i in products) {
                if ( products[i].cruiseArea == currentArea.key ){
                    productsOfArea.push(products[i]);
                }
            }
        } else {
            productsOfArea = products;
        }

        if ( productsOfArea.length == 0 ) {
            return false;
        }

        var x = e.clientX + $(window).scrollLeft();
        var y = e.clientY + $(window).scrollTop();
        var tooltipHtml = new EJS({url: 'views/calendar/day_tooltip.ejs'}).render({products:productsOfArea});

        $("#tooltip").html(tooltipHtml);
        $('#tooltip-body').css({'height':(productsOfArea.length*40)+'px'});
        $("#tooltip2").css({
            "top": y + "px",
            "left": x + "px",
            "position": 'absolute'
        }).show("fast");
    }else{
        $("#tooltip2").hide();
    }
}
function hideDayTooltip(){
    $("#tooltip2").hide();
}
function showMonthTooltip(e, year, month, dataStoreIdx) {

    var x = e.clientX + $(window).scrollLeft();
    var y = e.clientY + $(window).scrollTop();
    var tooltipDataStore = [];

    for( var i = MONTH_MAX_ITEM; i < month12[dataStoreIdx].dataStore.length; i++ ){
        tooltipDataStore.push(month12[dataStoreIdx].dataStore[i]);
    }
    var tooltipHtml = new EJS({url: 'views/calendar/month_tooltip.ejs'}).render({dataStore: tooltipDataStore, year:year, month:month});

    $("#tooltip").html(tooltipHtml);
    $('#tooltip-body').css({'height': (month12[dataStoreIdx].length * 40) + 'px'});
    $("#tooltip2").css({
        "top": y + "px",
        "left": x + "px",
        "position": 'absolute'
    }).show("fast");

}

function updateProducts(result){
    resetArray(productList);
    productList = result;
    setCalendarMonthData();
    _createMonth12View();
    cal.setData(calDataStore);
    cal2.setData(calDataStore);
}
/* change current cruise area */
function changeArea(cruiseArea){
    if ( !CRUISE_AREAS_BG[cruiseArea] ) {
        currentArea.elem = $('#' + CRUISE_AREAS_BG['default']);
        if ( !currentArea.elem.is(':visible') ) {
            currentArea.elem.show();
        }
        currentArea.key = cruiseArea;
        return false;
    }
    if ( currentArea.key != cruiseArea ) {
        if ( !currentArea.elem ) {
            currentArea.elem = $('#' + CRUISE_AREAS_BG[currentArea.key]);
        }
        currentArea.elem.hide();

        currentArea.key = cruiseArea;
        currentArea.elem = $('#'+CRUISE_AREAS_BG[cruiseArea]);
        currentArea.elem.show();
    }
}

$(function() {
    var u = $('#agent-id');
    var params = {user_id : (u?u.val():null)}
    initMonth12();
    fetchProduct4Calendar(params, function(result){
        productList = result;
        setCalendarMonthData();
        createCalendar();
        loadedOne();
    });
});