$(function () {
    $(".pageDiv").css("height", window.innerHeight)
    if ($(".layui-fluid.tjsx").length!==0){
        $(".layui-fluid.lbTable").css("min-height",window.innerHeight-$(".layui-fluid.tjsx").height()-$(".title").height()-100)
    } else {
        $(".layui-fluid.lbTable").css("min-height",window.innerHeight-$(".title").height()-108)
    }
    $(window).resize(function () {
        $(".pageDiv").css("height", window.innerHeight)

        if ($(".layui-fluid.tjsx").length!==0){
            $(".layui-fluid.lbTable").css("min-height",window.innerHeight-$(".layui-fluid.tjsx").height()-$(".title").height()-100)
        } else {
            $(".layui-fluid.lbTable").css("min-height",window.innerHeight-$(".title").height()-108)
        }
    })
})