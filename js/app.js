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

//angular start
var app=angular.module("myApp",[]);
var iid=Heng.getIid();
    //获取话题信息
var all_api="/api/parentCommunity/getViewTopicPage?pageIndex=1&pageSize=100";
var all_url=Heng.options.base_url + all_api + "&Authorization=" + Heng.getToken();
app.controller('allTopic',function($scope,$http){
    $http.get(all_url).success(function(response){$scope.list=response.List;});

});
    //获取token
app.controller('gettingtoken',function($scope){
    $scope.lh="token=" + Heng.getToken();
});
    //html转义
app.filter("trustHtml",function($sce){
    return function (input){
        return $sce.trustAsHtml(input);
    }
});
    //获取微信用户信息
var weixin_userinfo_api = "/api/weixin/userInfo";
var url = Heng.options.base_url + weixin_userinfo_api + "?Authorization=" + Heng.getToken();// 请求微信用户信息地址
app.controller('weixin',function($scope,$http){

    $http.get(url).success(
        function(response) {
            $scope.weixin=response.Result;
        }
    );


});
    //当前话题信息
var topicInfo_api="/api/parentCommunity/getMyViewTopic?topicId="+iid;
var topicInfo_url=Heng.options.base_url + topicInfo_api + "&Authorization=" + Heng.getToken();
//获取评论
var startcommentpage= 1,endcommentpage=20;
var comment_api="/api/parentCommunity/getReplyPage?topicId="+iid+"&pageIndex="+startcommentpage+"&pageSize="+endcommentpage;
var comment_url=Heng.options.base_url + comment_api + "&Authorization=" + Heng.getToken();
app.controller('topicInfo',function($scope,$http){
    $http.get(topicInfo_url).success(function(response){$scope.result=response.Result;});
    $http.get(comment_url).success(function(response){
        $scope.list=response.List;
        $scope.count=response.Count;
        //加载更多
        if($scope.count>=20){
            angular.element("#morebtn").show();
        }else{
            angular.element("#morebtn").hide();
        }
    });
    //点击返回按钮时 更新列表数据
    $scope.back=function(){
        $http.get(all_url).success(function(response){$scope.list=response.List;});
    };
    //跑票
    $scope.updateRunTicket=function(RId){
        var updateRunTicket_api="/api/parentCommunity/updateRunTicket?topicId="+RId;
        var updateRunTicket_url=Heng.options.base_url + updateRunTicket_api + "&Authorization=" + Heng.getToken();
        $http.get(updateRunTicket_url).success(function(){
            console.log('跑票成功');
            $http.get(topicInfo_url).success(function(response){$scope.result=response.Result;});
        }).error(function(res){
            alert('跑票失败'+res);
        });
    };
    //投票
    $scope.updatePoll=function(RId,rk){

        var updatePoll_url=Heng.options.base_url+"/api/parentCommunity/updatePoll"+"?Authorization="+Heng.getToken();
        var updatePoll_add={
            "Id":0,
            "RelationId":RId,
            "AdderId":0,
            "RelationKind":rk//评论类型
        };
        $http({
            method:"POST",
            url:updatePoll_url,
            data:updatePoll_add,
            headers:{ 'Content-Type': 'application/json'}
        }).success(function(){

            console.log("ReplyKind:"+rk);
            if(rk==2){
                rk="反方";
            }else{
                rk="正方";
            }
            console.log("投票成功,你投给了"+rk);
            $http.get(topicInfo_url).success(function(response){$scope.result=response.Result;});
        }).error(function(res){
            alert("更新失败"+res);
        });
    };
    //发表评论
    $scope.sub=function(RId,content,name,header,rk){
        var Stext=angular.element("#textarea .Stext");
        var Otext=angular.element("#textarea .Otext");

        if(!content){
            return false;
        }
        if(rk==1){
            if(Stext.val()==""){
                return false;
            }
        }
        if(rk==2){
            if(Otext.val()==""){
                return false;
            }
        }
        var postcomment_url=Heng.options.base_url+"/api/parentCommunity/updateReply"+"?Authorization="+Heng.getToken();
        var postcomment_add={
            "Id":0,
            "RelationId":RId,
            "Content":content,
            "AdderId":0,
            "NickName": name,//添加者
            "UserLogo":header,//添加者头像
            "ReplyKind":rk//评论类型
        };
        $http({
            method:"POST",
            url:postcomment_url,
            data:postcomment_add,
            headers:{ 'Content-Type': 'application/json'}
        }).success(function(){
            console.log("发布评论成功");
            Stext.val("");
            Otext.val("");
            $http.get(comment_url).success(function(response){$scope.list=response.List;$scope.count=response.Count;});

        }).error(function(res){
            Stext.val("");
            Otext.val("");
            alert('更新失败'+res);
        });
    };

    //加载更多

    $scope.readMore=function(){

        endcommentpage=endcommentpage+20;
        comment_api="/api/parentCommunity/getReplyPage?topicId="+iid+"&pageIndex="+startcommentpage+"&pageSize="+endcommentpage;
        comment_url=Heng.options.base_url + comment_api + "&Authorization=" + Heng.getToken();
        setTimeout(function(){
            $http.get(comment_url).success(function(response){
                $scope.list=response.List;$scope.count=response.Count;
                var hided=$scope.count-endcommentpage;
                if(hided<0){
                    angular.element("#morebtn").hide();
                }else{
                    angular.element("#morebtn").show();
                }
            });
        },100);

    };

});


