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
        , url: '../json/zjjqyj.json' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'xh', title: '序列号'}
            , {field: 'czdw', title: '承租单位'}
            , {field: 'glgs', title: '管理中心'}
            , {field: 'htbm', title: '合同编码'}
            , {field: 'htksrq', title: '合同开始日期 '}
            , {field: 'htjsrq', title: '合同结束日期'}
            , {field: 'dqsyts', title: '到期剩余天数'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', fixed: 'right', width: 165}

        ]]
    });
})