var util = {
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
    }
}