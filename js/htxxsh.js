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
        , url: '../json/zctj.json' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'xlh', title: '序号', fixed: 'left'}
            , {field: 'htbh', title: '合同编号', sort: true, width: 200}
            , {field: 'jytgdw', title: '经营托管单位', sort: true, width: 200}
            , {field: 'zclz', title: '资产坐落', sort: true, width: 200}
            , {field: 'czf', title: '出租方', sort: true, width: 200}
            , {field: 'czfmc', title: '承租方名称', sort: true, width: 200}
            , {field: 'czmj', title: '出租面积(㎡)', sort: true, width: 200}
            , {field: 'fkfs', title: '付款方式', sort: true, width: 200}
            , {field: 'htksrq', title: '合同开始日期', sort: true, width: 200}
            , {field: 'htzzrq', title: '合同终止日期', sort: true, width: 200}
            , {field: 'htqdrq', title: '合同签订日期', sort: true, width: 200}
            , {field: 'mzq', title: '免租期', sort: true, width: 200}
            , {field: 'htlx', title: '合同类型', sort: true, width: 200}

            , {field: 'fzksr', title: '付租起始日', sort: true, width: 200}
            , {field: 'htnzj', title: '合同年租金（元）', sort: true, width: 200}
            , {field: 'dj', title: '单价(元/㎡/天）', sort: true, width: 200}
            , {field: 'yzj', title: '原租价', sort: true, width: 200}
            , {field: 'zdj', title: '指导价', sort: true, width: 200}
            , {field: 'xq', title: '新（续）签', sort: true, width: 200}
            , {field: 'bz', title: '备注', sort: true, width: 200}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', fixed: 'right', width: 165}
        ]]
    });
})