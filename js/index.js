layui.use('element', function () {
    var element = layui.element;
   
    //…
});

$(function () {
    /*shwo 的 height*/
    $("#show").css("height", window.innerHeight-60)
    $(".layui-body").css("width", window.innerWidth - 225)
    $(".layui-body").css("height", window.innerHeight)
    /*当浏览器窗口发生变化*/
    $(window).resize(function () {
        /*shwo 的 height*/
        $("#show").css("height", window.innerHeight-60)
        $(".layui-body").css("width", window.innerWidth - 225)
        $(".layui-body").css("height", window.innerHeight)
    });
    $(".menu").on("click", function () {
        var xml = this
        var url = $(xml).attr("url")
        $("#show").attr("src", url)
    })

    // 根据用户名称获取用户信息
    $.ajax({
        url: IPdz + '/user/'+localStorage.getItem("user_name"),    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            // 用户昵称
            $("#nickName").text(req.data.nickname)
            localStorage.setItem("userId", req.data.id)
        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });

    $(".tc").on("click", function () {
        localStorage.clear()
        window.location.href = "login.html";
    })
})

// jQuery(".sideMenu").slide({
// 	titCell:"dl", //鼠标触发对象
// 	targetCell:"ul", //与titCell一一对应，第n个titCell控制第n个targetCell的显示隐藏
// 	effect:"slideDown", //targetCell下拉效果
// 	delayTime:300 , //效果时间
// 	triggerTime:150, //鼠标延迟触发时间（默认150）
// 	defaultPlay:true,//默认是否执行效果（默认true）
// 	trigger:"click",
// 	returnDefault:true //鼠标从.sideMen移走后返回默认状态（默认false）
// });
