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
