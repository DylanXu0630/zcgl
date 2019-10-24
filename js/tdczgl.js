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
            {field: 'xlh', title: '序号', width: 160}
            , {field: 'tdsyqr', title: '土地使用权人', width: 260}
            , {field: 'zl', title: '座落', width: 160}
            , {field: 'dh', title: '地号', width: 160}
            , {field: 'th', title: '图号', width: 160}
            , {field: 'dl', title: '地类（用途）', width: 160}
            , {field: 'qdjz', title: '取得价值', width: 160}
            , {field: 'syqlx', title: '使用权类型', width: 160}
            , {field: 'zzrq', title: '终止日期', width: 160}
            , {field: 'syqmj', title: '使用权面积', width: 160}
            , {field: 'dzmj', title: '独占面积', width: 160}
            , {field: 'ftmj', title: '分摊面积', width: 160}
            , {field: 'bz', title: '备注', width: 160}
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

$(function () {
    /*添加点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm", function () {
        /*生成一个对象
        * 传入标题和内容
        * 生成弹窗
        * */
        var openMes = {
            title: '产权单位添加',

            content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" action="">\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">土地权利人</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">坐落</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' + 
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">地号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +'  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">图号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">地类</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +'  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">取得价值</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +    
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">使用权类型</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +'  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">终止日期</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +   
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">使用权面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +'  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">独占面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +  
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">分摊面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +'  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">备注</label>\n' +
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


