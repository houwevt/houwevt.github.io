$(function(){
$("#foot").load("html/foot.html");

var glass = new Glass ($(".glass"));
glass.init();

//点击颜色或尺码选项使，出现选中标识
$("ul .color .dd a,ul .size .dd a").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
})


})