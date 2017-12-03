<template>
</template>
<script>
/*
        imgStore : {
            imgList:[]
            }
*/
export default {
  props: {
      scale_number: { // scale number
          type: Number
      },
      imageStore: {
          type: Array
      }
  },
  data () {
    return {
    }
  },
  mounted () {
    var self = this;
    //初始化的model数据
    self.model.set({
        clockWiseAngle: 0,//初始化的 顺时针转换角度
        antiClockAngle: 0,//初始化的 逆时针转换角度
        startScale: 1,//初始化的 放大比例
        previewNode: null,//预览图片节点
        data: [],
    })
    self.els.previewNode.attr('src', src);
    self.els.previewContainer.show();
  },
  methods: {
      dragStartHandler () {
              self.model.set('dragStartX',e.clientX);
              self.model.set('dragStartY',e.clientY);
      },
      dragEndHandler () {
              var containerNode = $(self.els.loanImgContainer.domNode);
              var scrollLeft = e.clientX - self.model.get('dragStartX');
              var scrollTop = e.clientY - self.model.get('dragStartY');
              var currentScrollTop = containerNode.scrollTop();
              var currentScrollLeft = containerNode.scrollLeft();
              containerNode.animate({'scrollLeft':currentScrollLeft - scrollLeft},20);
              containerNode.animate({'scrollTop':currentScrollTop - scrollTop},20);
      },
      execute (){
                        var buttonClassName = this.get('class');
                        switch (true) {
                            case !!(buttonClassName.indexOf('magnify_top_left') >= 0):
                                lang.hitch(self, eventHandler.operateImg)('expandOriginTopLeft', {isShrink: false});
                                break;//放大
                            case !!(buttonClassName.indexOf('narrow_top_left') >= 0):
                                lang.hitch(self, eventHandler.operateImg)('expandOriginTopLeft', {isShrink: true});
                                break;//缩小
                            case !!(buttonClassName.indexOf('magnify_center') >= 0):
                                lang.hitch(self, eventHandler.operateImg)('expandOriginCenter', {isShrink: false});
                                break;//放大
                            case !!(buttonClassName.indexOf('narrow_center') >= 0):
                                lang.hitch(self, eventHandler.operateImg)('expandOriginCenter', {isShrink: true});
                                break;//缩小
                            case !!(buttonClassName.indexOf('adaptive') >= 0)://窗口适应
                                lang.hitch(self, eventHandler.operateImg)('adaptive', {});
                                break;//缩小
                            case !!(buttonClassName.indexOf('rotate_clock') >= 0) :
                                lang.hitch(self, eventHandler.operateImg)('rotate', {clockwise: true});
                                break;//正时针旋转
                            case !!(buttonClassName.indexOf('rotate_anti-clock') >= 0) :
                                lang.hitch(self, eventHandler.operateImg)('rotate', {clockwise: false});
                                break;//反时针旋转
                            case !!(buttonClassName.indexOf('previous') >= 0) :
                                lang.hitch(self, eventHandler.operateImg)('previous', {});
                                break;//上一张
                                case !!(buttonClassName.indexOf('next') >= 0) :
                                lang.hitch(self, eventHandler.operateImg)('next', {});
                                break;//下一张
                        }
      }, 
        showNav: function (e) {
            var self = this;
            console.log(e);
            var targetNode = e.currentTarget;
            self.els.previewContainer.hide();//hide preview
            self.els.preview_flip_container.hide();
            self.els.navContainer.show();//show nav
            /**
            正反时针角度为0 
            */
            self.model.set({
                clockWiseAngle: 0,
                antiClockAngle: 0,
                startScale: 1,//放大比例
            });
            query(self.els.previewNode).css('transform', '');
        },

        //deal with pictures
        //["puff", "bounce", "shrink", "expand", "rotate", "flip"];
        /**git rm -r --cached .

        @description 操作图片按钮条 命令模式
        */
        operateImg: function (type, opts) {//操作图片的button操作
            var self = this;
            var targetNode = query(self.$el[0]).query('.previewing');
            var increasedAngle = 90;//每次旋转的角度
            var increasedScale = 0.1;
            var startAngle, endAngle;
            var endScale;
            var args = {node: targetNode[0]};
            var currentScale = self.model.get('startScale');
            var lastAngle = self.model.get('clockWiseAngle');
            startAngle = lastAngle + 'deg';
            if (type == 'rotate') {//旋转
                if (opts.clockwise) {//顺时针
                    endAngle = (lastAngle + increasedAngle) + 'deg';
                } else {//逆时针
                    endAngle = (lastAngle - increasedAngle) + 'deg';
                }
                args = lang.mixin(args, {
                    startAngle: startAngle,
                    endAngle: endAngle,
                    startScale: currentScale,
                    endScale: currentScale
                });
                self.model.set('clockWiseAngle', parseInt(endAngle));
                fx[type](args).play();
            } else if (type == 'expandOriginTopLeft') {//左上角放大 缩小
                query(self.els.previewNode).css('transform-origin', '0% 0% 0px');
                var currentWidth = self.els.previewNode.width();
                var currentHeight = self.els.previewNode.height();

                if (opts.isShrink) {
                    endScale = currentScale - increasedScale;
                } else {
                    endScale = currentScale + increasedScale;
                }

                if(endScale < 0.01 || endScale > 10000 || (currentWidth == 0 || currentHeight == 0)){
                    return false;
                }

                self.model.set('startScale', endScale);
                //endScale
                args = lang.mixin(args, {
                    endScale: endScale,
                    startScale: currentScale,
                    startAngle: startAngle,
                    endAngle: startAngle,
                });
                var fxType = 'expand';
                query(self.els.previewNode).css({
                    "width": currentWidth/scale_number * endScale,
                    "height": currentHeight/scale_number * endScale
                });
                /*
                console.log('width:' + self.els.previewNode.width()/scale_number * endScale);
                console.log('height:' + self.els.previewNode.height()/scale_number * endScale);
                */
                scale_number = endScale;
                fx[fxType](args).play();
            } else if (type == 'expandOriginCenter') {//中心放大 缩小
                query(self.els.previewNode).css('transform-origin', '50% 50% 0px');
                var currentWidth = self.els.previewNode.width();
                var currentHeight = self.els.previewNode.height();
                if (opts.isShrink) {
                    endScale = currentScale - increasedScale;
                } else {
                    endScale = currentScale + increasedScale;
                }
                if(endScale < 0.01 || endScale > 10000 || (currentWidth == 0 || currentHeight == 0)){
                    return false;
                }
                self.model.set('startScale', endScale);
                //endScale
                args = lang.mixin(args, {
                    endScale: endScale,
                    startScale: currentScale,
                    startAngle: startAngle,
                    endAngle: startAngle,
                });

                var fxType = 'expand';

                query(self.els.previewNode).css({
                    "width": currentWidth/scale_number * endScale,
                    "height": currentHeight/scale_number * endScale
                });
                scale_number = endScale;
                fx[fxType](args).play();

            }else if (type == 'next') {//后一张
                  var nextSibling;
                if (query(self.$el[0]).query('.selected') && query(self.$el[0]).query('.selected').length > 0) {
                    nextSibling = query(self.$el[0]).query('.selected').next();
                } else {
                    nextSibling = query(self.els.imgPicker.find('li').eq(1)[0]);//默认认为显示了第一张
                }
                if (nextSibling && nextSibling.query('img') && nextSibling.query('img').length > 0) {
                    //self.els.previewNode[0].src = nextSibling.query('img')[0].src;
                    self.els.previewNode[0].src = $(nextSibling).data('href');//使用大图展示
                    query(self.$el[0]).query('.selected').removeClass('selected');
                    nextSibling.addClass('selected');
                } else {
                    self.showToast({
                        text:'这已经是最后一张图片了'
                    });
                    return false;
                }
            } else if (type == 'previous') {//前一张
                //var previousSibling;
                var previousSibling = query(self.$el[0]).query('.selected').prev();
                if (previousSibling && previousSibling.query('img') && previousSibling.query('img').length > 0) {
                    //self.els.previewNode[0].src = previousSibling.query('img')[0].src;
                    self.els.previewNode[0].src = $(previousSibling).data('href');//使用大图展示
                    query(self.$el[0]).query('.selected').removeClass('selected');
                    previousSibling.addClass('selected');
                } else {
                    self.showToast({
                        text:'这已经是第一张图片了'
                    });
                    return false;
                }
            } else if (type == 'adaptive') {//自适应
                self.els.previewNode.addClass('adaptive');//add class for adaptive
                self.els.previewContainer.addClass('adaptive');//add class for adaptive
                query(self.els.previewNode).css('transform', '');
                query(self.els.previewNode).css('height', '95%');
                query(self.els.previewNode).css('width', '95%');
              } 
            }
  }
}
</script>
<!-- Add "scoped" attribute to limihttp://localhost:8080/#/t CSS to this component only -->
<style scoped>
</style>
