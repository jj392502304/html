//var http="http://localhost:8082"
var http="http://120.79.7.46/demo"
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    if(url.length==0){
        url=document.referrer;
        url=url.substring(url.lastIndexOf("?"),url.length);
    }
    console.log(url);
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
function yanzheng(login) {
    if(login==null){
        alert("请先登录")
        return true;
    }
}
