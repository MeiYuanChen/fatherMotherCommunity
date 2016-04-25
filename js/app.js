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
var CMY={};
CMY.hide=function(e,time){
    return $(e).fadeOut(time);
};

CMY.show=function(e,time){
    return $(e).fadeIn(time);
};

$(function(){
    updateEndTime();
    progressBar();
    shownum();
    backtrack();
});
var $sum;

//倒计时函数
function updateEndTime()
{
    var date = new Date();
    var time = date.getTime(); //当前时间距1970年1月1日之间的毫秒数


    $(".settime").each(function(i){


        var endDate =this.getAttribute("endTime"); //结束时间字符串
//转换为时间日期类型
        var endDate1 = eval('new Date(' + endDate.replace(/\d+(?=-[^-]+$)/, function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) +')');


        var endTime = endDate1.getTime(); //结束时间毫秒数


        var lag = (endTime - time) / 1000; //当前时间和结束时间之间的秒数
        if(lag > 0)
        {
            var second = Math.floor(lag % 60);
            var minite = Math.floor((lag / 60) % 60);
            var hour = Math.floor((lag / 3600) % 24);
            var day = Math.floor((lag / 3600) / 24);
            if(day<=9){
                day="0"+day;
            }
            if(hour<=9){
                hour="0"+hour;
            }
            if(second<=9){
                second="0"+second;
            }
            if(minite<=9){
                minite="0"+minite;
            }
            $(this).html('离结束时间：'+day+"天"+hour+"小时"+minite+"分"+second+"秒");
        }
        else{
            $(this).removeClass("settime");
            $(this).html("已结束");
        }
    });
    setTimeout("updateEndTime()",1000);
}

//进度条发光样式改变
function progressBarbtnChange(btn){
    var $left=$("#progressBarbtnL");
    var $right=$("#progressBarbtnR");
    if(btn=="#Svote2"||btn=="#Svote"){
        $left.animate({opacity:"1"},1);
        setTimeout(function(){
            $left.animate({opacity:"0"},500);
        },100);
    }else{
        $right.animate({opacity:"1"},1);
        setTimeout(function(){
            $right.animate({opacity:"0"},500);
        },100);
    }
}
function hoverbtnfun(btn){ //正方发表按钮
    var $btnlast=$(btn).find(".img:last");
        $btnlast.attr("style","display:none");
    setTimeout(function(){
        $btnlast.attr("style","display:block");
    },100);

}
function verification(){//验证文本框是否为空
    var reg1=/\s/,//空白行
        $text=$("textarea").val();

    if(reg1.test($text)||$text==""){

        CMY.show("#error","slow");
        setTimeout(function(){

            CMY.hide("#error","slow");
        },3000);
    }else{

        CMY.show("#success","slow");
        setTimeout(function(){

            CMY.hide("#success","slow");
        },3000);
    }
    $("textarea").blur();


}
//function textfocus(){//优化体验
//        $("body").css("overflow","hidden");
//}
//function textblur(){//优化体验
//    $("body").css("overflow","auto");
//}
function removeOnclick(removeclick1,removeclick2){
    $(removeclick1).attr("onclick","");
    $(removeclick2).attr("onclick","");
}

function toggleSO2(btn,add){
    var a;
    CMY.hide('.vote2',' slow');
    $(btn).find('.img:last-child').fadeOut(100);

    setTimeout(function(){
        a=$(btn).find('.img:last-child').attr("style");
        addfun(a,add,btn);
    },150);

}
//跑票按钮
//backtrack("#backtrack","#Ovote","#Svote","class","Svote vote","Svoted vote","Ovote vote","Ovoted vote","#Svotediv .add","#Ovotediv .add","#Svotediv .less","#Ovotediv .less");
function backtrack(){
    var $o=$("#Ovote");
    var $s=$("#Svote");
    var $Ostyle=$o.find('.img:last-child');
    var $Sstyle=$s.find('.img:last-child');
    $("#backtrack").click(function(){

        if($Ostyle.attr("style")=="display: none;"){
            $Ostyle.attr('style',"display: block;");
            $Sstyle.attr('style',"display: none;");
            progressBarbtnChange("#Svote");
            addfun($Sstyle.attr("style"),"#Svotediv .add","#Svote");
            lessfun($Ostyle.attr("style"),"#Ovotediv .less");
            addData('')
        }else {
            $Ostyle.attr('style',"display: none;");
            $Sstyle.attr('style',"display: block;");
            progressBarbtnChange("#Ovote");
            addfun($Ostyle.attr("style"),"#Ovotediv .add","#Ovote");
            lessfun($Sstyle.attr("style"),"#Svotediv .less");

        }

    });

}
//-1动画,只在我要跑票按钮用到
function lessfun(a,less){
    var $lessbtn=$(less);
    if(a=="display: block;"){
        $lessbtn.animate({top:".2rem",opacity:"1"},1);
        setTimeout(function(){
            $lessbtn.animate({opacity:"0",top:"1rem"},500);
        },2);
    }
}

