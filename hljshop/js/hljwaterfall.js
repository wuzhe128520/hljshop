/**
 * Created by Administrator on 2016/11/21.
 *
 *  1、参数不确定
 *  2、宽度分区不确定()
 *  3、覆盖函数里面的参数
 */
var HLJwaterfall = {
          /*
          * $target: 需要瀑布流显示的所有图片，通常是个class
          * extendObj: 扩展属性
          * container: 瀑布流容器id
          * */
          //初始化
          init: function($target,$container,extendObj){
              var self = this,
                  columnsObj = self.calcColumn();
                  self.target = $target;
                  self.container = $container;
                  if(!extendObj){
                      extendObj={};
                  }
                  $.extend(extendObj,{numOfCol: columnsObj.column});
                  self.container.width(columnsObj.conWidth);
                  self.loadImg(extendObj);
            //延迟函数的执行，在函数最后一次调用时刻的100毫秒之后。
              var newResizeFn = _.debounce(self.resize,500),
                  newScrollFn = _.debounce(self.scroll,500);
              //绑定窗口事件
              $(window).off("resize.lazy").on("resize.lazy",newResizeFn);
              //绑定滚轮事件
              $(window).off("scroll.window").on("scroll.window",newScrollFn);

          },
          //懒加载图片
          loadImg: function(lazyObj){
              var self = this;
              var defaultObj = {
               /*     placeholder: "images/loding.gif",*/
                    load: function(){
                        self.responseImg(lazyObj||{});
                    }
              };
                   self.target.lazyload(defaultObj);
          },
         //响应式图片
          responseImg: function(extendObj){
              var self = this;
              var param = {
                  offsetX: 8,
                  offsetY: 10
              };
              if(extendObj){
                  $.extend(param,extendObj);
              }
              self.container.BlocksIt(param);
          },
        //窗口大小改变事件
        resize: function(event){
                var columnsObj = HLJwaterfall.calcColumn(),
                    conWidth = columnsObj.conWidth,
                    column = columnsObj.column;
                if(conWidth != HLJwaterfall.currentWidth) {
                    HLJwaterfall.currentWidth = conWidth;
                    HLJwaterfall.container.width(conWidth);
                    var resizeObj = {
                        numOfCol: column
                    };
                    HLJwaterfall.loadImg(resizeObj);
                }
            console.log("窗口改变了……");
         },
        //计算列数
        calcColumn: function() {
            var winWidth = $(window).width(),
                column = 2;
            if(winWidth < 805) {
                conWidth = 543;
                column  = 2;
            }
            else if(winWidth < 1076) {
                conWidth = 805;
                column = 3;
            } else if(winWidth < 1374) {
                conWidth = 1076;
                column = 4;
            } else if(winWidth < 1674) {
                conWidth = 1374;
                column = 5;
            } else {
                conWidth = 1674;
                column = 6;
            }
            return {conWidth: conWidth,column: column};
        },
       //鼠标滚动到接近底部时，加载更多图片
        scroll: function(){
            if ($(document).height() - $(this).scrollTop() - $(this).height() < 150) {
                console.log("加载更多…………");
                $('#container').append($("#more").html());
                HLJwaterfall.loadImg();
            }
        }
 };