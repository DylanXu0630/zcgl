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
        , url: '../json/zctjbb2.json' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'xlh', title: '序号', fixed: 'left',rowspan:2}
            , {field: 'zcgldw', title: '资产管理单位', sort: true, width: 200,rowspan:2}
            , {align: 'center', title: '本月新增出租面积', sort: true, width: 200,colspan: 4}
            , {align: 'center', title: '本月减少出租面积', sort: true, width: 200,colspan: 4}
            , {align: 'center', title: '房产出售、办证情况（累计）', sort: true, width: 200,colspan: 2}
            ,{fixed: 'right', title: '操作', toolbar: '#barDemo', fixed: 'right', width: 165}
        ],[
            {field: 'xz', title: '其中：续租', width: 200, },
            {field: 'xzcz', title: '新增出租', width: 200},
            {field: 'xzxj', title: '小计', width: 200},
            {field: 'bnxzczlj', title: '本年新增出租累计', width: 200},
            {field: 'htdqtz', title: '合同到期退租', width: 200},
            {field: 'htwdqtz', title: '合同未到期退租', width: 200},
            {field: 'jsxj', title: '小计', width: 200},
            {field: 'bntzlj', title: '本年退租累计', width: 200},
            {field: 'cswbfcmj', title: '出售未办房产面积', width: 200},
            {field: 'yblghmj', title: '已办理过户面积', width: 200}
        ]],
    });
})