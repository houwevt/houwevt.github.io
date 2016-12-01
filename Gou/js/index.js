$(function(){


//顶部点击“关闭”消失
$(".adTopHide").click(function(){
	$("#adTop").hide();
})

//页面头部
//点击图标跳转首页
$(".headIndex").click(function(){
	window.location = "index.html";
})

var timer0;
//hover 我的麦乐购 出现二级菜单
$(".myGou").hover(function(){
	clearTimeout(timer0);
	//出现二级菜单
	$(".myGouCon").stop(true).slideDown(200);
	//改变背景和边框
	$(".myGou").css({
		"background":"#fff",
		"border":"1px solid #ccc",
	});
	//改变下拉的箭头
	$(".myGouIcon").css({
		"background":"url(img/icon_index.png) no-repeat scroll -69px 0px",
		"top":"8px"
	});
},function(){
	//隐藏二级菜单
	$(".myGouCon").stop(true).slideUp(200);
	timer0 = setTimeout(function(){
		//改变背景和边框
		$(".myGou").css({
			"background":"none",
			"border":"1px solid #f5f5f5",
			"border-bottom":"none"
		});
	},200)
	//改变下拉的箭头
	$(".myGouIcon").css({
		"background":"url(img/icon_index.png) no-repeat scroll -89px -8px",
		"top": "14px"
	});
})
//hover 手机麦乐购 
$(".phone").hover(function(){
	clearTimeout(timer0);
	//出现二维码图片
	$(".phoneImg > img").stop(true).slideDown(200);
	//改变背景和边框
	$(".phone").css({
		"background":"#fff",
		"border":"1px solid #ccc",
		"border-bottom":"none"
	});
},function(){
	//隐藏二维码图片
	$(".phoneImg > img").stop(true).slideUp(200);
	//改变背景和边框
	timer0 = setTimeout(function(){
		$(".phone").css({
			"background":"none",
			"border":"1px solid #f5f5f5",
		});
	},200)
})

//搜索框获焦失焦事件
$(".searchTxt").focus(function(){
	//改变搜索框的边框和value值
	$(this).css({
		"border":"2px solid #cc1d00",
		"border-right":0
	}).val("")
}).blur(function(){
	//重置搜索框的边框和value值
	$(this).css({
		"border":"2px solid #eee",
		"border-right":0
	}).val("请输入商品名称,支持拼音搜索");
})
//商品列表的hover，出现详细列表
$(".listDetail").hover(function(){
	$(this).css({"background":"#a90000"}).find(".goodDetail").show(200).animate({"padding-left": "20px","opacity":1},100);
	
},function(){
	$(this).css({"background":"#cb3e25"}).find(".goodDetail").hide().animate({"padding-left": "10px","opacity":0},100);;
})

//鼠标滑动导航，下标跟随
$(".navItem").hover(function(){
	$(".navBottom").width($(this).find("a").width()).stop(true).animate({"left":$(this).position().left + 12},150)
},function(){
	$(".navBottom").width("32px").stop(true).animate({"left":"12px"},150)
})


//生成一个轮播图
var banner = new BannerD ($(".banner"),3000);
banner.init();

//设置倒计时

function remainTime(){
	//倒计时结束时间
	var end_time = new Date($(".time").attr("data-end"));
	//当前时间
	var now_time = Date.now();
	//时间差
	var time0  =parseInt((end_time - now_time));
	//小时
	var hours = parseInt((end_time - now_time) / 1000 / 60 / 60);
	//小时的十位
	var hours0 = parseInt(hours/10);
	//小时的个位
	var hours1 = hours%10;
	//分钟
	var minutes = parseInt((end_time - now_time) / 1000 / 60 % 60);
	//分钟的十位
	var minutes0 = parseInt(minutes/10);
	//分钟的个位
	var minutes1 = minutes%10;
	//秒钟
	var seconds = parseInt((end_time - now_time) / 1000 % 60);
	//秒钟的十位
	var seconds0 = parseInt(seconds/10);
	//秒钟的个位
	var seconds1 = seconds%10;
	//毫秒
	var ss = parseInt((end_time - now_time) / 100 % 10);
	//判断活动是否结束
	if (hours0 < 0 || hours1 < 0 || minutes0 < 0 || minutes1 < 0 || seconds0 < 0 || seconds1 < 0 || ss < 0) {
		clearInterval(timer_remainTime);
		$(".nainfo").html("本场已结束");
		$(".hour0").html(0);
		$(".hour1").html(0);
		$(".min0").html(0);
		$(".min1").html(0);
		$(".sec0").html(0);
		$(".sec1").html(0);
		$(".hm").html(0);
		return;
	}

	$(".hour0").html(hours0);
	$(".hour1").html(hours1);
	$(".min0").html(minutes0);
	$(".min1").html(minutes1);
	$(".sec0").html(seconds0);
	$(".sec1").html(seconds1);
	$(".hm").html(ss);
};
var timer_remainTime =  setInterval(remainTime,250);

//整点抢购
var rush = {
	container:$(".rushContainer"),
	nav:$(".rushContainer .rushNav"),
	number:$(".rushContainer .rushNav .number"),
	arrowL:$(".rushContainer .arrLeft"),
	arrowR:$(".rushContainer .arrRight"),
	navItem:$(".rushContainer .rushNav .rushNavItem"),
	itema:$(".rushContainer .rushNav .rushNavItem .rushNava"),
	content:$(".rushContainer .rushCon"),
	conItem:$(".rushContainer .rushCon .rushConItem"),
	box:$(".rushContainer .rushCon .rushConItem .rushCha"),
	arrow:$(".rushContainer .rushCon .rusharr"),
	index:0,
	next:0,
	timer:null,
	init:function(){
		this.autoPlay();
		this.click();
		this.hover();
	},
	autoPlay:function(){
		var that = this;
		this.timer = setInterval(function(){
			that.next++;
			that.change();
		},2500)
	},
	click:function(){
		var that = this;
		this.itema.click(function(){
			clearInterval(that.timer);
			that.next = 0;
			that.change();
			that.autoPlay();
			that.index = $(this).parent().index();
			that.navItem.removeClass("rushNavItem-hover").eq(that.index).addClass("rushNavItem-hover");
			that.itema.removeClass("rushNava-hover").eq(that.index).addClass("rushNava-hover");
			that.conItem.eq(that.index).show().siblings().hide();
			that.number.find("i").html("/" + that.conItem.eq(that.index).find(".rushCha").length);
		});
		this.arrowL.click(function(){
			that.next--;
			that.change();
		});
		this.arrowR.click(function(){
			that.next++;
			that.change();
		})
	},
	hover:function(){
		var that = this;
		this.content.hover(function(){
			clearInterval(that.timer);
			that.arrow.show();
		},function(){
			that.arrow.hide();
			that.autoPlay();
		});
		this.number.find(".num").hover(function(){
			clearInterval(that.timer);
			that.arrow.show();
		},function(){
			that.arrow.hide();
			that.autoPlay();
		});
		this.box.find("img").hover(function(){
			$(this).css({
				top:"-10px"
			})
		},function(){
			$(this).css({
				top:0
			})

		})
	},
	change:function(){
		if (this.next >= this.conItem.eq(this.index).find(".rushCha").length) {
			this.next = 0;
		};
		if (this.next < 0) {
			this.next = this.conItem.eq(this.index).find(".rushCha").length - 1;
		};
		this.conItem.stop(true).animate({
			marginLeft:-this.next * this.box.width()
		});
		this.number.find("span").html(this.next + 1);
	}

}
rush.init();

// 今日半价
$(".salesItem").hover(function(){
	$(this).find("img").css({
		left:"10px"
	})
},function(){
	$(this).find("img").css({
		left:0
	})
})

// 天天特卖

$("#everyday .dayCon ul .dayBox .dayImg img").hover(function(){
	$(this).css({
		width:"315px",
		height:"250px",
		left:"-13px",
		right:"-10px"
	});
},function(){
	$(this).css({
		width:"290px",
		height:"230px",
		left:0,
		right:0
	});
})

// 猜你喜欢

var like = {
	container:$("#like .likeBox"),
	box:$("#like .likeBox > ul"),
	arrowL:$("#like .likeTitle .number .numl,#like .likeBox .likeL"),
	arrowR:$("#like .likeTitle .number .numr,#like .likeBox .likeR"),
	likeL:$("#like .likeBox .likeL"),
	likeR:$("#like .likeBox .likeR"),
	num:$("#like .likeTitle .number"),
	now:0,
	next:0,
	timer:null,
	init:function(){
		this.box.eq(0).show();
		this.autoPlay();
		this.hover();
		this.click();
	},
	autoPlay:function(){
		var that = this;
		this.timer = setInterval(function(){
			that.next++;
			that.change();
		},3500)
	},
	hover:function(){
		var that = this;
		this.container.hover(function(){
			clearInterval(that.timer);
			that.likeL.css({
				left:"1px"
			});
			that.likeR.css({
				right:"1px"
			});
		},function(){
			that.autoPlay();
			that.likeL.css({
				left:"-27px"
			});
			that.likeR.css({
				right:"-27px"
			});
		})
	},
	click:function(){
		var that = this;
		this.arrowR.click(function(){
			that.next++;
			that.change();
		})
		this.arrowL.click(function(){
			that.next--;
			that.change();
		})
	},
	change:function(){
		if (this.next >= this.box.length) {
			this.next = 1;
		}
		if (this.next < 0) {
			this.next = this.box.length - 1;
		}
		this.box.eq(this.next).stop(true).fadeIn(200)
		this.box.eq(this.now).stop(true).fadeOut(200);
		this.num.find("span").html(this.next + 1);
		this.now = this.next;
	}
}
like.init();




	
})