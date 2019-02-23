var login = JSON.parse(sessionStorage.getItem("login"));
$(function () {
    $.ajax({
        type: "POST",
        url: http + "/order/daifukuan",
        data: {"id": login.id},
        async: false,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                console.log(data)
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
                    str += '                    <div class="right_operate"><a href="../orderform/submit.html?id=' + login.id + '">支付</a></div><div class="right_operate"><a style="background: gainsboro" href="#" onclick="del(\'' + list[i].orderid + '\')">删除</a></div>' +
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
})

function del(value) {
    if (confirm("确定删除该订单？")) {
        $.ajax({
            type: "POST",
            url: http + "/order/delete",
            data: {"id": value},
            async: false,
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