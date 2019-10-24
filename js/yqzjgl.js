//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;

});
layui.use('table', function () {
    var table = layui.table;
})
layui.use('laydate', function(){
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#test1' //指定元素
    });
});