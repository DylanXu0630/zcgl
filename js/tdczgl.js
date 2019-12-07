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
    form.verify({
        title: function (value) {
            if (value.length < 5) {
                return '标题至少得5个字符啊';
            }
        }
    });
    //第一个实例
    table.render({
        elem: '#tableList'
        // , toolbar: '#toolbarDemo'
        // , url: '../json/czgl.json' //数据接口
        , url: IPzd + '/assets/land/all?asc=0' //数据接口
        , method: "POST"
        , contentType: "application/json"
        , async: true
        , where: {
            "landNum": "",
            "location": "",
            "ownId": "",
            "aid": aid
        }
        , page: true //开启分页
        , cols: [[ //表头
            // {field: 'assetsName', title: '土地名称'}
            {field: 'owner', title: '土地使用权人'}
            , {field: 'landNo', title: '土地证号'}
            , {field: 'assetsLocation', title: '座落'}
            , {field: 'landNum', title: '地号'}
            , {field: 'assetsArea', title: '使用权面积(m²)'}
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
                    "ownId": ownId,
                    "aid": aid
                },
                url: IPzd + '/assets/land/all?asc=0' //数据接口
                , method: 'post'
            });
            return false;//false：阻止表单跳转  true：表单跳转
        });


    })

    /*添加点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm.add", function () {
        /*生成一个对象
        * 传入标题和内容
        * 生成弹窗
        * */
        var openMes = {
            title: '土地证添加',
            area: ['1300px', '650px'],
            leixing: '添加',
            maxmin: true,
            btn: ['确定', '取消'],
            content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" action="">\n' +
                // '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">土地名称</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="title" placeholder="请输入" autocomplete="off" class="layui-input cqmz">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>土地使用权人</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="co">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>土地证号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input tdzh">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">座落</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zl">\n' +
                '    </div>\n' +
                '  </div>\n' +
                // '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">图号</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input th">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">地号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dh">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">地类</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="tdyt">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                // '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">取得价格(元)</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input qdjz">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">使用权类型</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="tdsylx">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' + '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">终止日期</label>\n' +
                '    <div class="layui-input-block">\n' +
                '       <input type="text" name="date" id="date" placeholder="请选择时间" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>使用权面积(m²)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input symj">\n' +
                '    </div>\n' +
                '  </div>\n' + '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">独占面积(m²)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" onkeyup="clearNoNum(this)" placeholder="请输入" autocomplete="off" class="layui-input dzmj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">分摊面积(m²)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" onkeyup="clearNoNum(this)" placeholder="请输入" autocomplete="off" class="layui-input ftmj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>有证面积(m²)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" onkeyup="clearNoNum(this)" placeholder="*为必填项" autocomplete="off" class="layui-input yzmj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">无证面积(m²)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" onkeyup="clearNoNum(this)" placeholder="请输入" autocomplete="off" class="layui-input wzmj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">备注</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input bz">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>',
            add: function () {
                if ($.trim($(".tdzh").val()) !== "") {
                    if ($.trim($(".co").val()) == "") {
                        layer.msg("土地权利人不能空！")
                    } else {
                        if ($.trim($(".yzmj").val()) !== "") {
                            if ($.trim($(".symj").val()) !== "") {
                                if (parseInt($(".symj").val()) < (parseInt($(".dzmj").val()) + parseInt($(".ftmj").val()))) {
                                    layer.msg("独占面积与分摊面积相加不能大于使用权面积！")
                                } else {
                                    var data = {
                                        // "assetsName": $.trim($(".cqmz").val()),
                                        "assetsLocation": $.trim($(".zl").val()),
                                        "assetsArea": $.trim($(".symj").val()),
                                        // "createdBy": user,
                                        "endTime": sjc($("#date").val() + " 23:59:59"),
                                        "fkOwnId": $.trim($(".co").val()),
                                        "landNum": $.trim($(".dh").val()),
                                        "money": "",
                                        "picNum": "",
                                        "remark": $.trim($(".bz").val()),
                                        "selfArea": $.trim($(".dzmj").val()),
                                        "shareArea": $.trim($(".ftmj").val()),
                                        "useType": $.trim($(".tdyt").val()),
                                        "useRight": $.trim($(".tdsylx").val()),
                                        "wzArea": $.trim($(".wzmj").val()),
                                        "yzArea": $.trim($(".yzmj").val()),
                                        "landNo": $.trim($(".tdzh").val())
                                    }

                                    $.ajax({
                                        url: IPzd + '/assets/land',    //请求的url地址
                                        dataType: "json",   //返回格式为json
                                        async: true,//请求是否异步，默认为异步，这也是ajax重要特性
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
                                                layer.msg(req.msg)
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

                            } else {
                                layer.msg("请填写正确的使用权面积！")
                            }
                        } else {
                            layer.msg("有证面积不能为空！")
                        }
                    }
                } else {
                    layer.msg("土地证号不能为空！")
                }
            },
        }
        /*调用弹窗方法*/
        layerOpen(openMes);
        //自定义验证规则
        //执行一个laydate实例
        laydate.render({
            elem: '#date',
            format: 'yyyy年MM月dd日'
        });
        getcqdw()
        gettdsylx()
        gettdyt()
        form.render('select')
    })

    /*模板下载点击事件*/
    $("body").on("click", ".mbxz", function () {
        window.location.href = "../model/土地证模板.xlsx"
    })

    /*导入点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm.dr", function () {
        if ($("#uploadFile").val() == "") {
            layer.msg("导入前请先选择文件！")
        } else {
            var formData = new FormData();
            formData.append("file", $("#uploadFile")[0].files[0]);

            var reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
            if (!reg.test($("#uploadFile").val())) {//校验不通过
                layer.msg("请选择excel格式的文件!")
            } else {
                // $.ajax({
                //     url: IPzd + "/io/houseresource",
                //     type: 'POST',
                //     async: false,
                //     data: formData,
                //     // 告诉jQuery不要去处理发送的数据
                //     processData: false,
                //     // 告诉jQuery不要去设置Content-Type请求头
                //     contentType: false,
                //     beforeSend: function () {
                //         layer.msg("正在导入！")
                //     },
                //     success: function (responseStr) {
                //         var file = $("#uploadFile");
                //         $(file).val('');
                //         table.reload('tableList');
                //         layer.msg("导入成功！")
                //     }
                // });
                layer.msg("接口未对接")
            }
        }
    })

    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('确定删除？', function (index) {
                $.ajax({
                    url: IPzd + '/assets/land/' + obj.data.id,    //请求的url地址
                    dataType: "json",   //返回格式为json
                    async: true,//请求是否异步，默认为异步，这也是ajax重要特性
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
                title: '编辑土地证',
                area: ['1300px', '650px'],
                leixing: '编辑',
                maxmin: true,
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">土地名称</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input cqmz">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>土地使用权人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="co">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>土地证号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input tdzh">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">座落</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zl">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">图号</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input th">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dh">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地类</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="tdyt">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">取得价值(元)</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input qdjz">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">使用权类型</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="tdsylx">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">终止日期</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" placeholder="请选择时间" autocomplete="off" class="layui-input">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>使用权面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input symj">\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">独占面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dzmj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">分摊面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ftmj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>有证面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" onkeyup="clearNoNum(this)" placeholder="*为必填项" autocomplete="off" class="layui-input yzmj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">无证面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" onkeyup="clearNoNum(this)" placeholder="请输入" autocomplete="off" class="layui-input wzmj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
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
                    gettdsylx()
                    gettdyt()
                    $(".cqmz").val(obj.data.assetsName),
                        $(".zl").val(obj.data.assetsLocation),
                        $(".symj").val(obj.data.assetsArea),
                        $("#date").val(obj.data.endTime),
                        $(".co").val(obj.data.fkOwnId),
                        $(".dh").val(obj.data.landNum),
                        $(".bz").val(obj.data.remark),
                        $(".dzmj").val(obj.data.selfArea),
                        $(".ftmj").val(obj.data.shareArea),
                        $(".tdyt").val(obj.data.useTypeCode),
                        $(".tdsylx").val(obj.data.useRightCode)
                    $(".tdzh").val(obj.data.landNo)
                    $(".yzmj").val(obj.data.yzArea)
                    $(".wzmj").val(obj.data.wzArea)
                    laydate.render({
                        elem: '#date',
                        value: obj.data.endTime,
                        format: 'yyyy年MM月dd日'
                    });
                },
                put: function () {
                    if ($.trim($(".tdzh").val()) !== "") {
                        if ($.trim($(".co").val()) == "") {
                            layer.msg("土地权利人不能空！")
                        } else {
                            if ($.trim($(".yzmj").val()) !== "") {
                                if ($.trim($(".symj").val()) !== "") {
                                    if (parseInt($(".symj").val()) < (parseInt($(".dzmj").val()) + parseInt($(".ftmj").val()))) {
                                        layer.msg("独占面积与分摊面积相加不能大于使用权面积！")
                                    } else {
                                        var data = {
                                            "id": obj.data.id,
                                            // "assetsName": $.trim($(".cqmz").val()),
                                            "assetsLocation": $.trim($(".zl").val()),
                                            "assetsArea": $.trim($(".symj").val()),
                                            // "createdBy": user,
                                            "endTime": sjc($("#date").val() + " 23:59:59"),
                                            "fkOwnId": $.trim($(".co").val()),
                                            "landNum": $.trim($(".dh").val()),
                                            "money": "",
                                            "picNum": "",
                                            "remark": $.trim($(".bz").val()),
                                            "selfArea": $.trim($(".dzmj").val()),
                                            "shareArea": $.trim($(".ftmj").val()),
                                            "useType": $.trim($(".tdyt").val()),
                                            "useRight": $.trim($(".tdsylx").val()),
                                            "wzArea": $.trim($(".wzmj").val()),
                                            "yzArea": $.trim($(".yzmj").val()),
                                            "landNo": $.trim($(".tdzh").val())
                                        }
                                        $.ajax({
                                            url: IPzd + '/assets/land',    //请求的url地址
                                            dataType: "json",   //返回格式为json
                                            async: true,//请求是否异步，默认为异步，这也是ajax重要特性
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
                                                    layer.msg(req.msg)
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

                                } else {
                                    layer.msg("请填写正确的使用权面积！")
                                }
                            } else {
                                layer.msg("有证面积不能为空！")
                            }
                        }
                    } else {
                        layer.msg("土地证号不能为空！")
                    }
                }
            }
            layerOpen(openMes);
        }
        else if (layEvent == 'detail') {
            /*查看操作*/
            var openMes = {
                title: '查看土地证',
                leixing: '查看',
                area: ['1300px', '650px'],
                maxmin: true,
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">土地名称</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input cqmz" readonly>\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地使用权人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input co" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地证号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input tdzh" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">座落</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input zl" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">图号</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input th" readonly>\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input dh" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地类</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="tdyt" disabled="disabled">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">取得价值(元)</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input qdjz" readonly>\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">使用权类型</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="tdsylx" disabled="disabled">\n' +
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
                    '    <label class="layui-form-label">使用权面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input symj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">独占面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input dzmj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">分摊面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input ftmj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">有证面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" onkeyup="clearNoNum(this)" placeholder="*为必填项" autocomplete="off" class="layui-input yzmj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">无证面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" onkeyup="clearNoNum(this)" placeholder="请输入" autocomplete="off" class="layui-input wzmj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">备注</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input bz" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    getcqdw()
                    gettdsylx()
                    gettdyt()
                    $(".cqmz").val(obj.data.assetsName)
                    $(".symj").val(obj.data.assetsArea)
                    $(".tdyt").val(obj.data.useTypeCode)
                    $(".tdsylx").val(obj.data.useRightCode)
                    $(".zl").val(obj.data.assetsLocation)
                    $("#date").val(obj.data.endTime)
                    $(".co").val(obj.data.owner)
                    $(".dh").val(obj.data.landNum)
                    $(".qdjz").val(obj.data.money)
                    $(".th").val(obj.data.picNum)
                    $(".bz").val(obj.data.remark)
                    $(".dzmj").val(obj.data.selfArea)
                    $(".ftmj").val(obj.data.shareArea)
                    $(".yzmj").val(obj.data.yzArea)
                    $(".wzmj").val(obj.data.wzArea)
                    $(".tdzh").val(obj.data.landNo)
                }
            }
            layerLookOpen(openMes);
        }
    });
})






