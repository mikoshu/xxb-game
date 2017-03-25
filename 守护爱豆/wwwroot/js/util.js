var util = {
    getToken: function(){
        return this.getUrlParams('token');
        //return '571ef6ebc7b392ca5f042d6b0c1f7663';
    },
    getClassId: function(){
        return this.getUrlParams('c_id');
        //return '1';
    },
    getUserId: function(){
        return this.getUrlParams('u_id');
        //return '4475';
    },
    getGameId: function(){
        return this.getUrlParams('game_id');
        //return '1';
    },
    getUrlParams: function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    requestPost: function(obj){
        $.ajax({
            url: obj.url,
            type: 'POST',
            beforeSend: function(request){
                var time = String(Date.parse(new Date()));
                var token = obj.token; //'571ef6ebc7b392ca5f042d6b0c1f7663';
                var check = md5('1.0'+'xingxiaoban'+time+token+JSON.stringify(obj.data));
                //console.log(check,time)
                //console.log('1.0'+'xingxiaoban'+time+token+JSON.stringify({'c_id': '1','u_id': '4475','game_id': '1','page_start':'0','page_size':'10'}));
                request.setRequestHeader('version','1.0');
                request.setRequestHeader('key','xingxiaoban');
                request.setRequestHeader('time',time);
                request.setRequestHeader('token',token);
                request.setRequestHeader('checksign',check);
            },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify(obj.data),
            success: function(data){
                obj.success(data);
            },
            error:function(err){
                obj.error(err);
            }
        })
    },
    checkUA: function(){
        var ua = navigator.userAgent.toLowerCase(); // 检测是否从星小班app中打开
        if (!/xingxiaoban/.test(ua)) {
            window.location.replace('error.html');
        }
    }
}