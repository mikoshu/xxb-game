function reset(){Me.init(),star.init(),people.init(),document.getElementById("score").innerHTML="0"}function loop(){ctx.clearRect(0,0,win_w,win_h),draw_bg(),Me.draw(),star.draw(),people.draw(),isPlaying&&"function"==typeof requestAnimationFrame&&(timmer=requestAnimationFrame(loop))}function draw_bg(){ctx.drawImage(document.getElementById("bg"),0,0,win_w,win_h)}function shake(){isShaked||(isShaked=!0,canvas.className="ani-shake",setTimeout(function(){canvas.className=""},120)),isShaked=!1}var canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),win_w=window.innerWidth,win_h=window.innerHeight,timmer,isShaked=!1;canvas.width=win_w,canvas.height=win_h,window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;var isPlaying=!0,radio=1,token=util.getToken(),c_id=util.getClassId(),u_id=util.getUserId(),game_id=util.getGameId();"undefined"==typeof requestAnimationFrame&&(radio=.5,win_w=window.innerWidth*radio,win_h=window.innerHeight*radio,canvas.width=win_w,canvas.height=win_h);var star=new star,Me=new me,people=new people;"undefined"==typeof requestAnimationFrame&&isPlaying&&(timmer=setInterval(loop,20)),document.addEventListener("touchstart",function(e){e.preventDefault()}),canvas.addEventListener("touchmove",function(e){var n=e.changedTouches[0];Me.toX=n.clientX,Me.toY=n.clientY,Me.isMove=!0}),canvas.addEventListener("touchstart",function(e){var n=e.changedTouches[0];Me.toX=n.clientX,Me.toY=n.clientY,Me.isMove=!0}),window.onload=function(){loop()};