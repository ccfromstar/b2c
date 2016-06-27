/**
 * Created by teng on 13.01.2015.
 */

var productDetail;//data fetched from service api server
var imgShip = [];
var imgCabin = [];
var imgCulinary = [];
var imgEntertain = [];
var imgSlideIdx = 0;
var SLIDE_MAX = 6;
var slider = 0;
var currentTab = 1;

function showShipImg(idx, slide){

    if ( !slide ) clearInterval(slider);

    for(var i = 0; i < SLIDE_MAX; i++){
        if(!$('#ship-img'+i))continue;
        if ( !slide ){
            $('#ship-img'+i).hide();
        } else {
            $('#ship-img'+i).fadeOut();
        }
    }
    if (!slide) {
        $('#ship-img'+idx).show();
    }else {
        $('#ship-img'+idx).fadeIn(3000);
    }
}
function _startSlider(){
    imgSlideIdx = 0;
    slider = setInterval(function(){
        ++imgSlideIdx;
        showShipImg(imgSlideIdx%SLIDE_MAX, true);
        if ( imgSlideIdx == SLIDE_MAX)clearInterval(slider);
    }, 3000);
}
function _createViews() {
    var productView = new EJS({url: 'views/product/product.ejs'}).render({product:productDetail.product, imgShip:imgShip, imgCulinary:imgCulinary, imgEntertain:imgEntertain});
    $("#product-view").html(productView);
    if(imgShip.length>1) _startSlider();
    var ratingView = new EJS({url: 'views/product/ship_rating.ejs'}).render({shipRating:productDetail.product.shipRating});
    $("#ship-rating-view").html(ratingView);
    var travelScheduleView = new EJS({url: 'views/product/travel_schedule.ejs'}).render({travelSchedule:productDetail.travelSchedule,product:productDetail.product});
    $("#travel-schedule-view").html(travelScheduleView);
    var generalInfoView = new EJS({url: 'views/product/general_info.ejs'}).render({cabins:productDetail.cabins,product:productDetail.product});
    $("#general-info-view").html(generalInfoView);
    //var cabinPricesView = new EJS({url: 'views/product/cabin_prices.ejs'}).render({cabins:productDetail.cabins,product:productDetail.product});
    //$("#cabin-prices-view").html(cabinPricesView);
    var entertainView = new EJS({url: 'views/product/entertainment.ejs'}).render({entertainment:productDetail.entertainment});
    $("#entertainment-view").html(entertainView);
    var culinaryView = new EJS({url: 'views/product/culinary.ejs'}).render({culinary:productDetail.culinary});
    $("#culinary-view").html(culinaryView);
    //船信息
    var _path = SERVICE_HOST+"/product/getShipInfo?shipId=" + productDetail.product.ship_id + '&' + ieAjaxWorkaround();
    //alert(productId);
    $.ajax({
        url: _path,
        type:'get',
        dataType: 'json',
        success: function(result) {
            var shipView = new EJS({url: 'views/product/ship.ejs'}).render({cship:result});
            $("#ship-view").html(shipView);
        },
        error: function(err) {
            console.log(err);
            //TODO dialog
        }
    });
}
function _createBookingView(){
    if ( $("#booking-view").html() )return;
    var bookingView = new EJS({url: 'views/product/booking.ejs'}).render({cabins:productDetail.cabins});
    $("#booking-view").html(bookingView);
}

function _resetViews(){
    productDetail = {};
    imgShip = [];
    imgCabin = [];
    imgCulinary = [];
    imgEntertain = [];
    $("#product-view").html('');
}

function showProduct(pId) {
    //window.open('/cds-agent/index.html?p='+pId);
    
    if ( pId == currentProductId ){
        hideCalendar();
        hideSearch();
        showProductView();
        return false;
    }
    _resetViews();
    loading('加载邮轮数据，请稍候');
    getProductDetail(pId, function(result) {
        productDetail = result;
        if ( productDetail.images && productDetail.images.length > 0 ) {
            for (var i in productDetail.images) {
                if (productDetail.images[i].type == 'ship') {
                    imgShip.push(productDetail.images[i].url);
                }
                if (productDetail.images[i].type == 'culinary') {
                    imgCulinary.push(productDetail.images[i].url);
                }
                if (productDetail.images[i].type == 'entertainment') {
                    imgEntertain.push(productDetail.images[i].url);
                }
            }
            for (var i in productDetail.prices) {
                for (var j in productDetail.prices[i].cabins) {
                    for (var k in productDetail.prices[i].cabins[j]) {
                        imgCabin.push(productDetail.prices[i].cabins[j].imageUrl);
                    }
                }
            }
        } else {
            imgShip[0] = "images/styles/no_ship_img.png";
        }

        hideCalendar();
        hideSearch();
        _createViews();
        currentProductId = pId;
        hideLoading();
        //console.log("success: " + res);
    });
}

