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
						console.log(k);
						//console.log(that.data.colorId);
						//console.log(colorId);
						//console.log(dataSize);
						//console.log(urlColor);
						//console.log(dataPrice);
						//console.log(dataCount);
						//console.log(littleSum);
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
		this.remove();
		this.increase();
		this.decrease();
	},
	//读取cookie
	readCookie: function(){
		this.cart = $.cookie('gou_cart') || '{}';
		//解析
		this.cart = JSON.parse( this.cart );
	},
	//单件商品删除
	remove: function(){
		var that = this;
		this.cartCon.on('click','td a.delete',function(){
			if( confirm('确定删除宝贝吗？') ){
				//当前商品从页面消失
				$(this).parents('tr.no').remove();
				//从cookie中删除
				var oneID = $(this).parents('tr.no').attr('oneID');
				//删除  (复习delete)
				delete that.cart[oneID];
				that.setCookie();
			}
		});
	},
	//商品数量增加
	increase: function(){
		var that = this;
		//+点击
		this.cartCon.on("click",'td a.add',function(){
			//input是自己的前一个兄弟
			var amount = $(this).prev().val();
			//获取商品id和库存
			var colorId = $(this).parents('tr.no').attr('colorId');
			var stock = that.data[colorId].stock;
			//判断是否大于库存
			if(amount >= stock){
				return;
			}
			amount++;
			$(this).prev().val(amount);
			//调用会写cookie功能
			that.handleCookie( $(this).prev() );
		});
	},
	//商品数量减少
	decrease: function(){
		var that = this;
		//-点击
		this.cartCon.on("click",'td a.reduce',function(){
			//input是自己的后一个兄弟
			var amount = $(this).next().val();
			//判断是否大于库存
			if(amount <= 1){
				return;
			}
			amount--;
			$(this).next().val(amount);
			that.handleCookie( $(this).next() );
		});
	},
	//数量回写cookie   input
	handleCookie: function(input){
		var goodsItem = input.parents('tr.no');
		var oneID = goodsItem.attr('oneID');
		
		//处理总价
		var price = parseFloat(goodsItem.find('td.tag span').html() );
		var totalMoneyBox = $(".carAccount .carAccountMain .accountR span em");
		//重新显示单价商品总价
		var totalMoney = ( parseInt(input.val()) * price ).toFixed(2)
		totalMoneyBox.html( totalMoney );
		
		//重新给cart中的数量赋值
		this.cart[oneID].count = parseInt( input.val() );
		//回写cookie
		this.setCookie();
		
		//判断当前商品是否被选中
		if(goodsItem.find('input[type="checkbox"]').prop('checked')){
			//改变pay对象里面当前商品的总价
			this.pay[oneID] = totalMoney;
			//调用结算商品信息方法
			this.handlePay();
		}
	},
	//处理数量和总价
	handlePay: function(){
		var goodsAmount = $('.carAccount .carAccountMain .accountR span i');
		var goodsMoney = $('.carAccount .carAccountMain .accountR span em');
		var goPay = $('.accountBtn');
		//遍历pay对象，获取件数和总价
		var totalNum = 0;
		var totalMoney = 0;
		for(var key in this.pay){
			totalNum++;
			totalMoney += parseFloat(this.pay[key]);
		}
		//处理结算按钮
		if(totalNum > 0){
			goPay.addClass('can-pay');
		}else{
			goPay.removeClass('can-pay');
		}
		//给总价和总量重新赋值
		goodsAmount.html(totalNum);
		goodsMoney.html(totalMoney.toFixed(2));
	},
	//设置cookie
	setCookie: function(){
		$.cookie('gou_cart',JSON.stringify(this.cart),{expires:365,path:'/'});
	}
}

cart.init();














})