function headLoad(){
	// 拖拽的小熊
	$("#bearCart").mousedown(function(e){
		var that = $(this);
		e.preventDefault();
		var tleft = e.offsetX;
		var ttop = e.offsetY;
		$(document).mousemove(function(e){
			var l = e.clientX - tleft;
			var t = e.clientY - ttop,
			l = l < 0 ? 0 : (l >= $(window).width() - that.width() ? $(window).width() - that.width() : l);
			t = t < 0 ? 0 : (t >= $(window).height() - that.height() ? $(window).height() - that.height() : t);
			that.css({
				left:l,
				top:t
			});
		});
	});
	//侧边栏
	$("#right .rServ").hover(function(){
		$(this).find("a").stop(true).animate({
			left:-225
		},300);
	},function(){
		$(this).find("a").stop(true).delay(200).animate({
			left:0
		},200);
	})
	$("#right .rbottom li").hover(function(){
		$(this).find("span,.dimensionImg").stop(true).animate({
			left:-80
		},300);
		$(this).find(".dimensionImg").stop(true).animate({
			left:-240
		},300);
	},function(){
		$(this).find("span").stop(true).animate({
			left:0
		},300);
		$(this).find(".dimensionImg").stop(true).animate({
			left:0
		},300)
	})
	
	//鼠标抬起时，模态框取消拖拽
	$("#bearCart").mouseup(function(){
		$(document).off();
	});
	//顶部点击“关闭”消失
	$(".adTopHide").click(function(){
		$("#adTop").hide();
	})
	//hover 我的麦乐购 出现二级菜单
	var timer0;
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

		//改变背景和边框
		timer0 = setTimeout(function(){$(".myGou").css({
			"background":"none",
			"border":"1px solid #f5f5f5",
			"border-bottom":"none"
		})},200);
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
	$("#logo .searchTxt").focus(function(){
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
		$(this).css({"background":"#a90000"}).find(".goodDetail").show().stop(true).delay(200).animate({"padding-left": "20px","opacity":1},100);
		
	},function(){
		$(this).css({"background":"#cb3e25"}).find(".goodDetail").hide().stop(true).delay(100).animate({"padding-left": "10px","opacity":0},100);;
	})
	
	//鼠标滑动导航，下标跟随
	var navBottomW = $(".navBottom").width();
	var navBottomL = $(".navBottom").css("left");
	$(".navItem").hover(function(){
		$(".navBottom").width($(this).find("a").width()).stop(true).animate({"left":$(this).position().left + 12},150)
	},function(){
		$(".navBottom").width(navBottomW).stop(true).animate({"left":navBottomL},150)
	})
	
	//判断商品列表是否需要下滑出现
	if ($("#nav .goods .goodList").css("display") == "none") {
		$("#nav .goods").hover(function(){
			$(this).find(".goodList").show();
		},function(){
			$(this).find(".goodList").hide();
		});
	}
}
$("#header").load("html/head.html",function(){
	headLoad();
})
