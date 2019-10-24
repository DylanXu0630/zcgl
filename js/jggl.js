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
        // , url: 'http://172.1.1.95:18000/uum/swagger-ui.html#/dictionary-controller/insertUserStatusDicUsingPOST' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'xlh', title: '序号'}
            , {field: 'glzx', title: '机构名称'}
            , {field: 'gljc', title: '机构简称'}
            , {field: 'lxr', title: '联系人'}
            , {field: 'mp', title: '电话 '}
        ]]
    });
})  