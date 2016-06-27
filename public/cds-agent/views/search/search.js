/**
 * Created by teng on 16.01.2015.
 */
var cruiseAreas;
var cruiseCompanies;
var cities;
var total=0;

function search() {
    hideSearch();
    loading('正在搜索中，请稍候');
    var type = $('#select-product-type').val();
    var minDays = $('#min-duration-days').val();
    var maxDays = $('#max-duration-days').val();
    var area = $('#select-cruise-area').val();
    var departure = $('#select-departure').val();
    var company = $('#select-cruise-company').val();
    var shipId = $('#select-ship').val();
    var params = {
        type:(type=='*'?'':type),
        minDurationDays:(minDays=='*'?'':minDays),
        maxDurationDays:(maxDays=='*'?'':maxDays),
        cruiseArea:(area=='*'?'':area),
        departureLocation:(departure=='*'?'':departure),
        cruiseCompanyId:(company=='*'?'':company),
        shipId:(shipId=='*'?'':shipId)
    };
    fetchProduct4Calendar(params, function(result){
        $('#product-total').text(result?result.length:0);
        updateProducts(result);
        showMonth12();
        hideLoading();
    });
}
function openSearch(){
    $('#open-search').hide();
    $('#search-box').slideDown();
}
function hideSearch(){
    $('#search-box').slideUp();
    $('#open-search').slideDown();
}
function createSearchView() {
    $.when(
        $.ajax({
            url: SERVICE_HOST + "/travellocation/getstartlocations?" + ieAjaxWorkaround(),
            type: 'get',
            success: function (res) {
                cities = res;
            },
            error: function (err) {
                showError('加载数据发生错误:'+err);
            }
        }),
        $.ajax({
            url: SERVICE_HOST + "/cruisearea/getAll?" + ieAjaxWorkaround(),
            type: 'get',
            success: function (res) {
                cruiseAreas = res;
            },
            error: function (err) {
                showError('加载数据发生错误:'+err);
            }
        }),
        $.ajax({
            url: SERVICE_HOST + "/ship/getcompanies?" + ieAjaxWorkaround(),
            type: 'get',
            success: function (res) {
                cruiseCompanies = res;
            },
            error: function (err) {
                showError('加载数据发生错误:'+err);
            }
        }),
        $.ajax({
            url: SERVICE_HOST + "/product/gettotal?" + ieAjaxWorkaround(),
            type: 'get',
            success: function (res) {
                total = res.total;
            },
            error: function (err) {
               showError('加载数据发生错误:'+err);
            }
        })
    ).done(function(){
            //create search view
            var searchView = new EJS({url: 'views/search/search.ejs'}).render({
                cities: cities,
                cruiseAreas: cruiseAreas,
                cruiseCompanies: cruiseCompanies,
                ships: _getShips('*'),
                total: total
            });
            $('#search-view').html(searchView);
            loadedOne();
        });
}
function onChangeType(){
    var type = $("#select-product-type").val();
    if ( type=='1') {
        _setDeparturePort();
    }else{
        _setDepartureCity();
    }
}
function onChangeArea(){
    if ( $("#select-product-type").val()!='1') {
        return false;
    }
    _setDeparturePort();
}
function onChangeCompany(){
    _setShips();
}
function isFilterArea(){
    return $("#select-cruise-area").val()!='*';
}
function isFilterDeparture(){
    return $("#select-departure").val()!='*';
}
function _setShips() {
    $('#select-ship').html('');
    $('#select-ship').append('<option value="*">所有邮轮</option>');
    var companyId = $('#select-cruise-company').val();
    var ships = _getShips(companyId);
    for (var j in ships) {
        $("#select-ship").append('<option value="' + ships[j].id + '">' + ships[j].name + '</option>');
    }
}
function _getShips(companyId){
    var ships=[];
    for( var i in cruiseCompanies ) {
        if(companyId == '*' || cruiseCompanies[i].company.id == companyId) {
            for( var j in cruiseCompanies[i].ships ){
                ships.push(cruiseCompanies[i].ships[j]);
            }
        }
    }
    return ships;
}
function _setDepartureCity(){
    $("#select-departure").html('');
    $("#select-departure").append('<option value="*">所有出发城市</option>');
    for ( var i in cities ) {
        $("#select-departure").append('<option value="'+cities[i].name+'">'+cities[i].name+'出发</option>');
    }
}
function _addPorts(){
    var area = $("#select-cruise-area").val();
    var url;
    if (area == "*") {
        url = SERVICE_HOST + "/cruisearea/getdepartureports?" + ieAjaxWorkaround();
    } else {
        url = SERVICE_HOST + "/cruisearea/getdepartureportsbyarea?area_id=" + area + "&" + ieAjaxWorkaround();
    }
    $.ajax({
        url: url,
        type: 'get',
        success: function (res) {
            for ( var i in res ) {
                var item = '<option value="' + res[i].name + '">' + res[i].name + '出发</option>';
                $("#select-departure").append(item);
            }
        },
        error: function (err) {
            showError('加载数据发生错误:'+err);
        }
    });
}
function _setDeparturePort(){
    $("#select-departure").html('');
    $("#select-departure").append('<option value="*">所有出发港口</option>');
    _addPorts();
}
