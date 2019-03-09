var login=JSON.parse(sessionStorage.getItem("login"))
var shuliang=1;
window.onload = function init() {
    var id = GetRequest().did;
    // var jss=["js/main.js"];
    $.ajax({
        type: "POST",
        url: http + "/detail/detail",
        data: {
            "id": id
        },
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var detailPic = data.data.detailPic;

                console.log(data)
                var dd = data.data;
                $("#product").html(shop(data.data));
                var str = "";
                $.each(detailPic, function (n, value) {
                    str += '<img style="margin-left:195px;width:750px;height:auto" src="' + value.dpicurl + '" alt="">'
                })
                var str1 = '<li class="xxx">颜色:　' + dd.color + '</li>' +
                    '                      <li class="xxx">类型:　' + dd.type + '</li>' +
                    '                      <li class="xxx">过滤原理:　' + dd.guolvyuanli + '</li>' +
                    '                      <li class="xxx">是否用电:　' + dd.shifouyongdian + '</li>' +
                    '                      <li class="xxx">水质要求:　' + dd.shuizhiyaoqiu + '</li>' +
                    '                      <li class="xxx">温度范围:　' + dd.wendufanwei + '</li>' +
                    '                      <li class="xxx">水压范围（Mpa）:　' + dd.shuiya + '</li>' +
                    '                      <li class="xxx">产地:　' + dd.chandi + '</li>' +
                    '                      <li class="xxx">产品尺寸(mm):　' + dd.chicun + '</li>' +
                    '                      <li class="xxx">产品净重（kg):　' + dd.zhongliang + '</li>' +
                    '                      <li class="xxx">额定功率:　' + dd.gonglv + '</li>' +
                    '                      <li class="xxx">出水温度:　' + dd.chushuiwendu + '</li>' +
                    '                      <li class="xxx">RO膜规格:　' + dd.romoguige + '</li>' +
                    '                      <li class="xxx">是否有压力桶:　' + dd.shifouyouyalitong + '</li>' +
                    '                      <li class="xxx">回收率/废水比:　' + dd.huishuilv + '</li>' +
                    '                      <li class="xxx">是否有滤芯寿命提示:　' + dd.shifoutishishouming + '</li>' +
                    '                      <li class="xxx">滤水壶水壶容量:　' + dd.lvshuihurongliang + '</li>';
                $("#detail_list").html(str1);
                $("#pic").html(str);
                loadScript('js/main.js', function () {
                    // console.log('onload');
                });
            } else {
                alert("您来晚了，商品已被抢购完了");
                window.location.href = "javascript:history.go(-1)";
            }
        },
        error: function (data) {
            alert("您来晚了，商品已被抢购完了");
            window.location.href = "javascript:history.go(-1)";
        }
    });
    type();
    cartonload();
}

