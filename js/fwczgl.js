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
            , {field: 'fczzh', title: '房权证证号', width: 200}
            , {field: 'fwsyqr', title: '房屋所有权人', width: 260}
            , {field: 'gyqk', title: '共有情况', width: 160}
            , {field: 'gldw', title: '管理单位', width: 160}
            , {field: 'yq', title: '园区/楼宇', width: 160}
            , {field: 'lh', title: '楼号', width: 160}
            , {field: 'lc', title: '楼层', width: 160}
            , {field: 'fh', title: '房号', width: 160}
            , {field: 'dzsj', title: '登记时间', width: 160}
            , {field: 'fwxz', title: '房屋性质', width: 160}
            , {field: 'ghyt', title: '规划用途', width: 160}
            , {field: 'fwzcs', title: '房屋总层数', width: 160}
            , {field: 'jzmj', title: '建筑面积㎡', width: 160}
            , {field: 'tnjzmj', title: '套内建筑面积㎡', width: 160}
            , {field: 'qt', title: '其他', width: 160}
            , {field: 'tddh', title: '土地地号', width: 160}
            , {field: 'tdsyqqdfs', title: '土地使用权取得方式', width: 160}
            , {field: 'tdsynx', title: '土地使用年限', width: 160}
            , {field: 'fj', title: '附记', width: 160}
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
                '    <label class="layui-form-label">房屋证证号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房屋所有人</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' + 
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">共有情况</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">管理单位</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +   
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">园区/楼宇</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +'  <div class="dialogDiv">\n' +
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
                '  </div>\n' +'  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +  
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">登记时间</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +'  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房屋性质</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +  
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">规划用途</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +'  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房屋总层数</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +  
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">建筑面积㎡</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +'  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">其他</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +  
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">土地地号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +'  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">土地使用权获取方式</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +  
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">土地使用年限</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +'  <div class="dialogDiv">\n' +
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


