!function (a, b) { "function" == typeof define && (define.amd || define.cmd) ? define(function () { return b(a) }) : b(a, !0) }(this, function (a, b) { function c(b, c, d) { a.WeixinJSBridge ? WeixinJSBridge.invoke(b, e(c), function (a) { g(b, a, d) }) : j(b, d) } function d(b, c, d) { a.WeixinJSBridge ? WeixinJSBridge.on(b, function (a) { d && d.trigger && d.trigger(a), g(b, a, c) }) : d ? j(b, d) : j(b, c) } function e(a) { return a = a || {}, a.appId = z.appId, a.verifyAppId = z.appId, a.verifySignType = "sha1", a.verifyTimestamp = z.timestamp + "", a.verifyNonceStr = z.nonceStr, a.verifySignature = z.signature, a } function f(a) { return { timeStamp: a.timestamp + "", nonceStr: a.nonceStr, "package": a.package, paySign: a.paySign, signType: a.signType || "SHA1" } } function g(a, b, c) { var d, e, f; switch (delete b.err_code, delete b.err_desc, delete b.err_detail, d = b.errMsg, d || (d = b.err_msg, delete b.err_msg, d = h(a, d), b.errMsg = d), c = c || {}, c._complete && (c._complete(b), delete c._complete), d = b.errMsg || "", z.debug && !c.isInnerInvoke && alert(JSON.stringify(b)), e = d.indexOf(":"), f = d.substring(e + 1)) { case "ok": c.success && c.success(b); break; case "cancel": c.cancel && c.cancel(b); break; default: c.fail && c.fail(b) } c.complete && c.complete(b) } function h(a, b) { var e, f, c = a, d = p[c]; return d && (c = d), e = "ok", b && (f = b.indexOf(":"), e = b.substring(f + 1), "confirm" == e && (e = "ok"), "failed" == e && (e = "fail"), -1 != e.indexOf("failed_") && (e = e.substring(7)), -1 != e.indexOf("fail_") && (e = e.substring(5)), e = e.replace(/_/g, " "), e = e.toLowerCase(), ("access denied" == e || "no permission to execute" == e) && (e = "permission denied"), "config" == c && "function not exist" == e && (e = "ok"), "" == e && (e = "fail")), b = c + ":" + e } function i(a) { var b, c, d, e; if (a) { for (b = 0, c = a.length; c > b; ++b) d = a[b], e = o[d], e && (a[b] = e); return a } } function j(a, b) { if (!(!z.debug || b && b.isInnerInvoke)) { var c = p[a]; c && (a = c), b && b._complete && delete b._complete, console.log('"' + a + '",', b || "") } } function k() { if (!("6.0.2" > w || y.systemType < 0)) { var b = new Image; y.appId = z.appId, y.initTime = x.initEndTime - x.initStartTime, y.preVerifyTime = x.preVerifyEndTime - x.preVerifyStartTime, C.getNetworkType({ isInnerInvoke: !0, success: function (a) { y.networkType = a.networkType; var c = "https://open.weixin.qq.com/sdk/report?v=" + y.version + "&o=" + y.isPreVerifyOk + "&s=" + y.systemType + "&c=" + y.clientVersion + "&a=" + y.appId + "&n=" + y.networkType + "&i=" + y.initTime + "&p=" + y.preVerifyTime + "&u=" + y.url; b.src = c } }) } } function l() { return (new Date).getTime() } function m(b) { t && (a.WeixinJSBridge ? b() : q.addEventListener && q.addEventListener("WeixinJSBridgeReady", b, !1)) } function n() { C.invoke || (C.invoke = function (b, c, d) { a.WeixinJSBridge && WeixinJSBridge.invoke(b, e(c), d) }, C.on = function (b, c) { a.WeixinJSBridge && WeixinJSBridge.on(b, c) }) } var o, p, q, r, s, t, u, v, w, x, y, z, A, B, C; if (!a.jWeixin) return o = { config: "preVerifyJSAPI", onMenuShareTimeline: "menu:share:timeline", onMenuShareAppMessage: "menu:share:appmessage", onMenuShareQQ: "menu:share:qq", onMenuShareWeibo: "menu:share:weiboApp", onMenuShareQZone: "menu:share:QZone", previewImage: "imagePreview", getLocation: "geoLocation", openProductSpecificView: "openProductViewWithPid", addCard: "batchAddCard", openCard: "batchViewCard", chooseWXPay: "getBrandWCPayRequest", startSearchBeacons: "startMonitoringBeacons", stopSearchBeacons: "stopMonitoringBeacons", onSearchBeacons: "onBeaconsInRange" }, p = function () { var b, a = {}; for (b in o) a[o[b]] = b; return a }(), q = a.document, r = q.title, s = navigator.userAgent.toLowerCase(), t = -1 != s.indexOf("micromessenger"), u = -1 != s.indexOf("android"), v = -1 != s.indexOf("iphone") || -1 != s.indexOf("ipad"), w = function () { var a = s.match(/micromessenger\/(\d+\.\d+\.\d+)/) || s.match(/micromessenger\/(\d+\.\d+)/); return a ? a[1] : "" }(), x = { initStartTime: l(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0 }, y = { version: 1, appId: "", initTime: 0, preVerifyTime: 0, networkType: "", isPreVerifyOk: 1, systemType: v ? 1 : u ? 2 : -1, clientVersion: w, url: encodeURIComponent(location.href) }, z = {}, A = { _completes: [] }, B = { state: 0, res: {} }, m(function () { x.initEndTime = l() }), C = { config: function (a) { z = a, j("config", a); var b = z.check === !1 ? !1 : !0; m(function () { var a, d, e; if (b) c(o.config, { verifyJsApiList: i(z.jsApiList) }, function () { A._complete = function (a) { x.preVerifyEndTime = l(), B.state = 1, B.res = a }, A.success = function () { y.isPreVerifyOk = 0 }, A.fail = function (a) { A._fail ? A._fail(a) : B.state = -1 }; var a = A._completes; return a.push(function () { z.debug || k() }), A.complete = function () { for (var c = 0, d = a.length; d > c; ++c) a[c](); A._completes = [] }, A }()), x.preVerifyStartTime = l(); else { for (B.state = 1, a = A._completes, d = 0, e = a.length; e > d; ++d) a[d](); A._completes = [] } }), z.beta && n() }, ready: function (a) { 0 != B.state ? a() : (A._completes.push(a), !t && z.debug && a()) }, error: function (a) { "6.0.2" > w || (-1 == B.state ? a(B.res) : A._fail = a) }, checkJsApi: function (a) { var b = function (a) { var c, d, b = a.checkResult; for (c in b) d = p[c], d && (b[d] = b[c], delete b[c]); return a }; c("checkJsApi", { jsApiList: i(a.jsApiList) }, function () { return a._complete = function (a) { if (u) { var c = a.checkResult; c && (a.checkResult = JSON.parse(c)) } a = b(a) }, a }()) }, onMenuShareTimeline: function (a) { d(o.onMenuShareTimeline, { complete: function () { c("shareTimeline", { title: a.title || r, desc: a.title || r, img_url: a.imgUrl || "", link: a.link || location.href, type: a.type || "link", data_url: a.dataUrl || "" }, a) } }, a) }, onMenuShareAppMessage: function (a) { d(o.onMenuShareAppMessage, { complete: function () { c("sendAppMessage", { title: a.title || r, desc: a.desc || "", link: a.link || location.href, img_url: a.imgUrl || "", type: a.type || "link", data_url: a.dataUrl || "" }, a) } }, a) }, onMenuShareQQ: function (a) { d(o.onMenuShareQQ, { complete: function () { c("shareQQ", { title: a.title || r, desc: a.desc || "", img_url: a.imgUrl || "", link: a.link || location.href }, a) } }, a) }, onMenuShareWeibo: function (a) { d(o.onMenuShareWeibo, { complete: function () { c("shareWeiboApp", { title: a.title || r, desc: a.desc || "", img_url: a.imgUrl || "", link: a.link || location.href }, a) } }, a) }, onMenuShareQZone: function (a) { d(o.onMenuShareQZone, { complete: function () { c("shareQZone", { title: a.title || r, desc: a.desc || "", img_url: a.imgUrl || "", link: a.link || location.href }, a) } }, a) }, startRecord: function (a) { c("startRecord", {}, a) }, stopRecord: function (a) { c("stopRecord", {}, a) }, onVoiceRecordEnd: function (a) { d("onVoiceRecordEnd", a) }, playVoice: function (a) { c("playVoice", { localId: a.localId }, a) }, pauseVoice: function (a) { c("pauseVoice", { localId: a.localId }, a) }, stopVoice: function (a) { c("stopVoice", { localId: a.localId }, a) }, onVoicePlayEnd: function (a) { d("onVoicePlayEnd", a) }, uploadVoice: function (a) { c("uploadVoice", { localId: a.localId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1 }, a) }, downloadVoice: function (a) { c("downloadVoice", { serverId: a.serverId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1 }, a) }, translateVoice: function (a) { c("translateVoice", { localId: a.localId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1 }, a) }, chooseImage: function (a) { c("chooseImage", { scene: "1|2", count: a.count || 9, sizeType: a.sizeType || ["original", "compressed"], sourceType: a.sourceType || ["album", "camera"] }, function () { return a._complete = function (a) { if (u) { var b = a.localIds; b && (a.localIds = JSON.parse(b)) } }, a }()) }, previewImage: function (a) { c(o.previewImage, { current: a.current, urls: a.urls }, a) }, uploadImage: function (a) { c("uploadImage", { localId: a.localId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1 }, a) }, downloadImage: function (a) { c("downloadImage", { serverId: a.serverId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1 }, a) }, getNetworkType: function (a) { var b = function (a) { var c, d, e, b = a.errMsg; if (a.errMsg = "getNetworkType:ok", c = a.subtype, delete a.subtype, c) a.networkType = c; else switch (d = b.indexOf(":"), e = b.substring(d + 1)) { case "wifi": case "edge": case "wwan": a.networkType = e; break; default: a.errMsg = "getNetworkType:fail" } return a }; c("getNetworkType", {}, function () { return a._complete = function (a) { a = b(a) }, a }()) }, openLocation: function (a) { c("openLocation", { latitude: a.latitude, longitude: a.longitude, name: a.name || "", address: a.address || "", scale: a.scale || 28, infoUrl: a.infoUrl || "" }, a) }, getLocation: function (a) { a = a || {}, c(o.getLocation, { type: a.type || "wgs84" }, function () { return a._complete = function (a) { delete a.type }, a }()) }, hideOptionMenu: function (a) { c("hideOptionMenu", {}, a) }, showOptionMenu: function (a) { c("showOptionMenu", {}, a) }, closeWindow: function (a) { a = a || {}, c("closeWindow", { immediate_close: a.immediateClose || 0 }, a) }, hideMenuItems: function (a) { c("hideMenuItems", { menuList: a.menuList }, a) }, showMenuItems: function (a) { c("showMenuItems", { menuList: a.menuList }, a) }, hideAllNonBaseMenuItem: function (a) { c("hideAllNonBaseMenuItem", {}, a) }, showAllNonBaseMenuItem: function (a) { c("showAllNonBaseMenuItem", {}, a) }, scanQRCode: function (a) { a = a || {}, c("scanQRCode", { needResult: a.needResult || 0, scanType: a.scanType || ["qrCode", "barCode"] }, function () { return a._complete = function (a) { var b, c; v && (b = a.resultStr, b && (c = JSON.parse(b), a.resultStr = c && c.scan_code && c.scan_code.scan_result)) }, a }()) }, openProductSpecificView: function (a) { c(o.openProductSpecificView, { pid: a.productId, view_type: a.viewType || 0, ext_info: a.extInfo }, a) }, addCard: function (a) { var e, f, g, h, b = a.cardList, d = []; for (e = 0, f = b.length; f > e; ++e) g = b[e], h = { card_id: g.cardId, card_ext: g.cardExt }, d.push(h); c(o.addCard, { card_list: d }, function () { return a._complete = function (a) { var c, d, e, b = a.card_list; if (b) { for (b = JSON.parse(b), c = 0, d = b.length; d > c; ++c) e = b[c], e.cardId = e.card_id, e.cardExt = e.card_ext, e.isSuccess = e.is_succ ? !0 : !1, delete e.card_id, delete e.card_ext, delete e.is_succ; a.cardList = b, delete a.card_list } }, a }()) }, chooseCard: function (a) { c("chooseCard", { app_id: z.appId, location_id: a.shopId || "", sign_type: a.signType || "SHA1", card_id: a.cardId || "", card_type: a.cardType || "", card_sign: a.cardSign, time_stamp: a.timestamp + "", nonce_str: a.nonceStr }, function () { return a._complete = function (a) { a.cardList = a.choose_card_info, delete a.choose_card_info }, a }()) }, openCard: function (a) { var e, f, g, h, b = a.cardList, d = []; for (e = 0, f = b.length; f > e; ++e) g = b[e], h = { card_id: g.cardId, code: g.code }, d.push(h); c(o.openCard, { card_list: d }, a) }, chooseWXPay: function (a) { c(o.chooseWXPay, f(a), a) }, startSearchBeacons: function (a) { c(o.startSearchBeacons, { ticket: a.ticket }, a) }, stopSearchBeacons: function (a) { c(o.stopSearchBeacons, {}, a) }, onSearchBeacons: function (a) { d(o.onSearchBeacons, a) } }, b && (a.wx = a.jWeixin = C), C });

/*
 功能说明:	判断是否在微信中打开
 创建人:		hmj
 创建时间:	2015-5-20
 功能：判断是否在微信中打开
 */
function IsWeiXin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

/*
 功能说明:	获取微信版本号
 创建人:		hmj
 创建时间:	2015-5-20
 功能：获取微信版本号
 */
function WeiXinVersion() {
    var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\\.]+)/i);
    if (!wechatInfo) {
        return "0";
    } else {
        return wechatInfo[1];
    }
}