function type() {
    $.ajax({
        type: "POST",
        url: http + "/kind/list",
        data: null,
//            contentType: "application/json",
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                console.log(data)
                var list = data.data.list;
                var str = "";
                $.each(list, function (n, value) {
                    if (value.kpid == "1") {
                        $("#jiayong").append('<li><a href="ListProducts.html?id=' + value.kid + '">' + value.ktype + '</a></li>')
                    } else if (value.kpid == "2") {
                        $("#shangyong").append('<li><a href="ListProducts.html?id=' + value.kid + '">' + value.ktype + '</a></li>')
                    }
                });
            } else {
                console.log("净水器类型数据加载异常：" + data.message);
            }
        }
    });
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
function cartonload() {
    if(login!=null){
        $.ajax({
            type: "POST",
            url: http + "/cart/cartonload",
            data: {"cid":login.id},
            async:false,
//            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    // console.log(data)
                    var list=data.data.list;

                    if(list.length!=0){
                        var str='<li class="dropdown" ondblclick="db()"><a title="双击可以跳转购物车页面" class="dropdown-toggle" data-toggle="dropdown" role="button"'+
                            '                                        aria-haspopup="true" aria-expanded="false"><span class="itm-cont">'+list.length+'</span> <i'+
                            '                        class="flaticon-shopping-bag"></i> <strong>My Cart</strong> <br>'+
                            '                    <span>￥'+data.data.totalPrice+'</span></a>'+
                            '                    <ul class="dropdown-menu">';



                        for(var i=0;i<list.length;i++){
                            str+='                        <li>'+
                                '                            <div class="media-left"><a href="#." class="thumb"> <img src="'+list[i].picurl+'"'+
                                '                                                                                     class="img-responsive" alt=""> </a>'+
                                '                            </div>'+
                                '                            <div class="media-body"><a href="#." class="tittle">'+list[i].shopname+'</a>'+
                                '                                <span>'+list[i].price+' x '+list[i].count+'</span></div>'+
                                '                        </li>'
                        }
                        str+='                        <li class="btn-cart"><a href="cart.html?id='+login.id+'" class="btn-round">查看购物车</a></li>';
                        '                    </ul>'+
                        '                </li>';
                        $("#cart_nav").html(str);
                    }else {
                        var str='<li class="dropdown" ondblclick="db()"><a title="双击可以跳转购物车页面" class="dropdown-toggle" data-toggle="dropdown" role="button"'+
                            '                                        aria-haspopup="true" aria-expanded="false"><span class="itm-cont">'+list.length+'</span> <i'+
                            '                        class="flaticon-shopping-bag"></i> <strong>My Cart</strong> <br>'+
                            '                    <span>￥'+0+'</span></a>'+
                            '                    <ul class="dropdown-menu">';



                        for(var i=0;i<list.length;i++){
                            str+='                        <li>'+
                                '                            <div class="media-left"><a href="#." class="thumb"> <img src="'+list[i].picurl+'"'+
                                '                                                                                     class="img-responsive" alt=""> </a>'+
                                '                            </div>'+
                                '                            <div class="media-body"><a href="#." class="tittle">'+list[i].shopname+'</a>'+
                                '                                <span>'+list[i].price+' x '+list[i].count+'</span></div>'+
                                '                        </li>'
                        }
                        str+='                        <li class="btn-cart"><a href="cart.html?id='+login.id+'" class="btn-round">查看购物车</a></li>';
                        '                    </ul>'+
                        '                </li>';
                        $("#cart_nav").html(str);
                    }
                } else {
                }
            }
        });
    }else {
        $("#cart_nav").html("");
        alert("请先登录");
    }
}
function checknumber() {
    var count = $("#count").val();
    if (!(/^(\+|-)?\d+$/.test(count)) || count < 1) {
        alert("数量必须是整数！");
        $("#count").val("1");
        $("#count").focus();

    }else {
        shuliang=count;
    }
}

//html跳转获取url的值


