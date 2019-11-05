//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});
layui.use(['table', 'form'], function () {
    var table = layui.table;
    var form = layui.form;

    sgetfczh()
    form.render()
    //第一个实例
    table.render({
        elem: '#tableList'
        , toolbar: '#toolbarDemo'
        //, url: '../json/fyxxtj.json' //数据接口
        , url: IPzd + '/hresource/all?asc=0' //数据接口
        , method: "POST"
        , contentType: "application/json"
        , page: true //开启分页
        , where: {//这里传参  向后台
            "agencyId": "",
            "assetsId": "",
            "buildLevel": "",
            "buildNo": "",
            "buildRoom": "",
            "parkId": "",
            "rentStatus": "",
            "sellStatus": ""
        }
        , cols: [[ //表头
            {field: 'assetsName', title: '房产名称（产权名称）'},
            {field: 'manageUnit', title: '管理单位'},
            {field: 'park', title: '园区/楼宇'},
            {field: 'buildNo', title: '楼号'},
            {field: 'buildLevel', title: '楼层'},
            {field: 'buildRoom', title: '房号'},
            {field: 'resourceArea', title: '房源面积'},
            {field: 'rentStatus', title: '出租状态'},
            {field: 'sellStatus', title: '出售状态'},
            {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 200}]]
        , parseData: function (res) {//将原始数据解析成 table 组件所规定的数据
            return {
                "code": 0, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.data.total, //解析数据长度
                "data": res.data.records //解析数据列表
            };
        }
    });


    /*搜索*/
    $("#sousuo").on("click", function () {
        form.on('submit(search)', function (data) {

            //执行重载
            table.reload('tableList', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                , where: {//这里传参  向后台
                    "agencyId": "",
                    "assetsId": $(".s-fc").val(),
                    "buildLevel": $(".s-lc").val(),
                    "buildNo": $(".s-lh").val(),
                    "buildRoom": $(".s-fh").val(),
                    "parkId": "",
                    "rentStatus": $(".isCz").val(),
                    "sellStatus": $(".isCz").val()
                },
                url: IPzd + '/hresource/all?asc=0' //数据接口
                , method: 'post'
            });
            return false;//false：阻止表单跳转  true：表单跳转
        });


    })


    /*添加点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm", function () {
        /*生成一个对象
        * 传入标题和内容
        * 生成弹窗
        * */
        var openMes = {
            title: '房源信息添加',
            leixing: '添加',
            maxmin: true,
            btn: ['确定', '取消'],
            content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" action="">\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房源名称</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fymc">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房产名称</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="houseZh">\n' +
                '         <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                // '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">园区/楼宇</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input yqly">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">楼号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input lh">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">楼层</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input lc">\n' +
                '    </div>\n' +
                '  </div>\n' + '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fh">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房源面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fymj">\n' +
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
                // '   <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">房屋有证面积</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fyzmj">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                // '   <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">房屋无证面积</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fwzmj">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                // '   <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">土地证号码</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                // '   <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">土地所有权人</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                // '   <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">土地有证面积</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input tdyzmj">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                // '   <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">土地无证面积</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input tdwzmj">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">出租状态</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="czzt">\n' +
                '         <option value="">请选择</option>\n' +
                '         <option value="1">已出租</option>\n' +
                '         <option value="0">未出租</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '    </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">出售状态</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="cszt">\n' +
                '         <option value="">请选择</option>\n' +
                '         <option value="1">已出售</option>\n' +
                '         <option value="0">未出售</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '    </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">附记</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>',
            add: function () {
                var data = {
                    "buildLevel": $(".lc").val(),
                    "buildNo": $(".lh").val(),
                    "buildRoom": $(".fh").val(),
                    "createdBy": user,
                    "fkHouseAssetsId": $(".houseZh").val(),
                    "remark": $(".fj").val(),
                    "rentStatus": $(".cszt").val(),
                    "resourceArea": $(".fymj").val(),
                    "resourceName": $(".fymc").val(),
                    "sellStatus": $(".cszt").val(),
                    "rentStatus": $(".czzt").val()
                }

                $.ajax({
                    url: IPzd + '/hresource',    //请求的url地址
                    dataType: "json",   //返回格式为json
                    async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                    data: JSON.stringify(data),    //参数值
                    type: "POST",   //请求方式
                    contentType: "application/json;charset=UTF-8",
                    // headers: {"token": sessionStorage.token},
                    beforeSend: function () {
                        //请求前的处理
                    },
                    success: function (req) {
                        if (req.status == "200") {
                            layer.close(indexDig);
                            layer.msg("添加成功")
                            //执行重载
                            table.reload('tableList');
                        } else {
                            layer.msg("添加失败")
                        }

                    },
                    complete: function () {
                        //请求完成的处理
                    },
                    error: function () {
                        //请求出错处理
                    }
                });
            },
        }
        /*调用弹窗方法*/
        layerOpen(openMes);
        getfczh()
        form.render('select')
    })


    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: IPzd + '/hresource/' + obj.data.id,    //请求的url地址
                    dataType: "json",   //返回格式为json
                    async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                    type: "DELETE",   //请求方式
                    contentType: "application/json;charset=UTF-8",
                    // headers: {"token": sessionStorage.token},
                    beforeSend: function () {
                        //请求前的处理
                    },
                    success: function (req) {
                        if (req.status == "200") {
                            layer.close(indexDig);
                            layer.msg("删除成功")
                            //执行重载
                            table.reload('tableList');
                        } else {
                            layer.msg("删除失败")
                        }
                    },
                    complete: function () {
                        //请求完成的处理
                    },
                    error: function () {
                        //请求出错处理
                    }
                });
                layer.close(index);
                //向服务端发送删除指令
            });
        } else if (layEvent === 'edit') {
            /*编辑操作;*/
            var openMes = {
                title: '编辑房源',
                leixing: '编辑',
                maxmin: true,
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房源名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fymc">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房产证号码</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="houseZh">\n' +
                    '         <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">园区/楼宇</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input yqly">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">楼号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input lh">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">楼层</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input lc">\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fh">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房源面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fymj">\n' +
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
                    // '   <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">房屋有证面积</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fyzmj">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    // '   <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">房屋无证面积</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fwzmj">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    // '   <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">土地证号码</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    // '   <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">土地所有权人</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    // '   <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">土地有证面积</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input tdyzmj">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    // '   <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">土地无证面积</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input tdwzmj">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">出租状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="czzt">\n' +
                    '         <option value="">请选择</option>\n' +
                    '         <option value="1">已出租</option>\n' +
                    '         <option value="0">未出租</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">出售状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="cszt">\n' +
                    '         <option value="">请选择</option>\n' +
                    '         <option value="1">已出售</option>\n' +
                    '         <option value="0">未出售</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">附记</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    getfczh()
                    $(".lc").val(obj.data.buildLevel)
                    $(".lh").val(obj.data.buildNo)
                    $(".fh").val(obj.data.buildRoom)
                    $(".houseZh").val(obj.data.assetsId)
                    $(".fj").val(obj.data.remark)
                    $(".cszt").val(obj.data.rentCode)
                    $(".fymj").val(obj.data.resourceArea)
                    $(".fymc").val(obj.data.assetsName)
                    $(".cszt").val(obj.data.sellCode)
                    $(".czzt").val(obj.data.rentCode)
                },
                put: function () {
                    var data = {
                        "id": obj.data.id,
                        "buildLevel": $(".lc").val(),
                        "buildNo": $(".lh").val(),
                        "buildRoom": $(".fh").val(),
                        "createdBy": user,
                        "fkHouseAssetsId": $(".houseZh").val(),
                        "remark": $(".fj").val(),
                        "rentStatus": $(".cszt").val(),
                        "resourceArea": $(".fymj").val(),
                        "resourceName": $(".fymc").val(),
                        "sellStatus": $(".cszt").val(),
                        "rentStatus": $(".czzt").val()
                    }
                    $.ajax({
                        url: IPzd + '/hresource',    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                        data: JSON.stringify(data),    //参数值
                        type: "PUT",   //请求方式
                        contentType: "application/json;charset=UTF-8",
                        // headers: {"token": sessionStorage.token},
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                            if (req.status == "200") {
                                layer.close(indexDig);
                                layer.msg("修改成功")
                                //执行重载
                                table.reload('tableList');
                            } else {
                                layer.msg("修改失败")
                            }

                        },
                        complete: function () {
                            //请求完成的处理
                        },
                        error: function () {
                            //请求出错处理
                        }
                    });
                },

            }

            layerOpen(openMes);
        } else if (layEvent == 'detail') {
            /*查看操作*/
            var openMes = {
                title: '查看房源',
                leixing: '查看',
                maxmin: true,
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房源名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fymc" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房产证号码</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input houseZh" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">园区/楼宇</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input yqly">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">楼号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input lh" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '   <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房产总楼层</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zlc">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">楼层</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input lc" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fh" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">管理单位</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input gldw" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房产拥有者</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input gldw" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房源面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fymj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">管理单位</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input gldw">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地拥有者</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input tdyyz">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dh">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '   <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地产坐落</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dczl">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '   <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">土地证号码</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    // '   <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">土地所有权人</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    // '   <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">土地有证面积</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input tdyzmj">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    // '   <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">土地无证面积</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input tdwzmj">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">出租状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="czzt" disabled>\n' +
                    '         <option value="">请选择</option>\n' +
                    '         <option value="1">已出租</option>\n' +
                    '         <option value="0">未出租</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">出售状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="cszt" disabled>\n' +
                    '         <option value="">请选择</option>\n' +
                    '         <option value="1">已出售</option>\n' +
                    '         <option value="0">未出售</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">附记</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    $.ajax({
                        url: IPzd + '/hresource/' + obj.data.id,    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                        type: "GET",   //请求方式
                        contentType: "application/json;charset=UTF-8",
                        // headers: {"token": sessionStorage.token},
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                            if (req.status == "200") {
                                getfczh()
                                $(".yqly").val(req.data.manageUnit)
                                $(".gldw").val(req.data.manageUnit)
                                $(".lc").val(req.data.buildLevel)
                                $(".lh").val(req.data.buildNo)
                                $(".fh").val(req.data.buildRoom)
                                $(".houseZh").val(req.data.assetsName)
                                $(".fj").val(req.data.remark)
                                $(".cszt").val(req.data.rentCode)
                                $(".fymj").val(req.data.resourceArea)
                                $(".fymc").val(req.data.assetsName)
                                $(".cszt").val(req.data.sellCode)
                                $(".czzt").val(req.data.rentCode)
                                $(".gldw").val(req.data.manageUnit)
                                $(".dczl").val(req.data.landLocation)
                                $(".tdyyz").val(req.data.landOwner)
                                $(".dh").val(req.data.landNum)
                                $(".zlc").val(req.data.totalLevel)
                                form.render('select')
                            } else {
                                layer.msg("获取失败")
                            }

                        },
                        complete: function () {
                            //请求完成的处理
                        },
                        error: function () {
                            //请求出错处理
                        }
                    });
                }
            }
            layerOpen(openMes);
        }
    });
})


/*获取房产证号*/
function getfczh() {
    $.ajax({
        url: IPzd + '/assets/house/menu',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".houseZh").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".houseZh")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.assetsName + "</option>").appendTo(".houseZh")
                })
            } else {
                layer.msg("房屋产证获取失败")
            }

        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });
}

function sgetfczh() {
    $.ajax({
        url: IPzd + '/assets/house/menu',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".s-fc").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".s-fc")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.assetsName + "</option>").appendTo(".s-fc")
                })
            } else {
                layer.msg("房屋产证获取失败")
            }

        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });
}



