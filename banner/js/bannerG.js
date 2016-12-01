
//制作滚动轮播图
function BannerG(banner,time){
	this.banner = banner;
	this.imgWrapper = this.banner.find(".img-wrapper");
	this.imgs = this.imgWrapper.find(".img");
	this.circle = this.banner.find(".circle");
	this.circleWrap = this.banner.find(".circle-wrap");
	this.btn = this.circle.find(".circle-item");
	this.arrow = this.banner.find(".arrow");
	this.arrowLeft = this.banner.find(".arrow-left");
	this.arrowRight = this.banner.find(".arrow-right");
	this.index = 0;
	this.timer = null;
	this.time = time || 2500;
}
BannerG.prototype = {
	constructor: BannerG,
	init:function(){
		this.auto();
		this.autoPlay();
		this.item();
		this.hover();
		this.click();
	},
	autoPlay:function(){
		var that = this;
		var index = this.index;
		this.timer = setInterval(function(){
			that.next();
		},this.time);
	},
	item:function(){
		var that = this;
		this.circle.on("click",".circle-item",function(e){
			if ($(e.target).is(".circle-item")){
				that.index = $(e.target).index();	
				that.change();
			}
		})
	},
	hover:function(){
		var that = this;
		this.banner.hover(function(){
			clearInterval(that.timer);
			that.arrow.show();
		},function(){
			that.arrow.hide();
			that.autoPlay();
		})
	},
	change:function(){
		var that = this;
		if (this.index == this.imgs.length - 1) {
			this.btn.eq(0).addClass("current").siblings().removeClass("current");
		}
		if (this.index >= this.imgs.length) {
			this.index = 1;
			this.imgWrapper.css({
				marginLeft:0
			})
		};
		if (this.index <= -1) {
			this.index = this.imgs.length - 2;
			this.imgWrapper.css({
				marginLeft:-(this.imgs.width())*(this.imgs.length - 1)
			});
		}
		this.imgWrapper.stop().animate({
			marginLeft:-this.index * this.imgs.width()
		},500,"linear");
		this.btn.eq(this.index).addClass("current").siblings().removeClass("current");
	},
	next:function(){
		this.index++;
		this.change();
	},
	click:function(){
		var that = this;
		this.arrowRight.click(function(){
			that.index++;
			that.change();
		});
		this.arrowLeft.click(function(){
			that.index--;
			that.change();
		});
	},
	auto:function(){
		this.banner.one(function(){
			this.css({
			width:$(window).width(),
			//height:$(window).height()
		})
		}
			
			)
	}
};
