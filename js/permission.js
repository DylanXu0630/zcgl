//JavaScript代码区域

var reload;
layui.use('element', function () {
    var element = layui.element;
});
layui.use(['table', 'form'], function () {
    var table = layui.table;
    var form = layui.form;
    form.render();
    form.on('select(qxlx)', function(data) {
        if (data.value === '1') {
            $("#qqfs").val('GET');
            $("#put").attr("disabled","true");
            $("#delete").attr("disabled","true");
            $("#post").attr("disabled","true");
            form.render('select');
        } else {
            $("#put").removeAttr("disabled");
            $("#delete").removeAttr("disabled");
            $("#post").removeAttr("disabled");
            form.render('select');
        }
    })
    //第一个实例
    table.render({
        elem: '#tableList'
        , toolbar: '#toolbarDemo'
        // , url: '../json/sysUser.json'
        , url: IPdz + '/permission?asc=0' //数据接口
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
            {field: 'cnName', title: '名称', width: 200}
            , {field: 'method', title: '请求方式'}
            , {field: 'url', title: 'url地址'}
            , {field: 'parent', title: '父级名称'}
            , {field: 'type', title: '权限类型', templet: function (d) {
                return getQx(d.type)
            }}
            , {field: 'description', title: '说明'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 220}
        ]]
    });

    //监听行工具事件
    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: IPdz + '/permission/' + obj.data.id,    //请求的url地址
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
                area: ['650px', '500px'],
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" lay-filter="look" action="">\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">中文名称:</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zwmc">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">英文名称:</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ywmc">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">权限类型：</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select id="qxlx" lay-verify="required" lay-filter="qxlx">' +
                '        <option value="1">菜单</option>' +
                '        <option value="2">按钮</option>' +
                '       </select>' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv test">\n' +
                '    <label class="layui-form-label">上级菜单：</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select id="sjcd" lay-verify="required">' +
                '       <option value="0">根菜单</option>' +
                '      </select>' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">请求方法：</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select id="qqfs" lay-verify="required">' +
                '        <option value="GET">GET</option>' +
                '        <option value="PUT" id="put">PUT</option>' +
                '        <option value="DELETE" id="delete">DELETE</option>' +
                '        <option value="POST" id="post">POST</option>'+
                '       </select>' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">URL地址：</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input url">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">说明：</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input description">\n' +
                '    </div>\n' +
                '</div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>', 
                look: function () {
                    $(".zwmc").val(obj.data.cnName)
                    $(".ywmc").val(obj.data.enName)
                    $(".url").val(obj.data.url)
                    $(".description").val(obj.data.description)
                    $("#qqfs").val(obj.data.method);
                    $("#qxlx").val(obj.data.type);
                    if (obj.data.type == '1') {
                        $("#put").attr("disabled","true");
                        $("#delete").attr("disabled","true");
                        $("#post").attr("disabled","true");
                        form.render('select');
                    } else {
                        $("#put").removeAttr("disabled");
                        $("#delete").removeAttr("disabled");
                        $("#post").removeAttr("disabled");
                        form.render('select');
                    }
                    $.ajax({
                        url: IPdz + '/permission/all',    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                        type: "GET",   //请求方式
                        contentType: "application/json;charset=UTF-8",
                        // headers: {"token": sessionStorage.token},
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                            req.data.forEach(element => {
                                var div = $('<option value="' + element.id + '">'+ element.name +'</option>').appendTo("#sjcd")
                            });
                        },
                        complete: function () {
                            //请求完成的处理
                        },
                        error: function () {
                            //请求出错处理
                        }
                    });
                    $("#sjcd").val(obj.data.parentId);
                },
                put: function () {
                    var data = {
                        "id": obj.data.id,
                        "createdBy": localStorage.getItem("userId"),
                        "description": $(".description").val(),
                        "enName": $(".ywmc").val(),
                        "cnName": $(".zwmc").val(),
                        "parentId": $("#sjcd").val(),
                        "type": $("#qxlx").val(),
                        "url": $(".url").val(),
                        "method": $("#qqfs").val()
                    }
                    $.ajax({
                        url: IPdz + '/permission',    //请求的url地址
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

        }
    });


    /*添加点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm", function () {
        /*生成一个对象
        * 传入标题和内容
        * 生成弹窗
        * */
        var openMes = {
            title: '权限添加',
            leixing: '编辑',
            maxmin: true,
            area: ['650px', '450px'],
            btn: ['确定', '取消'],
            content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" lay-filter="look" action="">\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">中文名称:</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zwmc">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">英文名称:</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ywmc">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">权限类型：</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select id="qxlx" lay-verify="required" lay-filter="qxlx">' +
                '        <option value="1">菜单</option>' +
                '        <option value="2">按钮</option>' +
                '       </select>' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv test">\n' +
                '    <label class="layui-form-label">上级菜单：</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select id="sjcd" lay-verify="required">' +
                '       <option value="0">根菜单</option>' +
                '      </select>' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">请求方法：</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select id="qqfs" lay-verify="required">' +
                '        <option value="GET">GET</option>' +
                '        <option value="PUT" id="put" disabled>PUT</option>' +
                '        <option value="DELETE" id="delete" disabled>DELETE</option>' +
                '        <option value="POST" id="post" disabled>POST</option>'+
                '       </select>' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">URL地址：</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input url">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">说明：</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input description">\n' +
                '    </div>\n' +
                '</div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>', 
            look: function () {
                $.ajax({
                    url: IPdz + '/permission/all',    //请求的url地址
                    dataType: "json",   //返回格式为json
                    async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                    type: "GET",   //请求方式
                    contentType: "application/json;charset=UTF-8",
                    // headers: {"token": sessionStorage.token},
                    beforeSend: function () {
                        //请求前的处理
                    },
                    success: function (req) {
                        req.data.forEach(element => {
                            var div = $('<option value="' + element.id + '">'+ element.name +'</option>').appendTo("#sjcd")
                        });
                    },
                    complete: function () {
                        //请求完成的处理
                    },
                    error: function () {
                        //请求出错处理
                    }
                });
            },
            put: function () {
                var data = {
                    "createdBy": localStorage.getItem("userId"),
                    "description": $(".description").val(),
                    "enName": $(".ywmc").val(),
                    "cnName": $(".zwmc").val(),
                    "parentId": $("#sjcd").val(),
                    "type": $("#qxlx").val(),
                    "url": $(".url").val(),
                    "method": $("#qqfs").val()
                }
                $.ajax({
                    url: IPdz + '/permission',    //请求的url地址
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
                            table.reload('tableList', {
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
        }
        /*调用弹窗方法*/
        layerOpen(openMes);
    })
})

function getQx(type) {
    if (type == '1') return '菜单';
    else if (type == '2') return '按钮';
}

function getOneUser() {
    $.ajax({
        url: IPdz + '/user',    //请求的url地址
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
                table.reload('tableList', {
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
