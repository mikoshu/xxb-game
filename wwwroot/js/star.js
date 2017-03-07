var star = function(){
    this.init();
}

star.prototype.init = function(){
    this.r = 200*radio;
    this.width = 175*radio;
    this.height = 234*radio;
    this.x = win_w/2;
    this.y = win_h/2;
    this.life = 150*radio;
    this.nowLife = 150*radio;
}

star.prototype.draw = function(){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,.2)';
    ctx.strokeStyle = "rgba(255,255,255,.2)";
    ctx.arc(this.x,this.y,this.r, 0, Math.PI*2, false);  
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#000";
    ctx.arc(this.x,this.y,120, 0, Math.PI*2, false);  
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
    ctx.restore();


    ctx.drawImage(document.getElementById('star'),this.x - this.width/2,this.y - this.height/2,this.width,this.height);

    this.drawLine(this.life,'#666');
    this.drawLine(this.nowLife,'rgba(255,255,255,1)');
    this.lose();
}

star.prototype.drawLine = function(width,color){
    ctx.save()
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 20 * radio;
    if(width != 0){
        ctx.lineCap="round";
    }
    ctx.moveTo(win_w/2 - this.life/2,win_h/2 - this.height/2 - 40);
    ctx.lineTo(win_w/2 - this.life/2 + width,win_h/2 - this.height/2 - 40);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
} 

star.prototype.lose = function(){
    if(this.nowLife == 0){
        isPlaying = false;
        util.requestPost({
            url: 'http://114.215.119.189:8080/xfans-service/3-6-3',
            token:token,
            data:{
                c_id: c_id,
                point: people.score,
                u_id: u_id,
                game_id: game_id,
                
            },
            success: function(data){
                console.log(data);
                if(data.code == 0){
                    window.location.href = 'game-over.html?score='+people.score;
                }else{
                    alert(data.message);
                }
            }
        });
        //console.log(timmer)
        //cancelAnimationFrame(timmer);
        //reset(); // 重新开始
    }
}