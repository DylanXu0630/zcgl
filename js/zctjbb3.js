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
        , url: '../json/zctjbb3.json' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'xlh', title: '序号', fixed: 'left',rowspan:3}
            , {field: 'zcgldw', title: '资产管理单位', sort: true, width: 200,rowspan:3}
            , {align: 'center', title: '租金收入情况', sort: true, width: 200,colspan:5}
            , {align: 'center', title: '销售收入情况', sort: true, width: 200,colspan:2}
            , {align: 'center', title: '收到往年欠租', sort: true, width: 200,colspan:2}
            , {field: 'bz', title: '备注', sort: true, width: 200,rowspan:3}
            , {field: 'khmb', title: '考核目标', sort: true, width: 200,rowspan:3}
            ,{fixed: 'right', title: '操作', toolbar: '#barDemo', fixed: 'right', width: 165}

        ],[
            {align: 'center', title: '应收租金', sort: true, width: 200,colspan:2}
            , {align: 'center', title: '到账租金', sort: true, width: 200,colspan:2}
            , {field: 'dzl', title: '到账率', sort: true, width: 200,rowspan:2}
            , {field: 'bnljys', title: '本年累计应收', sort: true, width: 200,rowspan:2}
            , {field: 'bnljdz', title: '本年累计到账', sort: true, width: 200,rowspan:2}
            , {field: 'by', title: '本月', sort: true, width: 200,rowspan:2}
            , {field: 'bnlj', title: '本年累计', sort: true, width: 200,rowspan:2}
        ],[
            {field: 'yszjby', title: '本月', sort: true, width: 200}
            ,{field: 'yszjbnlj', title: '本年累计', sort: true, width: 200}
            ,{field: 'dzzjby', title: '本月', sort: true, width: 200}
            ,{field: 'dzzjlj', title: '本年累计', sort: true, width: 200}
        ]]
    });
})