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
        , url: '../json/fyxxtj.json' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'fyxxtjid', title: '序号', sort: true, width: 100, rowspan: 3},
            {field: 'zcmc', title: '房产名称（产权名称）', sort: true, width: 200, rowspan: 3},
            {field: 'gldw', title: '管理单位', width: 160, rowspan: 3},
            {field: 'yq', title: '园区/楼宇', width: 160, rowspan: 3},
            {field: 'lh', title: '楼号', width: 160, rowspan: 3},
            {field: 'lc', title: '楼层', width: 160, rowspan: 3},
            {field: 'fh', title: '房号', width: 160, rowspan: 3},
            {field: 'fczhm', title: '房产证号码', sort: true, width: 200, rowspan: 3},
            {field: 'fcsyqr', title: '房产所有权人', sort: true, width: 200, rowspan: 3},
            {align: 'center', title: '房屋面积（㎡）', sort: true, width: 200, colspan: 3},
            {field: 'tdzhm', title: '土地证号码', sort: true, width: 200, rowspan: 3},
            {field: 'tdsyqr', title: '土地所有权人', sort: true, width: 200, rowspan: 3},
            {align: 'center', title: '土地面积（㎡）', sort: true, width: 200, colspan: 3},
            {align: 'center', title: '房屋使用面积（平方米）', sort: true, width: 200, colspan: 8},
            {field: 'bz', title: '备注', sort: true, width: 200, rowspan: 3},
            {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 200, rowspan: 3}
        ], [
            {field: 'fwmjxj', title: '小计', width: 200, rowspan: 2},
            {align: 'center', title: '其中', colspan: 2},
            {field: 'tdmjxj', title: '小计', width: 200, rowspan: 2},
            {align: 'center', title: '其中', colspan: 2},
            {field: 'cz', title: '出租', width: 200, rowspan: 2},
            {field: 'cs', title: '出售', width: 200, rowspan: 2},
            {align: 'center', title: '自用', colspan: 4},
            {field: 'xz', title: '闲置', width: 200, rowspan: 2},
            {field: 'qt', title: '其他', width: 200, rowspan: 2},
        ],
            [
                {field: 'fwmjyzmj', title: '有证面积', width: 200},
                {field: 'fwmjwzmj', title: '无证面积', width: 200},
                {field: 'tdmjyzmj', title: '有证面积', width: 200},
                {field: 'tdmjwzmj', title: '无证面积', width: 200},
                {field: 'fwsymjxj', title: '小计', width: 200},
                {field: 'fwsymjgtjss', title: '公摊及设施', width: 200},
                {field: 'fwsymjck', title: '车库', width: 200},
                {field: 'fwsymjwqzy', title: '完全自用', width: 200},
            ]],
        done: function (res, curr, count) {
            // $(".layui-table-box").find("[data-field='fyxxtjid']").css("display", "none");
        }
    });

    /*添加点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm", function () {
        /*生成一个对象
        * 传入标题和内容
        * 生成弹窗
        * */
        var openMes = {
            title: '产权单位添加',
            leixing: '添加',
            maxmin: true,
            btn: ['确定', '取消'],
            content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" action="">\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房产证号码</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">园区/楼宇</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' + '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">楼号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">楼层</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' + '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                // '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">房产名称</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                // '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">管理单位</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                // '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">房产所有人</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '   <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房屋有证面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '   <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房屋无证面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '   <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">土地证号码</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                // '   <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">土地所有权人</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '   <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">土地有证面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '   <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">土地无证面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">状态</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '    </div>\n' +
                '   <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房屋有证面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '   <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房屋无证面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">附记</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
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


