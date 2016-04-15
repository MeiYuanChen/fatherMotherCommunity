//响应式 改变html字体大小
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) {
                return;
            }
            else if(clientWidth>720)
            {
                docEl.style.fontSize = 45 + 'px';
            }
            else if(clientWidth<320 )
            {
                docEl.style.fontSize = 20 + 'px';
            }
            else if(clientWidth<720 || clientWidth>320)
            {
                docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})
(document, window);

var app=angular.module("myApp",[]);
app.controller('time',function($scope){
    $scope.time="2016/4/30 08:33:00";
    count_down();
    Timeend=$scope.time;
});
//倒计时
var Timeend;
function count_down() {
    //根据天，时，分，秒的ID找到相对应的元素
    var time_day = document.getElementById("times_day");
    if (!time_day) {
        return false;
    }
    var time_hour = document.getElementById("times_hour"),
        time_minute = document.getElementById("times_minute"),
        time_second = document.getElementById("times_second"),
        time_end = new Date(Timeend);
    time_end = time_end.getTime();
    var a = document.getElementsByClassName('zero');
    var time_now = new Date(); // 获取当前时间
    time_now = time_now.getTime();
    var time_distance = time_end - time_now; // 时间差：活动结束时间减去当前时间
    var int_day, int_hour, int_minute, int_second;

    if (time_distance >= 0) {
        // 相减的差数换算成天数
        int_day = Math.floor(time_distance / 86400000)
        time_distance -= int_day * 86400000;
        // 相减的差数换算成小时
        int_hour = Math.floor(time_distance / 3600000)
        time_distance -= int_hour * 3600000;
        // 相减的差数换算成分钟
        int_minute = Math.floor(time_distance / 60000)
        time_distance -= int_minute * 60000;
        // 相减的差数换算成秒数
        int_second = Math.floor(time_distance / 1000)

        var int_second0 = (int_second).toString().charAt(0);
        var int_second1 = (int_second).toString().charAt(1);
        a[3].innerText = int_second0;

        var int_minute0 = (int_minute).toString().charAt(0);
        var int_minute1 = (int_minute).toString().charAt(1);
        a[2].innerText = int_minute0;

        var int_hour0 = (int_hour).toString().charAt(0);
        var int_hour1 = (int_hour).toString().charAt(1);
        a[1].innerText = int_hour0;

        var int_day0 = (int_day).toString().charAt(0);
        var int_day1 = (int_day).toString().charAt(1);
        a[0].innerText = int_day0;

        // 判断小时小于10时，前面加0进行占位
        if (int_day < 10) {
            var b = (int_day + '0').toString().charAt(0);
            a[0].innerText = '0';
            time_day.innerHTML = b;
        }

        if (int_hour < 10) {
            var b = (int_hour + '0').toString().charAt(0);
            a[1].innerText = '0';
            time_hour.innerHTML = b;
        }

        if (int_minute < 10) {
            var b = (int_minute + '0').toString().charAt(0);
            a[2].innerText = '0';
            time_minute.innerHTML = b;
        }

        if (int_second < 10) {
            var b = (int_second + '0').toString().charAt(0);
            a[3].innerText = '0';
            time_second.innerHTML = b;
        }
        // 显示倒计时效果
        if (int_second >= 10) {
            time_second.innerHTML = int_second1;
        }
        if (int_minute >= 10) {
            time_minute.innerHTML = int_minute1;
        }
        if (int_hour >= 10) {
            time_hour.innerHTML = int_hour1;
        }
        if (int_day >= 10) {
            time_day.innerHTML = int_day1;
        }
        setTimeout("count_down()", 1000);


    } else {
        setTimeout("count_down()", 1000);
    }

}