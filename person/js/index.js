
var login=JSON.parse(sessionStorage.getItem("login"));
console.log(login);
$("#pic").attr("src",login.pic);
$("#name").text(login.userinfo.name);
$(".p1").text("会员ID："+login.id);
$("#registerdate").text("注册时间：："+login.registerdate);