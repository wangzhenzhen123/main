(function($){
   var pics = [
          './images/arrow.png',
          './images/bg1.jpg',
          './images/bg2.jpg',
          './images/bg3.jpg',
          './images/bg4.jpg',
          './images/bg5.jpg',
          './images/bg6.jpg',
          './images/bg7.jpg',
          './images/gth.png',
          './images/nzdm_big.png',
          './images/nzdm_small.png',
          './images/p1-1-1.png',
          './images/p1_03.png',
          './images/p2-1.png',
          './images/p2-2.png',
          './images/p2-3.png',
          './images/p2-4.png',
          './images/p2_ren.png',
          './images/p4_1.png',
          './images/p4_2.png',
          './images/p4_3.png',
          './images/p4_4.png',
          './images/p5-1-2.png',
          './images/p5-2.png',
          './images/p5-3.png',
          './images/p5-4.png',
          './images/p5-10.png',
          './images/p6-1-2.png',
          './images/p6_03.png',
          './images/p6_06.png',
          './images/p6_07.png',
          './images/p6_08.png',
          './images/p7-1.png',
          './images/p7-2.png',
          './images/p7-3.png',
          './images/p7-4.png',
          './images/p7_05.png',
          './images/p8_1.png',
          './images/p8-2-1.png'
      ],
      loader={
          init:function(){
             // 调用loadImages这个方法，加载图片
             this.loadImages(pics,function(){
                 $(".global").css("display","block");
                 $(".loading").css("display","none");
                 swiper.init();
             });
          },
          loadImages:function(pics,callback){
             var newPics=[],     // 存放所有的图片对象
                 img,            // 图片对象
                 loadedCount=0, // 被加载的图片总数
                 _this=this;
             
             function loadPostImg(){
                // 计算加载比例
                var percent=loadedCount/pics.length;  //1/39
                if(loadedCount==pics.length-1){
                    _this.drawPercent(1);
                    callback && callback();
                    return;
                }else{
                    loadedCount++;
                }
                _this.drawPercent(percent);
             }
             // 加载图片
             for(var i=0,len=pics.length;i<len;i++){
                 // 动态加载图片:1、创建一个img对象,2、指定img对象的src属性，触发onload事件
                 newPics[i]=new Image();
                 newPics[i].onload=function(){
                     loadPostImg();
                 }
                 newPics[i].src=pics[i];
             }
          },
          drawPercent:function(p){
              p=Math.ceil(p*100)>=100?100:Math.ceil(p*100);
              $(".loading-progress").css("width",p+'%');
              $(".loading-num").text(p+'%');
          }
      },
      swiper={
          animate:function(index){
              var $layout=$(".global>.layout");
              if(index==$layout.length-1){
                  $(".swipe_tip").removeClass("fadeOutUp");
              }else{
                  $(".swipe_tip").addClass("fadeOutUp");
              } 
          },
          init:function(){
              var _this= this;
              var initialSlide = 0;
              _this.swiper = new Swiper('body', {
                  wrapperClass: 'global',
                  slideClass: 'layout',
                  mode: 'horizontal',
                  initialSlide: initialSlide,
                  noSwiping: true,
                  loop:true,
                  preventClicksPropagation: false,
                  // 每次翻页触发的回调函数
                  onSlideChangeStart: function (swiper, direction) {
                      _this.animate(swiper.activeIndex);  // 每一页的索引
                  }
              });
          }
      }
      loader.init();
})(Zepto)