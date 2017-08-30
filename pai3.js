var request = require('request');

var url = 'http://bid.szmumi.com:8081';
var getApi = '/api/activity_bid/getProductsDetails?productId=506';
var orderApi = '/api/order_bid/addOrder?amount=1&productId=506';
var data = {
    'uniqueCode': 'ODY2NDEyMDM0MzIyMDI0X2JmYmQ0OGJmLTE0MzAtNGRiNS04MDJlLWM2YTg3YTBlYzc3M18xNTAzODQ0NzA5MzQ5',
    'X-Requested-With': 'XMLHttpRequest',
    'channelToken': '63D5BDA9DA4949329B3B576667EE48AA',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; MI 5X Build/N2G47H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 Mobile Safari/537.36 Html5Plus/1.0',
    'Accept': 'application/json',
    'Content-Length': '13',
    'Connection': 'Keep-Alive',
    'productId': '506',
};

var opt = {
    'url': url + getApi,
    'headers': data
};

var getOpt = function (type) {
    if (type === 'get') {
        opt['url'] = url + getApi;
        opt['Content-Length'] = '13';
    } else if (type === 'order') {
        opt['url'] = url + orderApi;
        opt['Content-Length'] = '13';
    }

    return opt;
};

var bidNum = 0;

var getPrize = function () {
    var opt = getOpt('get');
    //console.log(opt);
    request.post(opt, function (error, response, content) {
        if (!error && (response.statusCode == 200)) {
            content = JSON.parse(content);
            //console.log(content);

            var products = content.products,
                price = products.price,
                bidPrice = products.bidPrice,
                leftSeconds = products.leftSeconds,
                memberId = products.memberId,
                myId = "";

            console.log("lastSeconds: " + leftSeconds + "  bidPrice: " + bidPrice + "  price: " + price);

            if(leftSeconds < 8) {
                if(price * 1 < bidPrice) {
                    console.log("未到出价时间");
                    return;
                }

                console.log("bidNumber: " +  bidNum++);
            }
        }
    });
};

var start = function () {
    var timer = setInterval(getPrize, 700);
    /*setTimeout(function () {
        var opt = getOpt('order');
        request.post(opt, function (error, response, content) {
            if (!error && (response.statusCode == 200)) {

            }
            console.log(content);
        });
    }, 3000);*/
};

start();