//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});
layui.use(['table', 'form'], function () {
    var table = layui.table;
    var form = layui.form;

    sgetfczh()
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
            "rentStatus": "-1",
            "sellStatus": "-1"
        }
        , cols: [[ //表头
            // {field: 'resourceName', title: '房源名称'},
            {field: 'assetsName', title: '房产名称'},
            {field: 'agency', title: '管理单位'},
            {field: 'guideRentCharge', title: '指导价(月/元)'},
            {field: 'originRentCharge', title: '原来租金(月/元)'},
            {field: 'realRentCharge', title: '实际租金(月/元)'},
            {field: 'resourceArea', title: '房源面积(m²)'},
            {field: 'rentStatus', title: '出租状态', width: 100},
            {field: 'sellStatus', title: '出售状态', width: 100},
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
                    "assetsId": $(".s-fc").val(),
                    "buildLevel": $(".s-lc").val(),
                    "buildNo": $(".s-lh").val(),
                    "buildRoom": $(".s-fh").val(),
                    "maxArea": $(".maxfymj").val(),
                    "minArea": $(".minfymj").val(),
                    "rentStatus": $(".isCz").val(),
                    "sellStatus": $(".isCs").val()
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
                // '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">房源名称</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fymc">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>园区/楼宇</label>\n' +
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
                '    <label class="layui-form-label"><span class="inputBtx">*</span>房源面积(m²)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" onkeyup="clearNoNum(this)" required  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input fymj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">原来租金(元/m²/月)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" onkeyup="clearNoNum(this)" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ylzj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">指导价(元/m²/月)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" onkeyup="clearNoNum(this)" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zdj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>实际租金(元/m²/月)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" onkeyup="clearNoNum(this)" required  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input sjzj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">管理单位</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="gldw manageUnit">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
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
                '    <label class="layui-form-label"><span class="inputBtx">*</span>出租状态</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="czzt">\n' +
                '         <option value="-1">请选择</option>\n' +
                '         <option value="1">已出租</option>\n' +
                '         <option value="0">未出租</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '    </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>出售状态</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="cszt">\n' +
                '         <option value="0">未出售</option>\n' +
                '         <option value="1">已出售</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '    </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">附记</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '<div class="dialogTitle">房屋产证信息</div>' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>房产名称</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="houseZh" onchange="cfsj(this)">\n' +
                '         <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>',
            add: function () {
                if ($.trim($(".houseZh").val()) == "") {
                    layer.msg("房产不能为空！")
                } else {
                    if ($.trim($(".yqly").val()) == "") {
                        layer.msg("园区不能为空！")
                    } else {
                        if ($.trim($(".fymj").val()) == "") {
                            layer.msg("房源面积不能为空！")
                        } else {
                            if ($.trim($(".sjzj").val()) == "") {
                                layer.msg("实际租金不能为空！")
                            } else {
                                if ($.trim($(".fymj").val()) == "") {
                                    layer.msg("房源面积不能为空！")
                                } else {
                                    if ($(".cszt").val() == "1") {
                                        if ($(".czzt").val() !== "-1") {
                                            layer.msg("已出售的房源不能出租")
                                            $(".czzt").val("-1")
                                        } else {
                                            var data = {
                                                "buildLevel": $.trim($(".lc").val()),
                                                "buildNo": $.trim($(".lh").val()),
                                                "buildRoom": $.trim($(".fh").val()),
                                                "createdBy": user,
                                                "fkHouseAssetsId": $.trim($(".houseZh").val()),
                                                "remark": $.trim($(".fj").val()),
                                                "rentStatus": $.trim($(".cszt").val()),
                                                "resourceArea": $.trim($(".fymj").val()),
                                                // "resourceName": $.trim($(".fymc").val()),
                                                "sellStatus": $.trim($(".cszt").val()),
                                                "rentStatus": $.trim($(".czzt").val()),
                                                "originRentCharge": $.trim($(".ylzj").val()),
                                                "realRentCharge": $.trim($(".sjzj").val()),
                                                "guideRentCharge": $.trim($(".zdj").val()),
                                                "park": $.trim($(".yqly").val()),
                                                "fkAgencyId": $.trim($(".gldw.manageUnit").val())
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

                                    } else if ($(".cszt").val() == 0) {
                                        if ($(".czzt").val() == "-1") {
                                            layer.msg("房源出租状态不能为空")
                                        } else {
                                            var data = {
                                                "buildLevel": $(".lc").val(),
                                                "buildNo": $(".lh").val(),
                                                "buildRoom": $(".fh").val(),
                                                "createdBy": user,
                                                "fkHouseAssetsId": $(".houseZh").val(),
                                                "remark": $(".fj").val(),
                                                "rentStatus": $(".cszt").val(),
                                                "resourceArea": $(".fymj").val(),
                                                // "resourceName": $(".fymc").val(),
                                                "sellStatus": $(".cszt").val(),
                                                "rentStatus": $(".czzt").val(),
                                                "originRentCharge": $(".ylzj").val(),
                                                "realRentCharge": $(".sjzj").val(),
                                                "guideRentCharge": $(".zdj").val(),
                                                "park": $(".yqly").val(),
                                                "fkAgencyId": $(".gldw.manageUnit").val()
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
                    }
                }


            },
        }
        /*调用弹窗方法*/
        layerOpen(openMes);
        getgldw()
        getfczh()
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
                    url: IPzd + "/io/houseresource",
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
                        var file = $("#uploadFile");
                        $(file).val('');
                        table.reload('tableList');
                        layer.msg("导入成功！")
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

                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">房源名称</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fymc">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>园区/楼宇</label>\n' +
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
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fh">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>房源面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input fymj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">原来租金(元/m²/月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" onkeyup="clearNoNum(this)" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input ylzj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">指导价(元/m²/月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" onkeyup="clearNoNum(this)" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zdj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>实际租金(元/m²/月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" onkeyup="clearNoNum(this)" required  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input sjzj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">管理单位</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="gldw manageUnit">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>出租状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="czzt">\n' +
                    '         <option value="-1">请选择</option>\n' +
                    '         <option value="1">已出租</option>\n' +
                    '         <option value="0">未出租</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>出售状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="cszt">\n' +
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

                    '<div class="dialogTitle">房屋产证信息</div>' +

                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>房产证</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="houseZh">\n' +
                    '         <option value="">请选择</option>\n' +
                    '     </select>\n' +
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

                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    getfczh()
                    getgldw()
                    $.ajax({
                        url: IPzd + '/hresource/' + obj.data.id,    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: true,//请求是否异步，默认为异步，这也是ajax重要特性
                        type: "GET",   //请求方式
                        contentType: "application/json;charset=UTF-8",
                        // headers: {"token": sessionStorage.token},
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                            if (req.status == "200") {
                                getfczh()
                                $(".yqly").val(req.data.park)
                                // $(".gldw").val(req.data.manageUnit)
                                $(".lc").val(req.data.buildLevel)
                                $(".lh").val(req.data.buildNo)
                                $(".fh").val(req.data.buildRoom)
                                $(".houseZh").val(req.data.assetsId)
                                $(".fj").val(req.data.remark)
                                $(".cszt").val(req.data.rentCode)
                                $(".fymj").val(req.data.resourceArea)
                                // $(".fymc").val(req.data.resourceName)
                                $(".cszt").val(req.data.sellCode)
                                $(".czzt").val(req.data.rentCode)
                                $(".gldw").val(req.data.agencyId)
                                $(".dczl").val(req.data.landLocation)
                                $(".tdyyz").val(req.data.landOwner)
                                $(".dh").val(req.data.landNum)
                                $(".zlc").val(req.data.totalLevel)
                                $(".ylzj").val(req.data.originRentCharge)
                                $(".zdj").val(req.data.guideRentCharge)
                                $(".sjzj").val(req.data.realRentCharge)
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
                },
                put: function () {
                    if ($.trim($(".houseZh").val()) == "") {
                        layer.msg("房产不能为空！")
                    } else {
                        if ($.trim($(".yqly").val()) == "") {
                            layer.msg("园区不能为空！")
                        } else {
                            if ($.trim($(".fymj").val()) == "") {
                                layer.msg("房源面积不能为空！")
                            } else {
                                if ($.trim($(".sjzj").val()) == "") {
                                    layer.msg("实际租金不能为空！")
                                } else {
                                    if ($.trim($(".fymj").val()) == "") {
                                        layer.msg("房源面积不能为空！")
                                    } else {
                                        if ($(".cszt").val() == "1") {
                                            if ($(".czzt").val() !== "-1") {
                                                layer.msg("已出售的房源不能出租")
                                                $(".czzt").val("-1")
                                            } else {
                                                var data = {
                                                    "id": obj.data.id,
                                                    "buildLevel": $.trim($(".lc").val()),
                                                    "buildNo": $.trim($(".lh").val()),
                                                    "buildRoom": $.trim($(".fh").val()),
                                                    "createdBy": user,
                                                    "fkHouseAssetsId": $.trim($(".houseZh").val()),
                                                    "remark": $.trim($(".fj").val()),
                                                    "rentStatus": $.trim($(".cszt").val()),
                                                    "resourceArea": $.trim($(".fymj").val()),
                                                    // "resourceName": $.trim($(".fymc").val()),
                                                    "sellStatus": $.trim($(".cszt").val()),
                                                    "rentStatus": $.trim($(".czzt").val()),
                                                    "originRentCharge": $.trim($(".ylzj").val()),
                                                    "realRentCharge": $.trim($(".sjzj").val()),
                                                    "guideRentCharge": $.trim($(".zdj").val()),
                                                    "fkAgencyId": $.trim($(".gldw.manageUnit").val())
                                                }
                                                $.ajax({
                                                    url: IPzd + '/hresource',    //请求的url地址
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

                                        } else if ($(".cszt").val() == 0) {
                                            if ($(".czzt").val() == "-1") {
                                                layer.msg("房源出租状态不能为空")
                                            } else {
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
                                                    // "resourceName": $(".fymc").val(),
                                                    "sellStatus": $(".cszt").val(),
                                                    "rentStatus": $(".czzt").val(),
                                                    "originRentCharge": $(".ylzj").val(),
                                                    "realRentCharge": $(".sjzj").val(),
                                                    "guideRentCharge": $(".zdj").val(),
                                                    "fkAgencyId": $(".gldw.manageUnit").val()
                                                }
                                                $.ajax({
                                                    url: IPzd + '/hresource',    //请求的url地址
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
                        }
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
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">房源名称</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fymc" readonly>\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">园区/楼宇</label>\n' +
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
                    '    <label class="layui-form-label">房源面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fymj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">原来租金(元/m²/月)</label>\n' +
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
                    '    <label class="layui-form-label">实际租金(元/m²/月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input sjzj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">管理单位</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fygldw" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">出租状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input czzt" readonly>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">出售状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input cszt" readonly>\n' +
                    '    </div>\n' +
                    '    </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">附记</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '<div class="dialogTitle">房屋产证信息</div>' +

                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋产权</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input houseZh" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +

                    '   <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房产总楼层</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zlc" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">管理单位</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input gldw" readonly>\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋所有权人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input gldw" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +

                    '<div class="dialogTitle">土地产证信息</div>' +

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
                    '    <label class="layui-form-label">土地坐落</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dczl" readonly>\n' +
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
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    $.ajax({
                        url: IPzd + '/hresource/' + obj.data.id,    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: true,//请求是否异步，默认为异步，这也是ajax重要特性
                        type: "GET",   //请求方式
                        contentType: "application/json;charset=UTF-8",
                        // headers: {"token": sessionStorage.token},
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                            if (req.status == "200") {
                                $(".yqly").val(req.data.park)
                                $(".gldw").val(req.data.manageUnit)
                                $(".lc").val(req.data.buildLevel)
                                $(".lh").val(req.data.buildNo)
                                $(".fh").val(req.data.buildRoom)
                                $(".houseZh").val(req.data.assetsName)
                                $(".fj").val(req.data.remark)
                                $(".cszt").val(req.data.rentCode)
                                $(".fymj").val(req.data.resourceArea)
                                // $(".fymc").val(req.data.resourceName)
                                $(".cszt").val(req.data.sellStatus)
                                $(".czzt").val(req.data.rentStatus)
                                $(".fygldw").val(req.data.agency)
                                $(".gldw").val(req.data.houseOwner)
                                $(".dczl").val(req.data.landLocation)
                                $(".tdyyz").val(req.data.landOwner)
                                $(".dh").val(req.data.landNum)
                                $(".zlc").val(req.data.totalLevel)
                                $(".ylzj").val(req.data.originRentCharge)
                                $(".zdj").val(req.data.guideRentCharge)
                                $(".sjzj").val(req.data.realRentCharge)
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

function cfsj(obj) {
    var id = obj.value
    console.log(id)
}



