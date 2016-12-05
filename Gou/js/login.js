$(function(){

$("#username,#psw").focus(function(){
	//改变搜索框的边框和value值
	$(this).parent().css({
		"border":"1px solid #82b4ff"
	});
}).blur(function(){
	//重置搜索框的边框和value值
	$(this).parent().css({
		"border":"1px solid #ccc"
	});
})
$("#code").focus(function(){
	//改变搜索框的边框和value值
	$(this).css({
		"border":"1px solid #82b4ff"
	});
}).blur(function(){
	//重置搜索框的边框和value值
	$(this).css({
		"border":"1px solid #ccc"
	});
})

//生成一个随机小数
var num = Math.random();
$(".change,.changeImg").click(function(){
	$(".changeImg").attr("src","http://www.gou.com/verifyImg.aspx?r="+num.toFixed(16))
})







})







