/*layer 表格生成*/
layui.use('table', function () {
    var table = layui.table;
    table.render({
        elem: '#tableList'
        , toolbar: '#toolbarDemo'
        , url: '../json/lyxf.json' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'lyxfid', title: '序列号', sort: true, fixed: 'left'},
            {field: 'cqdw', title: '产权单位', sort: true},
            {field: 'housejc', title: '产权单位简称', sort: true},
            {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 200}
        ]]
    });

})


$(function () {

    /*添加点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm", function () {
        /*生成一个对象
        * 传入标题和内容
        * 生成弹窗
        * */
        var openMes = {
            title: '产权单位添加',
            maxmin: true,
            content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" action="">\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">产权单位：</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label" style="width: 100px;">产权单位简称：</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" style="width: 95%;">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>',
        }
        /*调用弹窗方法*/
        layerOpen(openMes);
    })
})