//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});
layui.use(['table', 'form'], function () {
    var table = layui.table;
    var form = layui.form;

    sgetgldw()
    form.render()
    //第一个实例
    table.render({
        elem: '#tableList'
        // , toolbar: '#toolbarDemo'
        //, url: '../json/fyxxtj.json' //数据接口
        , url: IPzd + '/hresource/all?asc=0' //数据接口
        , method: "POST"
        , contentType: "application/json"
        , async: true
        , page: true //开启分页
        , where: {//这里传参  向后台
            "agencyId": "",
            "assetsId": "",
            "buildLevel": "",
            "buildNo": "",
            "buildRoom": "",
            "maxArea": "",
            "minArea": "",
            "rentStatus": "",
            "sellStatus": "",
            "aid": aid
        }
        , cols: [[ //表头
            // {field: 'resourceName', title: '房源名称'},
            {field: 'agency', title: '管理单位'},
            {field: 'location', title: '房源地址'},
            {field: 'guideRentCharge', title: '指导价(月/元)'},
            {field: 'originRentCharge', title: '历史租金(月/元)'},
            {field: 'resourceType', title: '资产类型'},
            {field: 'resourceArea', title: '房源面积(m²)'},
            {field: 'sellStatus', title: '出售状态', width: 100},
            {field: 'rentStatus', title: '出租状态', width: 100},
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
                    "agencyId": $(".s-gldw").val(),
                    "assetsId": $(".s-fkLandAssetsId").attr("tid"),
                    "buildLevel": $(".s-lc").val(),
                    "buildNo": $(".s-lh").val(),
                    "buildRoom": $(".s-fh").val(),
                    "maxArea": $(".maxfymj").val(),
                    "minArea": $(".minfymj").val(),
                    "rentStatus": $(".isCz").val(),
                    "sellStatus": $(".isCs").val(),
                    "aid": aid
                },
                url: IPzd + '/hresource/all?asc=0' //数据接口
                , method: 'post'
            });
            return false;//false：阻止表单跳转  true：表单跳转
        });


    })


    /*添加点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm.tj", function () {
        /*生成一个对象
        * 传入标题和内容
        * 生成弹窗
        * */
        var openMes = {
            title: '房源信息添加',
            area: ['1300px', '700px'],
            leixing: '添加',
            maxmin: true,
            btn: ['确定', '取消'],
            content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" action="">\n' +
                '<div class="dialogTitle">房源基础信息</div>' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>管理单位</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="gldw manageUnit">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>楼宇</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input yqly">\n' +
                '    </div>\n' +
                '  </div>\n' +
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
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fh">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>资产类型</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="zclx">\n' +
                '         <option value="">未出售</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '    </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">有证面积(m²)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" onkeyup="clearNoNum(this)" placeholder="请输入" autocomplete="off" class="layui-input yzmj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">无证面积(m²)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" onkeyup="clearNoNum(this)" placeholder="请输入" autocomplete="off" class="layui-input wzmj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">历史租金(元/m²/月)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" onkeyup="clearNoNum(this)" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ylzj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>指导价(元/m²/月)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" onkeyup="clearNoNum(this)" required  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input zdj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>出售状态</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="cszt">\n' +
                '         <option value="1">未出售</option>\n' +
                '         <option value="2">已出售未过户</option>\n' +
                '         <option value="3">已出售已过户</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '    </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>出租状态</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="czzt">\n' +
                '         <option value="">请选择</option>\n' +
                '         <option value="2">出租</option>\n' +
                '         <option value="1">闲置</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '    </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">附记</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '<div class="dialogTitle">房产证信息</div>' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>房产证号</label>\n' +
                '    <div class="layui-input-block">\n' +
                // '      <select class="houseZh"  lay-filter="fcxx" >\n' +
                // '         <option value="">请选择</option>\n' +
                // '     </select>\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="*号为必填项" tid="" autocomplete="off" onkeyup="fwcz(this)" class="layui-input fkLandAssetsId">\n' +
                '      <div class="ssyx fwcz"></div>' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房屋所有权人</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fwgldw" readonly>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">产权名称</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fwfczh" readonly>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>',
            add: function () {
                if ($(".gldw").val() !== "") {
                    if ($.trim($(".zdj").val()) !== "") {
                        if ($(".fkLandAssetsId").attr("tid") == "") {
                            layer.msg("房产证不能为空！")
                        } else {
                            if ($.trim($(".yqly").val()) == "") {
                                layer.msg("园区不能为空！")
                            } else {
                                if (!areaISOk()) {
                                    layer.msg("有证面积和无证面积相加不能为0！")
                                } else {
                                    /*出售为未出售*/
                                    if ($(".cszt").val() == "1") {
                                        if ($(".czzt").val() == "-1") {
                                            layer.msg("房源未出售请选择出租状态！")
                                        } else {
                                            var data = {
                                                "buildLevel": $.trim($(".lc").val()),
                                                "buildNo": $.trim($(".lh").val()),
                                                "buildRoom": $.trim($(".fh").val()),
                                                "createdBy": user,
                                                "fkHouseAssetsId": $(".fkLandAssetsId").attr("tid"),
                                                "remark": $.trim($(".fj").val()),
                                                "rentStatus": $.trim($(".cszt").val()),
                                                "resourceArea": $.trim($(".fymj").val()),
                                                "fkResourceTypeId": $(".zclx").val(),
                                                "sellStatus": $.trim($(".cszt").val()),
                                                "rentStatus": $.trim($(".czzt").val()),
                                                "originRentCharge": $.trim($(".ylzj").val()),
                                                "guideRentCharge": $.trim($(".zdj").val()),
                                                "park": $.trim($(".yqly").val()),
                                                "fkAgencyId": $.trim($(".gldw.manageUnit").val()),
                                                "wzArea": $.trim($(".wzmj").val()),
                                                "yzArea": $.trim($(".yzmj").val())
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
                                        }
                                        /*出售为已出售未过户*/
                                    } else if ($(".cszt").val() == 2) {
                                        if ($(".czzt").val() !== "") {
                                            layer.msg("房源已出售不能出租！")
                                            $(".czzt").val("")
                                            form.render('select')
                                        } else {
                                            var data = {
                                                "buildLevel": $.trim($(".lc").val()),
                                                "buildNo": $.trim($(".lh").val()),
                                                "buildRoom": $.trim($(".fh").val()),
                                                "createdBy": user,
                                                "fkHouseAssetsId": $(".fkLandAssetsId").attr("tid"),
                                                "remark": $.trim($(".fj").val()),
                                                "rentStatus": $.trim($(".cszt").val()),
                                                "resourceArea": $.trim($(".fymj").val()),
                                                "fkResourceTypeId": $(".zclx").val(),
                                                "sellStatus": $.trim($(".cszt").val()),
                                                "rentStatus": $.trim($(".czzt").val()),
                                                "originRentCharge": $.trim($(".ylzj").val()),
                                                "guideRentCharge": $.trim($(".zdj").val()),
                                                "park": $.trim($(".yqly").val()),
                                                "fkAgencyId": $.trim($(".gldw.manageUnit").val()),
                                                "wzArea": $.trim($(".wzmj").val()),
                                                "yzArea": $.trim($(".yzmj").val())
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
                                        }
                                    } else if ($(".cszt").val() == 3) {
                                        if ($(".czzt").val() !== "") {
                                            layer.msg("房源已出售不能出租！")
                                            $(".czzt").val("")
                                            form.render('select')
                                        } else {
                                            var data = {
                                                "buildLevel": $.trim($(".lc").val()),
                                                "buildNo": $.trim($(".lh").val()),
                                                "buildRoom": $.trim($(".fh").val()),
                                                "createdBy": user,
                                                "fkHouseAssetsId": $(".fkLandAssetsId").attr("tid"),
                                                "remark": $.trim($(".fj").val()),
                                                "rentStatus": $.trim($(".cszt").val()),
                                                "resourceArea": $.trim($(".fymj").val()),
                                                "fkResourceTypeId": $(".zclx").val(),
                                                "sellStatus": $.trim($(".cszt").val()),
                                                "rentStatus": $.trim($(".czzt").val()),
                                                "originRentCharge": $.trim($(".ylzj").val()),
                                                "guideRentCharge": $.trim($(".zdj").val()),
                                                "park": $.trim($(".yqly").val()),
                                                "fkAgencyId": $.trim($(".gldw.manageUnit").val()),
                                                "wzArea": $.trim($(".wzmj").val()),
                                                "yzArea": $.trim($(".yzmj").val())
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
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        layer.msg("指导价不能为空！")
                    }
                } else {
                    layer.msg("管理单位不能为空！")
                }
            },
        }
        /*调用弹窗方法*/
        layerOpen(openMes);
        getgldw()
        getzclx()

        form.render('select')
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
                $.ajax({
                    url: IPzd + "/io/resource/in",
                    type: 'POST',
                    async: false,
                    data: formData,
                    // 告诉jQuery不要去处理发送的数据
                    processData: false,
                    // 告诉jQuery不要去设置Content-Type请求头
                    contentType: false,
                    beforeSend: function () {
                        layer.msg("正在导入！")
                    },
                    success: function (responseStr) {
                        if (responseStr.status == 200) {
                            var sbts = ''
                            if (responseStr.data.errorRows !== null) {
                                $(responseStr.data.errorRows).each(function (i, o) {
                                    sbts = sbts + '<div style="margin: 5px 0;color: red">' + o + '条</div>'
                                })
                            } else {
                                sbts = sbts + '<div style="margin: 5px 0;color: red">无</div>'
                            }

                            var html = '<div style="margin: 5px 0">总共导入' + responseStr.data.totalRow + '条</div><div style="margin: 5px 0">成功导入' + responseStr.data.successRow + '条</div><div style="margin: 5px 0">导入失败' + responseStr.data.errorRow + '条</div><div style="margin: 5px 0">导入失败数据：</div><div class="sbtotal">' + sbts + '</div>'
                            layer.open({
                                type: 1
                                , offset: "auto"
                                , content: '<div style="padding: 20px 100px;">' + html + '</div>'
                                , btn: '确定'
                                , btnAlign: 'c' //按钮居中
                                , shade: 0 //不显示遮罩
                                , yes: function () {
                                    var file = $("#uploadFile");
                                    $(file).val('');
                                    table.reload('tableList');
                                    layer.closeAll();
                                }
                            });
                        } else {
                            layer.msg("导入失败！")
                        }
                    }
                });
            }
        }
    })

    /*模板下载点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm.mbxz", function () {
        window.location.href = "../model/房源模板.xlsx"
    })


    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('确定删除？', function (index) {
                $.ajax({
                    url: IPzd + '/hresource/' + obj.data.id,    //请求的url地址
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
                area: ['1300px', '700px'],
                leixing: '编辑',
                maxmin: true,
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +
                    '<div class="dialogTitle">房源基础信息</div>' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>管理单位</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="gldw manageUnit">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>楼宇</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input yqly">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
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
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fh">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>资产类型</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="zclx">\n' +
                    '         <option value="">未出售</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">有证面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" onkeyup="clearNoNum(this)" placeholder="请输入" autocomplete="off" class="layui-input yzmj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">无证面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" onkeyup="clearNoNum(this)" placeholder="请输入" autocomplete="off" class="layui-input wzmj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">历史租金(元/m²/月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" onkeyup="clearNoNum(this)" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ylzj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>指导价(元/m²/月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" onkeyup="clearNoNum(this)" required  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input zdj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>出售状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="cszt">\n' +
                    '         <option value="1">未出售</option>\n' +
                    '         <option value="2">已出售未过户</option>\n' +
                    '         <option value="3">已出售已过户</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>出租状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="czzt">\n' +
                    '         <option value="">请选择</option>\n' +
                    '         <option value="2">出租</option>\n' +
                    '         <option value="1">闲置</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">附记</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '<div class="dialogTitle">房产证信息</div>' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>房产证号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    // '      <select class="houseZh" lay-filter="fcxx">\n' +
                    // '         <option value="">请选择</option>\n' +
                    // '     </select>\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="*号为必填项" tid="" autocomplete="off" onkeyup="fwcz(this)" class="layui-input fkLandAssetsId">\n' +
                    '      <div class="ssyx fwcz"></div>' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋所有权人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fwgldw" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">产权名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fwfczh" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    getgldw()
                    getzclx()

                    $(".yqly").val(obj.data.park)
                    $(".lc").val(obj.data.buildLevel)
                    $(".lh").val(obj.data.buildNo)
                    $(".fh").val(obj.data.buildRoom)
                    $(".fkLandAssetsId").attr("tid", obj.data.assetsId)
                    $(".fkLandAssetsId").val(obj.data.houseNo)
                    $(".fj").val(obj.data.remark)
                    $(".cszt").val(obj.data.rentCode)
                    $(".fymj").val(obj.data.resourceArea)
                    $(".cszt").val(obj.data.sellCode)
                    $(".czzt").val(obj.data.rentCode)
                    $(".gldw").val(obj.data.agencyId)
                    $(".dczl").val(obj.data.landLocation)
                    $(".tdyyz").val(obj.data.landOwner)
                    $(".dh").val(obj.data.landNum)
                    $(".zlc").val(obj.data.totalLevel)
                    $(".ylzj").val(obj.data.originRentCharge)
                    $(".zdj").val(obj.data.guideRentCharge)
                    $(".zclx").val(obj.data.fkResourceTypeId)
                    $(".yzmj").val(obj.data.yzArea)
                    $(".wzmj").val(obj.data.wzArea)
                    $(".gldw").val(obj.data.fkAgencyId)
                    if (obj.data.assetsId == "") {
                        $(".fwgldw").val("")
                        $(".fwfczh").val("")
                    } else {
                        $.ajax({
                            url: IPzd + "/assets/house/" + obj.data.assetsId,
                            type: 'get',
                            async: false,
                            // 告诉jQuery不要去处理发送的数据
                            processData: false,
                            // 告诉jQuery不要去设置Content-Type请求头
                            contentType: false,
                            beforeSend: function () {
                            },
                            success: function (req) {
                                $(".fwgldw").val(req.data.owner)
                                $(".fwfczh").val(req.data.houseName)
                            }
                        });
                    }
                },
                put: function () {
                    if ($(".gldw").val() !== "") {
                        if ($.trim($(".zdj").val()) !== "") {
                            if ($(".fkLandAssetsId").attr("tid") == "") {
                                layer.msg("房产证不能为空！")
                            } else {
                                if ($.trim($(".yqly").val()) == "") {
                                    layer.msg("园区不能为空！")
                                } else {
                                    if (!areaISOk()) {
                                        layer.msg("有证面积和无证面积相加不能为0！")
                                    } else {
                                        /*出售为未出售*/
                                        if ($(".cszt").val() == "1") {
                                            if ($(".czzt").val() == "") {
                                                layer.msg("房源未出售请选择出租状态！")
                                            } else {
                                                var data = {
                                                    "id": obj.data.id,
                                                    "buildLevel": $.trim($(".lc").val()),
                                                    "buildNo": $.trim($(".lh").val()),
                                                    "buildRoom": $.trim($(".fh").val()),
                                                    "createdBy": user,
                                                    "fkHouseAssetsId": $(".fkLandAssetsId").attr("tid"),
                                                    "remark": $.trim($(".fj").val()),
                                                    "rentStatus": $.trim($(".cszt").val()),
                                                    "resourceArea": $.trim($(".fymj").val()),
                                                    "fkResourceTypeId": $(".zclx").val(),
                                                    "sellStatus": $.trim($(".cszt").val()),
                                                    "rentStatus": $.trim($(".czzt").val()),
                                                    "originRentCharge": $.trim($(".ylzj").val()),
                                                    "guideRentCharge": $.trim($(".zdj").val()),
                                                    "park": $.trim($(".yqly").val()),
                                                    "fkAgencyId": $.trim($(".gldw.manageUnit").val()),
                                                    "wzArea": $.trim($(".wzmj").val()),
                                                    "yzArea": $.trim($(".yzmj").val())
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
                                            }
                                            /*出售为已出售未过户*/
                                        } else if ($(".cszt").val() == 2) {
                                            if ($(".czzt").val() !== "") {
                                                layer.msg("房源已出售不能出租！")
                                                $(".czzt").val("")
                                                form.render('select')
                                            } else {
                                                var data = {
                                                    "id": obj.data.id,
                                                    "buildLevel": $.trim($(".lc").val()),
                                                    "buildNo": $.trim($(".lh").val()),
                                                    "buildRoom": $.trim($(".fh").val()),
                                                    "createdBy": user,
                                                    "fkHouseAssetsId": $(".fkLandAssetsId").attr("tid"),
                                                    "remark": $.trim($(".fj").val()),
                                                    "rentStatus": $.trim($(".cszt").val()),
                                                    "resourceArea": $.trim($(".fymj").val()),
                                                    "fkResourceTypeId": $(".zclx").val(),
                                                    "sellStatus": $.trim($(".cszt").val()),
                                                    "rentStatus": $.trim($(".czzt").val()),
                                                    "originRentCharge": $.trim($(".ylzj").val()),
                                                    "guideRentCharge": $.trim($(".zdj").val()),
                                                    "park": $.trim($(".yqly").val()),
                                                    "fkAgencyId": $.trim($(".gldw.manageUnit").val()),
                                                    "wzArea": $.trim($(".wzmj").val()),
                                                    "yzArea": $.trim($(".yzmj").val())
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
                                            }
                                        } else if ($(".cszt").val() == 3) {
                                            if ($(".czzt").val() !== "") {
                                                layer.msg("房源已出售不能出租！")
                                                $(".czzt").val("")
                                                form.render('select')
                                            } else {
                                                var data = {
                                                    "id": obj.data.id,
                                                    "buildLevel": $.trim($(".lc").val()),
                                                    "buildNo": $.trim($(".lh").val()),
                                                    "buildRoom": $.trim($(".fh").val()),
                                                    "createdBy": user,
                                                    "fkHouseAssetsId": $(".fkLandAssetsId").attr("tid"),
                                                    "remark": $.trim($(".fj").val()),
                                                    "rentStatus": $.trim($(".cszt").val()),
                                                    "resourceArea": $.trim($(".fymj").val()),
                                                    "fkResourceTypeId": $(".zclx").val(),
                                                    "sellStatus": $.trim($(".cszt").val()),
                                                    "rentStatus": $.trim($(".czzt").val()),
                                                    "originRentCharge": $.trim($(".ylzj").val()),
                                                    "guideRentCharge": $.trim($(".zdj").val()),
                                                    "park": $.trim($(".yqly").val()),
                                                    "fkAgencyId": $.trim($(".gldw.manageUnit").val()),
                                                    "wzArea": $.trim($(".wzmj").val()),
                                                    "yzArea": $.trim($(".yzmj").val())
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
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            layer.msg("指导价不能为空！")
                        }
                    } else {
                        layer.msg("管理单位不能为空！")
                    }
                },

            }

            layerOpen(openMes);
        } else if (layEvent == 'detail') {
            /*查看操作*/
            var openMes = {
                title: '查看房源',
                area: ['1300px', '700px'],
                leixing: '查看',
                maxmin: true,
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +

                    '<div class="dialogTitle">房源基础信息</div>' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">管理单位</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fygldw" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">楼宇</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input yqly" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">楼号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input lh" readonly>\n' +
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
                    '    <label class="layui-form-label">资产类型</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zclx" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">有证面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input yzmj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">无证面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input wzmj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">历史租金(元/m²/月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ylzj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">指导价(元/m²/月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zdj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">出售状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input cszt" readonly>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">出租状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input czzt" readonly>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">附记</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '<div class="dialogTitle">房产证信息</div>' +

                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房产证号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input houseZh" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋所有权人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input gldw" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">产权名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fczh" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +

                    '<div class="dialogTitle">土地证信息</div>' +

                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地使用权人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input tdyyz" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dh" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '   <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地证号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input tdzh" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {

                    $(".yqly").val(obj.data.park)
                    $(".gldw").val(obj.data.manageUnit)
                    $(".lc").val(obj.data.buildLevel)
                    $(".lh").val(obj.data.buildNo)
                    $(".fh").val(obj.data.buildRoom)
                    $(".houseZh").val(obj.data.houseNo)
                    $(".fj").val(obj.data.remark)
                    $(".cszt").val(obj.data.rentCode)
                    $(".fymj").val(obj.data.resourceArea)
                    $(".cszt").val(obj.data.sellStatus)
                    $(".czzt").val(obj.data.rentStatus)
                    $(".fygldw").val(obj.data.agency)
                    $(".gldw").val(obj.data.houseOwner)
                    $(".dczl").val(obj.data.landLocation)
                    $(".tdyyz").val(obj.data.landOwner)
                    $(".dh").val(obj.data.landNum)
                    $(".zlc").val(obj.data.totalLevel)
                    $(".ylzj").val(obj.data.originRentCharge)
                    $(".zdj").val(obj.data.guideRentCharge)
                    $(".yzmj").val(obj.data.yzArea)
                    $(".wzmj").val(obj.data.wzArea)
                    $(".zclx").val(obj.data.resourceType)
                    $(".fczh").val(obj.data.park)
                    $(".tdzh").val(obj.data.landNo)
                }
            }
            layerLookOpen(openMes);
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
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".houseZh")
                })
            } else {
                layer.msg("房产证获取失败")
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
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".s-fc")
                })
            } else {
                layer.msg("房产证获取失败")
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

/*资产类型*/
function getzclx() {
    $.ajax({
        url: IPzd + '/dic/resource/type/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".zclx").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".zclx")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".zclx")
                })
            } else {
                layer.msg("资产类型获取失败")
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

/*判断有证面积和无证面积总和不能为0*/
function areaISOk() {
    if ($(".yzmj").val() == "") {
        var yzArea = 0
    } else {
        var yzArea = parseInt($(".yzmj").val())
    }

    if ($(".wzmj").val() == "") {
        var wzArea = 0
    } else {
        var wzArea = parseInt($(".wzmj").val())
    }

    var area = yzArea + wzArea
    var isTrue = true
    if (area == 0) {
        isTrue = false
    }

    return isTrue
}

function sfwcz(obj) {
    var houseNO = obj.value

    $.ajax({
        url: IPzd + '/search/house?houseNO=' + houseNO,    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
            $(".fwcz").children().remove()
            $(".fkLandAssetsId").attr("tid", "")
            $(".fwcz").css("left", "2px")
            $(".fwcz").css("width", "86%")
        },
        success: function (req) {

            if (req.status == 200) {
                $(".ssyx").css("display", "block")
                if (req.data.length !== 0) {
                    $(req.data).each(function (i, o) {
                        var div = $("<div class='sslb' tid='" + o.id + "'>" + o.name + "</div>").appendTo(".fwcz")
                    })
                } else {
                    var div = $("<div class='sslb' tid=''>没有此房产证</div>").appendTo(".fwcz")
                }
            } else {
                $(".ssyx").css("display", "block")
                var div = $("<div class='sslb' tid=''>没有此房产证</div>").appendTo(".fwcz")
                $("body").on("click", function () {
                    var no = $(this).text()
                    $(".fwcz").css("display", "none")
                })
            }

            $("body").on("click", ".sslb", function () {
                var no = $(this).text()
                var tid = $(this).attr("tid")
                $(this).parent().parent().find(".s-fkLandAssetsId").val(no)
                $(this).parent().parent().find(".s-fkLandAssetsId").attr("tid", tid)
                if (tid !== "") {
                    $.ajax({
                        url: IPzd + "/assets/house/" + tid,
                        type: 'get',
                        async: false,
                        // 告诉jQuery不要去处理发送的数据
                        processData: false,
                        // 告诉jQuery不要去设置Content-Type请求头
                        contentType: false,
                        beforeSend: function () {
                        },
                        success: function (req) {
                            $(".fwgldw").val(req.data.owner)
                            $(".fwfczh").val(req.data.houseName)
                        }
                    });
                    $(".fwcz").css("display", "none")
                } else {
                    $(".fwgldw").val("")
                    $(".fwfczh").val("")
                }
            })
            $("body").on("click", function () {
                $(".fwcz").css("display", "none")
                var tid = $(".s-fkLandAssetsId").attr("tid")
                if (tid !== "") {
                    $.ajax({
                        url: IPzd + "/assets/house/" + tid,
                        type: 'get',
                        async: false,
                        // 告诉jQuery不要去处理发送的数据
                        processData: false,
                        // 告诉jQuery不要去设置Content-Type请求头
                        contentType: false,
                        beforeSend: function () {
                        },
                        success: function (req) {
                            $(".fwgldw").val(req.data.owner)
                            $(".fwfczh").val(req.data.houseName)
                        }
                    });
                    $(".fwcz").css("display", "none")
                } else {
                    $(".fwgldw").val("")
                    $(".fwfczh").val("")
                }
            })
        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });
}

function fwcz(obj) {
    var houseNO = obj.value

    $.ajax({
        url: IPzd + '/search/house?houseNO=' + houseNO,    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
            $(".fwcz").children().remove()
            $(".fkLandAssetsId").attr("tid", "")
            $(".fwcz").css("left", "2px")
            $(".fwcz").css("width", "86%")
        },
        success: function (req) {

            if (req.status == 200) {
                $(".ssyx").css("display", "block")
                if (req.data.length !== 0) {
                    $(req.data).each(function (i, o) {
                        var div = $("<div class='sslb' tid='" + o.id + "'>" + o.name + "</div>").appendTo(".fwcz")
                    })
                } else {
                    var div = $("<div class='sslb' tid=''>没有此房产证</div>").appendTo(".fwcz")
                }
            } else {
                $(".ssyx").css("display", "block")
                var div = $("<div class='sslb' tid=''>没有此房产证</div>").appendTo(".fwcz")
                $("body").on("click", function () {
                    var no = $(this).text()
                    $(".fwcz").css("display", "none")
                })
            }

            $("body").on("click", ".sslb", function () {
                var no = $(this).text()
                var tid = $(this).attr("tid")
                $(this).parent().parent().find(".fkLandAssetsId").val(no)
                $(this).parent().parent().find(".fkLandAssetsId").attr("tid", tid)
                if (tid !== "") {
                    $.ajax({
                        url: IPzd + "/assets/house/" + tid,
                        type: 'get',
                        async: false,
                        // 告诉jQuery不要去处理发送的数据
                        processData: false,
                        // 告诉jQuery不要去设置Content-Type请求头
                        contentType: false,
                        beforeSend: function () {
                        },
                        success: function (req) {
                            $(".fwgldw").val(req.data.owner)
                            $(".fwfczh").val(req.data.houseName)
                        }
                    });
                    $(".fwcz").css("display", "none")
                } else {
                    $(".fwgldw").val("")
                    $(".fwfczh").val("")
                }
            })
            $("body").on("click", function () {
                $(".fwcz").css("display", "none")
                var tid = $(".fkLandAssetsId").attr("tid")
                if (tid !== "") {
                    $.ajax({
                        url: IPzd + "/assets/house/" + tid,
                        type: 'get',
                        async: false,
                        // 告诉jQuery不要去处理发送的数据
                        processData: false,
                        // 告诉jQuery不要去设置Content-Type请求头
                        contentType: false,
                        beforeSend: function () {
                        },
                        success: function (req) {
                            $(".fwgldw").val(req.data.owner)
                            $(".fwfczh").val(req.data.houseName)
                        }
                    });
                    $(".fwcz").css("display", "none")
                } else {
                    $(".fwgldw").val("")
                    $(".fwfczh").val("")
                }
            })
        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });
}