/*
 功能说明:	微信JS-SDK注入
 创建人:		hmj
 创建时间:	2015-5-20
 功能：微信JS-SDK注入
 */
function WXConfig(appcode) {
    $.getJSON(
        'http://weixin.jxt189.com/WeiEngine/Service/GetWeiXinJSConfig?callback=?',
        {
            AppCode: appcode,
            url: window.location.href
        },
        function (json) {
            wx.config({
                debug:true,
                appId: json.appId,
                timestamp: json.timestamp,
                nonceStr: json.nonceStr,
                signature: json.signature,
                jsApiList: [
                    'chooseWXPay',
                    'scanQRCode',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone'
                ]
            });
        }
    );
}

/*
 功能说明:	获取网络状态接口
 创建人:		hmj
 创建时间:	2015-5-20
 功能：获取网络状态接口
 */
function GetNetworkType() {
    wx.getNetworkType({
        success: function (res) {
            var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
            if (networkType === "wifi") {
                alert("你当前网络为wifi，如使用公用网络，请注意网络是否安全。");
            } else {
                alert("你当前网络为" + networkType + "。");
            }
        }
    });
}

/*
 功能说明:	选择微信支付
 创建人:		hmj
 创建时间:	2015-5-20
 功能：选择微信支付
 */
function ChooseWXPay(data) {

    if (!IsWeiXin()) {
        alert("请在微信客户端打开链接");
        return;
    }

    if (WeiXinVersion() < "5.0") {
        alert("微信支付仅支持微信5.0以上版本，请升级微信客户端。");
        return;
    }

    wx.chooseWXPay({
        timestamp: data.Timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.NonceStr, // 支付签名随机串，不长于 32 位
        package: data.PrepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: data.SignType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.PaySign, // 支付签名
        success: function (res) {
            if (data.Notify_Url && data.Notify_Url != undefined && data.Notify_Url != null && data.Notify_Url != "") {
                var url = data.Notify_Url;
                var param = "";
                if (url.indexOf('?') > 0) {
                    param = "&errcode=";
                } else {
                    param = "?errcode=";
                }
                switch (res.errMsg) {
                    case "chooseWXPay:ok":
                        param += "ok";
                        break;
                    case "chooseWXPay:cancel":
                        param += "cancel";
                        break;
                    case "chooseWXPay:fail":
                        param += "fail";
                        break;
                }

                if (url.indexOf("#") > 0) {
                    url = url.replace("#", param + "#");
                } else {
                    url += param;
                }
                window.location.href = url
            }
        }
    });
}

