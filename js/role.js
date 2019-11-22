//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});
layui.use('table', function () {
    var table = layui.table;

    // 获取系统所有权限名称 
    var qxs = []
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
            qxs = req.data;
        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });

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
             /*权限操作;*/
             var openMes = {
                title: '用户权限',
                leixing: '编辑',
                area: ['700px', '500px'],
                maxmin: true,
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" lay-filter="look" action="">\n' +
                    '<div id="buttons">\n' +
                    '</div>\n' +
                    // '<div id="test1"> </div>' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    // 树形控件
                    // 1.根据获取树状图

                    layui.use('tree', function() {
                        var tree = layui.tree;
                        var inst1 = tree.render({
                            elem: '#test1'
                            
                            , showCheckbox: true
                            , id: 'id'
                            , data: [{
                                'id': '1', 
                                'title': '江西', 
                                'spread': 'true',
                                'children': [{
                                    'id': '2',
                                    'title': '南昌',
                                    'spread': 'true',
                                    'children': [{
                                        'id': '3',
                                        'spread': 'true',
                                        'title': '高新区'
                                    }, {
                                        'id': '4',
                                        'checked': 'true',
                                        'spread': 'true',
                                        'title': 'hello'
                                    }]
                                }]
                            }]
                        })
                    })

                    // 根据用户ID得到对应用户权限
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
                            // 处理权限数据
                            if (!req.data) {
                                qxs.forEach(element => {
                                    var checkboxs = $('<button type="button" style="margin:2px 2px" class="layui-btn layui-btn-primary hello" userId="' + obj.data.id + '" flag="0" buttonNum="' + element.id + '">'+element.name+'</button>').appendTo("#buttons");
                                });
                            } else {
                                var arr = qxs.slice(0)
                                qxs.forEach(element => {
                                    req.data.forEach(item => {
                                        if (item.id === element.id) {
                                            var checkboxs = $('<button type="button" style="margin:2px 2px" class="layui-btn hello" flag="1" userId="' + obj.data.id + '" buttonNum="' + element.id + '">'+element.name+'</button>').appendTo("#buttons");
                                            arr.splice(arr.findIndex((ee)=> ee.id === element.id), 1);
                                            return
                                        } 
                                    })
                                })
                                if(!!arr.length) {
                                    arr.forEach(element => {
                                        var checkboxs = $('<button type="button" style="margin:2px 2px" class="layui-btn layui-btn-primary hello" flag="0" userId="' + obj.data.id + '" buttonNum="' + element.id + '">'+element.name+'</button>').appendTo("#buttons");
                                    });
                                }
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

$(function() {
    // 获取系统所有权限名称 
    var qxs = []
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
            qxs = req.data;
        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });
    $("body").on("click",".hello",function(){
        var roleId = $(this).attr("userId");
        var arr2 = [] 
       //  flag === 0 未绑定数据,flag === 1 已绑定数据
       if ($(this).attr("flag") === '0') {
         $.ajax({
             url: IPdz + '/role/role/' + roleId + '/permission/'+ $(this).attr("buttonNum") +'',    //请求的url地址
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
                 $("#buttons").find("button").remove();
                 // 根据用户ID得到对应用户权限
                 $.ajax({
                     url: IPdz + '/permission/' + roleId,    //请求的url地址
                     dataType: "json",   //返回格式为json
                     async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                     type: "GET",   //请求方式
                     contentType: "application/json;charset=UTF-8",
                     // headers: {"token": sessionStorage.token},
                     beforeSend: function () {
                         //请求前的处理
                     },
                     success: function (req) {
                         // 处理权限数据
                         if (!req.data) {
                             qxs.forEach(element => {
                                 var checkboxs = $('<button type="button" class="layui-btn layui-btn-primary hello" userId="' + roleId + '" flag="0" buttonNum="' + element.id + '">'+element.name+'</button>').appendTo("#buttons");
                             });
                         } else {
                             arr2 = qxs.slice(0)
                             qxs.forEach(element => {
                                 req.data.forEach(item => {
                                     if (item.id === element.id) {
                                         var checkbvoxs = $('<button type="button" class="layui-btn hello" flag="1" userId="' + roleId + '" buttonNum="' + element.id + '">'+element.name+'</button>').appendTo("#buttons");
                                         arr2.splice(arr2.findIndex((ee)=> ee.id === element.id), 1);
                                         return
                                     } 
                                 })
                             })
                             if(!!arr2.length) {
                                 arr2.forEach(element => {
                                     var checkboxs = $('<button style="margin:2px 2px" type="button" class="layui-btn layui-btn-primary hello" flag="0" userId="' + roleId + '" buttonNum="' + element.id + '">'+element.name+'</button>').appendTo("#buttons");
                                 });
                             }
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
             complete: function () {
                 //请求完成的处理
             },
             error: function () {
                 //请求出错处理
             }
         });
       } else {
         $.ajax({
             url: IPdz + '/role/role/' + roleId + '/permission/'+ $(this).attr("buttonNum") +'',    //请求的url地址
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
                  $("#buttons").find("button").remove();
                 // 根据用户ID得到对应用户权限
                 $.ajax({
                     url: IPdz + '/permission/' + roleId,    //请求的url地址
                     dataType: "json",   //返回格式为json
                     async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                     type: "GET",   //请求方式
                     contentType: "application/json;charset=UTF-8",
                     // headers: {"token": sessionStorage.token},
                     beforeSend: function () {
                         //请求前的处理
                     },
                     success: function (req) {
                         // 处理权限数据
                         if (!req.data) {
                             qxs.forEach(element => {
                                 var checkboxs = $('<button type="button" style="margin:2px 2px" class="layui-btn layui-btn-primary hello" userId="' + roleId + '" flag="0" buttonNum="' + element.id + '">'+element.name+'</button>').appendTo("#buttons");
                             });
                         } else {
                             arr2 = qxs.slice(0)
                             qxs.forEach(element => {
                                 req.data.forEach(item => {
                                     if (item.id === element.id) {
                                         var checkboxs = $('<button type="button" style="margin:2px 2px" class="layui-btn hello" flag="1" userId="' + roleId + '" buttonNum="' + element.id + '">'+element.name+'</button>').appendTo("#buttons");
                                         arr2.splice(arr2.findIndex((ee)=> ee.id === element.id), 1);
                                         return
                                     } 
                                 })
                             })
                             if(!!arr2.length) {
                                 arr2.forEach(element => {
                                     var checkboxs = $('<button type="button" style="margin:2px 2px" class="layui-btn layui-btn-primary hello" flag="0" userId="' + roleId + '" buttonNum="' + element.id + '">'+element.name+'</button>').appendTo("#buttons");
                                 });
                             }
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
             complete: function () {
                 //请求完成的处理
             },
             error: function () {
                 //请求出错处理
             }
         });
       }
    })
 })
