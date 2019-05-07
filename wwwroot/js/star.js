var star = function(){
    this.init();
}

star.prototype.init = function(){
    this.r = 160*radio;
    this.width = 200*radio;
    this.height = 200*radio;
    this.x = win_w/2;
    this.y = win_h/2;
    this.nowLife = 1;
    this.lifeR = 110;
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
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#666";
    ctx.translate(this.x-this.width/2,this.y-this.height/2);
    var pattern = ctx.createPattern(document.getElementById('star'), "no-repeat");
    ctx.arc(this.width/2,this.height/2,this.lifeR, 0, Math.PI*2, false);  
    ctx.fillStyle = pattern;
    ctx.translate(0,0);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // ctx.save();
    // var pattern = ctx.createPattern(document.getElementById('star'), "no-repeat");
    // ctx.arc(this.x,this.y,80,0,2 * Math.PI,false);
    // ctx.fillStyle = pattern;
    // ctx.fill(); 
    // ctx.restore();

    //ctx.drawImage(document.getElementById('star'),this.x - this.width/2,this.y - this.height/2,this.width,this.height);

    this.drawLine(this.nowLife,'#ffe687');
    this.lose();
}

star.prototype.drawLine = function(width,color){
    ctx.save()
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 22;
    ctx.lineCap="round";
    ctx.translate(this.x-this.width/2,this.y-this.height/2);
    ctx.arc(this.width/2,this.height/2,this.lifeR, 0, Math.PI*2*this.nowLife, false);
    ctx.translate(0,0);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
} 

star.prototype.lose = function(){
    if(this.nowLife == 0){
        alert('鸡你太美！！！，您的得分'+ people.score+',共打死了'+parseInt(people.score/10)+'只鸡！')
        isPlaying = false;
        reset();
        //reset(); // 重新开始
    }
}