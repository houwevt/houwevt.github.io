$(function(){
$("#foot").load("html/foot.html");
//新生成一个放大镜
var glass = new Glass ($(".glass"));
glass.init();

var detail = {
	goodsId:$("#detail").attr("data-id"),//获取商品id
	countId:$("ul .number .dd .count span").html(),//获取商品数量
	colorId:$("ul .color .dd a.active").attr("data-color"),//获取颜色（物品号）
	sizeId:$("ul .size .dd a.active").attr("data-size"),//尺码
	add:$("ul .number .dd .count a.add"),//数量 +
	reduce:$("ul .number .dd .count a.reduce"),//数量 -
	count:$("ul .number .dd .count span"),//购买数量
	color:$("ul .color .dd a"),//颜色
	size:$("ul .size .dd a"),//尺码
	stk:$("ul .number .dd > p span"),
	buy:$("ul .buy a"),
	objSize:{},//同一颜色商品的尺码表
	dataSize:"",
	amount:0,
	index:0,
	data:{},
	oneID:0,
	init:function(){
		//方法调用
		this.initData(this.colorId);
		this.countChange();
		this.stock();
		this.oneID = this.colorId + this.sizeId;
	},
	initData:function(colorId){
		var that = this;
		$.getJSON('js/data.json',function(result){
			that.data = result[colorId];
			that.amount = that.data.stock;
			that.objSize = that.data.size;
			that.dataSize = that.objSize[that.sizeId];
			that.click();
			that.sizeChange();
			that.addCookie();
		})
	},
	click:function(){
		var that = this;
		//点击颜色或尺码选项使，出现选中标识
		this.color.click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			var index = $(this).index() + 1;
			$(".glass .small img").attr("src","img/g" + index +".jpg");
			$(".glass .large img").attr("src","img/g" + index +".jpg");
			$("#detail .proLeft .moreImg .imgWrapper img").eq(index-1).addClass("hover").siblings().removeClass("hover");
			//显示库存
			that.colorId = $(this).attr("data-color");
			that.stock();
			that.index = 1;
			that.count.html(1);
			that.oneID = that.colorId + that.sizeId;
		})
	},
	stock:function(){
		var that = this;
		$.getJSON('js/data.json',function(result){
			that.data = result[that.colorId];
			that.amount = that.data.stock;
			that.stk.html(that.amount)
		})
	},
	sizeChange:function(){
		var that = this;
		this.size.click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			that.sizeId = $(this).attr("data-size")
			that.objSize = that.data.size;
			that.dataSize = that.objSize[that.sizeId];
			that.oneID = that.colorId + that.sizeId;
		})
	},
	countChange:function(){
		var that = this;
		this.add.click(function(){
			that.index++;
			if (that.index >= that.amount) {
				that.index = that.amount;
			}
			that.count.html(that.index);
		})
		this.reduce.click(function(){
			that.index--;
			if (that.index <= 0) {
				that.index = 1;
			}
			that.count.html(that.index);
		})
	},
	addCookie:function(){
		var that = this;
		this.buy.click(function(){
			var cart = $.cookie('gou_cart')  || '{}';
			var count = that.count.html();
			cart = JSON.parse( cart );
			//判断购物车是否已经存在当前商品
			if(cart[that.oneID]){
				cart[that.oneID].count += parseInt(count);
			}else{
				cart[that.oneID] = {
					"goods-id": that.goodsId,
					"size-id": that.dataSize,
					"count": parseInt(count),
					"color-id":that.colorId
				};
			};
			$.cookie('gou_cart',JSON.stringify(cart),{expires:365,path: '/'});
			console.log( JSON.parse( $.cookie('gou_cart') ) );
		})
	}
}
detail.init();
















})