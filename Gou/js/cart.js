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
	count:0,
	cartCon: $('.table tbody'),
	totalAmountbox:$('.carAccount .carAccountMain .accountR span i'),
	totalMoneybox:$('.carAccount .carAccountMain .accountR span em'),
	goPay:$('.accountBtn'),
	totalNum:0,
	totalMoney:0,
	init:function(){
		this.readCookie();
		
		var that = this;
		$.getJSON('js/data.json?key='+Math.random(),function(data){
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
						that.pay[k] = littleSum;
						that.totalMoney += littleSum;
						that.totalNum++;
						that.totalMoneybox.html(that.totalMoney);
						that.totalAmountbox.html(that.totalNum);
						tr.attr({
							'colorId': colorId,
							'oneID': k,
							"data-count":dataCount,
							"data-price":dataPrice,
							"data-color":dataColor,
							"data-size":dataSize,
							"data-littleSum":littleSum
						});
						//信息填充
						tr.find("td .divGoods p a img").attr({
							"src": urlColor,
							"alt":description
						});
						tr.find("td .divGoods p.p1 a span").html(description);
						tr.find("td .divGoods p.p2").html("颜色："+ dataColor +"，尺寸："+ dataSize);
						tr.find("td.tag span strong").html(dataPrice);
						tr.find("td input.sum").val(dataCount);
						tr.find("td span.red strong").html(littleSum);
						
						//追加到商品区
						that.cartCon.append(tr);
					});
				})(key);
			}
		});
		this.remove();
		this.increase();
		this.decrease();
		this.goodsSelect();
		this.selectAll();
		this.remove();
		this.delSelected();
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
				var count = $(this).parents('tr.no').attr("data-count");
				var littleSum = $(this).parents('tr.no').attr("data-littleSum");
				that.totalNum -= count;
				that.totalMoney -= littleSum;
				that.totalAmountbox.html(that.totalNum);
				that.totalMoneybox.html(that.totalMoney.toFixed(2));
				//从cookie中删除
				var oneID = $(this).parents('tr.no').attr('oneID');
				//删除  (复习delete)
				delete that.cart[oneID];
				that.setCookie();
			}
		});
	},
	//商品选择
	goodsSelect: function(){
		var that = this;
		this.cartCon.on('change','input.td-checkbox[type="checkbox"]',function(){
			var goodsItem = $(this).parents('tr.no');
			var count = parseInt($(this).parents('tr.no').attr("data-count"));
			//获取商品id
			var oneID = goodsItem.attr('oneID');
			//总价
			var littleSum = goodsItem.attr("data-littleSum")
			//如果已经存在，再点击取消
			if(!goodsItem.find("input[type='checkbox']").prop("checked")){
				delete that.pay[oneID];
			}else{
				that.pay[oneID] = littleSum;
			}
			//判断是否需要选中或者撤销全选按钮的选中状态
			var allCheckBox = that.cartCon.find('input[type="checkbox"]');
			var allChecked = that.cartCon.find('input[type="checkbox"]:checked');
			//比较所有复选框的个数和被选中复选框的个数，如果相等，则全部被选中了
			if(allCheckBox.length == allChecked.length){
				//让全选按钮选中
				$('.select-all-btn').prop('checked',true);
			}else{
				$('.select-all-btn').prop('checked',false);
			}
			//处理页面
			that.handlePay();
		});
	},
	//全选
	selectAll: function(){
		$('.select-all-btn').click(function(){
			//获取自己的状态  选中或者不选中
			var status = $(this).prop('checked');
			var allCheckbox = $('.cartBox input[type="checkbox"]');
			//如果自己选中
			if(status){
				//让所有商品的选择按钮选中
				allCheckbox.prop('checked',true);
			}else{
				//让所有商品的选择按钮不选中
				allCheckbox.prop('checked',false);
			}
			//触发商品前面的复选框
			allCheckbox.change();
		});
	},
	//删除选中的商品
	delSelected: function(){
		var that = this;
		$('#Submit1').click(function(){
			var allChecked = that.cartCon.find('input[type="checkbox"]:checked');
			if(allChecked.length == 0){
				alert('请选择需要删除的商品!!!');
				return;
			}
			if(confirm('确定删除选中的宝贝吗？')){
				//遍历所有被选中的商品
				allChecked.each(function(){
					//获取oneID
					var oneID = $(this).parents('tr.no').attr('oneID');
					var count = $(this).parents('tr.no').attr('data-count');
					//从页面消失
					$(this).parents('tr.no').remove();
					//从cookie中删除
					delete that.cart[oneID];
					that.setCookie();
					//处理结算信息
					delete that.pay[oneID];
					that.handlePay();

				});
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
			// var oneID = $(this).parents('tr.no').attr('oneID');
			var colorId = $(this).parents('tr.no').attr('colorId');
			var price = $(this).parents('tr.no').attr("data-price");
			var stock = that.data[colorId].stock;
			//判断是否大于库存
			if(amount >= stock){
				return;
			}
			amount++;
			$(this).prev().val(amount);
			$(this).parents('tr.no').attr("data-count",amount);
			$(this).parents('tr.no').attr("data-littleSum",amount*price);
			that.handleCookie( $(this).prev() );
		});
	},
	//商品数量减少
	decrease: function(){
		var that = this;
		//-点击
		this.cartCon.on("click",'td a.reduce',function(){
			var price = $(this).parents('tr.no').attr("data-price");
			//input是自己的后一个兄弟
			var amount = $(this).next().val();
			//判断是否大于库存
			if(amount <= 1){
				return;
			}
			amount--;
			$(this).next().val(amount);
			$(this).parents('tr.no').attr("data-count",amount);
			$(this).parents('tr.no').attr("data-littleSum",amount*price);
			that.handleCookie( $(this).next() );
		});
	},
	//数量回写cookie   input
	handleCookie: function(input){
		var goodsItem = input.parents('tr.no');
		var oneID = goodsItem.attr('oneID');
		//处理小计
		var price = goodsItem.attr('data-price');;//单价
		var number = goodsItem.attr('data-count');;//单价
		var littleSumBox = goodsItem.find("td span.red strong");//小计
		//重新显示单价商品总价
		var littleSum = ( number * price )
		littleSumBox.html(littleSum );
		
		//重新给cart中的数量赋值
		this.cart[oneID].count = parseInt( input.val() );
		//回写cookie
		this.setCookie();
		
		//判断当前商品是否被选中
		if(goodsItem.find('input[type="checkbox"]').prop('checked')){
			//改变pay对象里面当前商品的总价
			this.pay[oneID] = littleSum;
			//调用结算商品信息方法
			this.handlePay();
		}
	},
	//处理数量和总价
	handlePay: function(){
		//遍历pay,重新计算总价
		this.totalMoney = 0;
		this.totalNum = 0;
		for(var key in this.pay){
			this.totalNum ++;
			this.totalMoney += parseInt(this.pay[key]);
		}
		//处理结算按钮
		if(this.totalNum > 0){
			this.goPay.addClass('can-pay');
			console.log(true)
		}else{
			this.goPay.removeClass('can-pay');
			console.log(false)
		}
		
		//给总价和总量重新赋值
		this.totalAmountbox.html(this.totalNum);
		this.totalMoneybox.html(this.totalMoney.toFixed(2));
	},
	//设置cookie
	setCookie: function(){
		$.cookie('gou_cart',JSON.stringify(this.cart),{expires:365,path:'/'});
	}
}

cart.init();














})