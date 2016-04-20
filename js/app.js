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

$(function(){
    updateEndTime();
});
//倒计时已结束时样式设置
function endtime(){
    var divid=$("#time");
    var divid1=divid.find("#1");
    var divdiv=divid.find(".timebg");
    var text=divid.find("#1").text();
    console.log(text)
        if(text=="已结束"){
            divid1.css({"width":"12%"});
            divdiv.css({"width":"42%","background-size":"contain"});
    }
}
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

}
function hoverbtnfun(){ //正方发表按钮
        var $btn=$("#hoverbtn");
        var $a="squarepost";
        var $formcss=$("#form").attr("class");

        if($formcss=="pf bottom left w whitebgc post cb oh squarepost"){
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
    var reg1=/\s/;//空白行
    var $text=$("textarea").val();
    if(reg1.test($text)||$text==""){
        $("#error").fadeIn("slow");
        setTimeout(function(){
            $("#error").fadeOut("slow");
        },3000);
    }else{
        $("#success").fadeIn("slow");
        setTimeout(function(){
            $("#success").fadeOut("slow");
        },3000);
    }


}
function textfocus(){//优化体验
        $("body").css("overflow","hidden");
}
function textblur(){//优化体验
    $("body").css("overflow","auto");
}
function toggleSO2(btn,attr,attrcon1,attrcon2,btn1,btn2,Sattrcon1,Oattrcon1,removeclick1,removeclick2){
    var $Svote=$(btn1);
    var $Ovote=$(btn2);
    var $img=$(btn);
    var $hidediv=$('.vote2');
    console.log(attrcon1);console.log(attrcon2);
    if($img.attr(attr)==attrcon1) {
        $img.attr(attr, attrcon2);
        $hidediv.fadeOut(1000);
    }
    if($Svote.attr(attr)==attrcon2){
        $Ovote.attr(attr,Oattrcon1);
    }
    if($Ovote.attr(attr)==attrcon2){
        $Svote.attr(attr,Sattrcon1);
    }
    $(removeclick1).attr("onclick","");
    $(removeclick2).attr("onclick","");


}
function toggleSO(btn,attr,attrcon1,attrcon2){

    var $form=$("#form");
    var $img=$(btn);
    var $text=$("textarea");
    var $btn=$("#hoverbtn");

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
