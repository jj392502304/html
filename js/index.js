var f = "";
var s = "";
var o = "";
var login=JSON.parse(sessionStorage.getItem("login"));
// var adminid=login.id;

window.onload = function () {
    console.log(login)
    if(typeof(login)!=undefined&&login!=null){
        if(login.userinfo!=null){
            $("#welcome").html(login.userinfo.name+",欢迎来到净水器在线销售商店！");
        }else {
            $("#welcome").html("欢迎来到净水器在线销售商店！");
        }
        $("#login_text").html("退出登录");
        $("#register_text").html("");
    }
    $("#special").hide();
    $("#on-sal").hide();

    //轮播图数据加载
    $.ajax({
        type: "POST",
        url: http + "/round/list",
        data: null,
//            contentType: "application/json",
        async:false,
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                console.log(data);
                var list = data.data.list;
                var s;
                for (var i = 0; i < list.length; i++) {
                    s += round(list[i].rimage, list[i].rbrief, list[i].rname, list[i].rprice, list[i].rid)
                }
                s = s.replace("undefined", "");
                var image = list[list.length-1].rimage;
                $("#round").html(s)
                // $(".slid-sec .like-bnr").css("background", "#f5f5f5 url(" + image + ") right top no-repeat");
                // $(".like-bnr").css("background-size", "342px 250px");
                // $("#like-href").attr("href", "./Product-Details.html?did="+list[3].rid);
                // $("#like-name").html(list[list.length-1].rname);
                // $("#like-brief").html(list[list.length-1].rbrief);
                // $("#like-price").html(list[list.length-1].rprice);
                loadScript('js/main.js', function () {
                    // console.log('onload');
                });

            } else {
                console.log("轮播图数据加载异常：" + data.message);
            }
        }
    });

    //精选数据加载
    $.ajax({
        type: "POST",
        url: http + "/cleaner/featured",
        async:false,
        data: null,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                f = 234 * data.data.total;
                // console.log(data);
                var list = data.data.list;
                var str = "";
                $.each(list, function (n, value) {
                    str += jingxuan(value.cpicurl, value.ckeyword, value.cname, value.cprice, value.cid);
                });

                $("#jingxuan").html(str);
            } else {
                console.log("精选商品加载异常：" + data.message);
            }
        }
    });

    //特殊数据加载
    $.ajax({
        type: "POST",
        url: http + "/cleaner/special",
        async:false,
        data: null,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                s = 234 * data.data.total;
                // console.log(data);
                var list = data.data.list;
                var str = "";
                $.each(list, function (n, value) {
                    str += jingxuan(value.cpicurl, value.ckeyword, value.cname, value.cprice, value.cid);
                });
                $("#specials").html(str);
                // $("#special").hide();
                // $("#on-sal").hide();
            } else {
                console.log("特殊商品加载异常：" + data.message);
            }
        }
    });

    //打折数据加载
    $.ajax({
        type: "POST",
        url: http + "/bargin/list",
        async:false,
        data: null,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                // console.log(data);
                var list = data.data.list;
               o= 234 * data.data.total;
                var str = "";
                $.each(list, function (n, value) {
                    str += jingxuan(value.image, value.ckeyword, value.bname, value.bprice, value.cid);
                });
                $("#specials2").html(str);

                // $("#special").hide();
                // $("#on-sal").hide();
            } else {
                console.log("打折商品加载异常：" + data.message);
            }
        }
    });

    //本周最畅销数据加载
//     $.ajax({
//         type: "POST",
//         url: http + "/weekly/weekly",
//         data: null,
//         async:false,
// //            contentType: "application/json",
//         dataType: "json",
//         success: function (data) {
//             if (data.code == 200) {
//                 // console.log(data)
//                 var list = data.data.list;
//
//                 $(".like-bnr").eq(1).css("background", "#f5f5f5 url(" + list[0].cpicurl + ") right top no-repeat");
//                 $("#h_link").attr("href", "./Product-Details.html?did="+list[0].cid);
//                 $("#w_name").html(list[0].cname);
//                 $("#k_name").html(list[0].ckeyword);
//                 var str="";
//                 $.each(list, function (n, value) {
//                     if (n > 0) {
//                         str += week(value.cpicurl,  value.ckeyword,value.cname, value.cprice, value.cid);
//                     }
//                 });
//                 $("#weekly_shop").append(str);
//             } else {
//                 console.log("本周最畅销数据加载异常：" + data.message);
//             }
//         }
//     });

    //公告加载
    $.ajax({
        type: "POST",
        url: http + "/notice/list",
        data: null,
        async:false,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                var list = data.data.list;
                var str="";
                $.each(list, function (n, value) {
                    str += notice(value.image, value.ntime,value.ntitle,value.ncontent,value.nid);
                });
                $("#blog-slide").html(str);

            } else {
                console.log("公告数据加载异常：" + data.message);
            }
        }
    });

    cartonload();
    sw3();
    sw();
    sw2();
    type();
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
function db() {
    window.location.href="cart.html?id="+login.id;
}
function sw() {
    $("#featur").hide();
    $("#on-sal").hide();
    $("#special").show();
    // $(".owl-stage").css("width", s + "px");
    // console.log(s)
    $(".owl-item").css("width", "204px");
    // $("article").css("width", "204px");
    // $("article").css("height", "284.19px");
    $(".owl-stage-outer").css("height","294px");
}