function shop(data) {
    var keyword = data.keyword.split(" ");
    var str = '                <div class="row"> ' +
        '                  <!-- Slider Thumb -->' +
        '                  <div class="col-xs-5">' +
        '                    <article class="slider-item on-nav">' +
        '                      <div class="thumb-slider">' +
        '                        <ul class="slides">';
    for (var i = 0; i < data.shopPic.length; i++) {

        str += '                          <li data-thumb="' + data.shopPic[i].dpicurl + '"  > <img src="' + data.shopPic[i].dpicurl + '" alt=""> </li>'
    }
    str += '                        </ul>' +
        '                      </div>' +
        '                    </article>' +
        '                  </div>' +
        '                  <!-- Item Content -->' +
        '                  <div class="col-xs-7"> <span class="tags" style="font-size: 30px;color: black">' + data.name + '</span>' +
        '                    <!--<p class="rev"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> <i class="fa fa-star-o"></i> <span class="margin-left-10">5 Review(s)</span></p>-->' +
        '                    <div class="row">' +
        '                      <div class="col-sm-6" style="width: 30%;margin-left: 20px"><span class="price">$' + data.price + '</span></div>' +
        '                      <div class="col-sm-6" style="margin-top: 5px">' +
        '                        <p style="font-size: 20px;">库存: <span class="in-stock">' + data.count + '</span></p>' +
        '                      </div>' +
        '                    </div>' +
        '                    <!-- List Details -->' +
        '                    <ul class="bullet-round-list" style="font-size: 15px;margin-top: 30px">';

    for (var i = 0; i < keyword.length; i++) {
        str += '<li class="sss">' + keyword[i] + '</li>'
    }
    str += '                    </ul>' +
        '                    <!-- Colors -->' +
        '                    <div class="row">' +
        '                      <!--<div class="col-xs-5">-->' +
        '                        <!--<div class="clr"> <span style="background:#068bcd"></span> <span style="background:#d4b174"></span> <span style="background:#333333"></span> </div>-->' +
        '                      <!--</div>-->' +
        '                      <!-- Sizes -->' +
        '                      <!--<div class="col-xs-7">-->' +
        '                        <!--<div class="sizes"> <a href="#.">S</a> <a class="active" href="#.">M</a> <a href="#.">L</a> <a href="#.">XL</a> </div>-->' +
        '                      <!--</div>-->' +
        '                      <!--<br>-->' +
        '                      <!--<br>-->' +
        '                      <!--<br>-->' +
        '                      <!--<br>-->' +
        '                      <!--<br>-->' +
        '                    </div>' +
        '                    <!-- Compare Wishlist -->' +
        '                    <!--<ul class="cmp-list">-->' +
        '                      <!--<li><a href="#."><i class="fa fa-heart"></i> Add to Wishlist</a></li>-->' +
        '                      <!--<li><a href="#."><i class="fa fa-navicon"></i> Add to Compare</a></li>-->' +
        '                      <!--<li><a href="#."><i class="fa fa-envelope"></i> Email to a friend</a></li>-->' +
        '                    <!--</ul>-->' +
        '                    <!-- Quinty -->' +
        '                    <div class="quinty" style="width: 200px">' +
        '                      <label style="font-size: 15px;color: gray">数量：</label><input id="count" onchange="checknumber()" type="number" value="01" style="width: 60%">' +
        '                    </div>' +
        '                    <a href="#"  onclick="addCart(\''+data.cid+'\','+shuliang+')" class="btn-round"><i class="icon-basket-loaded margin-right-5"></i>加入购物车</a> </div>' +
        '                </div>';
    return str;
}
function addCart(id,count) {

    var data={
        "cid":login.id,
        "cleanerid":id,
        "count":count
    };
    // console.log(data)
    $.ajax({
        type: "POST",
        url: http + "/cart/add",
        data: data,
        async:false,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                alert("购物车添加成功！")
                cartonload();
            } else {
            }
        }
    });

}
function db() {
    window.location.href="cart.html?id="+login.id;
}
function standard_str() {
    return '<li class="xxx">颜色:　白色</li>' +
        '                      <li class="xxx">类型:　纳滤机</li>' +
        '                      <li class="xxx">过滤原理:　纳滤</li>' +
        '                      <li class="xxx">是否用电:　是</li>' +
        '                      <li class="xxx">水质要求:　市政自来水</li>' +
        '                      <li class="xxx">温度范围:　4-40摄氏度</li>' +
        '                      <li class="xxx">水压范围（Mpa）:　0.2-0.4MPa</li>' +
        '                      <li class="xxx">产地:　北京</li>' +
        '                      <li class="xxx">产品尺寸(mm):　195*340*441</li>' +
        '                      <li class="xxx">产品净重（kg):　5</li>' +
        '                      <li class="xxx">额定功率:　20W</li>' +
        '                      <li class="xxx">出水温度:　常温水</li>' +
        '                      <li class="xxx">RO膜规格:　150加仑</li>' +
        '                      <li class="xxx">是否有压力桶:　无桶</li>' +
        '                      <li class="xxx">回收率/废水比:　3:1</li>' +
        '                      <li class="xxx">是否有滤芯寿命提示:　是</li>' +
        '                      <li class="xxx">滤水壶水壶容量:　其它</li>';
}