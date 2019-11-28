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
            , {field: 'dealReviewStatus', title: '审核状态',}
            , {field: 'dealExistStatus', title: '合同状态',}
            , {
                fixed: 'right', title: '操作', fixed: 'right', width: 220, templet: function (d) {
                    if (d.dealReviewStatusCode == "1") {
                        return '<a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>\n' +
                            '    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>\n' +
                            '    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>\n' +
                            '    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="dy">打印</a>'
                    } else if (d.dealReviewStatusCode == "2") {
                        if (d.dealExistStatus == "提前结束") {
                            return '<a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>\n' +
                                '    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="dy">打印</a>'
                        } else {
                            return '<a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>\n' +
                                '    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="zzht">终止合同</a>' +
                                '    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="dy">打印</a>'
                        }

                    } else if (d.dealReviewStatusCode == "3") {
                        return '<a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>\n' +
                            '    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>\n' +
                            '    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="dy">打印</a>'
                    }
                }
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
            if (sjc($("#s-date").val()) > sjc($("#s-date2").val())) {
                layer.msg("合同开始时间不能小于合同结束时间！")
            } else {
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
                        "endTime": sjc($("#s-date2").val() + "23:59:59"),
                        "houseUsageId": $(".fwghyt").val(),
                        "lessorId": $(".s-czr").val(),
                        "maxGuideRentCharge": $(".maxzdj").val(),
                        "maxOriginRentCharge": $(".maxyj").val(),
                        "maxRealRentCharge": $(".maxsjj").val(),
                        "maxRentMonth": $(".maxzly").val(),
                        "maxResourceArea": $(".maxfymj").val(),
                        "minGuideRentCharge": $(".minzdj").val(),
                        "minOriginRentCharge": $(".minyj").val(),
                        "minRealRentCharge": $(".minsjj").val(),
                        "minRentMonth": $(".minzly").val(),
                        "minResourceArea": $(".minfymj").val(),
                        "payTypeCode": $(".s-htzftype").val(),
                        "renterId": $(".s-czzr").val(),
                        "startTime": sjc($("#s-date").val() + " 00:00:00")
                    },
                    url: IPzd + '/deal/all' //数据接口
                    , method: 'post'
                });
            }
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
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>是否续租</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="rentType">\n' +
                '        <option value="1">新签</option>\n' +
                '        <option value="2">续签</option>\n' +
                // '        <option value="4">资产出售</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>房源</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="houseResource houseFy">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '<div id="addFyDiv">' +
                '</div>' +
                '  <button type="button" class="layui-btn" id="addFy" style="margin: 0 auto;margin: 15px 0 15px 45%;"><i class="layui-icon">&#xe608;</i> 添加</button>' +
                '  </div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>',
            add: function () {
                var fyArr = []
                $(".houseResource").each(function (i,o) {
                    if ($(o).val()!==""){
                        fyArr.push($(o).val())
                    }
                })
                if ($.trim($(".dealName").val()) !== "") {
                    if (fyArr.length !== 0) {
                        if ($.trim($(".yf").val()) !== "") {
                            if ($.trim($(".bzj").val()) !== "") {
                                if ($.trim($("#date").val()) !== "") {
                                    if ($.trim($(".zsMouth").val()) !== "") {
                                        if (checkMouth($(".zsMouth").val(), $(".zjzfType").val())) {
                                            if ($.trim($(".zsMouth").val()) !== "") {
                                                if ($(".htType").val() !== "") {
                                                    var data = {
                                                        "createdBy": user,
                                                        // "dealName": $.trim($(".dealName").val()),
                                                        "rentMonth": $.trim($(".zsMouth").val()),
                                                        "fkHouseResourceId": fyArr,
                                                        "fkRenterId": $.trim($(".yf").val()),
                                                        "startTime": sjc($("#date").val() + " 00:00:00"),
                                                        "payType": $.trim($(".zjzfType").val()),
                                                        "deposit": $.trim($(".bzj").val()),
                                                        "freeRentMonth": $.trim($(".mzMouth").val()),
                                                        "dealType": $.trim($(".htType").val()),
                                                        "isNewRent": $.trim($(".rentType").val())
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
                                                layer.msg("租赁月份不能为空！")
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
        var n = 0
        $("#addFy").on("click", function () {
            n = n + 1
            var selectDiv = $("<div class='layui-input-block' style='margin-top: 15px;margin-bottom: 15px;'><select class='houseResource houseFy"+n+"'><option value='houseF'>请选择</option></select><button type='button' class='layui-btn layui-btn-sm layui-btn-primary clearAddFy'  style='position: absolute;right: 29px;top: 5px;'><i class='layui-icon'>&#xe640;</i></button></div>").appendTo("#addFyDiv")
            getaddyf(n)
            form.render('select')
        })

        $("#addFyDiv").on("click",".clearAddFy",function () {
            $(this).parent().remove()
        })
    })

    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('确定删除？', function (index) {
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
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>是否续租</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="rentType">\n' +
                    '        <option value="1">新签</option>\n' +
                    '        <option value="2">续签</option>\n' +
                    // '        <option value="4">资产出售</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>房源</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="houseResource houseFy">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '<div id="addFyDiv">' +
                    '</div>' +
                    '  <button type="button" class="layui-btn" id="addFy" style="margin: 0 auto;margin: 15px 0 15px 45%;"><i class="layui-icon">&#xe608;</i> 添加</button>' +
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
                            $(".dealName").attr("htbh", "")
                            $(".dealName").val(req.data.dealName)
                            $(".yf").val(req.data.renterId)
                            $(".zjzfType").val(req.data.payTypeCode)
                            $(".htType").val(req.data.dealTypeCode)
                            $(".bzj").val(req.data.deposit)
                            $("#date").val(req.data.startTime)
                            $(".zsMouth").val(req.data.rentMonth)
                            $(".mzMouth").val(req.data.freeRentMonth)
                            $(".dealName").attr("htbh", req.data.dealSerial)
                            $(".rentType").val(req.data.rentTypeCode)
                            var fyArr = req.data.resourceId.splice(",")
                            if (fyArr.length<2){
                                if ($(".houseFy").children().length < 2) {
                                    $(".houseFy").children().remove()
                                    var options = $("<option value=''>请选择</option>").appendTo(".houseFy")
                                    var options2 = $("<option value='" + req.data.resourceId + "'>" + req.data.resourceName + "</option>").appendTo(".houseFy")
                                    $(".houseFy").val(req.data.resourceId)
                                    form.render('select')
                                } else {
                                    $(".houseFy").val(req.data.resourceId)
                                }
                            } else {
                                $(fyArr).each(function (i,o) {
                                    if (i>0){
                                        var selectDiv = $("<div class='layui-input-block' style='margin-top: 15px;margin-bottom: 15px;'><select class='houseResource houseFy"+i+"'><option value='houseF'>请选择</option></select><button type='button' class='layui-btn layui-btn-sm layui-btn-primary clearAddFy'  style='position: absolute;right: 29px;top: 5px;'><i class='layui-icon'>&#xe640;</i></button></div>").appendTo("#addFyDiv")
                                        getaddyf(n)
                                        $(".houseFy"+i).val(o)
                                        form.render('select')
                                    } else{
                                        $(".houseFy").val(req.data.resourceId)
                                    }
                                })
                            }
                        }
                    })
                    lay('.httime').each(function () {
                        laydate.render({
                            elem: this,
                            format: 'yyyy年MM月dd日'
                        });
                    })
                    $("#addFy").on("click", function () {
                        var n = $(".houseResource").length + 1
                        var selectDiv = $("<div class='layui-input-block' style='margin-top: 15px;margin-bottom: 15px;'><select class='houseResource houseFy"+n+"'><option value='houseF'>请选择</option></select><button type='button' class='layui-btn layui-btn-sm layui-btn-primary clearAddFy'  style='position: absolute;right: 29px;top: 5px;'><i class='layui-icon'>&#xe640;</i></button></div>").appendTo("#addFyDiv")
                        getaddyf(n)
                        form.render('select')
                    })

                    $("#addFyDiv").on("click",".clearAddFy",function () {
                        $(this).parent().remove()
                    })
                },
                put: function () {
                    var fyArr = []
                    $(".houseResource").each(function (i,o) {
                        if ($(o).val()!==""){
                            fyArr.push($(o).val())
                        }
                    })
                    if ($.trim($(".dealName").val()) !== "") {
                        if (fyArr.length !== 0) {
                            if ($.trim($(".yf").val()) !== "") {
                                if ($.trim($(".bzj").val()) !== "") {
                                    if ($.trim($("#date").val()) !== "") {
                                        if ($.trim($(".zsMouth").val()) !== "") {
                                            if (checkMouth($(".zsMouth").val(), $(".zjzfType").val())) {
                                                if ($.trim($(".zsMouth").val()) !== "") {
                                                    if ($.trim($(".htType").val()) !== "") {
                                                        var data = {
                                                            "id": obj.data.id,
                                                            "createdBy": user,
                                                            "dealName": $.trim($(".dealName").val()),
                                                            "rentMonth": $.trim($(".zsMouth").val()),
                                                            "fkHouseResourceId": fyArr,
                                                            "fkRenterId": $.trim($(".yf").val()),
                                                            "startTime": sjc($("#date").val() + " 00:00:00"),
                                                            "payType": $.trim($(".zjzfType").val()),
                                                            "deposit": $.trim($(".bzj").val()),
                                                            "freeRentMonth": $.trim($(".mzMouth").val()),
                                                            "dealType": $.trim($(".htType").val()),
                                                            "dealSerial": $.trim($(".dealName").attr("htbh")),
                                                            "isNewRent": $.trim($(".rentType").val())
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
                                                    layer.msg("租赁月份不能为空！")
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
                    '    <label class="layui-form-label">付款方式</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fkfs" readonly>\n' +
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
                    '    <label class="layui-form-label">租赁月数(月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zlys" readonly>\n' +
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
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">是否续租</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input rentType" readonly>\n' +
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
                                $(".fkfs").val(req.data.payType)
                                $(".zlys").val(req.data.rentMonth)
                                $(".rentType").val(req.data.rentType)
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
        } else if (layEvent == 'dy') {
            localStorage.htId = obj.data.id
            if (obj.data.dealType == "协商出租") {
                window.open('../fwzpht.html')
            } else if (obj.data.dealType == "一事一议") {
                window.open('../ysyy.html')
            } else if (obj.data.dealType == "挂靠") {
                window.open('../gkht.html')
            }

        } else if (layEvent == 'zzht') {

            var openMes = {
                title: '终止合同',
                area: ['800px', '350px'],
                leixing: '编辑',
                maxmin: true,
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +
                    '  <div class="dialogDiv" style="min-width: 460px">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>合同终止时间</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input httime" style="width: 88%">\n' +
                    '    </div>\n' +
                    '  </div>\n' +

                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {

                    lay('.httime').each(function () {
                        laydate.render({
                            elem: this,
                            format: 'yyyy年MM月dd日'
                        });
                    })
                },
                put: function () {
                    if ($.trim($("#date").val()) !== "") {
                        var data = {
                            "id": obj.data.id,
                            "date": sjc($("#date").val())
                        }
                        $.ajax({
                            url: IPzd + '/deal/stop',    //请求的url地址
                            dataType: "json",   //返回格式为json
                            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                            type: "PUT",   //请求方式
                            data: JSON.stringify(data),
                            contentType: "application/json;charset=UTF-8",
                            // headers: {"token": sessionStorage.token},
                            beforeSend: function () {
                                //请求前的处理
                            },
                            success: function (req) {
                                if (req.status == "200") {
                                    layer.close(indexDig);
                                    layer.msg(req.msg)
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
                        layer.msg("合同名称不能为空！")
                    }

                },
            }
            layerOpen(openMes);
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

function getaddyf(n) {
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
            $('.houseFy'+n).children().remove()
            var options = $("<option value=''>请选择</option>").appendTo('.houseFy'+n)
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.resourceName + "</option>").appendTo('.houseFy'+n)
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
// function getbjfy() {
//     $.ajax({
//         url: IPzd + '/hresource/simple/norent',    //请求的url地址
//         dataType: "json",   //返回格式为json
//         async: false,//请求是否异步，默认为异步，这也是ajax重要特性
//         type: "GET",   //请求方式
//         contentType: "application/json;charset=UTF-8",
//         // headers: {"token": sessionStorage.token},
//         beforeSend: function () {
//             //请求前的处理
//         },
//         success: function (req) {
//             $(".houseFy").children().remove()
//             var options = $("<option value=''>请选择</option>").appendTo(".houseFy")
//             if (req.status == "200") {
//                 $(req.data).each(function (i, o) {
//                     var option = $("<option value='" + o.id + "'>" + o.resourceName + "</option>").appendTo(".houseFy")
//                 })
//             } else {
//                 // layer.msg(req.msg)
//             }
//
//         },
//         complete: function () {
//             //请求完成的处理
//         },
//         error: function () {
//             //请求出错处理
//         }
//     });
// }

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