function sw2() {
    $(".owl-stage").css("width", f*10 + "px");
    // $(".owl-stage").css("height", "204px");
    // $(".owl-item").css("width", "204px");
    $(".tab-content").css("height","320px");
    // console.log(f)
    $("#featur").show();
    $("#special").hide();
    $("#on-sal").hide();
}

function sw3() {
    // console.log(o)
    $("#special").hide();
    $("#featur").hide();
    $("#on-sal").show();
    // $(".owl-stage").css("width", o + "px");
    $(".owl-item").css("width", "204px");
    // $(".owl-item").css("width", "204px");
    // $(".product").css("width", "204px");
    // $("article").css("width", "204px");
    // $("article").css("height", "284.19px");
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
//公告字符串拼接
function notice(image,time,title,content,id) {
   return '                    <div class="blog-post">'+
    '                        <article><img class="img-responsive" src="'+image+'" alt=""> <span><i'+
    '                                class="fa fa-bookmark-o"></i> '+time+'</span>'+
    '                            <a href="#." class="tittle">'+title+'</a>'+
    '                            <p>'+content+' [...] </p>'+
    '                            <a href="#.">详情</a></article>'+
    '                    </div>';

}
//特殊字符串拼接
function special(image, brief, name, price, id) {
    var sb = '<div class="product">' +
        '                                <article><img class="img-responsive" src="' + image + '" alt="">' +
        '                                    <!-- Content -->' +
        '                                    <span class="tag">' + name + '</span> <a href="./Product-Details.html?did='+id+'" class="tittle">' + brief + '</a>' +
        '                                    <!-- Reviews -->' +
        '                                    <p class="rev"><i class="fa fa-star"></i><i class="fa fa-star"></i><i' +
        '                                            class="fa fa-star"></i><i class="fa fa-star"></i> <i' +
        '                                            class="fa fa-star-o"></i> <span class="margin-left-10">5 Review(s)</span>' +
        '                                    </p>' +
        '                                    <div class="price">' + price + '</div>' +
        '                                    <a href="#." class="cart-btn"><i class="icon-basket-loaded"></i></a></article>' +
        '                            </div>';
    return sb;
}

//精选字符串拼接
function jingxuan(image, brief, name, price, id) {
    var sb = '<div class="product">' +
        '                                    <article><img class="img-responsive" style="height:115px" src="' + image + '" alt="">' +
        '                                        <!-- Content -->' +
        '                                        <span class="tag">' + name + '</span> <a href="./Product-Details.html?did='+id+'" class="tittle">' + brief + '</a>' +
        '                                        <!-- Reviews -->' +
        '                                        <p class="rev"><i class="fa fa-star"></i><i class="fa fa-star"></i><i' +
        '                                                class="fa fa-star"></i><i class="fa fa-star"></i> <i' +
        '                                                class="fa fa-star-o"></i> <span' +
        '                                                class="margin-left-10">5 Review(s)</span>' +
        '                                        </p>' +
        '                                        <div class="price">' + price + '</div>' +
        '                                        <a onclick="addCart(\''+String(id)+'\',1)" class="cart-btn"><i class="icon-basket-loaded"></i></a></article>' +
        '                                </div>';
    return sb;
}
function addCart(id,count) {
    if(yanzheng(login)){
        return;
    }
    var data={
        "cid":login.id,
        "cleanerid":id,
        "count":count
    };
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
//轮播图字符串拼接
function round(image, brief, name, price, id) {
    var sb = '<li data-transition="random" data-slotamount="7" data-masterspeed="300"  data-saveperformance="off" > ';
    sb += '                    <!-- MAIN IMAGE --> ';
    sb += '                    <img src="' + image + '"  alt="slider" style="width: 720px;height: 500px" data-bgposition="center bottom" data-bgfit="cover" data-bgrepeat="no-repeat"> ';
    sb += '                    ';
    sb += '                    <!-- LAYER NR. 1 -->';
    sb += '                    <div class="tp-caption sfl tp-resizeme" ';
    sb += '                                     data-x="left" data-hoffset="60" ';
    sb += '                                     data-y="center" data-voffset="-110" ';
    sb += '                                     data-speed="800" ';
    sb += '                                     data-start="800" ';
    sb += '                                     data-easing="Power3.easeInOut" ';
    sb += '                                     data-splitin="chars" ';
    sb += '                                     data-splitout="none" ';
    sb += '                                     data-elementdelay="0.03" ';
    sb += '                                     data-endelementdelay="0.4" ';
    sb += '                                     data-endspeed="300"';
    sb += '                                     style="z-index: 5; font-size:30px; font-weight:500; color:#888888;  max-width: auto; max-height: auto; white-space: nowrap;">' + brief + ' </div>';
    sb += '                    ';
    sb += '                    <!-- LAYER NR. 2 -->';
    sb += '                    <div class="tp-caption sfr tp-resizeme" ';
    sb += '                                     data-x="left" data-hoffset="60" ';
    sb += '                                     data-y="center" data-voffset="-60" ';
    sb += '                                     data-speed="800" ';
    sb += '                                     data-start="1000" ';
    sb += '                                     data-easing="Power3.easeInOut" ';
    sb += '                                     data-splitin="chars" ';
    sb += '                                     data-splitout="none" ';
    sb += '                                     data-elementdelay="0.03" ';
    sb += '                                     data-endelementdelay="0.1" ';
    sb += '                                     data-endspeed="300" ';
    sb += '                                     style="z-index: 6; font-size:50px; color:#0088cc; font-weight:800; white-space: nowrap;">' + name + '</div>';
    sb += '                    ';
    sb += '                    <!-- LAYER NR. 3 -->';
    sb += '                    <div class="tp-caption sfl tp-resizeme" ';
    sb += '                                     data-x="left" data-hoffset="60" ';
    sb += '                                     data-y="center" data-voffset="10" ';
    sb += '                                     data-speed="800" ';
    sb += '                                     data-start="1200" ';
    sb += '                                     data-easing="Power3.easeInOut" ';
    sb += '                                     data-splitin="none" ';
    sb += '                                     data-splitout="none" ';
    sb += '                                     data-elementdelay="0.1" ';
    sb += '                                     data-endelementdelay="0.1" ';
    sb += '                                     data-endspeed="300" ';
    sb += '                                     style="z-index: 7;  font-size:24px; color:#888888; font-weight:500; max-width: auto; max-height: auto; white-space: nowrap;">价格：</div>';
    sb += '                    ';
    sb += '                    <!-- LAYER NR. 1 -->';
    sb += '                    <div class="tp-caption sfr tp-resizeme" ';
    sb += '                                     data-x="left" data-hoffset="210" ';
    sb += '                                     data-y="center" data-voffset="5" ';
    sb += '                                     data-speed="800" ';
    sb += '                                     data-start="1300" ';
    sb += '                                     data-easing="Power3.easeInOut" ';
    sb += '                                     data-splitin="chars" ';
    sb += '                                     data-splitout="none" ';
    sb += '                                     data-elementdelay="0.03" ';
    sb += '                                     data-endelementdelay="0.4" ';
    sb += '                                     data-endspeed="300"';
    sb += '                                     style="z-index: 5; font-size:36px; font-weight:800; color:#000;  max-width: auto; max-height: auto; white-space: nowrap;">' + price + '</div>';
    sb += '                    ';
    sb += '                    <!-- LAYER NR. 4 -->';
    sb += '                    <div class="tp-caption lfb tp-resizeme scroll" ';
    sb += '                                      data-x="left" data-hoffset="60" ';
    sb += '                                     data-y="center" data-voffset="80"';
    sb += '                                     data-speed="800" ';
    sb += '                                     data-start="1300"';
    sb += '                                     data-easing="Power3.easeInOut" ';
    sb += '                                     data-elementdelay="0.1" ';
    sb += '                                     data-endelementdelay="0.1" ';
    sb += '                                     data-endspeed="300" ';
    sb += '                                     data-scrolloffset="0"';
    sb += '                                     style="z-index: 8;"><a href="./Product-Details.html?did='+id+'" class="btn-round big">马上抢购</a> </div>';
    sb += '                  </li>';
    return sb;
};
//本周最畅销商品字符串拼接
function week(image,name,keyword,price,id) {
// <span'+
//     '                                class="sale-tag">-25%</span>
   var sb= '<div class="product">'+
       '                        <article><img class="img-responsive" src="'+image+'" alt=""> '+
       '                            <!-- Content -->'+
       '                            <span class="tag">'+name+'</span> <a href="#." class="tittle">'+keyword+'</a>'+
       '                            <!-- Reviews -->'+
       '                            <p class="rev"><i class="fa fa-star"></i><i class="fa fa-star"></i><i'+
       '                                    class="fa fa-star"></i><i class="fa fa-star"></i> <i class="fa fa-star"></i> <span'+
       '                                    class="margin-left-10">5 Review(s)</span></p>'+
       '                            <div class="price">'+price+'</div>'+
       '                            <a href="#." class="cart-btn"><i class="icon-basket-loaded"></i></a></article>'+
       '                    </div>';
    return sb;
}
//净水器类型加载
function type() {
    $.ajax({
        type: "POST",
        url: http + "/kind/list",
        data: null,
//            contentType: "application/json",
        async:false,
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                var list = data.data.list;
                var str="";
                $.each(list,function(n,value){
                    if(value.kpid=="1"){
                        $("#jiayong").append('<li><a href="ListProducts.html?id='+value.kid+'">'+value.ktype+'</a></li>')
                    }else if(value.kpid=="2"){
                        $("#shangyong").append('<li><a href="ListProducts.html?id='+value.kid+'">'+value.ktype+'</a></li>')
                    }
                });
            } else {
                console.log("净水器类型数据加载异常：" + data.message);
            }
        }
    });

}
function findByName() {
        var name=$("#name").val().replace(" ","");
        window.location.href="ListProducts.html?name="+name;
}