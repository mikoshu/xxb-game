function reset(){Me.init(),star.init(),people.init(),document.getElementById("score").innerHTML="0"}function loop(){ctx.clearRect(0,0,win_w,win_h),draw_bg(),Me.draw(),star.draw(),people.draw(),isPlaying&&"function"==typeof requestAnimationFrame&&(timmer=requestAnimationFrame(loop))}function draw_bg(){ctx.drawImage(document.getElementById("bg"),0,0,win_w,win_h)}function shake(){isShaked||(isShaked=!0,canvas.className="ani-shake",myScore.className="ani-scale",setTimeout(function(){canvas.className="",myScore.className=""},220)),isShaked=!1}var canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),win_w=window.innerWidth,win_h=window.innerHeight,timmer,isShaked=!1;canvas.width=win_w,canvas.height=win_h,window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;var isPlaying=!1,radio=1,token=util.getToken(),c_id=util.getClassId(),u_id=util.getUserId(),game_id=util.getGameId(),imgStar=document.getElementById("star"),myScore=document.getElementById("score");CanvasRenderingContext2D.prototype.roundRect=function(e,t,n,i,a){var o=Math.min(n,i);return a>o/2&&(a=o/2),this.beginPath(),this.moveTo(e+a,t),this.arcTo(e+n,t,e+n,t+i,a),this.arcTo(e+n,t+i,e,t+i,a),this.arcTo(e,t+i,e,t,a),this.arcTo(e,t,e+n,t,a),this.closePath(),this};var star=new star,Me=new me,people=new people;"undefined"==typeof requestAnimationFrame&&isPlaying&&(timmer=setInterval(loop,20)),document.addEventListener("touchstart",function(e){e.preventDefault()}),canvas.addEventListener("touchmove",function(e){var t=e.changedTouches[0];Me.toX=t.clientX,Me.toY=t.clientY,Me.isMove=!0}),canvas.addEventListener("touchstart",function(e){var t=e.changedTouches[0];Me.toX=t.clientX,Me.toY=t.clientY,Me.isMove=!0}),$(document).ready(function(){util.checkUA(),util.requestPost({url:"http://114.215.119.189:8080/xfans-service/3-6-5",token:token,data:{u_id:u_id},success:function(e){0==e.code?$("#star").attr("src","http://xingxiaoban.img-cn-hangzhou.aliyuncs.com/"+e.data.c_pic_id+"?x-oss-process=image/resize,h_200"):alert("明星头像获取失败！")}}),$(".cover").on("touchstart",function(){$(this).hide(),isPlaying=!0,loop()})});