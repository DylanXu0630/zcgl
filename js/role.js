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
        , url:  IPdz + '/role?asc=0' //数据接口
        , page: true //开启分页
        , parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": 0, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.data.total, //解析数据长度
                "data": res.data.records //解析数据列表
            };
        }
        , cols: [[ //表头
            {field: 'cnName', title: '角色', width: 200}
            , {field: 'description', title: '说明'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 200}
        ]]
    });

    //监听行工具事件
    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: IPdz + '/role/' + obj.data.id,    //请求的url地址
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
                title: '编辑角色',
                leixing: '编辑',
                area: ['650px', '300px'],
                maxmin: true,
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">中文名称:</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zwmc">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">角色描述：</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input jsms">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">英文名称：</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ywmc">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    $(".zwmc").val(obj.data.cnName)
                    $(".jsms").val(obj.data.description)
                    $(".ywmc").val(obj.data.enName)
                },
                put: function () {
                    var data = {
                        "id": obj.data.id,
                        "cnName": $(".zwmc").val(),
                        "description": $(".jsms").val(),
                        "enName": $(".ywmc").val(),
                        "parentId": 0
                    }

                    $.ajax({
                        url: IPdz + '/role',    //请求的url地址
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
         } else {
             var tree;
             /*权限操作;*/
             var openMes = {
                title: '用户权限',
                leixing: '编辑',
                area: ['700px', '650px'],
                maxmin: true,
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" lay-filter="look" action="">\n' +
                    '<div id="treeT"> </div>' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    // 树形控件tree

                    // 1.获取全部权限树
                    var trees = [];
                    $.ajax({
                        url: IPdz + '/permission/tree',    //请求的url地址
                        // url: '/json/ss.json',
                        dataType: "json",   //返回格式为json
                        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                        type: "GET",   //请求方式
                        contentType: "application/json;charset=UTF-8",
                        // headers: {"token": sessionStorage.token},
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                           let arr = req.data 
                           // 禁用父节点被选中    
                           arr.forEach(element => {
                               if (element.children.length === 0) {
                                 element.disabled = false
                               } else {
                                 element.disabled = true
                                 element.children.forEach(e1 => {
                                     if (e1.children.length === 0) {
                                        e1.disabled = false
                                     } else {
                                        e1.disabled = true
                                        e1.children.forEach(e2 => {
                                            if (e2.children.length === 0) {
                                                e2.disabled = false
                                            } else {
                                                e2.disabled = true
                                                e2.children.forEach(e3 => {
                                                    if (e3.children.length === 0) {
                                                        e3.disabled = false
                                                    } else {
                                                        e3.disabled = true
                                                    }
                                                })
                                            }
                                        })
                                     }
                                });
                               }
                           });
                           trees = arr
                        },
                        complete: function () {
                            //请求完成的处理
                        },
                        error: function () {
                            //请求出错处理
                        }
                    });
                    
                    var roleId = obj.data.id

                    // 根据用户ID得到对应用户权限
                    var checkedInfo = []
                    $.ajax({
                        url: IPdz + '/permission/' + obj.data.id,    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                        type: "GET",   //请求方式
                        contentType: "application/json;charset=UTF-8",
                        // headers: {"token": sessionStorage.token},
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                            if (!req.data) return
                            req.data.forEach(element => {
                                checkedInfo.push(element.id);
                            });
                        },
                        complete: function () {
                            //请求完成的处理
                        },
                        error: function () {
                            //请求出错处理
                        }
                    });

                    // 渲染权限树  以及解绑和绑定操作
                    layui.use('tree', function() {
                        tree = layui.tree;
                        tree.render({
                            elem: '#treeT'
                            , showCheckbox: true
                            , id: 'id'
                            , data: trees
                            , oncheck: function(obj) {
                                if (obj.checked) {
                                    // 绑定 
                                    if ($.inArray(obj.data.id, checkedInfo) == "-1") {
                                        // 正常绑定
                                        console.log('正常绑定')
                                        $.ajax({
                                            url: IPdz + '/role/role/' + roleId + '/permission/'+ obj.data.id + '',    //请求的url地址
                                            dataType: "json",   //返回格式为json
                                            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                                            type: "POST",   //请求方式
                                            contentType: "application/json;charset=UTF-8",
                                            // headers: {"token": sessionStorage.token},
                                            beforeSend: function () {
                                                //请求前的处理
                                            },
                                            success: function (req) {
                                                layer.msg("绑定成功")
                                                checkedInfo.push(obj.data.id)
                                            },
                                            complete: function () {
                                                //请求完成的处理
                                            },
                                            error: function () {
                                                //请求出错处理
                                            }
                                        });
                                    } else {
                                        // 忽略加载时的数据
                                    }
                                } else {
                                    // 解绑
                                    console.log('解绑');
                                    $.ajax({
                                        url: IPdz + '/role/role/' + roleId + '/permission/'+ obj.data.id + '',    //请求的url地址
                                        dataType: "json",   //返回格式为json
                                        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                                        type: "DELETE",   //请求方式
                                        contentType: "application/json;charset=UTF-8",
                                        // headers: {"token": sessionStorage.token},
                                        beforeSend: function () {
                                            //请求前的处理
                                        },
                                        success: function (req) {
                                            layer.msg("解绑成功")
                                            checkedInfo.splice(checkedInfo.findIndex((item) => item === obj.data.id), 1);
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
                        })
                        tree.setChecked('id', checkedInfo)
                    })
                },
                put: function () {
                    layer.close(indexDig);
                },
            }
            layerOpen(openMes);
        }
    });
     /*添加点击事件*/
 $("body").on("click", ".layui-btn.layui-btn-sm", function () {
    /*生成一个对象
    * 传入标题和内容
    * 生成弹窗
    * */
    var openMes = {
        title: '角色添加',
        leixing: '添加',
        maxmin: true,
        area: ['650px', '250px'],
        btn: ['确定', '取消'],
        content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
            '<div class="addDig">' +
            '<div><form class="layui-form" action="">\n' +
            '  <div class="dialogDiv">\n' +
            '    <label class="layui-form-label">中文名称:</label>\n' +
            '    <div class="layui-input-block">\n' +
            '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" lay-reqtext="用户名是必填项，岂能为空？" autocomplete="off" class="layui-input zwmc">\n' +
            '    </div>\n' +
            '</div>\n' +
            '<div class="dialogDiv">\n' +
            '    <label class="layui-form-label">角色描述：</label>\n' +
            '    <div class="layui-input-block">\n' +
            '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input jsms">\n' +
            '    </div>\n' +
            '</div>\n' +
            '<div class="dialogDiv">\n' +
            '    <label class="layui-form-label">英文名称：</label>\n' +
            '    <div class="layui-input-block">\n' +
            '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ywmc">\n' +
            '    </div>\n' +
            '</div>\n' +
            '</form></div>' +
            '</div>' +
            '</div>',
        add: function () {
            var data = {
                "cnName": $(".zwmc").val(),
                "description": $(".jsms").val(),
                "enName": $(".ywmc").val(),
                "parentId": 0,
            }
            $.ajax({
                url: IPdz + '/role',    //请求的url地址
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
        },
    }
    /*调用弹窗方法*/
    layerOpen(openMes);
})
})

