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
        , url: '../json/htztgl.json' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'xlh', title: '序列号', fixed: 'left'},
            {field: 'ztname', title: '企业名称', sort: true},
            {field: 'sm', title: '说明', sort: true},
            {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 200}
        ]]
    });
})