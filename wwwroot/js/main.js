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

window.cancelAnimationFrame = window.cancelAnimationFrame ||
                          Window.webkitCancelAnimationFrame ||
                          window.mozCancelAnimationFrame ||
                          window.msCancelAnimationFrame ||
                          window.oCancelAnimationFrame ||
                          function( id ){
                              //为了使setTimteout的尽可能的接近每秒60帧的效果
                              window.clearTimeout( id );
                          }                          


var isPlaying = false;
var radio = 1;
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
    document.getElementById('score').innerHTML = '0';
    Me.init();
    star.init();
    people.init();
    cancelAnimationFrame(window.timmer)
    setTimeout(()=>{
        isPlaying = true;
        loop()
    })
}

function loop(){   // loop function 
    ctx.clearRect(0,0,win_w,win_h);
    draw_bg();
    Me.draw();
    star.draw();
    people.draw();
    if(isPlaying){
        window.timmer = requestAnimFrame(loop);
    }
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
},{passive:false})
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



window.onload = function(){
    var cover = document.getElementById('cover')
    cover.addEventListener('touchstart',function(){
        cover.style.display = 'none'
        isPlaying = true;
        loop();
    })
}

//}