var TASK_TO_LOAD = 2;
var loaded = 0;
var currentProductId;

function showCalendar(){
    $('#calendar-link').hide();
    if ( currentProductId ){
        $('#calendar-ship-link').show();
    }
    hideProductView();
    $('#calendar-view').fadeIn();
}
function hideCalendar(){
    $('#tooltip2').hide();
    $('#calendar-ship-link').hide();
    $('#calendar-view').fadeOut();
    $('#search-hint').hide();
    $('#calendar-link').show();
    showProductView();
}
function showProductView(){
    hideSearchFilter();
    $('#product-view').fadeIn('fast');
}
function hideProductView(){
    $('#product-view').fadeOut();
    //if ( document.getElementById('month-12-view').style.display=='block')
        showSearchFilter();
}
function showSearchFilter(){
    $('#search-filter').show();
}
function hideSearchFilter(){
    $('#search-filter').hide();
}
function mask(msg){
    $('#mask-content').html(msg);
    $('#mask').show();
}
function unmask(){
    $('#mask').hide();
}
function setMaskMsg(msg){
    $('#mask-content').html(msg);
}
function appendMaskMsg(msg){
    $('#mask-content').append('<br/>' + msg);
}
function showError(msg){
    var html = new EJS({url: 'views/dialogs/popup.ejs'}).render({title:'错误', msg:msg, close:true});
    mask(html);
}
function hideError(){
    unmask();
    $('#mask').html('');
}
function loading(msg){
    //$('#mask-content').html(msg);
    new imageLoader(cImageSrc, 'startAnimation()');
    //$('#mask').show();
    mask(msg);
}
function hideLoading(){
    stopProcessAnimation();
    unmask();
}
function loadedOne(){
    loaded++;
    if( isLoaded() ) {
        hideLoading();
    }
}
function isLoaded(){
    return loaded == TASK_TO_LOAD;
}

