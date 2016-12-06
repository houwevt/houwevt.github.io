
function Glass(glass){
	this.glass = glass;
	this.filter = this.glass.find(".filter");
	this.small = this.glass.find(".small");
	this.large = this.glass.find(".large");
	this.smallImg = this.small.find("img");
	this.largeImg = this.glass.find(".largeImg");
	this.littleImg = this.glass.parent().find("img");
	this.arrowL = this.glass.parent().find(".arrowL");
	this.arrowR = this.glass.parent().find(".arrowR");
	this.box = this.glass.parent().find(".box");
	this.index = 0;
}

Glass.prototype = {
	constructor: Glass,
	//初始化方法
	init:function(){
		this.move();//鼠标移动时出现放大镜效果
		this.hover();//鼠标移入移出时放大镜显示和消失
		this.click();
	},
	move:function(){
		var that = this;
		$(".small").mousemove(function(e){
			var l = e.pageX-that.glass.offset().left;
			var t = e.pageY-that.glass.offset().top;
			var c = that.largeImg.width()/that.small.width();
			
			//console.log(l,t);
			
			var wSmall = that.small.width();
			var hSmall = that.small.height();
			var hFilter = that.filter.height();
			var wFilter = that.filter.width();
			//对滤镜和大图位置做处理
			l = l < wFilter/2 ? wFilter/2 :(l > (wSmall - wFilter/2) ? (wSmall - wFilter/2) : l);
			t = t < hFilter/2 ? hFilter/2 :(t > (hSmall - hFilter/2) ? (hSmall - hFilter/2) : t);

			//改变滤镜和大图的位置
			that.filter.css({
				left:l-wFilter/2,
				top:t-wFilter/2
			});
			that.largeImg.css({
				left:-c*(l-wFilter/2),
				top:-c*(t-wFilter/2)
			});
		});
	},
	hover:function(){
		var that = this;
		this.small.hover(function(){
			that.filter.show();
			that.large.show();
		},function(){
			that.filter.hide();
			that.large.hide();
		});
		this.littleImg.hover(function(){
			$(this).addClass("hover").siblings().removeClass("hover");
			var src = $(this).attr("src");
			that.smallImg.attr("src",src);
			that.largeImg.attr("src",src);
		})
	},
	click:function(){
		var that = this;
		this.arrowR.click(function(){
			that.index++;
			that.change();
		});
		this.arrowL.click(function(){
			that.index--;
			that.change();
		});
	},
	change:function(){
		var that = this;
		if (this.index >= this.littleImg.length -7) {
			this.index = 0;
		};
		if (this.index <= -1) {
			this.index = this.littleImg.length - 8;
		}
		this.box.stop(true).animate({
			marginLeft:-this.index * 61
		},500,"linear");
	}
}