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
        , url: '../json/zctjbb.json' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'xh', title: '序号', width: 100, rowspan: 3},
            {field: 'glzx', title: '管理中心', width: 100, rowspan: 3},
            {field: 'fcmc', title: '房产名称', width: 100, rowspan: 3},
            {align: 'center', title: '经营性房产状况（m²）', colspan: 6},
            {align: 'center', title: '经营性房产状况（m²）', colspan: 9},
            {fixed: 'right', title: '操作', toolbar: '#barDemo', fixed: 'right', width: 165}
        ], [
            {align: 'center', title: '房产证面积', width: 200, colspan: 3},
            {align: 'center', title: '土地证面积', width: 200, colspan: 3},
            {align: 'center', title: '出租', width: 200, colspan: 2},
            {field: 'czl', title: '出租率', width: 200, rowspan: 2},
            {align: 'center', title: '自用', width: 200, colspan: 4},
            {field: 'xz', title: '闲置', width: 200, rowspan: 2},
            {field: 'ycswgh', title: '已出售未过户', width: 200, rowspan: 2}
        ], [
            {field: 'fczmjyzmj', title: '有证面积', width: 200},
            {field: 'fczmjwzmj', title: '无证面积', width: 200},
            {field: 'fczmjxj', title: '小计', width: 200},
            {field: 'tdzmjyzmj', title: '有证面积', width: 200},
            {field: 'tdzmjwzmj', title: '无证面积', width: 200},
            {field: 'tdzmjxj', title: '小计', width: 200,},
            {field: 'zccz', title: '正常出租', width: 200},
            {field: 'zcjm', title: '政策减免长期无收益、一次性收取租金', width: 400},
            {field: 'ggss', title: '公共设施', width: 200},
            {field: 'ck', title: '车库', width: 200},
            {field: 'wqzy', title: '完全自用', width: 200},
            {field: 'zyxj', title: '小计', width: 200},
        ]]
    });
})