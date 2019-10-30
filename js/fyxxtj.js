//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});
layui.use(['table', 'form'], function () {
    var table = layui.table;
    var form = layui.form;
    //第一个实例
    table.render({
        elem: '#tableList'
        , toolbar: '#toolbarDemo'
        //, url: '../json/fyxxtj.json' //数据接口
        , url: IPzd + '/hresource/all?asc=1' //数据接口
        , method: "POST"
        , contentType: "application/json"
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'assetsName', title: '房产名称（产权名称）'},
            {field: 'manageUnit', title: '管理单位'},
            {field: 'park', title: '园区/楼宇'},
            {field: 'buildNo', title: '楼号'},
            {field: 'buildlevel', title: '楼层'},
            {field: 'buildroom', title: '房号'},
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
                // '  </div>\n' + '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">楼号</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input lh">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房源名称</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fymc">\n' +
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
                    "sellStatus": $(".czzt").val(),
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
        form.on('select', function (data) {
            if (data.value == "") {
                $(".yqly").val("");
                $(".lh").val("")
            } else {
                $(".yqly").val($(data.elem).find("option:selected").attr("parkId"));
                $(".lh").val($(data.elem).find("option:selected").attr("houseNum"))
            }

        })
    })


    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: IPzd + '/assets/house/' + obj.data.id,    //请求的url地址
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
                            table.reload('idTest', {
                                page: {
                                    curr: 1 //重新从第 1 页开始
                                }
                            });
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
                    // '  </div>\n' + '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">楼号</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input lh">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房源名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fymc">\n' +
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
                    $(".czzt").val(obj.data.sellCode)
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
                        "sellStatus": $(".czzt").val(),
                    }
                    $.ajax({
                        url: IPzd + '/assets/house',    //请求的url地址
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
                                var demoReload = $('#demoReload');
                                //执行重载
                                table.reload('idTest', {
                                    page: {
                                        curr: 1 //重新从第 1 页开始
                                    }
                                });
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

                    /*调用弹窗方法*/
                    layerOpen(openMes);
                    layui.use('laydate', function () {
                        var laydate = layui.laydate;
                        //自定义验证规则
                        //执行一个laydate实例
                        laydate.render({
                            elem: '#date'
                        });
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
                    '    <label class="layui-form-label">房权证证号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required   class=" layui-input houseId" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">产权名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input assetsName">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋所有人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input manageUnit" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">共有情况</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input shareType" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">管理单位</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input owner " readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">所在园区</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input parkId" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">楼号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input houseNum" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">登记时间</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input registerTime" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋性质</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required   class=" layui-input hourseType" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label" style="width:84px;padding-left:11px">房产规划用途</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input housePlanUse"  readonly >\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">总层数</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input totalLevel" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">建筑面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input buildArea" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">套内面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input realArea" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">其他面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input otherArea"readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input landNum" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label" style="width:84px;padding-left:11px">土地获得方式</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input landGetMethod" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label" style="width:84px;padding-left:11px">土地使用年限</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input landUseYear" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">备注</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required      class=" layui-input remark" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    $(".houseId").val(obj.data.houseId)
                    $(".assetsName").val(obj.data.assetsName)
                    $(".owner").val(obj.data.owner)
                    $(".shareType").val(obj.data.shareType)
                    $(".manageUnit").val(obj.data.manageUnit)
                    $(".parkId").val(obj.data.parkId)
                    $(".houseNum").val(obj.data.houseNum)
                    $(".registerTime").val(obj.data.registerTime)
                    $(".hourseType").val(obj.data.hourseType)
                    $(".housePlanUse").val(obj.data.housePlanUse)
                    $(".totalLevel").val(obj.data.totalLevel)
                    $(".buildArea").val(obj.data.buildArea)
                    $(".realArea").val(obj.data.realArea)
                    $(".otherArea").val(obj.data.otherArea)
                    $(".landNum").val(obj.data.landNum)
                    $(".landGetMethod").val(obj.data.landGetMethod)
                    $(".landUseYear").val(obj.data.landUseYear)
                    $(".remark").val(obj.data.remark)
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
                    var option = $("<option value='" + o.id + "' parkId='" + o.parkId + "' houseNum='" + o.houseNum + "' houseNum='" + o.houseNum + "'>" + o.houseId + "</option>").appendTo(".houseZh")
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



