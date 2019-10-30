//JavaScript代码区域

var reload;
layui.use('element', function () {
    var element = layui.element;
});
layui.use(['table', 'form'], function () {
    var table = layui.table;
    var form = layui.form;
    form.render();
    //第一个实例

    table.render({
        elem: '#tableList'
        , id: 'idTest'
        , toolbar: '#toolbarDemo'

        , url: IPzd+'/dic/deal/status?asc=1'//数据接口
        , parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": 0, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.data.total, //解析数据长度
                "data": res.data.records //解析数据列表
            };
        }
        , page: true //开启分页
        , cols: [[ //表头
            { field: 'name', title: '合同状态'}    
            , { fixed: 'right', title: '操作', toolbar: '#barDemo',width:200 }
        ]]
        
    });
    // table.reload;

    //监听行工具事件
    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({

                    url: IPzd+'/dic/deal/status/' + obj.data.id, //数据接口
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
                title: '编辑合同状态',
                leixing: '编辑',
                maxmin: true,
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" lay-filter="look" action="">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">合同状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="这是必填项，请输入" required="合同状态是必填项" autocomplete="off" class="layui-input name">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    $(".name").val(obj.data.name)
                },

                put: function () {
                    var data = {
                        "id": obj.data.id,
                        "name": $(".name").val(),
                    }

                    $.ajax({
                        url: IPzd+'/dic/deal/status', //数据接口
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
                },
            }

            layerOpen(openMes);
        }
    });

    var reload = table.reload({
        page: {
            curr: 1 //重新从第 1 页开始
        }
    }); //只重载数据


    /*添加点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm", function () {
        /*生成一个对象
        * 传入标题和内容
        * 生成弹窗
        * */
        var openMes = {
            title: '添加合同状态',
            leixing: '添加',
            maxmin: true,
            btn: ['确定', '取消'],
            content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" action="">\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">合同状态</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="这是必填项，请输入" required="合同状态是必填项" autocomplete="off" class="layui-input nickname ">\n' +
                '    </div>\n' +
                '</div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>',
            add: function () {
                var data = {
                    "name": $(".nickname").val(),
                }

                $.ajax({
                    url: IPzd+'/dic/deal/status', //数据接口
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
                            var demoReload = $('#demoReload');
                            //执行重载
                            table.reload('idTest', {
                                page: {
                                    curr: 1 //重新从第 1 页开始
                                }
                            });
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
    })
})


function getOneUser() {
    $.ajax({
        url: IPzd+'/dic/deal/status', //数据接口
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
                var demoReload = $('#demoReload');
                //执行重载
                table.reload('idTest', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                });
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
}
