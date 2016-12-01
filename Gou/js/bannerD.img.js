
//制作淡入淡出轮播图
function BannerD(banner,time){
	this.banner = banner;
	this.imgWrapper = this.banner.find(".img-wrapper");
	this.imgs = this.imgWrapper.find(".img");
	this.circle = this.banner.find(".circle");
	this.circleWrap = this.banner.find(".circle-wrap");
	this.btn = this.circle.find(".circle-item");
	this.now = 0;
	this.next = 0;
	this.timer = null;
	this.time = time || 2000;
}
BannerD.prototype = {
	constructor: BannerD,
	init:function(){
		this.autoPlay();
		this.item();
		this.hover();
		this.imgs.eq(0).show();
	},
	autoPlay:function(){
		var that = this;
		this.timer = setInterval(function(){
			that.next++;
			that.next %= that.imgs.length;
			that.change();
		},this.time);
	},
	item:function(){
		var that = this;
		this.circle.mouseover(function(e){
			if ($(e.target).is(".circle-item img")){
				that.next = $(e.target).parent().index();
				that.change();
			}
		})
	},
	hover:function(){
		var that = this;
		this.banner.hover(function(){
			clearInterval(that.timer);
		},function(){
			that.autoPlay();
		})
	},
	change:function(){
		this.imgs.eq(this.now).stop(true).fadeOut();
		this.imgs.eq(this.next).stop(true).fadeIn();
		$("#banner").removeClass("bannerBg" + this.now).addClass("bannerBg" + this.next);
		this.btn.eq(this.next).addClass("current").siblings().removeClass("current");
		this.now = this.next;
	}
};