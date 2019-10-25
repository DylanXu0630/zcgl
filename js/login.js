$(function () {
    var padlength = (window.innerHeight - 106 - 106 - $(".login-mid").height()) / 2;
    $(".login-mid").css("padding-top", padlength).css("padding-bottom", padlength);

    var logDivLength = ($(".login-mid").height() - $(".login-div").height() - 110) / 2
    $(".login-div").css("margin-top", logDivLength)

    $(window).resize(function () {
        var padlength = (window.innerHeight - 106 - 106 - $(".login-mid").height()) / 2;
        $(".login-mid").css("padding-top", padlength).css("padding-bottom", padlength);
    });


    $("#login").click(function () {
        $.ajax({
            url: login + '/oauth/token?grant_type=password&scope=all&username=' + $(".username").val() + '&password=' + $(".password").val(),    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            type: "POST",   //请求方式
            // contentType: "application/json;charset=UTF-8",
            crossDomain: true,
            // headers: {"Authorization": "Basic amM6anM="},
            beforeSend: function (request) {
                request.setRequestHeader("Authorization","Basic amM6anM=");
            },
            success: function (req) {
                if (req.status == "200") {
                    layer.close(indexDig);
                    layer.msg("添加成功")
                    var demoReload = $('#demoReload');
                    //执行重载
                    table.reload('idTest', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        }
                    });
                } else {
                    layer.msg("添加失败")
                }

            },
            complete: function (jqXHR) {
                console.log(jqXHR.status);
            },
            error: function (jqXHR) {
                console.log(jqXHR.status);
            }
        });
    })
})


//字符串转base64
function encode(str) {
    // 对字符串进行编码
    var encode = encodeURI(str);
    // 对编码的字符串转化base64
    var base64 = btoa(encode);
    return base64;
}
