//window.onload = function(){
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var win_w = window.innerWidth;
var win_h = window.innerHeight;
var timmer;
var isShaked = false;
canvas.width = win_w;
canvas.height = win_h;
window.requestAnimFrame = window.requestAnimationFrame || 
                          window.webkitRequestAnimationFrame || 
                          window.mozRequestAnimationFrame || 
                          window.oRequestAnimationFrame || 
                          window.msRequestAnimationFrame;
var isPlaying = false;
var radio = 1;
// 获取app传递参数
var token = util.getToken();
var c_id = util.getClassId();
var u_id = util.getUserId();
var game_id = util.getGameId();
var imgStar = document.getElementById('star');
var myScore = document.getElementById('score');

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    var min_size = Math.min(w, h);
    if (r > min_size / 2) r = min_size / 2;
    // 开始绘制
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
}


// if(typeof(requestAnimationFrame) == 'undefined'){ // 兼容低版本安卓 
//     radio = 0.5;
//     win_w = window.innerWidth*radio;
//     win_h = window.innerHeight*radio;
//     canvas.width = win_w;
//     canvas.height = win_h;
// }

var star = new star();
var  Me = new me();
var people = new people();



function reset(){
    Me.init();
    star.init();
    people.init();
    document.getElementById('score').innerHTML = '0';
}

function loop(){   // loop function 
    ctx.clearRect(0,0,win_w,win_h);
    draw_bg();
    Me.draw();
    star.draw();
    people.draw();
    
    if(isPlaying && typeof(requestAnimationFrame) == 'function' ){
        timmer = requestAnimationFrame(loop);
    }
}

if(typeof(requestAnimationFrame) == 'undefined' && isPlaying){
    timmer = setInterval(loop,20);
}



function draw_bg(){
    ctx.drawImage(document.getElementById('bg'),0,0,win_w,win_h);
}

function shake(){
    if(!isShaked){
        isShaked = true;
        canvas.className = 'ani-shake';
        myScore.className = 'ani-scale';
        setTimeout(function(){
            canvas.className = '';
            myScore.className = '';
        },220)
    }
    isShaked = false;
}

document.addEventListener('touchstart',function(e){
    e.preventDefault();
})
canvas.addEventListener('touchmove',function(e){
    var touch = e.changedTouches[0];
    Me.toX = touch.clientX;
    Me.toY = touch.clientY;
    Me.isMove = true;
});

canvas.addEventListener('touchstart',function(e){
    var touch = e.changedTouches[0];
    Me.toX = touch.clientX;
    Me.toY = touch.clientY;
    Me.isMove = true;
});



$(document).ready(function(){
    util.requestPost({
          url: 'http://114.215.119.189:8080/xfans-service/3-6-5',
          token:token,
          data:{
              u_id: u_id,
          },
          success: function(data){
            if(data.code == 0){
                $('#star').attr('src','http://xingxiaoban.img-cn-hangzhou.aliyuncs.com/'+data.data.c_pic_id+'?x-oss-process=image/resize,h_200');
            }else{
                alert('明星头像获取失败！')
            }
          }
      });

    $(".cover").on('touchstart',function(){
        $(this).hide();
        isPlaying = true;
        loop();
    });
});

//}