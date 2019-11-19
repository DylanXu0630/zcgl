//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});
layui.use(['laydate', 'table', 'form'], function () {
    var table = layui.table;
    var laydate = layui.laydate;
    var form = layui.form;

    sgetgldw()
    sgetyf()
    getfwghyt()
    form.render('select')

    lay('.httime').each(function () {
        laydate.render({
            elem: this,
            format: 'yyyy年MM月dd日'
        });
    })
    //第一个实例
    table.render({
        elem: '#tableList'
        // , toolbar: '#toolbarDemo'
        // , url: '../json/zctj.json' //数据接口
        , url: IPzd + '/deal/all' //数据接口
        , method: "POST"
        , contentType: "application/json"
        , where: {
            "asc": 0,
            "agencyId": "",
            "dealExistStatusCode": "",
            "dealName": "",
            "dealReviewStatusCode": "",
            "dealTypeCode": "",
            "endTime": "",
            "houseUsageId": "",
            "lessorId": "",
            "maxGuideRentCharge": "",
            "maxOriginRentCharge": "",
            "maxRealRentCharge": "",
            "maxRentMonth": "",
            "maxResourceArea": "",
            "minGuideRentCharge": "",
            "minOriginRentCharge": "",
            "minRealRentCharge": "",
            "minRentMonth": "",
            "minResourceArea": "",
            "payTypeCode": "",
            "renterId": "",
            "startTime": ""
        }
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'dealSerial', title: '合同编号'}
            , {field: 'dealName', title: '合同名称'}
            , {field: 'dealType', title: '合同类型'}
            , {field: 'resourceName', title: '房源'}
            , {field: 'renter', title: '承租方',}
            , {field: 'startTime', title: '开始时间',}
            , {field: 'endTime', title: '结束时间',}
            , {field: 'dealExistStatus', title: '审核状态',}
            , {field: 'dealReviewStatus', title: '合同状态',}
            , {
                fixed: 'right', title: '操作', toolbar: '#barDemo', fixed: 'right', width: 220,
            }
        ]], parseData: function (res) {//将原始数据解析成 table 组件所规定的数据
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
                    "asc": 0,
                    "agencyId": $(".s-gldw").val(),
                    "dealExistStatusCode": $(".s-hezt").val(),
                    "dealName": $(".s-htmc").val(),
                    "dealReviewStatusCode": $(".s-heshzt").val(),
                    "dealTypeCode": $(".s-httype").val(),
                    "endTime": sjc($("#s-date2").val()+ "23:59:59"),
                    "houseUsageId": $(".fwghyt").val(),
                    "lessorId": $(".s-czr").val(),
                    "maxGuideRentCharge": $(".maxzdj").val(),
                    "maxOriginRentCharge": $(".maxyj").val(),
                    "maxRealRentCharge": $(".maxfymj").val(),
                    "maxRentMonth": $(".maxzly").val(),
                    "maxResourceArea": $(".maxsjj").val(),
                    "minGuideRentCharge": $(".minzdj").val(),
                    "minOriginRentCharge": $(".minyj").val(),
                    "minRealRentCharge": $(".minfymj").val(),
                    "minRentMonth": $(".minzly").val(),
                    "minResourceArea": $(".minzjj").val(),
                    "payTypeCode": $(".s-htzftype").val(),
                    "renterId": $(".s-czzr").val(),
                    "startTime": sjc($("#s-date").val()+" 00:00:00")
                },
                url: IPzd + '/deal/all' //数据接口
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
            title: '添加合同',
            area: ['1300px', '650px'],
            leixing: '添加',
            maxmin: true,
            btn: ['确定', '取消'],
            content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" action="">\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>合同名称</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="*为选填项" autocomplete="off" class="layui-input dealName">\n' +
                '    </div>\n' +
                '  </div>\n' +
                // '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label"> 管理单位（甲方）</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <select class="gldw">\n' +
                // '    <option value="">请选择</option>\n' +
                // '     </select>\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>房源</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="houseFy">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>承租人（乙方）</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="yf">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>租金支付方式</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="zjzfType">\n' +
                '        <option value="">请选择</option>\n' +
                '        <option value="12">以十二个月为一周期支付</option>\n' +
                '        <option value="6">以六个月为一周期支付</option>\n' +
                '        <option value="3">以三个月为一周期支付</option>\n' +
                '        <option value="1">以一个月为一周期支付</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>合同类型</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="htType">\n' +
                '        <option value="">请选择</option>\n' +
                '        <option value="1">协商出租</option>\n' +
                '        <option value="2">一事一议</option>\n' +
                '        <option value="3">挂靠合同</option>\n' +
                // '        <option value="4">资产出售</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>保证金(元)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required onkeyup="clearNoNum(this)" lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input bzj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                // '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">指导价</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input guidePrice">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>合同开始日期</label>\n' +
                '    <div class="layui-input-block">\n' +
                '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input httime">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>租赁月份(月)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required onkeyup="checkNum(this)"  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zsMouth">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">免租月份(月)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required onkeyup="checkNum(this)" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input mzMouth">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>',
            add: function () {
                if ($(".dealName").val() !== "") {
                    if ($(".houseFy").val() !== "") {
                        if ($(".yf").val() !== "") {
                            if ($(".bzj").val() !== "") {
                                if ($("#date").val() !== "") {
                                    if ($(".zsMouth").val() !== "") {
                                        if (checkMouth($(".zsMouth").val(), $(".zjzfType").val())) {
                                            if ($(".zsMouth").val() !== "") {
                                                var data = {
                                                    "createdBy": user,
                                                    "dealName": $(".dealName").val(),
                                                    "rentMonth": $(".zsMouth").val(),
                                                    "fkHouseResourceId": $(".houseFy").val(),
                                                    "fkRenterId": $(".yf").val(),
                                                    "startTime": sjc($("#date").val() + " 00:00:00"),
                                                    "payType": $(".zjzfType").val(),
                                                    "deposit": $(".bzj").val(),
                                                    "freeRentMonth": $(".mzMouth").val(),
                                                    "dealType": $(".htType").val()
                                                }

                                                $.ajax({
                                                    url: IPzd + '/deal',    //请求的url地址
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
                                            } else {
                                                layer.msg("合同类型不能为空！")
                                            }

                                        } else {
                                            layer.msg("租金支付方式与租赁月份为倍数关系且不能小于租金支付的月份！")
                                        }
                                    } else {
                                        layer.msg("租赁月份不能为空！")
                                    }
                                } else {
                                    layer.msg("合同开始日期不能为空！")
                                }
                            } else {
                                layer.msg("保证金不能为空！")
                            }
                        } else {
                            layer.msg("承租人不能为空！")
                        }
                    } else {
                        layer.msg("房源不能为空！")
                    }
                } else {
                    layer.msg("合同名称不能为空！")
                }
            },
        }
        /*调用弹窗方法*/
        layerOpen(openMes);
        getfy()
        getgldw()
        getyf()
        lay('.httime').each(function () {
            laydate.render({
                elem: this,
                format: 'yyyy年MM月dd日'
            });
        })


        form.render();
    })

    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: IPzd + '/deal/' + obj.data.id,    //请求的url地址
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
                title: '编辑合同',
                area: ['1300px', '650px'],
                leixing: '编辑',
                maxmin: true,
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>合同名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="*为选填项" autocomplete="off" class="layui-input dealName">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label"> 管理单位（甲方）</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <select class="gldw">\n' +
                    // '    <option value="">请选择</option>\n' +
                    // '     </select>\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>房源</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="houseFy">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>承租人（乙方）</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="yf">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>租金支付方式</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="zjzfType">\n' +
                    '        <option value="">请选择</option>\n' +
                    '        <option value="12">以十二个月为一周期支付</option>\n' +
                    '        <option value="6">以六个月为一周期支付</option>\n' +
                    '        <option value="3">以三个月为一周期支付</option>\n' +
                    '        <option value="1">以一个月为一周期支付</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>合同类型</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="htType">\n' +
                    '        <option value="">请选择</option>\n' +
                    '        <option value="1">协商出租</option>\n' +
                    '        <option value="2">一事一议</option>\n' +
                    '        <option value="3">挂靠合同</option>\n' +
                    // '        <option value="4">资产出售</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>保证金(元)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)" lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input bzj">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">指导价</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input guidePrice">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>合同开始日期</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input httime">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>租赁月份(月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="checkNum(this)"  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zsMouth">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">免租月份(月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="checkNum(this)" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input mzMouth">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    getfy()
                    getgldw()
                    getyf()
                    $.ajax({
                        url: IPzd + '/deal/detail/' + obj.data.id,    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                        type: "GET",   //请求方式
                        contentType: "application/json;charset=UTF-8",
                        // headers: {"token": sessionStorage.token},
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                            $(".dealName").val(req.data.dealName)
                            $(".houseFy").val(req.data.resourceId)
                            $(".yf").val(req.data.renterId)
                            $(".zjzfType").val(req.data.payTypeCode)
                            $(".htType").val(req.data.dealTypeCode)
                            $(".bzj").val(req.data.deposit)
                            $("#date").val(req.data.startTime)
                            $(".zsMouth").val(req.data.rentMonth)
                            $(".mzMouth").val(req.data.freeRentMonth)
                        }
                    })
                    lay('.httime').each(function () {
                        laydate.render({
                            elem: this,
                            format: 'yyyy年MM月dd日'
                        });
                    })
                },
                put: function () {
                    if ($(".dealName").val() !== "") {
                        if ($(".houseFy").val() !== "") {
                            if ($(".yf").val() !== "") {
                                if ($(".bzj").val() !== "") {
                                    if ($("#date").val() !== "") {
                                        if ($(".zsMouth").val() !== "") {
                                            if (checkMouth($(".zsMouth").val(), $(".zjzfType").val())) {
                                                if ($(".zsMouth").val() !== "") {
                                                    var data = {
                                                        "id": obj.data.id,
                                                        "createdBy": user,
                                                        "dealName": $(".dealName").val(),
                                                        "rentMonth": $(".zsMouth").val(),
                                                        "fkHouseResourceId": $(".houseFy").val(),
                                                        "fkRenterId": $(".yf").val(),
                                                        "startTime": sjc($("#date").val() + " 00:00:00"),
                                                        "payType": $(".zjzfType").val(),
                                                        "deposit": $(".bzj").val(),
                                                        "freeRentMonth": $(".mzMouth").val(),
                                                        "dealType": $(".htType").val()
                                                    }


                                                    $.ajax({
                                                        url: IPzd + '/deal',    //请求的url地址
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
                                                } else {
                                                    layer.msg("合同类型不能为空！")
                                                }

                                            } else {
                                                layer.msg("租金支付方式与租赁月份为倍数关系且不能小于租金支付的月份！")
                                            }
                                        } else {
                                            layer.msg("租赁月份不能为空！")
                                        }
                                    } else {
                                        layer.msg("合同开始日期不能为空！")
                                    }
                                } else {
                                    layer.msg("保证金不能为空！")
                                }
                            } else {
                                layer.msg("承租人不能为空！")
                            }
                        } else {
                            layer.msg("房源不能为空！")
                        }
                    } else {
                        layer.msg("合同名称不能为空！")
                    }

                },
            }
            layerOpen(openMes);

        } else if (layEvent == 'detail') {
            /*查看操作*/
            var openMes = {
                title: '查看合同详情',
                area: ['1300px', '650px'],
                leixing: '查看',
                maxmin: true,
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +
                    '<div class="dialogTitle">合同基础信息</div>' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">合同名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dealName" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">合同类型</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input htType" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">出租人（甲方）</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input jf" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">承租人（乙方）</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input czfyf" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">开始日期</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input httime" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">终止日期</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date2" autocomplete="off" class="layui-input httime" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">合同状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input htzt" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">合同审核状态</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input htshzt" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +

                    '<div class="dialogTitle">房源基础信息</div>' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"> 管理单位</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input gldw" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input mj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +


                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地址</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dz" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房源用处</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fyyc" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">租赁期限（月）</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zpqxt" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">原价(元/m² *月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input yj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">实际价(元/m² *月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input sjj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">单价</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input unitPrice">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">指导价(元/m² *月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zdj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '  </div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    $.ajax({
                        url: IPzd + '/deal/detail/' + obj.data.id,    //请求的url地址
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
                                $(".dealName").val(req.data.dealName)
                                $(".jf").val(req.data.lessor)
                                $(".czfyf").val(req.data.renter)
                                $(".dz").val(req.data.location)
                                $(".mj").val(req.data.resourceArea)
                                $(".fyyc").val(req.data.houseUsage)
                                $(".gldw").val(req.data.manageUnit)
                                $(".zpqxt").val(req.data.rentMonth)
                                $(".yj").val(req.data.originRentCharge)
                                $(".zdj").val(req.data.guideRentCharge)
                                $(".sjj").val(req.data.realRentCharge)
                                $("#date").val(req.data.startTime)
                                $("#date2").val(req.data.endTime)
                                $(".htshzt").val(req.data.dealReviewStatus)
                                $(".htzt").val(req.data.dealExistStatus)
                                $(".htType").val(req.data.dealType)
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
        } else if (layEvent == 'dy') {
            localStorage.htId = obj.data.id
            window.open('../fwzpht.html')
        }
    });
})


/*获取房产证号*/
function getfy() {
    $.ajax({
        url: IPzd + '/hresource/simple/norent',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".houseFy").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".houseFy")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.resourceName + "</option>").appendTo(".houseFy")
                })
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

function allgetfy() {
    $.ajax({
        url: IPzd + '/hresource/simple',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".houseFy").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".houseFy")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.resourceName + "</option>").appendTo(".houseFy")
                })
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

/*获取乙方*/
function getyf() {
    $.ajax({
        url: IPzd + '/renter/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".yf").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".yf")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".yf")
                })
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

function sgetyf() {
    $.ajax({
        url: IPzd + '/renter/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".s-czzr").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".s-czzr")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".s-czzr")
                })
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

