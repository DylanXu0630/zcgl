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
        , url: '../json/bzjyj.json' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'xh', title: '序列号'}
            , {field: 'htbh', title: '合同编号'}
            , {field: 'jywtdw', title: '经营委托单位'}
            , {field: 'czf', title: '出租方'}
            , {field: 'chzf', title: '承租方 '}
            , {field: 'fwzl', title: '房屋坐落'}
            , {field: 'htqdrq', title: '合同签订日期'}
            , {field: 'bajsfyj', title: '保证金是否已交'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', fixed: 'right', width: 165}
        ]]
    });
})