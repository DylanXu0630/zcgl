//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});
layui.use('table', function () {
    var table = layui.table;

    //第一个实例
    table.render({
        elem: '#tableList'
        , toolbar: '#toolbarDemo'
        , url: '../json/sysUser.json' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'username', title: '角色', width: 200}
            , {field: 'sm', title: '说明'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 200}
        ]]
    });
})