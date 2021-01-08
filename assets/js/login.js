$(function() {
    // 注册与登录的切换
    $("#link_reg").on('click', function() {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $("#link_login").on('click', function() {
        $(".reg-box").hide();
        $(".login-box").show();
    });
    // 自定义验证表单规则
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(val) {
            let repsd = $(".reg-box [name=password]").val();
            if (repsd !== val) return "两次密码不一致，请重新输入";
        }
    });
    // 检测注册表单的提交事件
    $("#form_reg").on('submit', function(e) {
        // 阻止表单的默认行为
        e.preventDefault();
        // 快速获取表单数据
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: data,
            success: function(res) {
                if (res.status !== 0) return layer.msg("注册失败！");
                layer.msg("注册成功,请登录!");
                $("#link_login").click();
            }
        });
    });
    // 监测登录表单的提交事件
    $("#form_login").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) layer.msg(res.message);
                localStorage.setItem("token", res.token);
                layer.msg("登录成功!");
                location.href = '/index.html';
            }
        });
    })
})