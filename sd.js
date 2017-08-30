var request = require('request');

// console.log(process);

var productId = '222';
var myId = '168126725548';
var timeOut = '';

var url = 'http://bid.szmumi.com:8081';
var getApi = '/api/activity_bid/getProductsDetails?productId=' + productId;
var orderApi = '/api/order_bid/addOrder?amount=1&productId=' + productId;
var data = {
    'uniqueCode': 'ODY0NDEzMDMxMTEyNjU5X2EwMmE1YWNlLTk2NzUtNDBiYS1hY2EyLWM2NjBhMTQwYzAzZF8xNTA0MDIwNDcwMTMw',
    'X-Requested-With': 'XMLHttpRequest',
    'channelToken': '413851072E4044519F28572CDF787FEC',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; MI 5X Build/N2G47H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 Mobile Safari/537.36 Html5Plus/1.0',
    'Accept': 'application/json',
    'Content-Length': '13',
    'Connection': 'Keep-Alive',
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
            // console.log(content);

            var products = content.products,
                price = products.price,
                bidPrice = products.bidPrice,
                leftSeconds = products.leftSeconds,
                memberId = products.memberId;

            // console.log(memberId == myId);
            console.log("lastSeconds: " + leftSeconds + "  bidPrice: " + bidPrice + "  price: " + price);

            if(bidPrice == 0) {
                bidNum = 0;
            }

            if(leftSeconds == 1) {
                if(Math.round(Date.now() / 1000) - timeOut < 5) {
                    return false;
                }
                timeOut = Math.round(Date.now() / 1000);

                if(memberId == myId) {
                    // console.log("未到出价时间");
                    return false;
                }

                /*if(bidPrice * 100 < price * 5 || memberId == myId) {
                    console.log("未到出价时间");
                    return false;
                }*/

                /*if(bidNum + bidPrice > price) {
                    process.exit();
                    return false;
                }*/


                var opt = getOpt('order');
                request.post(opt, function (error, response, content) {
                    console.log(content);
                });

                console.log("bidNumber: " +  ++bidNum);

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