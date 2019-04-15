var no="";
var amount="";
var formstring="";
$(function () {
    no=GetRequest().no;
    amount=GetRequest().amount;
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
    $("#port").val(location.port);
    $("#r2").attr("checked","checked");


})
function tijiao() {
    $.ajax({
        url: http + "/pay1",
        type: "post",
        dataType: "json",
        // contentType: "application/json",
        data: {
            "no":no,
            "amount":amount,
            "subject":"净水器",
            "port":location.port
        },
        cache: false,
        async: true,
        success: function (data) {
            if(data.code==200){
                formstring=data.data;
                document.getElementById("ddd").onclick();
            }else{
                alert(data.message);
            }

        },
        error: function (data) {
            alert("服务器出现问题，请联系管理员！")
        }
    });
}
