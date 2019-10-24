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
        , url: '../json/czgl.json' //数据接口
        //, url: 'http://172.1.1.95:8080/cert' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'xlh', title: '序号', fixed: "left", width: 160}
            , {field: 'qlr', title: '权利人', fixed: "left", width: 260}
            , {field: 'gyqk', title: '共有情况', width: 160}
            , {field: 'zl', title: '坐落', width: 160}
            , {field: 'z', title: '幢', width: 160}
            , {field: 'szc', title: '所在层', width: 160}
            , {field: 'zcs', title: '总层数', width: 160}
            , {field: 'bdcdyh', title: '不动产单元号', width: 160}
            , {field: 'fwdm', title: '房屋代码', width: 160}
            , {field: 'qllx', title: '权利类型', width: 160}
            , {field: 'qlxz', title: '权利性质', width: 160}
            , {field: 'yt', title: '用途', width: 160}
            , {field: 'mj', title: '面积', width: 160}
            , {field: 'jg', title: '结构', width: 160}
            , {field: 'syqx', title: '使用期限', width: 160}
            , {field: 'qlqtzk', title: '权利其他状况', width: 160}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 200}
        ]]
        , parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
            return {
                "code": res.code, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.total, //解析数据长度
                "data": res.data //解析数据列表
            };
        }
    });
})
