window.onload=function () {
    var login=JSON.parse(sessionStorage.getItem("login"));
    $.ajax({
        url: http + "/address/list2",
        type: "post",
        dataType: "json",
        // contentType: "application/json",
        data: {
            "id":login.id
        },
        cache: false,
        async: true,
        success: function (data) {
            var xx={"xx":"xx"}
            var str="";
            $.each(data.data,function (n,value) {
                var item=JSON.stringify(value).replace("{","").replace("}","");
                str+='<div class="address_list">'+
                    '        <div class="list_left">'+
                    '            <p class="pw1">'+value.receiverName+'</p>'+
                    '            <p class="pw1">'+value.phone+'</p>'+
                    '            <p class="pw2">'+value.shengfen+value.chengshi+value.quyu+value.address+'</p>'+
                    '            <a href="#" onclick="del(\''+value.addressId+'\')" class="list_right"><img src="images/deleteico.png" style="margin-left: 10px"></a>'+
                    '            <a href="address_edit.html?addressId='+value.addressId+'" class="list_right"><img src="images/change_adr.png"></a>'+
                    '        </div>'+
                    '    </div>';
            })
            $(".mall_main").append(str)
        },
        error: function (data) {
            alert("服务器出现问题，请联系管理员！")
        }
    });
}
function del(value) {
    if(confirm("您确定要删除？")){
        $.ajax({
            url: http + "/address/delete",
            type: "post",
            dataType: "json",
            // contentType: "application/json",
            data: {
                "id":value
            },
            cache: false,
            async: true,
            success: function (data) {
                alert("删除成功！")
                window.location.reload();
            },
            error: function (data) {
                alert("服务器出现问题，请联系管理员！")
            }
        });
    }

}