var request = require('request');
/*
 http://api.jianfuaosi.com/prize/auction/history?prize_id=187469
 20:182933  50:186079  100:186080  mateBook:181341
 移动：100:188000 200:
 联通：100:187970 2000:185102
 电信：100:188020
 */
var opt, timer, quan = 0.35, r = 0;
var last = '10', c_b = 0, prize = 999, pr = 0, time_b = 0, time_t = 0;
var session = [
    '.eJxFkFGLglAQhf_KMs8FV71WBj2UWhTMlRZFrssSZTf1qhVmWxr991V3230YGIY5Z843D9gcCnGJYVwWV9GDTbKH8QPedjAGrNd3Zs0zx7fvXL6n6L9LLm2d5fOEuek9WKxp4K4kykhBN1UxXyvc5c1uIHGxioMFv3G51rjMcqwjHfNlFbh2U17NZEi4XFZc9QjKkAZWSrFmMVqRiqpXBfkqcRY2ZRbLmj5F6WnMCinzsZmtMsflOvODhOeoOT5O4NmD60UUXX5QRsqQEkrgZ5gcD6eWKoy3x6PIOsASxh-g7lQKn400LMS2FJsyycU_vpzeWUVujklurGp6eaqZdapxOunO7cVXEorXwzq_2VSZ6Qod9U1bU_uUmrP-1DSM_ty2CLHUgTEyh929VvQK2YNzti0PpyL_M_pNsPWNGp7tfiGi5FK2eOcWzxiMNEJ1Q4Hn8xsVZIrI.DGw_KQ.iaUhBKQnDDCfQWUKhaCkan7CtFg;'
];

var sign = 'l9OLvJ9mQ3xTr60jjjrucrht4enHgtgovlXzI4uqVa9N7bpJEu9hr2tkv07Ll1F9vpYHhpSuzkBtVkiTxWNon9K8pMiai2Wqk+3ARqtZMQ1CqHTX79FipKXuiteT+vSmciULwe4cQwFh/OnBKMaFrlf0SC9zEKrfe7wt5w6R0LY=';
var token = 'LOGIN_a019f964-2d80-4585-8325-df2c46bc64ec';

var periodId = '1512329';

process.argv = process.argv.splice(2);
var ID = process.argv[0] ? process.argv[0] : '186080';
var test = process.argv[1] ? process.argv[1] : 'real';
var user = process.argv[2] ? Number(process.argv[2]) : 0;