function changeTab(tabId){
    currentTab = tabId;
    clearInterval(slider);
    for(var i = 1; i < 7; i++ ) {//hide other tabs
        if( i == tabId ) continue;
        $("#tabl"+i).attr("class","tb2");
        if($("#tab"+i)) $("#tab"+i).css("display","none");
    }
    //if ( tabId == 2 ) {
    //    _createBookingView();
    //}

    $("#tabl"+tabId).attr("class","tb1");
    if ( tabId == 1 ) {
        $('#product-title').show();
        $('#key-feature').show();
        $('#visa-comment').show();
        $('.cabin-prices').hide();
        $('.pure-button').show();
        $('.hide-detail').hide();
        $('#booking-summary').hide();
    } else if ( tabId == 2 ) {//booking
        showPrices();
        $('#booking-summary').show();
        tabId = 1;
        $('#product-title').hide();
        $('#key-feature').hide();
        $('#visa-comment').hide();
    }
    $("#tab"+tabId).css("display","inline");
}

var booking = {};
function _getPos(cabinIdx, categoryIdx){
    var cat = productDetail.cabins[cabinIdx].categories[categoryIdx];
    var posId = cat.posId;
    if ( !booking[posId] ){
        booking[posId] = {};
        booking[posId].kids = 0;
        booking[posId].adult = 0;
        booking[posId].category = cat;
        booking[posId].cabinIdx = cabinIdx;
        booking[posId].total = 0;
    }
    return booking[posId];
}
function _setPosTotal(pos){
    var adultPrice;
    if ( parseInt(pos.category.price2) > 0 && pos.adult > 2 ){
        adultPrice = pos.category.price*2 + pos.category.price2*(pos.adult-2);
    } else {
        adultPrice = pos.category.price*pos.adult;
    }
    booking[pos.category.posId].total = (adultPrice+pos.category.priceChild*pos.kids);
    $('#total'+pos.category.posId).text('￥'+booking[pos.category.posId].total);
}
function _updateSummary(){
    var totalPrice = 0;
    var totalCabins = 0;
    var totalAdults = 0;
    var totalKids = 0;
    for(var i in booking){
        totalPrice += booking[i].total;
        totalCabins++;
        totalAdults+=booking[i].adult;
        totalKids += booking[i].kids;
    }
    $('#summary-price-total').text('￥'+totalPrice);
    $('#summary-total-cabins').text(totalCabins+'间');
    $('#summary-total-adults').text(totalAdults+'人');
    $('#summary-total-kids').text(totalKids+'人');
}
function addAdult(cabinIdx, categoryIdx){
    var pos = _getPos(cabinIdx, categoryIdx);
    if ( parseInt(pos.kids)+parseInt(pos.adult) == parseInt(pos.category.checkInMax)) return false;
    pos.adult++;
    $('#a'+pos.category.posId).text(pos.adult);
    _setPosTotal(pos);
    _updateSummary();
}
function addKids(cabinIdx, categoryIdx){
    var pos = _getPos(cabinIdx, categoryIdx);
    if ( parseInt(pos.kids)+parseInt(pos.adult) == parseInt(pos.category.checkInMax)) return false;
    pos.kids++;
    $('#k'+pos.category.posId).text(pos.kids);
    _setPosTotal(pos);
    _updateSummary();
}
function minusAdult(cabinIdx, categoryIdx){
    var pos = _getPos(cabinIdx, categoryIdx);
    if ( parseInt(pos.adult) == 0 ) return false;
    pos.adult--;
    $('#a'+pos.category.posId).text(pos.adult);
    _setPosTotal(pos);
    _updateSummary();
}
function minusKids(cabinIdx, categoryIdx){
    var pos = _getPos(cabinIdx, categoryIdx);
    if ( parseInt(pos.kids) == 0 ) return false;
    pos.kids--;
    $('#k'+pos.category.posId).text(pos.kids);
    _setPosTotal(pos);
    _updateSummary();
}
function showPrices(){
    for(var i in booking){
        if ( booking[i].kids > 0 || booking[i].adult > 0 ){
            $('#prices'+booking[i].cabinIdx).show();
            $('#show-detail'+booking[i].cabinIdx).hide();
            $('#hide-detail'+booking[i].cabinIdx).show();
        }
    }
}
function onClickBooking(cabinIdx){
    if ( currentTab == 2 ){
        $('#prices'+cabinIdx).show();
        $('#show-detail'+cabinIdx).hide();
        $('#hide-detail'+cabinIdx).show();
    } else {
        changeTab(2);
        $('#prices'+cabinIdx).show();
        $('#show-detail'+cabinIdx).hide();
        $('#hide-detail'+cabinIdx).show();
    }
}
function submitYDC(){
    if($("input[name='input1']").val()==""){
        alert('姓名不能为空！');return false;
    }
    if($("input[name='input2']").val()==""){
        alert('联系电话不能为空！');return false;
    }
    if($("input[name='input3']").val()==""){
        alert('产品名称不能为空！');return false;
    }
    if($("textarea[name='input4']").val()==""){
        alert('预订备注不能为空！');return false;
    }
    $("#input5").val($("#div5").html());
    //return false;
    alert('信息递交成功，我们会尽快与您联系！');
    document.all.pbname1.submit();
}
