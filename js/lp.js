var max=0;
var kid="";
var p=1;
var name="";
var id="";
var max1="";
var min="";
var total=0;
var tt=0;
window.onload=function () {
    type();
    shop(p);
    pagination();

}
function shop(page) {
    p=page;
    if(p>max){
        p=max;
    }else if(p<1){
       p=1;
    }
    p=page;
    $.ajax({
        type: "POST",
        url: http + "/cleaner/list",
        async: false,
        data: {
            "page":p,
            "name":name,
            "id":id,
            "min":min,
            "max":max1
        },
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                console.log(data)
                total=data.data.total;
                // console.log(total)
                var list = data.data.list;
                if(list.length==0){
                    alert("数据不存在");
                    return;
                }
                var str="";
                $.each(list,function(n,value){
                    str+=list_shop(value.cpicurl,value.cname,value.ckeyword,value.cprice,value.ccount,value.cid);
                });
                $("#list_s").html(str);
                id="";
                if(tt!=0){
                    pagination();
                }


            } else {
                console.log("净水器类型数据加载异常：" + data.message);
            }
        }
    });
}
function pagination() {
    tt=0;
   var str="";
   // console.log(total);
   var str='<li><a onclick="shop(p--)" href="#" aria-label="Previous"> <i class="fa fa-angle-left"></i> </a></li>'
    for(var i=0;i<total/10;i++){
        max=i+1;
        str+= '                <li><a href="#" onclick="shop(this.text)">'+(i+1)+'</a></li>';
    }
    str+='<li><a onclick="shop(p++)" href="#" aria-label="Next"> <i class="fa fa-angle-right"></i> </a></li>'
    $(".pagination").html(str);
    $(".pagination").css({
        position: "absolute",
        left: ($('#list_s').width() - $(".pagination").outerWidth())/2,
    });
}
function checkbox_single(n) {
    var checks=$(":checkbox");
   if(checks[n].checked==true){
       kid=checks[n].value
   }else {
       kid="";
   }
    checks.splice(n,1)
    $.each(checks,function (n,value) {
      value.checked=false;
    })
}

function type() {

    $.ajax({
        type: "POST",
        url: http + "/kind/list",
        data: null,
//            contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                var list = data.data.list;
                var str = "";
                $.each(list, function (n, value) {
                    $("#type").append('  <li>'+
                        '        <input onclick="checkbox_single('+n+')" value="'+value.kid+'" id="cate'+n+'" class="styled" type="checkbox" >'+
                        '         <label for="cate'+n+'"> '+value.ktype+' </label>'+
                        ' </li>')
                    if (value.kpid == "1") {
                        $("#jiayong").append('<li><a href="#.">' + value.ktype + '</a></li>')
                    } else if (value.kpid == "2") {
                        $("#shangyong").append('<li><a href="#.">' + value.ktype + '</a></li>')
                    }
                });
            } else {
                console.log("净水器类型数据加载异常：" + data.message);
            }
        }
    });
}

function list_shop(image,name,keyword,price,count,total,id) {
    keyword=keyword.split(" ");
    var str= '<div class="product">'+
        '                <article>                   '+
        '                  <!-- Product img -->'+
        '                  <div class="media-left">'+
        '                    <div class="item-img"> <img class="img-responsive" src="'+image+'" alt="" >  </div>'+
        '                  </div>                  '+
        '                  <!-- Content -->'+
        '                  <div class="media-body">'+
        '                    <div class="row">                       '+
        '                      <!-- Content Left -->'+
        '                      <div class="col-sm-7"> <span class="tag"></span> <a href="#." class="tittle" style="font-size: 20px">'+name+'</a> '+
        '                        <!-- Reviews -->'+
        '                        <p class="rev"></p>'+
        '                        <ul class="bullet-round-list">';
       for(var i=0;i<keyword.length;i++){
           if(i<4)
           str+= '<li>' +keyword[i]+
               '</li>'
       };

        str+='                        </ul>'+
        '                      </div>                      '+
        '                      <!-- Content Right -->'+
        '                      <div class="col-sm-5 text-center"> <a href="#." class="heart"><i class="fa fa-heart"></i></a> <a href="#." class="heart navi"><i class="fa fa-navicon"></i></a>'+
        '                        <div class="position-center-center">'+
        '                          <div class="price">¥'+price+'</div>'+
        '                          <p>库存: <span class="in-stock">'+count+'</span></p>'+
        '                          <a href="#." class="btn-round"><i class="icon-basket-loaded"></i>加入购物车</a> </div>'+
        '                      </div>'+
        '                    </div>'+
        '                  </div>'+
        '                </article>'+
        '              </div>';
    return str;
}
function jiansuo() {
    min=$("#price-min").html().replace("$","");
    max1=$("#price-max").html().replace("$","");
    var checks=$(":checkbox");
    $.each(checks,function (n,value) {
        if(value.checked==true){
            id=value.value;
        }
    });
    p=1;
    tt=1;
    shop(p);
}
function findByName() {
    name=$("#name").val().trim();
    if(name.length==0){
        alert("搜索框不能为空");
        return;
    }
    p=1;
    tt=1;
    shop(p);
}