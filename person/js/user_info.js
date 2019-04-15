var login = JSON.parse(sessionStorage.getItem("login"));
$(function () {
    console.log(login)
    if (login != null) {
        $("#touxiang").attr("src", login.pic);
        if (login.userinfo != null) {
            $("#name").val(login.userinfo.name)
            $("#email").val(login.userinfo.email)
            $("#phone").val(login.userinfo.phonenumber)
            $("#address").val(login.userinfo.adress)
            $("#age").val(login.userinfo.age)
            $("#sex").val(login.userinfo.sex)
        }
    }

    $("#save").click(function () {
        var name = $("#name").val()
        var email = $("#email").val()
        var phone = $("#phone").val()
        var address = $("#address").val()
        var age = $("#age").val()
        var sex = $("#sex").val()
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            alert("手机号码有误，请重填");
            $("#phone").focus();
            return;
        }
        if (!(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(email))) {
            alert("邮箱有误，请重填");
            $("#email").focus();
            return;
        }
        var formData = new FormData();
       formData.append("file",document.getElementById('file').files[0])

        $.ajax({
            url: "http://120.79.7.46/file/fileonload/onload", //请求的url地址
            // dataType: "json", //返回格式为json
            async: false, //请求是否异步，默认为异步，这也是ajax重要特性
            data: formData, //参数值
            type: "POST", //请求方式
            processData: false, //对表单data数据是否进行序列化
            cache: false,
            contentType: false,
            success: function (data) {
                console.log(data)
                var path=data;
                if (login.userinfo != null) {
                    var data1 = {
                        "adress": address,
                        "age": age,
                        "email": email,
                        "name": name,
                        "phonenumber": phone,
                        "sex": sex,
                        "uinfoid": login.userinfo.uinfoid
                    };
                    console.log(data1)
                    $.ajax({
                        url: http + "/userinfo/update?path="+data+"&cid="+login.id,
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data:JSON.stringify(data1) ,
                        cache: false,
                        async: true,
                        success: function (data) {
                            console.log(data)
                            login.pic=path;
                            login.userinfo=data.data;
                            sessionStorage.setItem("login",JSON.stringify(login));
                            alert("保存成功");
                        },
                        error: function (data) {
                            alert("服务器出现问题，请联系管理员！")
                        }
                    });
                } else {
                    var data1 = {
                        "adress": address,
                        "age": age,
                        "email": email,
                        "name": name,
                        "phonenumber": phone,
                        "sex": sex,
                        "uid": login.id
                    };
                    $.ajax({
                        url: http + "/userinfo/add?path="+data,
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(data1),
                        cache: false,
                        async: true,
                        success: function (data) {
                            login.pic=path;
                            login.userinfo=data.data;
                            sessionStorage.setItem("login",JSON.stringify(login));
                            alert("保存成功！")
                        },
                        error: function (data) {
                            alert("服务器出现问题，请联系管理员！")
                        }
                    });
                }

            }, error: function (msg) {
                console.log(msg)
            }
        });

    })


})

function dianji() {
    $("#file").click();
}

function yulan(value) {
    var reads = new FileReader();
    f = document.getElementById('file').files[0];
    reads.readAsDataURL(f);
    reads.onload = function (e) {
        document.getElementById('touxiang').src = this.result;
    };

}