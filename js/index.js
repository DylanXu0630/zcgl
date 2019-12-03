layui.use('element', function () {
    var element = layui.element;

    //…
});

$(function () {
    /*shwo 的 height*/
    $("#show").css("height", window.innerHeight - 60)
    $(".layui-body").css("width", window.innerWidth - 225)
    $(".layui-body").css("height", window.innerHeight)
    /*当浏览器窗口发生变化*/
    $(window).resize(function () {
        /*shwo 的 height*/
        $("#show").css("height", window.innerHeight - 60)
        $(".layui-body").css("width", window.innerWidth - 225)
        $(".layui-body").css("height", window.innerHeight)
    });


    // 根据用户名称获取用户信息
    $.ajax({
        url: IPdz + '/user/' + localStorage.getItem("user_name"),    //请求的url地址
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
            if (req.status == 200) {
                $("#nickName").text(req.data.nickname)
                localStorage.setItem("userId", req.data.id)
            } else {
                alert(req.msg)
                window.location.href = "login.html"
            }

        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });

    $.ajax({
        url: IPzd + '/user/' + localStorage.userId,    //请求的url地址
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
            if (req.status == 200) {
                localStorage.setItem("aId", req.data.agencyId)

            } else {
                alert(req.msg)
                window.location.href = "login.html"
            }

        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });

    // 根据用户ID得到菜单权限
    $.ajax({
        url: IPdz + '/permission/menu/' + localStorage.getItem("userId"),    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            // 处理权限数据
            req.data.forEach(gen => {
                // 判断是否是首页
                if (gen.name == "首页") {
                    var shouye = $('<li class="layui-nav-item layui-this"><a href="javascript:;" url="pages/home.html" class="menu"><img class="iconImg" src="./icon/home.svg"></img>首页</a></li>').appendTo("#menuT")
                } else {
                    var imgs = ''
                    //  标记
                    if (gen.name == "资产管理") imgs = '<img class="iconImg" src="./icon/zcgl.svg"></img>'
                    else if (gen.name == "合同管理") imgs = '<img class="iconImg" src="./icon/htgl.svg"></img>'
                    else if (gen.name == "企业管理") imgs = '<img class="iconImg" src="./icon/qygl.svg"></img>'
                    else if (gen.name == "预警管理") imgs = '<img class="iconImg" src="./icon/yjgl.svg"></img>'
                    else if (gen.name == "系统管理") imgs = '<img class="iconImg" src="./icon/xtgl.svg"></img>'
                    else if (gen.name == "信息管理") imgs = '<img class="iconImg" src="./icon/xxgl.svg"></img>'
                    if (gen.children.length != 0) {
                        var yiji = $(' <li class="layui-nav-item"><a class="" href="javascript:;">' + imgs + gen.name + '</a><dl class="layui-nav-child erji' + gen.id + '"></dl></li>').appendTo("#menuT")
                        gen.children.forEach(erjiT => {
                            if (erjiT.children.length != 0) {
                                var erji = $('<dd data-name="grid"><a href="javascript:;">' + erjiT.name + '<span class="layui-nav-more"></span></a><dl class="layui-nav-child sanji' + erjiT.id + '"></dl></dd>').appendTo(".erji" + erjiT.pid)
                                erjiT.children.forEach(sanjiT => {
                                    var sanji = $('<dd class="three_child"><a href="javascript:;" class="menu" url="' + sanjiT.url + '">' + sanjiT.name + '</a></dd>').appendTo('.sanji' + sanjiT.pid)
                                });
                            } else {
                                var erji = $('<dd><a href="javascript:;" class="menu" url="' + erjiT.url + '">' + erjiT.name + '</a></dd>').appendTo(".erji" + erjiT.pid)
                            }
                        });
                    }
                }
            });
        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });

    $(".menu").on("click", function () {
        var xml = this
        // 根据用户ID得到菜单权限
        $.ajax({
            url: './json/buttonqx.json',    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            type: "GET",   //请求方式
            contentType: "application/json;charset=UTF-8",
            // headers: {"token": sessionStorage.token},
            beforeSend: function () {
                //请求前的处理
            },
            success: function (req) {
                // 处理权限数据
                localStorage.setItem("buttonqx", req.data);
            },
            complete: function () {
                //请求完成的处理
            },
            error: function () {
                //请求出错处理
            }
        });
        var url = $(xml).attr("url")
        $("#show").attr("src", url)
    })

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
