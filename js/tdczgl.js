//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});

layui.use(['table', 'laydate', 'form'], function () {
    var table = layui.table
    var form = layui.form
    var laydate = layui.laydate;
    sgetcqdw()
    form.render();
    //第一个实例
    table.render({
        elem: '#tableList'
        , toolbar: '#toolbarDemo'
        // , url: '../json/czgl.json' //数据接口
        , url: IPzd + '/assets/land/all?asc=0' //数据接口
        , method: "POST"
        , contentType: "application/json"
        , where: {
            "landNum": "",
            "location": "",
            "ownId": ""
        }
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'assetsName', title: '土地产权名称', width: 260}
            , {field: 'owner', title: '土地使用权人', width: 260}
            , {field: 'assetsLocation', title: '座落', width: 160}
            , {field: 'landNum', title: '地号', width: 160}
            , {field: 'picNum', title: '图号', width: 160}
            , {field: 'useType', title: '地类（用途）', width: 160}
            , {field: 'money', title: '取得价值', width: 160}
            , {field: 'useRight', title: '使用权类型', width: 160}
            , {
                field: 'endTime', title: '终止日期', width: 160
            }
            , {field: 'assetsQueue', title: '使用权面积', width: 160}
            , {field: 'selfQueue', title: '独用面积', width: 160}
            , {field: 'shareQueue', title: '分摊面积', width: 160}
            , {field: 'remark', title: '备注', width: 160}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 200}
        ]]
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
            var ownId = $(".s-co").val()
            var location = $(".s-zl").val()
            var landNum = $(".s-dh").val()

            var formData = data.field;
            var name = formData.name,
                url = formData.url,
                icon = formData.icon,
                parent_id = formData.parent_id;
            //执行重载
            table.reload('tableList', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                , where: {//这里传参  向后台
                    "landNum": landNum,
                    "location": location,
                    "ownId": ownId
                },
                url: IPzd + '/assets/land/all?asc=0' //数据接口
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
            title: '产权单位添加',
            leixing: '添加',
            maxmin: true,
            btn: ['确定', '取消'],
            content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" action="">\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">土地产权名称</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input cqmz">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">土地权利人</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="co">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">坐落</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zl">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">地号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dh">\n' +
                '    </div>\n' +
                '  </div>\n' + '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">图号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input th">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">地类</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="usage">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' + '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">取得价值</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input qdjz">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">使用权类型</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="pronature">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' + '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">终止日期</label>\n' +
                '    <div class="layui-input-block">\n' +
                '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">使用权面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input symj">\n' +
                '    </div>\n' +
                '  </div>\n' + '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">独占面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dzmj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">分摊面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ftmj">\n' +
                '    </div>\n' +
                '  </div>\n' + '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">备注</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input bz">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>',
            add: function () {
                var data = {
                    "assetsName": $(".cqmz").val(),
                    "assetsLocation": $(".zl").val(),
                    "assetsQueue": $(".symj").val(),
                    "createdBy": 0,
                    "endTime": sjc($("#date").val() + " 23:59:59"),
                    "fkOwnId": $(".co").val(),
                    "landNum": $(".dh").val(),
                    "money": $(".qdjz").val(),
                    "picNum": $(".th").val(),
                    "remark": $(".bz").val(),
                    "selfQueue": $(".dzmj").val(),
                    "shareQueue": $(".ftmj").val(),
                    "useRight": $(".pronature").val(),
                    "useType": $(".usage").val()
                }

                $.ajax({
                    url: IPzd + '/assets/land',    //请求的url地址
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
        layui.use('laydate', function () {
            var laydate = layui.laydate;
            //自定义验证规则
            //执行一个laydate实例
            laydate.render({
                elem: '#date',
                format: 'yyyy年MM月dd日'
            });
        });
        getcqdw()
        getytqk()
        getcqxz()

        form.render();
    })


    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: IPzd + '/assets/land/' + obj.data.id,    //请求的url地址
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
                            var demoReload = $('#demoReload');
                            //执行重载
                            table.reload('tableList', {
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
                title: '编辑系统用户',
                leixing: '编辑',
                maxmin: true,
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地产权名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input cqmz">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地权利人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="co">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">坐落</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zl">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dh">\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">图号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input th">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地类</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="usage">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">取得价值</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input qdjz">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">使用权类型</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="pronature">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">终止日期</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">使用权面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input symj">\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">独占面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dzmj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">分摊面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ftmj">\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">备注</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input bz">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    getcqdw()
                    getytqk()
                    getcqxz()
                    $(".cqmz").val(obj.data.assetsName),
                        $(".zl").val(obj.data.assetsLocation),
                        $(".symj").val(obj.data.assetsQueue),
                        $("#date").val(obj.data.endTime),
                        $(".co").val(obj.data.fkOwnId),
                        $(".dh").val(obj.data.landNum),
                        $(".qdjz").val(obj.data.money),
                        $(".th").val(obj.data.picNum),
                        $(".bz").val(obj.data.remark),
                        $(".dzmj").val(obj.data.selfQueue),
                        $(".ftmj").val(obj.data.shareQueue),
                        $(".pronature").val(obj.data.useRight),
                        $(".usage").val(obj.data.useType)
                    laydate.render({
                        elem: '#date',
                        value: obj.data.endTime,
                        format: 'yyyy年MM月dd日'
                    });
                },
                put: function () {
                    var data = {
                        "id": obj.data.id,
                        "assetsName": $(".cqmz").val(),
                        "assetsLocation": $(".zl").val(),
                        "assetsQueue": $(".symj").val(),
                        "createdBy": 0,
                        "endTime": sjc($("#date").val() + " 23:59:59"),
                        "fkOwnId": $(".co").val(),
                        "landNum": $(".dh").val(),
                        "money": $(".qdjz").val(),
                        "picNum": $(".th").val(),
                        "remark": $(".bz").val(),
                        "selfQueue": $(".dzmj").val(),
                        "shareQueue": $(".ftmj").val(),
                        "useRight": $(".pronature").val(),
                        "useType": $(".usage").val()
                    }

                    $.ajax({
                        url: IPzd + '/assets/land',    //请求的url地址
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
                                table.reload('tableList', {
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
                },
            }
            layerOpen(openMes);

        } else if (layEvent == 'detail') {
            /*查看操作*/
            var openMes = {
                title: '查看系统用户',
                leixing: '查看',
                maxmin: true,
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地产权名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input cqmz" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地权利人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="co" disabled="disabled">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">坐落</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zl" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dh" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">图号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input th" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地类</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="usage" disabled="disabled">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">取得价值</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input qdjz" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">使用权类型</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="pronature" disabled="disabled">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">终止日期</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">使用权面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input symj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">独占面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dzmj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">分摊面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ftmj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">备注</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input bz" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    getcqdw()
                    getytqk()
                    getcqxz()
                    $(".cqmz").val(obj.data.assetsName),
                        $(".symj").val(obj.data.assetsQueue),
                        $(".zl").val(obj.data.assetsLocation),
                        $("#date").val(obj.data.endTime),
                        $(".co").val(obj.data.fkOwnId),
                        $(".dh").val(obj.data.landNum),
                        $(".qdjz").val(obj.data.money),
                        $(".th").val(obj.data.picNum),
                        $(".bz").val(obj.data.remark),
                        $(".dzmj").val(obj.data.selfQueue),
                        $(".ftmj").val(obj.data.shareQueue),
                        $(".pronature").val(obj.data.useRight),
                        $(".usage").val(obj.data.useType)
                }
            }
            layerOpen(openMes);
        }
    });
})




