var me = function(){
    this.init();
}

me.prototype.init = function(){
    this.r = 50*radio;
    this.R = 150*radio;
    this.width = 250*radio;
    this.height = 200*radio;
    this.x = win_w/2;
    this.y = win_h/2 + this.r + this.height;
    this.speed = 20; // 规定移动速度
    this.toX = 0; // 记录到达下一地点x位置
    this.toY = 0; // 记录到达下一地点y位置
    this.isMove = false;
    this.imgIndex = 0;
    this.pre = 1; // 每隔n帧图片切换一次
    //this.draw();
}

me.prototype.draw = function(){
    if(this.isMove){
        this.move();
    }
    ctx.drawImage(document.getElementById('hit'),parseInt(this.imgIndex/this.pre)*this.width,0,this.width,this.height,this.x - this.width/2,this.y - this.height/2,this.width,this.height);
    this.imgIndex += 1;
    if(this.imgIndex > 7*this.pre){
        this.imgIndex = 0;
    }
}

me.prototype.move = function(){

        if(this.x < this.toX){
            this.x = this.x > this.toX - this.speed ? this.toX : this.x + this.speed;
        }else{
            this.x = this.x < this.toX + this.speed ? this.toX : this.x - this.speed;
        }
        if(this.y < this.toY){
            this.y = this.y > this.toY - this.speed ? this.toY : this.y + this.speed;
        }else{
            this.y = this.y < this.toY + this.speed ? this.toY : this.y - this.speed;
        }

        // 边界判断
        if(this.x < this.width/2){
            this.x = this.width/2;
        }
        if(this.x > win_w - this.width/2){
            this.x = win_w - this.width/2;
        }
        if(this.y < this.height/2){
            this.y = this.height/2;
        }
        if(this.y > win_h - this.height/2){
            this.y = win_h - this.height/2;
        }
        // 中心区域判断

        if(this.x > win_w/2 - this.R  && this.x < win_w/2 + this.R ){
            var r = Math.sqrt(Math.pow(win_w/2 - this.x,2) + Math.pow(win_h/2 - this.y,2) );
            if(r < this.r + this.R){
                var y = Math.sqrt(Math.pow(this.r+this.R,2) - Math.pow(win_w/2 - this.x,2) );
                this.y = this.y < win_h/2 ? win_h/2 - y : win_h/2 + y;
            }
        }
        if(this.y > win_h/2 - this.R  && this.y < win_h/2 + this.R ){
            var r = Math.sqrt(Math.pow(win_w/2 - this.x,2) + Math.pow(win_h/2 - this.y,2) );
            if(r < this.r + this.R){
                var x = Math.sqrt(Math.pow(this.r+this.R,2) - Math.pow(win_h/2 - this.y,2) );
                this.x = this.x < win_w/2 ? win_w/2 - x : win_w/2 + x;
            }
        }

   
}

