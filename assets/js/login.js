$(function() {
    $('#link_reg').on('click',function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click',function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 密码验证
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
        ],
        repwd : function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if(pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form-reg').on('submit',function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        // $.post('http://ajax.frontend.itheima.net/api/reguser',data,function(res) {
        //     if(res.satatus !== 0) {
        //         return layer.msg(res.message);
        //     }
        //     console.log(1);
        //     $('#link_login').click();
        //     layer.msg('注册成功');
        // })
        $.ajax({
            url:'/api/reguser',
            type:'POST',
            data:data,
            success:function(res) {
                // console.log(res);
                if(res.satatus !== 0) {
                    layui.layer.msg(res.message);
                }
                // console.log(1);
                layui.layer.msg('注册成功,请登录！');
                $('#link_login').click();
                
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form-login').submit(function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        
        $.ajax({
            url:'/api/login',
            type:'POST',
            data:data,
            success:function(res) {
                if(res.status !== 0) {
                    layui.layer.msg(res.message);
                }
                layui.layer.msg('登录成功！');
                localStorage.setItem('token', res.token);
                location.href = 'index.html';
            }
        })
    })
})