//angular end


var CMY={};
CMY.hide=function(e,time){
    return $(e).fadeOut(time);
};

CMY.show=function(e,time){
    return $(e).fadeIn(time);
};

$(function(){
    WXConfig('5693024816932578630');
    backtrack();
    setTimeout(function(){
        updateEndTime();
        progressBar();
        hidePoll();
    },500);
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

        progressBar();
    },100);


}
function verification(text){//验证文本框是否为空
    var reg1=/\s/;//空白行
    var $text=$(text).val();
    if(reg1.test($text)|| $text==""){

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

function removeOnclick(removeclick1,removeclick2){
    $(removeclick1).removeAttr("onclick");
    $(removeclick2).removeAttr("onclick");
    $(removeclick1).attr("ng-click",'');
    $(removeclick2).attr("ng-click",'');
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
    var $sdataVal,$odataVal;
    setTimeout(function(){
         $sdataVal=$("span[data-Soddnum]").attr("data-Soddnum");
         $odataVal=$("span[data-Ooddnum]").attr("data-Ooddnum");
    },100);

    $("#backtrack").click(function(){

        if($Ostyle.attr("style")=="display: none;"){
            $Ostyle.attr('style',"display: block;");
            $Sstyle.attr('style',"display: none;");
            progressBarbtnChange("#Svote");
            addfun($Sstyle.attr("style"),"#Svotediv .add","#Svote");
            lessfun($Ostyle.attr("style"),"#Ovotediv .less");

        }else {
            $Ostyle.attr('style',"display: none;");
            $Sstyle.attr('style',"display: block;");
            progressBarbtnChange("#Ovote");
            addfun($Ostyle.attr("style"),"#Ovotediv .add","#Ovote");
            lessfun($Sstyle.attr("style"),"#Svotediv .less");


        }
        setTimeout(function(){
            progressBar();
        },100);

    });

}
//-1动画,只在我要跑票按钮用到
function lessfun(a,less){
    var $lessbtn=$(less);
    if(a=="display: block;"){
        $lessbtn.animate({top:".2rem",opacity:"1"},2);
        setTimeout(function(){
            $lessbtn.animate({opacity:"0",top:"1rem"},1000);
        },50);
    }
}

//+1动画
function addfun(a,add,btn){
    var $addbtn=$(add);

    if(a=="display: none;"){
        $addbtn.animate({top:".2rem",opacity:"1"},2);
        setTimeout(function(){
            $addbtn.animate({opacity:"0",top:"1rem"},1000);
        },50);
        //addData(btn);
    }


}
function addData(btn){
    if(btn=="#Ovote"){
        shownum(0,1);
    }else{
        shownum(1,0);
    }
}
//显示info的数字
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
    var $hoverbtn=$("#hoverbtn").find("div:last"),$text=$("#textarea"),$form=$("#form"),$btn=$(btn),$btnimg=$(btn).find("img:last");

    if($btnimg.attr("style")=="display:none"){
        $btnimg.attr("style","display:block");


        $form.removeClass("oppositionpost")
            .addClass("squarepost");
        $text.find(".Stext").css("display","block");
        $hoverbtn.attr('style','display:block');

    }else{

        $btnimg.attr("style","display:none");
        $text.find(".Stext").css("display","none");
        $form.removeClass("squarepost")
            .addClass("oppositionpost");
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
    $btn.css('left',leftWidth-20+unit);
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
    //var $formtext=$("#form .text");
    //var $form=$("#form");
    //$formtext.focus(function(){
    //    $form.removeClass("bottom")
    //        .addClass("top3205");
    //});
    //$formtext.blur(function(){
    //    $form.removeClass("top3205")
    //        .addClass("bottom");
    //});
    var $Otext=$("#textarea .Otext");
    var $Stext=$("#textarea .Stext");
    var $main=$("#main");
    $main.on("click",function(){
        $Otext.blur();
        $Stext.blur();
    });
}
if (browser.versions.android) {
    console.log('安卓');
}
//如果活动时间已结束,停止投票
function hidePoll(){
    console.log($("#time .w76").text());
    if($("#time .w76").text()=="已结束"){

        $('#Svotediv').hide();
        $('#SvotedivEnd').show();
        $('#Ovotediv').hide();
        $('#OvotedivEnd').show();
    }
}

//微信分享
var title = '爸妈生活链';
var description = '爸妈生活链';
var logo = 'http://site.jxt189.com/nledu/images/HGshare.jpg';

var sharedLink = 'http://dwz.cn/3dfWEc';


wx.ready(function () {
    var wechatShareUri = {
        title: title,
        desc: description,
        link: sharedLink,
        imgUrl: logo
    };
    var momentsShareUri = {
        title: title,
        desc: description,
        link: sharedLink,
        imgUrl: logo
    };
    wx.onMenuShareAppMessage(wechatShareUri);
    wx.onMenuShareTimeline(momentsShareUri);
    HideMenuItems();
});

