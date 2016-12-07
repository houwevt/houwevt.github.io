$(function(){
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

//购物车
/*
 	1、读取cookie   readCookie
 	2、设置cookie   setCookie
 	3、将cookie中的数据渲染到页面上   initData
 	4、数量增加
 	5、数量减少
 	6、直接输入
 	7、删除
 	8、选中
 	9、结算信息填充
*/
var cart = {
	data: null,
	cart: {},
	pay: {},
	cartCon: $('.table tbody'),
	init:function(){
		this.readCookie();
		var that = this;
		$.getJSON('js/data.json?key='+Math.random(),function(data){
			/*console.log(data);
			console.log(that.cart);*/
			that.data = data;
			//遍历cookie中的数据，放到页面上
			for(var key in that.cart){
				//利用闭包保留key值
				(function(k){
					var tr = $('<tr class="no"></tr>');
					tr.load('html/goodsInfo.html?key='+Math.random(),function(){
						//获取商品id
						var colorId = that.cart[k]['color-id'];//商品颜色id
						var dataSize = that.cart[k]["size-id"];//商品尺码
						var dataCount = that.cart[k].count;//商品数量
						var dataColor = that.data[colorId].color.color;//商品颜色
						var urlColor = that.data[colorId].color.url;//商品对应颜色图片
						var description = that.data[colorId]["goods-name"];//商品描述
						var dataPrice = that.data[colorId]["goods-sale"]//商品售价
						var littleSum = dataPrice * dataCount;//商品售价小计
						
						//console.log(that.cart[k]);
						//console.log(that.data.colorId);
						//console.log(colorId);
						//console.log(dataSize);
						//console.log(urlColor);
						console.log(dataPrice);
						console.log(dataCount);
						console.log(littleSum);
						//console.log(description);
						tr.attr({
							'colorId': colorId,
							'oneID': k,
						});
						//信息填充
						tr.find("td .divGoods p a img").attr({
							"src": urlColor,
							"alt":description
						});
						tr.find("td .divGoods p.p1 a span").html(description);
						tr.find("td .divGoods p.p2").html("颜色："+ dataColor +"，尺寸："+ dataSize);
						tr.find("td.tag span").html("￥" + dataPrice);
						tr.find("td input.sum").val(dataCount);
						tr.find("td span.red").html("￥" + littleSum);
						//信息填充
						/*ul.find('.goods-size').html( data[gid]['size'][k]);
						ul.find('.goods-price').html( data[gid]['goods-sale'].toFixed(2));
						ul.find('.amount-input').val( that.cart[k].amount );
						var total = that.cart[k].amount * data[gid]['goods-sale'];
						ul.find('.goods-money').html( total.toFixed(2) );*/
						//追加到商品区
						that.cartCon.append(tr);
					});
				})(key);
			}
		});
	},
	//读取cookie
	readCookie: function(){
		this.cart = $.cookie('gou_cart') || '{}';
		//解析
		this.cart = JSON.parse( this.cart );
	},
}

cart.init();














})