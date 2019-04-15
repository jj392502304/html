var login = JSON.parse(sessionStorage.getItem("login"));
$(function () {
    $.ajax({
        type: "POST",
        url: http + "/order/daifukuan",
        data: {"id": login.id},
        async: true,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                var list = data.data;
                var str = "";
                for (var i = 0; i < list.length; i++) {
                    str += '<div class="order_list" >' +
                        '                <p>订单号： ' + list[i].orderid + '</p>' +
                        '                <div class="goods_info">' +
                        '                    <div class="left_goods">';

                    for (var j = 0; j < list[i].items.length; j++) {
                        str += '                        <a href="goods.html" class="goods_img"><img src="' + list[i].items[j].picPath + '">×<strong>' + list[i].items[j].count + '</strong></a>'
                    }


                    str += '                    </div>';
                    str += '                    <div class="right_operate"><a href="../orderform/submit.html?id=' + login.id +"&no="+list[i].orderid+"&amount="+list[i].payment+ '">支付</a></div><div class="right_operate"><a style="background: gainsboro" href="#" onclick="del(\'' + list[i].orderid + '\')">删除</a></div>' +
                        '                </div>' +
                        '                <div class="price_count">' +
                        '                    <time>' + list[i].createtime + '</time>' +
                        '                    <span>合计：' + list[i].payment + '</span><span>共' + list[i].items.length + '件商品</span></div>' +
                        '            </div>';
                }
                $("#daifukuan").html(str);
            } else {
                alert("网页出现问题，请联系管理员！")
            }
        }
    });

    $.ajax({
        type: "POST",
        url: http + "/order/daifahuo",
        data: {"id": login.id},
        async: true,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                var list = data.data;
                var str = "";
                for (var i = 0; i < list.length; i++) {
                    str += '<div class="order_list" >' +
                        '                <p>订单号： ' + list[i].orderid + '</p>' +
                        '                <div class="goods_info">' +
                        '                    <div class="left_goods">';

                    for (var j = 0; j < list[i].items.length; j++) {
                        str += '                        <a href="goods.html" class="goods_img"><img src="' + list[i].items[j].picPath + '">×<strong>' + list[i].items[j].count + '</strong></a>'
                    }


                    str += '                    </div>';
                    str += '                    <div class="right_operate"><a href="#" onclick="cuidan()">催单</a></div><div class="right_operate"><a style="background: gainsboro" href="#" onclick="del(\'' + list[i].orderid + '\')">删除</a></div>' +
                        '                </div>' +
                        '                <div class="price_count">' +
                        '                    <time>' + list[i].createtime + '</time>' +
                        '                    <span>合计：' + list[i].payment + '</span><span>共' + list[i].items.length + '件商品</span></div>' +
                        '            </div>';
                }
                $("#daifahuo").html(str);
            } else {
                alert("网页出现问题，请联系管理员！")
            }
        }
    });
    $.ajax({
        type: "POST",
        url: http + "/order/daifahuo",
        data: {"id": login.id},
        async: true,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                var list = data.data;
                var str = "";
                for (var i = 0; i < list.length; i++) {
                    str += '<div class="order_list" >' +
                        '                <p>订单号： ' + list[i].orderid + '</p>' +
                        '                <div class="goods_info">' +
                        '                    <div class="left_goods">';

                    for (var j = 0; j < list[i].items.length; j++) {
                        str += '                        <a href="goods.html" class="goods_img"><img src="' + list[i].items[j].picPath + '">×<strong>' + list[i].items[j].count + '</strong></a>'
                    }


                    str += '                    </div>';
                    str += '                    <div class="right_operate"><a href="#" onclick="cuidan()">催单</a></div>' +
                        '                </div>' +
                        '                <div class="price_count">' +
                        '                    <time>' + list[i].createtime + '</time>' +
                        '                    <span>合计：' + list[i].payment + '</span><span>共' + list[i].items.length + '件商品</span></div>' +
                        '            </div>';
                }
                $("#daifahuo").html(str);
            } else {
                alert("网页出现问题，请联系管理员！")
            }
        }
    });
    $.ajax({
        type: "POST",
        url: http + "/order/yifahuo",
        data: {"id": login.id},
        async: true,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                var list = data.data;
                var str = "";
                for (var i = 0; i < list.length; i++) {
                    str += '<div class="order_list" >' +
                        '                <p>订单号： ' + list[i].orderid + '</p>' +
                        '                <div class="goods_info">' +
                        '                    <div class="left_goods">';

                    for (var j = 0; j < list[i].items.length; j++) {
                        str += '                        <a href="goods.html" class="goods_img"><img src="' + list[i].items[j].picPath + '">×<strong>' + list[i].items[j].count + '</strong></a>'
                    }


                    str += '                    </div>';
                    str+='<h3>快递类型:'+list[i].shipingname+'</h3>'
                    str+='<h3>快递单号:'+list[i].shipingcode+'</h3>'
                    str += '                    <div class="right_operate"><a href="#" onclick="querenshouhuo( \'' + list[i].orderid + '\')">确认收货</a></div>' +
                        '                </div>' +
                        '                <div class="price_count">' +
                        '                    <time>' + list[i].createtime + '</time>' +
                        '                    <span>合计：' + list[i].payment + '</span><span>共' + list[i].items.length + '件商品</span></div>' +
                        '            </div>';
                }
                $("#yifahuo").html(str);
            } else {
                alert("网页出现问题，请联系管理员！")
            }
        }
    });
    $.ajax({
        type: "POST",
        url: http + "/order/yiwancheng",
        data: {"id": login.id},
        async: true,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                var list = data.data;
                var str = "";
                for (var i = 0; i < list.length; i++) {
                    str += '<div class="order_list" >' +
                        '                <p>订单号： ' + list[i].orderid + '</p>' +
                        '                <div class="goods_info">' +
                        '                    <div class="left_goods">';

                    for (var j = 0; j < list[i].items.length; j++) {
                        str += '                        <a href="goods.html" class="goods_img"><img src="' + list[i].items[j].picPath + '">×<strong>' + list[i].items[j].count + '</strong></a>'
                    }


                    str += '                    </div>';
                    str += '                    ' +
                        '                </div>' +
                        '                <div class="price_count">' +
                        '                    <time>' + list[i].createtime + '</time>' +
                        '                    <span>合计：' + list[i].payment + '</span><span>共' + list[i].items.length + '件商品</span></div>' +
                        '            </div>';
                }
                $("#yiwancheng").html(str);
            } else {
                alert("网页出现问题，请联系管理员！")
            }
        }
    });
})
function querenshouhuo(e) {
    $.ajax({
        type: "POST",
        url: http + "/order/querenshouhuo",
        data: {"id": e},
        async: true,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                alert("收货成功");
                window.location.reload();

            } else {
                alert("网页出现问题，请联系管理员！")
            }
        }
    });
}
function cuidan() {
    alert("催单成功！");
}
function del(value) {
    if (confirm("确定删除该订单？")) {
        $.ajax({
            type: "POST",
            url: http + "/order/delete",
            data: {"id": value},
            async: true,
//            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    alert("删除成功");
                    window.location.reload();

                } else {
                    alert("网页出现问题，请联系管理员！")
                }
            }
        });
    }
}