var me=function(){this.init()};me.prototype.init=function(){this.r=50*radio,this.R=150*radio,this.width=240*radio,this.height=240*radio,this.x=win_w/2,this.y=win_h/2+this.r+this.height,this.speed=20,this.toX=0,this.toY=0,this.isMove=!1,this.imgIndex=0,this.pre=1},me.prototype.draw=function(){this.isMove&&this.move(),ctx.drawImage(document.getElementById("hit"),parseInt(this.imgIndex/this.pre)*this.width,0,this.width,this.height,this.x-this.width/2,this.y-this.height/2,this.width,this.height),this.imgIndex+=1,this.imgIndex>7*this.pre&&(this.imgIndex=0)},me.prototype.move=function(){if(this.x=this.x<this.toX?this.x>this.toX-this.speed?this.toX:this.x+this.speed:this.x<this.toX+this.speed?this.toX:this.x-this.speed,this.y=this.y<this.toY?this.y>this.toY-this.speed?this.toY:this.y+this.speed:this.y<this.toY+this.speed?this.toY:this.y-this.speed,this.x<this.width/2&&(this.x=this.width/2),this.x>win_w-this.width/2&&(this.x=win_w-this.width/2),this.y<this.height/2&&(this.y=this.height/2),this.y>win_h-this.height/2&&(this.y=win_h-this.height/2),this.x>win_w/2-this.R&&this.x<win_w/2+this.R){var i=Math.sqrt(Math.pow(win_w/2-this.x,2)+Math.pow(win_h/2-this.y,2));if(i<this.r+this.R){var t=Math.sqrt(Math.pow(this.r+this.R,2)-Math.pow(win_w/2-this.x,2));this.y=this.y<win_h/2?win_h/2-t:win_h/2+t}}if(this.y>win_h/2-this.R&&this.y<win_h/2+this.R){var i=Math.sqrt(Math.pow(win_w/2-this.x,2)+Math.pow(win_h/2-this.y,2));if(i<this.r+this.R){var h=Math.sqrt(Math.pow(this.r+this.R,2)-Math.pow(win_h/2-this.y,2));this.x=this.x<win_w/2?win_w/2-h:win_w/2+h}}};