define([
  "dojo/_base/declare",
  'dojox/css3/fx',
  "dojo/_base/fx",
  "dojo/_base/lang",
  ], function(declare,fx,baseFx,lang){
    return lang.mixin(fx,{


      expand: function(/*Object*/args){
      // summary:
      //    Returns an animation that expands args.node.
      //
      // description:
      //    Scales an element to args.endScale.
      //
      /*
      -moz-transform:rotate(0deg) scale(1.20,1.65) translate(0px,0px) skew(0deg,0deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(0deg) scale(1.20,1.65) translate(0px,0px) skew(0deg,0deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(0deg) scale(1.20,1.65) translate(0px,0px) skew(0deg,0deg);-o-transform-origin:0% 0%;transform:rotate(0deg) scale(1.20,1.65) translate(0px,0px) skew(0deg,0deg);transform-origin:0% 0%
      */
      var transformOrigin;
      if(args['transform-origin']){
        transformOriginSetting = transformOrigin.x + '% ' + transformOrigin.y + '% ' + '0px';
      }else{
        transformOriginSetting = '0% 0% 0px';
      }
      return baseFx.animateProperty({
        node: args.node,
        duration: args.duration || 1000,
        properties: {
          transform: { 
            start: "scale("+ (args.startScale || 1) + ")" +  "rotate(" + (args.startAngle || "0deg") + ")", 
            end: "scale(" + [args.endScale || 3] + ")" + "rotate(" + (args.endAngle || "0deg") + ")"
          },
          'transform-origin':{
            start:transformOriginSetting,
            end:transformOriginSetting
          }
        },
      });
    },

    rotate: function(/*Object*/args){
      // summary:
      //    Returns an animation that rotates an element.
      //
      // description:
      //    Rotates an element from args.startAngle to args.endAngle.
      //
      return baseFx.animateProperty({
        node: args.node,
        duration: args.duration || 1000,
        properties: {
          transform: { 
            start: "rotate(" + (args.startAngle || "0deg") + ")" + "scale("+ (args.startScale || 1) + ")", 
            end: "rotate(" + (args.endAngle || "360deg") + ")" + "scale(" + [args.endScale || 1] + ")"
          }
        }
      });
    },

  });

  })
