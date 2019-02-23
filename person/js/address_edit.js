window.onload=function () {
    $.ajax({
        url: http + "/address/detail",
        type: "post",
        dataType: "json",
        // contentType: "application/json",
        data: {
            "id":GetRequest().addressId
        },
        cache: false,
        async: true,
        success: function (data) {
            console.log(data)
            $("#name").val(data.data.receiverName);
            $("#tel").val(data.data.phone);
            $("#shengfen").find("p").text(data.data.shengfen);
            $("#chengshi").find("p").text(data.data.chengshi);
            $("#quyu").find("p").text(data.data.quyu);
            $("#address").val(data.data.address);
        },
        error: function (data) {
            alert("服务器出现问题，请联系管理员！")
        }
    });
}
function save() {
    var name = $("#name").val();
    var tel = $("#tel").val();
    var shengfen = $("#shengfen").find("p").text();
    var chengshi = $("#chengshi").find("p").text();
    var quyu = $("#quyu").find("p").text();
    var address = $("#address").val();
    if (name.length < 2) {
        alert("名字长度不小于2");
        $("#name").focus();
        return;
    }
    if (tel.length < 11) {
        alert("手机号码不能小于11位");
        $("#tel").focus();
        return;
    }
    if (address.length < 5) {
        alert("详细地址不能少于5个汉字");
        $("#address").focus();
        return;
    }
    var data = {
        "addressId":GetRequest().addressId,
        "phone":tel,
        "shengfen":shengfen,
        "chengshi":chengshi,
        "quyu":quyu,
        "address":address,
        "receiverName":name
    };

    $.ajax({
        url: http + "/address/update",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        cache: false,
        async: true,
        success: function (data) {
            alert("保存成功！")
            window.location.href="address_list.html"
        },
        error: function (data) {
            alert("服务器出现问题，请联系管理员！")
        }
    });

}