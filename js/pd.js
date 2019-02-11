window.onload=function init() {
    var id="35ee7596-22f2-11e9-81ef-00ffaabbccdd";
    // var jss=["js/main.js"];
    $.ajax({
        type: "POST",
        url: http + "/detail/detail",
        data: {
            "id":id
        },
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var detailPic=data.data.detailPic;

                console.log(data)
                $("#product").html(shop(data.data));
                var str="";
                $.each(detailPic,function (n,value) {
                    str+='<img style="margin-left:195px " src="'+value.dpicurl+'" alt="">'
                })
                $("#pic").html(str);
                loadScript('js/main.js', function () {
                    // console.log('onload');
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
function checknumber() {
    var count=$("#count").val();
    if(!(/^(\+|-)?\d+$/.test( count )) || count < 1){
        alert("数量必须是整数！");
        $("#count").val("1");
        $("#count").focus();

    }
}
//html跳转获取url的值

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function shop(data) {
    var keyword=data.keyword.split(" ");
   var str= '                <div class="row"> '+
    '                  <!-- Slider Thumb -->'+
    '                  <div class="col-xs-5">'+
    '                    <article class="slider-item on-nav">'+
    '                      <div class="thumb-slider">'+
    '                        <ul class="slides">';
   for(var i=0;i<data.shopPic.length;i++){

       str+= '                          <li data-thumb="'+data.shopPic[i].dpicurl+'"  > <img src="'+data.shopPic[i].dpicurl+'" alt=""> </li>'
   }
    str+='                        </ul>'+
    '                      </div>'+
    '                    </article>'+
    '                  </div>'+
    '                  <!-- Item Content -->'+
    '                  <div class="col-xs-7"> <span class="tags" style="font-size: 30px;color: black">'+data.name+'</span>'+
    '                    <!--<p class="rev"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> <i class="fa fa-star-o"></i> <span class="margin-left-10">5 Review(s)</span></p>-->'+
    '                    <div class="row">'+
    '                      <div class="col-sm-6" style="width: 30%;margin-left: 20px"><span class="price">$'+data.price+'</span></div>'+
    '                      <div class="col-sm-6" style="margin-top: 5px">'+
    '                        <p style="font-size: 20px;">库存: <span class="in-stock">'+data.count+'</span></p>'+
    '                      </div>'+
    '                    </div>'+
    '                    <!-- List Details -->'+
    '                    <ul class="bullet-round-list" style="font-size: 15px;margin-top: 30px">';

   for(var i=0;i<keyword.length;i++){
       str+=   '<li class="sss">'+keyword[i]+'</li>'
   }
    str+='                    </ul>'+
    '                    <!-- Colors -->'+
    '                    <div class="row">'+
    '                      <!--<div class="col-xs-5">-->'+
    '                        <!--<div class="clr"> <span style="background:#068bcd"></span> <span style="background:#d4b174"></span> <span style="background:#333333"></span> </div>-->'+
    '                      <!--</div>-->'+
    '                      <!-- Sizes -->'+
    '                      <!--<div class="col-xs-7">-->'+
    '                        <!--<div class="sizes"> <a href="#.">S</a> <a class="active" href="#.">M</a> <a href="#.">L</a> <a href="#.">XL</a> </div>-->'+
    '                      <!--</div>-->'+
    '                      <!--<br>-->'+
    '                      <!--<br>-->'+
    '                      <!--<br>-->'+
    '                      <!--<br>-->'+
    '                      <!--<br>-->'+
    '                    </div>'+
    '                    <!-- Compare Wishlist -->'+
    '                    <!--<ul class="cmp-list">-->'+
    '                      <!--<li><a href="#."><i class="fa fa-heart"></i> Add to Wishlist</a></li>-->'+
    '                      <!--<li><a href="#."><i class="fa fa-navicon"></i> Add to Compare</a></li>-->'+
    '                      <!--<li><a href="#."><i class="fa fa-envelope"></i> Email to a friend</a></li>-->'+
    '                    <!--</ul>-->'+
    '                    <!-- Quinty -->'+
    '                    <div class="quinty" style="width: 200px">'+
    '                      <label style="font-size: 15px;color: gray">数量：</label><input id="count" onchange="checknumber()" type="number" value="01" style="width: 60%">'+
    '                    </div>'+
    '                    <a href="http://www.baidu.com" class="btn-round"><i class="icon-basket-loaded margin-right-5"></i>加入购物车</a> </div>'+
    '                </div>';
    return str;
}