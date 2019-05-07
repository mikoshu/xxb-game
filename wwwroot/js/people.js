var people = function(){
    this.init();
}

people.prototype.init = function(){
    this.width = 75*radio;
    this.height = 75*radio;
    this.R = 160*radio;
    this.r = 50*radio;
    this.num = 3;
    this.all = 30;
    this.x = [];
    this.y = [];
    this.type = []; // 记录人物类型
    this.speed = [];
    this.baseSpeed = 400; // 基础速度，值越小，速度越快
    this.isTouch = []; // 判断是否和人物碰撞
    this.success = []; // 判断是否到达终点
    this.count = [];  // 到达终点后计数
    this.blood = []; // 击中后的血迹
    this.showBlood = [];
    this.attack = 0.05; // 攻击力
    this.interval = 30; // 设置到达终点切未被打飞的小人每n帧攻击一次
    this.score = 0;
    this.getScort = 10;
    this.pre = 4;
    this.imgIndex = [];
    this.img = [];
    this.cut = [];

    for(var i=0;i<this.all; i++){
        this.born(i);
    }
    //this.draw();
}

people.prototype.level = function(score){ // 难度设置
    // if(this.score > 100 && this.sc ){ // 难度提升
    //     this.num = 4;
    //     this.pre = 200;
    // }
    if(score > 150){
        this.num = parseInt(score/150) + 3 > 15 ? 15 : parseInt(score/150) + 3 ;
        this.baseSpeed =  400 - parseInt(score/200)*20;
    } 
    

}

people.prototype.draw = function(){

    this.level(this.score); 

    for(var i=0;i<this.num;i++){
        if(this.showBlood[i]){ // 先画血迹，避免血迹挡住人物
            this.drowBlood(i,this.blood[i].x,this.blood[i].y,this.blood[i].img);
        }
        ctx.drawImage(this.img[i],parseInt(this.imgIndex[i]/this.pre)*this.width,0,this.width,this.height,this.x[i]-this.width/2,this.y[i]-this.height/2,this.width,this.height);
        //ctx.fillRect(this.x[i]-this.width/2,this.y[i]-this.height/2,this.width,this.height);
        this.boom(i);
        this.add(i);
        this.imgIndex[i] += 1;
        if(this.imgIndex[i] > 4*this.pre){
            this.imgIndex[i] = 0;
        }

        // if(typeof(this.cut[i]) == 'object' ){ // 画蔬菜破碎后痕迹
        //     this.trace(i);
        // }

    }
    
}

people.prototype.born = function(i){
    var x = Math.random() - 0.5;
    if(x > 0){
        this.x[i] = x * 1500 +  win_w ;
    }else{
        this.x[i] = x * 1500
    }
    var y = Math.random() - 0.5;
    if(y>0){
        this.y[i] = y*1500+win_h;
    }else{
        this.y[i] = y*1500;
    }
    var type = parseInt(Math.random()*3);
    type = type == 0 ? 1 : type;
    this.type[i] = type;
    this.img[i] = document.getElementById('role1');
    this.speed[i] = {} // 每个人物速度不同 
    var interval = Math.random()*200 + this.baseSpeed; 
    this.speed[i].x = (win_w/2 - this.x[i])/interval;
    this.speed[i].y = (win_h/2 - this.y[i])/interval;
    this.isTouch[i] = false; 
    this.success[i] = false;
    this.count[i] = 0;
    this.showBlood[i] = false;
    this.blood[i] = {};
    this.blood[i].img = document.getElementById('blood1');
    this.imgIndex[i] = 0;
}

people.prototype.boom = function(i){
    var x = (win_w/2 - this.x[i]);
    var y = (win_h/2 - this.y[i]);
    var x1 = (Me.x - this.x[i]);
    var y1 = (Me.y - this.y[i]);
    if(Math.sqrt(x1*x1 + y1*y1) < this.r + Me.r){ // 碰撞检测人物之间
        if(!this.isTouch[i]){  // 获取得分
            this.score += this.getScort;
            document.getElementById('score').innerHTML = this.score;
            shake(); // 震动
            // 记录血迹位置
            this.blood[i].x = this.x[i];
            this.blood[i].y = this.y[i];
            this.showBlood[i] = true;
        }
        this.isTouch[i] = true;
    }

    if(!this.isTouch[i]){ 
        if(Math.sqrt(x*x + y*y) > this.R + this.r ){
            this.x[i] += this.speed[i].x;
            this.y[i] += this.speed[i].y;
        }else{
            if(!this.success[i]){
                star.nowLife = star.nowLife > this.attack ? star.nowLife - this.attack : 0;
                this.success[i] = true;
            }else{
                this.count[i] += 1;
                if(this.count[i] == this.interval){
                    this.count[i] = 0;
                    star.nowLife = star.nowLife > this.attack ? star.nowLife - this.attack : 0;
                }
            }
            
        }
    }else{
        this.x[i] -= this.speed[i].x*5;
        this.y[i] -= this.speed[i].y*5;
    }
}

people.prototype.add = function(i){
    if(this.isTouch[i]){
        if(this.x[i] < -this.width - 100 || this.x[i] > win_w+100 || this.y[i] < -this.height-100 || this.y[i] > win_h+100 ){
            this.born(i);
        }
        
    }
}

people.prototype.drowBlood = function(i,x,y,img){ // 绘制血迹
    var r = Math.sqrt(Math.pow(win_w/2-x,2) + Math.pow(win_h/2-y,2));
    var deg = Math.acos( (x - win_w/2)/r);
    deg = y < win_h/2 ? deg : -deg; // 判断血液溅射方向
    if( (y > win_h/2 && x < win_w/2) || (y < win_h/2 && x > win_w/2) ){
        x = x < win_w/2 ? x+this.width/2 : x-this.width/2;
        y = y < win_h/2 ? y-this.height/2 : y+this.height/2;
    }else{
        x = x < win_w/2 ? x-this.width/2 : x+this.width/2;
        y = y < win_h/2 ? y+this.height/2 : y-this.height/2;
    }
    
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(-deg);
    ctx.drawImage(img,0,0,330,81);
    ctx.translate(0,0);
    ctx.restore();
}

people.prototype.trace = function(i){
    this.count[i] += 1;
    if(this.count[i] == this.interval){
        this.count[i] = 0;
        this.cut[i] = '';
    }else{
        var x = this.cut[i].x;
        var y = this.cut[i].y;
        var r = Math.sqrt(Math.pow(win_w/2-x,2) + Math.pow(win_h/2-y,2));
        var deg = Math.acos( (x - win_w/2)/r);
        deg = y < win_h/2 ? deg : -deg; // 判断血液溅射方向
        if( (y > win_h/2 && x < win_w/2) || (y < win_h/2 && x > win_w/2) ){
            x = x < win_w/2 ? x+this.width/2 : x-this.width/2;
            y = y < win_h/2 ? y-this.height/2 : y+this.height/2;
        }else{
            x = x < win_w/2 ? x-this.width/2 : x+this.width/2;
            y = y < win_h/2 ? y+this.height/2 : y-this.height/2;
        }
        
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(-deg);
        ctx.drawImage(this.cut[i].img,-20,-20,110,110);
        ctx.translate(0,0);
        ctx.restore();

        //ctx.drawImage(document.getElementById('cut'),this.cut[i].x,this.cut[i].y,110,110);
    }
}