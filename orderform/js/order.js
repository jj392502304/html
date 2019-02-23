var adId = "";
var ad = false;
$(function () {
    var ids = GetRequest().ids;
    var id = GetRequest().id;
    $.ajax({
        type: "POST",
        url: http + "/address/list2",
        data: {"id": id},
        async: false,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var list = data.data;
                var str = "";
                $.each(list, function (n, value) {
                    str += '<dl class="item" onclick="choose(\'' + value.addressId + '\')">' +
                        '                                    <dt>' +
                        '                                        <strong class="itemConsignee">' + value.receiverName + '</strong>' +
                        '                                    </dt>' +
                        '                                    <dd>' +
                        '                                        <p class="tel itemTel">' + value.phone + '</p>' +
                        '                                        <p class="itemRegion">' + value.shengfen + value.chengshi + value.quyu + '</p>' +
                        '                                        <p class="itemStreet">' + value.address + '</p>' +
                        '                                        <span class="edit-btn J_editAddr">编辑</span>' +
                        '                                    </dd>' +
                        '                                    <dd style="display:none">' +
                        '                                        <input type="radio" name="Checkout[address]" class="addressId"' +
                        '                                               value="10140916720030323">' +
                        '                                    </dd>' +
                        '                                </dl>';
                })
                str += '<div class="item use-new-addr" id="J_useNewAddr" data-state="off">' +
                    '                                    <span class="iconfont icon-add"><img src="images/add_cart.png"/></span>' +
                    '                                    使用新地址' +
                    '                                </div>';
                $("#checkoutAddrList").html(str);
            } else {
                alert("网页出现问题，请联系管理员！")
            }
        }
    });

    $.ajax({
        type: "POST",
        url: http + "/cart/cartbyids",
        data: {"ids": ids},
        async: false,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                var list = data.data;
                var str = "";
                var totalprice = 0;
                $.each(list, function (n, value) {
                    totalprice += value.count * value.price;
                    str += '<dd class="item clearfix">' +
                        '                                        <div class="item-row">' +
                        '                                            <div class="col col-1">' +
                        '                                                <div class="g-pic">' +
                        '                                                    <img src="' + value.picurl + '"' +
                        '                                                         srcset="' + value.picurl + '"' +
                        '                                                         width="40" height="40"/>' +
                        '                                                </div>' +
                        '                                                <div class="g-info">' +
                        '                                                    <a href="#">' +
                        '                                                        ' + value.shopname + '</a>' +
                        '                                                </div>' +
                        '                                            </div>' +
                        '                                            <div class="col col-2">' + value.price + '元</div>' +
                        '                                            <div class="col col-3">' + value.count + '</div>' +
                        '                                            <div class="col col-4">' + value.count * value.price + '元</div>' +
                        '                                        </div>' +
                        '                                    </dd>';
                });
                $("#orderlist").append(str)
                $("#total").text(totalprice + "元")
                var ss = '<strong >' + totalprice + '</strong>元';
                $("#totalprice").html(ss);
                loadScript('js/checkout.min.js', function () {
                    // console.log('onload');
                });
                // loadScript('js/index.js', function () {
                //     // console.log('onload');
                // });


            } else {
                alert("网页出现问题，请联系管理员！")
            }
        }
    });
})

function choose(value) {
    adId = value;
    ad = true;
}

function loadScript(src, callback) {
    var script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
        script.addEventListener('load', function () {
            callback();
        }, false);
    } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState == 'loaded') {
                callback();
            }
        });
    }
    head.appendChild(script);
}

function xiadan() {
    if (!ad) {
        alert("请选择地址");
        window.scrollTo(0, 0);
        return;
    }
    var dd = {
        "addressid": adId,
        "buyermessage": $("#message").val(),
        "paymenttype": "在线支付",
        "postfee": 0,
        "userid": JSON.parse(sessionStorage.getItem("login")).id
    }
    $.ajax({
        type: "POST",
        url: http + "/order/add?ids=" + GetRequest().ids,
        data: JSON.stringify(dd),
        async: false,
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                window.location.href = "submit.html";
            } else {
                alert("网页出现问题，请联系管理员！")
            }
        }
    });
}

function fanhui() {
    window.location.href = "../cart/index.html";
}