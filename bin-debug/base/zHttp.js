var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zHttp = (function () {
    //private SERVER_ADDRESS: string = 'http://121.43.191.130/agent/login';
    //private SERVER_ADDRESS: string = 'http://www.posttestserver.com/';
    //private SERVER_ADDRESS: string = 'http://httpbin.org/';
    function zHttp() {
        this.SERVER_ADDRESS = 'http://192.168.1.211/mj_club/public/';
        this.create();
    }
    zHttp.getInstance = function () {
        if (this.m_instance == null) {
            this.m_instance = new zHttp();
        }
        return this.m_instance;
    };
    ;
    zHttp.prototype.create = function () {
        console.log("create zHttp");
    };
    zHttp.prototype.sendHttpRequest = function (obj, url, _type, completeCallback, params, errorCallback, progressCallback) {
        var flag = false;
        if (params == null) {
            flag = true;
            params = new eui.ArrayCollection();
            params.addItem({ key: 'token', value: UserObject.getToken() });
            var time = String(new Date().getTime());
            params.addItem({ key: 'timestamp', value: time });
            params.addItem({ key: 'key', value: Encrypt.md5(Encrypt.md5("4B7D9717C34B2FB64CC813EA0ACC6D29" + time)) });
        }
        var pUrl = "";
        if (params != null && params.length > 0) {
            if (!flag) {
                params.addItem({ key: 'token', value: UserObject.getToken() });
                var time = String(new Date().getTime());
                params.addItem({ key: 'timestamp', value: time });
                params.addItem({ key: 'key', value: Encrypt.md5(Encrypt.md5("4B7D9717C34B2FB64CC813EA0ACC6D29" + time)) });
            }
            pUrl = "?";
            for (var i = 0; i < params.length; i++) {
                if (pUrl != "") {
                    pUrl = pUrl + "&";
                }
                pUrl = pUrl + params.getItemAt(i).key + "=" + params.getItemAt(i).value;
            }
        }
        console.log("url:" + this.SERVER_ADDRESS + url + pUrl);
        var request = new egret.HttpRequest();
        _type == egret.HttpMethod.POST ? request.open(this.SERVER_ADDRESS + url, _type)
            : request.open(this.SERVER_ADDRESS + url + pUrl, _type);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        _type == egret.HttpMethod.POST ? request.send(pUrl) : request.send();
        request.addEventListener(egret.Event.COMPLETE, completeCallback ? completeCallback : this.onHttpDone, obj);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, errorCallback ? errorCallback : this.onHttpIOError, obj);
        request.addEventListener(egret.ProgressEvent.PROGRESS, progressCallback ? progressCallback : this.onHttpProgress, obj);
    };
    zHttp.prototype.onHttpProgress = function (event) {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    zHttp.prototype.onHttpIOError = function (event) {
        console.log("HttpError");
        console.log(event);
    };
    zHttp.prototype.onHttpDone = function (event) {
        console.log("HttpDone");
    };
    zHttp.prototype.onHttpCompleted = function (event) {
        var _request = event.currentTarget;
        var _response = _request.response;
        return JSON.parse(_response);
    };
    return zHttp;
}());
zHttp.m_instance = null;
__reflect(zHttp.prototype, "zHttp");
//# sourceMappingURL=zHttp.js.map