getOpt = function (f) {
    var url = '', sess;
    sess = session[user];
    if (sess == null) {
        console.log('no login');
    }
    var opt = {
        url: url,
        headers: {
            "env": "prod",
            "userid": "1635455217",
            "token": token,
            "mobileos": "ios",
            "mobileosversion": "9.1",
            "vid": "pza2md015e9pm1l710d7",
            "url": "8",
            "method": "get",
            "product_id": "9",
            "limit": "1",
            "offset": "0",
            "periods": "1512329",
            "period_id": "1512329",
            "Cookie": "Hm_lvt_cde840e5f94437dfa1178c5938ec4eb9=1503825761; Hm_lpvt_cde840e5f94437dfa1178c5938ec4eb9=1503826000",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
            "Connection": "Keep-Alive"

        },
        /*headers: {
         "package": "android1x",
         "app-version": "26",
         "platform": "android",
         "version": "1.2.6",
         "v": "1.2.6",
         "mac": "02:00:00:00:00:00",
         "sim": "true",
         "nettype": "wifi",
         "device-id": "862841033273347",
         "device-model": "M5 Note",
         "os-version": "6.0",
         "android-id": "e325069e831af45d",
         "s": "q6no",
         "cookie": "session=" + sess,
         "Connection": "Keep-Alive",
         "User-Agent": "ANDROIDAPP,PENGCHENG,e3b634f7-c9ba-4085-b502-0bad6e3abd42,6.0,23,Meizu M5 Note,1080x1920"
         }*/
    };
    if (f == 'sync') {
        // url='http://api.jianfuaosi.com/prize/sync/'+ID+'?n=52duobao_android&v=1.2.6&mac=02:00:00:00:00:00&sim=true&nettype=wifi&device_id=862841033273347&device_model=M5%2520Note&os_version=6.0&platform=android&series=android1x&app_version=26&android_id=e325069e831af45d&s=q6no&ns=q6no&app_language=zh&user_type=new&t='+Date.now()+'&sn='+Math.round(Math.random()*251658239 + 16777216).toString(16).toUpperCase();
        url = 'https://m.gogobids.com/api.php?env=prod&userid=1635455217&token=LOGIN_a019f964-2d80-4585-8325-df2c46bc64ec&mobileos=ios&mobileosversion=9.1&vid=pza2md015e9pm1l710d7&url=8&method=get&product_id=9&limit=1&offset=0&periods=1512329&period_id=1512329';
        opt['url'] = url;
    } else if (f == 'buy') {
        // url = 'http://api.jianfuaosi.com/buy/' + ID + '?n=52duobao_android&v=1.2.6&mac=02:00:00:00:00:00&sim=true&nettype=wifi&device_id=862841033273347&device_model=M5%2520Note&os_version=6.0&platform=android&series=android1x&app_version=26&android_id=e325069e831af45d&s=q6no&ns=q6no&app_language=zh&user_type=new&t=' + Date.now() + '&sn=' + Math.round(Math.random() * 251658239 + 16777216).toString(16).toUpperCase();
        url = 'http://gogobids.com/api/period/3/expended_proxy?period_id=' + periodId + "&sign=" + sign + "&os=android&mobiles=android&userid=1060997979&token=" + token + "&appid=1002&patchid=1&deviceid=865790021813936&version=13&mobileosversion=4.4.4";
        opt['url'] = url;
        // opt['formData'] = {
        //     "buytimes": "1"
        // };
    } else if (f == 'info') {
        url = 'http://gogobids.com/api/user/u/info?sign=' + sign + "&os=android&mobiles=android&userid=1060997979&token=" + token + "&appid=1002&patchid=1&deviceid=865790021813936&version=13&mobileosversion=4.4.4";
        opt['url'] = url;
    }
    return opt;
}
getPrize = function () {
    opt = getOpt('sync');
    // console.log(opt);
    request.post(opt, function (error, response, content) {
        // console.log(error);
        if (!error && (response.statusCode == 200)) {
            var v = '';
            if (content.charCodeAt(0) == 0xFEFF) {//rm bom
                content = content.slice(1);
            }
            // content = JSON.parse(content);

            console.log(response);
            console.log(content);

            /*//if(content['code']!='0'){console.log('end');process.exit();}
             /!****下一期****!/
             v = content['data']['latest_pid'];
             if (ID != v) {
             ID = v;
             c_b = 0;
             r = 0;
             console.log('turn:' + Math.round(Date.now() / 1000));
             return 1;
             }
             /!****总价格****!/
             prize = Number(content['data']['sell_price']);
             /!****当前价****!/
             pr = Number(content['data']['trans_price']);
             if ((pr + quan * (c_b + 0.25 * prize)) > prize) {//拍中也亏，不拍，并退出程序
             clearInterval(timer);
             console.log('sorry');
             process.exit();
             }
             if (pr < (0.05 * prize)) {
             r = 0;
             } else {
             r = 1;
             }//低于总价0.005%，不拍
             //if(c_b>pr){r=0;}else{r=1;}//拍次>当前价格，不拍
             /!****倒计时****!/
             v = content['data']['countdown'];
             if (v == '10') {
             if (last != '10') {
             console.log('last:' + last + '  u:' + user + '  r:' + r + '  p:' + pr);
             }
             }
             if (v == '1') {
             if (Math.round(Date.now() / 1000) - time_b > 5) {
             time_b = Math.round(Date.now() / 1000);
             if (r == 1) {
             if (test != 'test') {
             // request.post(getOpt('buy'));
             console.log((++c_b) + 'realBuy' + time_b);
             } else {
             console.log((++c_b) + 'testBuy' + time_b);
             }
             } else {
             console.log('not run');
             }
             }
             }
             if (v == '0') {
             console.log('wo');
             }
             last = v;*/
        } else {
            console.log(response);
        }
    });
}
start = function () {
    timer = setInterval(getPrize, 700);
    // setTimeout(function () {
    //     console.log(getOpt('info'));
    //     request.get(getOpt('info'), function (error, response, content) {
    //         console.log(response);
    //         console.log(content);
    //     });
    // }, 1000);
}
start();