//+1动画
function addfun(a,add,btn){
    var $addbtn=$(add);

    if(a=="display: none;"){
        $addbtn.animate({top:".2rem",opacity:"1"},1);
        setTimeout(function(){
            $addbtn.animate({opacity:"0",top:"1rem"},500);
        },2);
        addData(btn);
    }


}
function addData(btn){
    if(btn=="#Ovote"){
        shownum(0,1);
    }else{
        shownum(1,0);
    }
}
//angular数据接上之后可能删掉,用于显示info的数字
function shownum(Sadd,Oadd){
    var $Soddnum,$Ooddnum,
        $sdata=$("span[data-Soddnum]"),
        $sdataVal=$("[data-Soddnum]").attr("data-Soddnum"),
        $odata=$("span[data-Ooddnum]"),
        $odataVal=$("[data-Ooddnum]").attr("data-Ooddnum"),
        $odataDiv=$("#OprogressBar[data-Ooddnum]").attr("data-Ooddnum"),
        $sdataDiv=$("#SprogressBar[data-Soddnum]").attr("data-Soddnum");
    if(!Sadd){
        Sadd=0;
    }
    if(!Oadd){
        Oadd=0;
    }

    $sdataDiv=Number($sdataVal)+Number(Sadd);
    $Soddnum=$sdataDiv;
    $odataDiv=Number($odataVal)+Number(Oadd);
    $Ooddnum=$odataDiv;

    $sum=$Soddnum+$Ooddnum;//总投票人数

    $sdata.text($Soddnum);
    $odata.text($Ooddnum);
    var sss=100/($sum/$sdataDiv),
        ooo=100/($sum/$odataDiv);

}
function togglebtnSO(btn){
    var $hoverbtn=$("#hoverbtn").find("div:last"),$text=$("textarea"),$form=$("#form"),$btn=$(btn),$btnimg=$(btn).find("img:last");

    if($btnimg.attr("style")=="display:none"){
        $btnimg.attr("style","display:block");
        $btn.removeClass("togglebtnml");
        $form.removeClass("oppositionpost")
            .addClass("squarepost");
        $text.attr("placeholder", "正方")
            .removeClass("textml");
        $hoverbtn.attr('style','display:block');

    }else{
        $btnimg.attr("style","display:none");
            $btn.addClass("togglebtnml");;
        $form.removeClass("squarepost")
            .addClass("oppositionpost");
        $text.attr("placeholder", "反方")
                .addClass("textml");
        $hoverbtn.attr('style','display:none');
    }
}

function more(){
    $("#morebtn").addClass("morehover");
    setTimeout(function(){
        $("#morebtn").removeClass("morehover");
    },400);
}
//进度条长度
function progressBar(){

    var hundredPercent=100,//百分百
        unit='%',//单位

    //紫色进度条宽度 和 绿色进度条宽度
        $sbar=$("#SprogressBar"),
        $obar=$("#OprogressBar"),
    //正方投票人数(紫色进度条表示) 和 反方投票人数(绿色进度条表示)
        $Soddnumdata=$("[data-Soddnum]").attr("data-Soddnum"),
        $Ooddnumdata=$("[data-Ooddnum]").attr("data-Ooddnum"),
        $Soddnum=Number($Soddnumdata),
        $Ooddnum=Number($Ooddnumdata);
        $sum=$Soddnum+$Ooddnum;//总投票人数
    //计算出 紫色进度条宽度 和 绿色进度条宽度
    var $sbarWidth=100/($sum/$Soddnum),
        $obarWidth=100/($sum/$Ooddnum);
    //设置 紫色进度条宽度 和 绿色进度条宽度
    $sbar.css("width",$sbarWidth+unit);
    $obar.css("width",$obarWidth+unit);
    progressBarbtnPosition($sbarWidth);
}
//设置进度条中间的小按钮位置
function progressBarbtnPosition(leftWidth){
    var unit='%',//单位
        $btn=$("#progressBarbtn");
    $btn.css('left',leftWidth-17+unit);
}

var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
        };
    }(),
}
if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
    $(".tips .purplebg").css("width","94.5%");
    console.log('ios');
    var $formtext=$("#form .text");
    var $form=$("#form");
    $formtext.focus(function(){
        $form.removeClass("bottom")
            .addClass("top3205");
    });
    $formtext.blur(function(){
        $form.removeClass("top3205")
            .addClass("bottom");
    });
}
if (browser.versions.android) {
    console.log('安卓');
}