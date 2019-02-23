var login = JSON.parse(sessionStorage.getItem("login"));
console.log(login)
$(function () {
    $("#save").click(function () {
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
            "userid": login.id,
            "phone":tel,
            "shengfen":shengfen,
            "chengshi":chengshi,
            "quyu":quyu,
            "address":address,
            "receiverName":name
        };

        $.ajax({
            url: http + "/address/add",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            cache: false,
            async: true,
            success: function (data) {
                if(data.code==200){
                    alert("保存成功！")
                    window.location.href="address_list.html"
                }else{
                    alert(data.message);
                }

            },
            error: function (data) {
                alert("服务器出现问题，请联系管理员！")
            }
        });
    });
})