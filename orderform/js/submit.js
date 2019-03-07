$(function () {
    var no=GetRequest().no;
    var amount=GetRequest().amount;
    if(no==""||typeof(no)=="undefined" ){
        alert("网页出错！")
        window.location.href="javascript:history.go(-2)"
    }
    if(amount==""||typeof(amount)=="undefined" ){
        alert("网页出错！")
        window.location.href="javascript:history.go(-2)"
    }
    $("#no").val(no)
    $("#amount").val(amount);
    $("#subject").val("净水器")

    $("#r2").attr("checked","checked");


})
