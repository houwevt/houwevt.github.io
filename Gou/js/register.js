$("#phone,#psw,#psw2,#code,#mes").focus(function(){
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
//手机号正则
var phoneReg = /^1[34578]\d{9}$/;
//密码正则，字母开头，6~18位，仅含字符、数字和下划线
var pswReg = /^[a-zA-Z]\w{5,17}$/;

var phone = $("#phone").val().trim();
var password1 =$("#psw").val().trim();
var password2 =$("#psw2").val().trim();
$("#phone,#psw,#psw2").blur(function(){
	if (phone == "") {
		$(".phoneCon").find("span").html("请输入的手机号")
	}
	if (!phoneReg.test(phone)) {
		$(".phoneCon").find("span").html("您输入的手机号码格式错误，请重新输入")	
	}
})
/*$("#phone").on("input",function(){
	if (/^\d{1,11}$/) {
		// $("#phone").val("")
		console.log(1)
	}
})*/
$("#psw").blur(function(){
	if (password1 == "") {
		$(".pswCon").find("span").html("请输入密码")
	}
	if (!pswReg.test(password1)) {
		$(".pswCon").find("span").html("您输入的密码格式错误，请重新输入")	
	}
})
$("#psw2").blur(function(){
	if ($("#psw").val() != $("#psw2").val()) {
		$(".psw2Con").find("span").html("您两次输入的密码不一致")	
	}
})

