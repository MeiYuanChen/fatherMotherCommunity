/**
 * Created by WZJS-CMY on 16/4/22.
 */

var Heng = {
    options: {
        // 接口域名基地址
        base_url: "http://hd.jxt189.com/heng_bama"
    },
    // 提取#后面的token
    getParam: function(strParame) {
        var args = new Object();
        var query = location.hash.substring(1);

        var pairs = query.split("&"); // Break at ampersand
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos == -1) continue;
            var argname = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);
            value = decodeURIComponent(value);
            args[argname] = value;
        }
        return args[strParame];
    },
    // 从本地浏览器提取token
    getToken: function() {
        return window.localStorage.getItem("token");
    },
    getTokents: function() {
        return window.localStorage.getItem("tokents");
    },
    getIid:function(){
        return this.getParam("iid");
    },
    // 写入token到浏览器
    setToken: function() {
        window.localStorage.setItem("token", this.getParam("token"));
        window.localStorage.setItem("tokents",Date.parse(new Date()));
    }
}

Heng.setToken();
