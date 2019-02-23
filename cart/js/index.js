var login=JSON.parse(sessionStorage.getItem("login"));
window.onload=function () {



    $.ajax({
        type: "POST",
        url: http + "/cart/cartonload",
        data: {
            "cid":login.id
        },
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var list=data.data.list;
                console.log(list)
                if(list.length==0){
                    $("#pro").html("");
                    loadScript('js/shoppingcart.js', function () {
                        // console.log('onload');
                    });
                    koncat();
                    TotalPrice();
                    return;
                }
                var str="";
                for(var i=0;i<list.length;i++){
                    str+='<div class="product-box">'+
                        '            <div class="product-ckb"><em class="product-em" ></em></div>'+
                        '            <div class="product-sx">'+
                        '                <a href="###">'+
                        '                    <img src="'+list[i].picurl+'" class="product-img" />'+
                        '                    <span class="product-name">'+list[i].shopname+'</span>'+
                        '                </a>'+
                        '                <span class="product-price">¥&thinsp;<span class="price">'+list[i].price+'</span></span>'+
                        '                <div class="product-amount">'+
                        '                    <div class="product_gw">'+
                        '                        <em class="product-jian">-</em>'+
                        '                        <input type="text" name="'+list[i].cartid+'" value="'+list[i].count+'" class="product-num"/>'+
                        '                        <em class="product-add">+</em>'+
                        '                    </div>'+
                        '                </div>'+
                        '                <div class="product-del"><img src="img/deleteico.png"/></div>'+
                        '            </div>'+
                        '        </div>';
                }
                $("#pro").html(str);
                loadScript('js/shoppingcart.js', function () {
                    // console.log('onload');
                });

            } else {
            }
        },
        error:function (data) {
            alert("请先去添加购物车");
            window.parent.location.href="../index.html";
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
