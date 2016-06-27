/**
 * Created by teng on 20.01.2015.
 */

function fetchProduct4Calendar(params, callback) {

    $.ajax({
        url: SERVICE_HOST+"/product/get4calendar?" + ieAjaxWorkaround(),
        type:'get',
        dataType: 'json',
        data: params,
        success: function(result) {
            return callback(result);
        },
        error: function(err) {
            console.log(err);
            //TODO dialog
        }
    });

}

function getProductDetail(productId, callback) {
    var _path = SERVICE_HOST+"/product/getdetail?productId=" + productId + '&' + ieAjaxWorkaround();
    //alert(productId);
    $.ajax({
        url: _path,
        type:'get',
        dataType: 'json',
        success: function(result) {
            getFees(productId, function(resultFees){
                result.product.fees = resultFees.fees;
                return callback(result);
            });
        },
        error: function(err) {
            console.log(err);
            //TODO dialog
        }
    });
}

function getFees(productId, callback) {
    var _path = SERVICE_HOST+"/product/getfees?productId=" + productId + '&' + ieAjaxWorkaround();
    $.ajax({
        url: _path,
        type:'get',
        dataType: 'json',
        success: function(result) {
            return callback(result);
        },
        error: function(err) {
            console.log(err);
            //TODO dialog
        }
    });
}