/*
 功能说明:	调起微信扫一扫接口
 创建人:		hmj
 创建时间:	2015-5-20
 功能：调起微信扫一扫接口
 */
function ScanQRCode() {
    wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        }
    });
}

/*
 功能说明:	批量隐藏功能按钮接口
 创建人:		hmj
 创建时间:	2015-5-20
 功能：批量隐藏功能按钮接口
 */
function HideMenuItems() {
    wx.hideMenuItems({
        menuList: [
            //'menuItem:share:appMessage',//发送给朋友
            //'menuItem:share:timeline',//分享到朋友圈
            'menuItem:share:qq',//分享到QQ
            'menuItem:share:weiboApp',//分享到Weibo
            'menuItem:favorite',//收藏
            'menuItem:share:facebook',//分享到FB
            'menuItem:share:QZone',//分享到 QQ 空间
            'menuItem:jsDebug',//调试
            'menuItem:editTag',//编辑标签
            'menuItem:delete',//删除
            //'menuItem:copyUrl',//复制链接
            'menuItem:originPage',//原网页
            'menuItem:readMode',//阅读模式
            'menuItem:openWithQQBrowser',//在QQ浏览器中打开
            'menuItem:openWithSafari',//在Safari中打开
            'menuItem:share:email',//邮件
            'menuItem:share:brand',//一些特殊公众号
        ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    });
}

/*
 功能说明:	批量显示功能按钮接口
 创建人:		hmj
 创建时间:	2015-5-20
 功能：批量显示功能按钮接口
 */
function ShowMenuItems() {
    wx.showMenuItems({
        menuList: [
            'menuItem:share:appMessage',//发送给朋友
            'menuItem:share:timeline',//分享到朋友圈
            'menuItem:share:qq',//分享到QQ
            'menuItem:share:weiboApp',//分享到Weibo
            'menuItem:favorite',//收藏
            'menuItem:share:facebook',//分享到FB
            'menuItem:share:QZone',//分享到 QQ 空间
            'menuItem:jsDebug',//调试
            'menuItem:editTag',//编辑标签
            'menuItem:delete',//删除
            'menuItem:copyUrl',//复制链接
            'menuItem:originPage',//原网页
            'menuItem:readMode',//阅读模式
            'menuItem:openWithQQBrowser',//在QQ浏览器中打开
            'menuItem:openWithSafari',//在Safari中打开
            'menuItem:share:email',//邮件
            'menuItem:share:brand',//一些特殊公众号
        ] // 要显示的菜单项
    });
}

/*
 功能说明:	隐藏右上角菜单接口
 创建人:		hmj
 创建时间:	2015-5-20
 功能：隐藏右上角菜单接口
 */
function HideOptionMenu() {
    wx.hideOptionMenu();
}

/*
 功能说明:	显示右上角菜单接口
 创建人:		hmj
 创建时间:	2015-5-20
 功能：显示右上角菜单接口
 */
function ShowOptionMenu() {
    wx.showOptionMenu();
}

/*
 功能说明:	关闭当前网页窗口接口
 创建人:		hmj
 创建时间:	2015-5-20
 功能：关闭当前网页窗口接口
 */
function CloseWindow() {
    wx.closeWindow();
}

