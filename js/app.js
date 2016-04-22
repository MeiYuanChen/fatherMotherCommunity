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

function hoverbtnfun2(btn,class1,class2){
    var $btn=$(btn);

        $btn.removeClass(class1)
            .addClass(class2);
        setTimeout(function(){
            $btn.removeClass(class2)
                .addClass(class1);
        },100);
    progressBarbtnChange(btn);
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
function hoverbtnfun(){ //正方发表按钮
        var $btn=$("#hoverbtn"),
            $a="squarepost",
            $formcss=$("#form").attr("class");

        if($formcss=="pf bottom left w whitebgc post cb oh squarepost mw700"){
            $a="squarepost";
            $btn.removeClass($a+"btnbg2")
                .addClass($a+"btnbg2");
        }else{
            $a="oppositionpost";

            $btn.removeClass($a+"btnbg2")
                .addClass($a+"btnbg2");
        }

        setTimeout(function(){
            $btn.removeClass($a+"btnbg2");
            $btn.addClass($a+"btnbg1");
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


}
function textfocus(){//优化体验
        $("body").css("overflow","hidden");
}
function textblur(){//优化体验
    $("body").css("overflow","auto");
}
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
function toggleSO(btn,attr,attrcon1,attrcon2){

    var $form=$("#form"),
        $img=$(btn),
        $text=$("textarea"),
        $btn=$("#hoverbtn");

        if($img.attr(attr)==attrcon1){
            $img.attr(attr,attrcon2)
                .addClass("togglebtnml");
            $text.attr("placeholder", "反方")
                .addClass("textml");
            $form.removeClass("squarepost")
                .addClass("oppositionpost");
            $btn.attr("class","button tdn dib");
        }else{
            $img.attr(attr,attrcon1)
                .removeClass("togglebtnml");
            $text.attr("placeholder", "正方")
                .removeClass("textml");
            $form.removeClass("oppositionpost")
                .addClass("squarepost");
            $btn.attr("class","button tdn dib");
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

