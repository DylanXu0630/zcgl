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
            "startTime": "",
            "aid": aid
        }
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'dealSerial', title: '合同编号'}
            // , {field: 'dealName', title: '合同名称'}
            , {field: 'dealType', title: '合同类型'}
            , {field: 'location', title: '座落'}
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
                                // '    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="zzht">终止合同</a>' +
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
                        "startTime": sjc($("#s-date").val() + " 00:00:00"),
                        "aid": aid
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
                // '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label"><span class="inputBtx">*</span>合同名称</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="*为选填项" autocomplete="off" class="layui-input dealName">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
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
                '    <label class="layui-form-label"><span class="inputBtx">*</span>合同开始日期</label>\n' +
                '    <div class="layui-input-block">\n' +
                '       <input type="text" name="date" id="date" placeholder="请选择时间" autocomplete="off" class="layui-input httime">\n' +
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
                '    <label class="layui-form-label"><span class="inputBtx">*</span>是否有优惠</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="isHaveDiscount">\n' +
                '        <option value="2">无</option>\n' +
                '        <option value="1">有</option>\n' +
                '     </select>\n' +
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
                '<div>' +
                '</div>' +
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
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label" style="width: 125px;"><span class="inputBtx">*</span>实际租金(元/m²/月)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input sjj sjzj" onkeyup="bzj()">\n' +
                '<div id="addsjjDiv">' +
                '</div>' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>保证金(元)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required onkeyup="clearNoNum(this)" lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input bzj">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>',
            add: function () {
                var fyArr = []
                var zjArr = []
                $(".sjj").each(function (n, m) {
                    if ($(m).val() == "") {
                        zjArr.push(0)
                    } else {
                        zjArr.push($(m).val())
                    }
                })
                $(".houseResource").each(function (i, o) {
                    if ($(o).val() !== "") {
                        var obj = {
                            "fkHouseResourceId": $(o).val(),
                            "realMoney": zjArr[i]
                        }
                        fyArr.push(obj)
                    }
                })
                if ($(".houseResource").length !== $(".sjj").length) {
                    layer.msg("房源和实际价格对应！")
                } else {
                    if (fyArr.length !== 0) {
                        if ($.trim($(".yf").val()) !== "") {
                            if ($.trim($(".bzj").val()) !== "") {
                                if ($.trim($("#date").val()) !== "") {
                                    if ($.trim($(".zsMouth").val()) !== "") {
                                        if (checkMouth($(".zsMouth").val(), $(".zjzfType").val())) {
                                            if ($.trim($(".zsMouth").val()) !== "") {
                                                if ($(".htType").val() !== "") {
                                                    if (isCffy(fyArr)) {
                                                        if (!isBzj()) {
                                                            layer.msg("保证金不能少于两个月的实际租金！")
                                                        } else {
                                                            var data = {
                                                                "createdBy": user,
                                                                // "dealName": $.trim($(".dealName").val()),
                                                                "rentMonth": $.trim($(".zsMouth").val()),
                                                                "dealAndHouses": fyArr,
                                                                "fkRenterId": $.trim($(".yf").val()),
                                                                "startTime": sjc($("#date").val() + " 00:00:00"),
                                                                "payType": $.trim($(".zjzfType").val()),
                                                                "deposit": $.trim($(".bzj").val()),
                                                                "freeRentMonth": $.trim($(".mzMouth").val()),
                                                                "dealType": $.trim($(".htType").val()),
                                                                "isNewRent": $.trim($(".rentType").val()),
                                                                "isHaveDiscount": $(".isHaveDiscount").val()
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
                                                        }

                                                    } else {
                                                        layer.msg("房源不能选择相同的！")
                                                    }

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
            var selectDiv = $("<div class='layui-input-block' style='margin-top: 15px;margin-bottom: 15px;'><select class='houseResource houseFy" + n + "' xlh='" + n + "' ><option value='houseF'>请选择</option></select><button type='button' class='layui-btn layui-btn-sm layui-btn-primary clearAddFy'  style='position: absolute;right: 29px;top: 5px;'><i class='layui-icon'>&#xe640;</i></button></div>").appendTo("#addFyDiv")
            var sjjDiv = $("<input type='text' style='margin-top: 16px;' onkeyup='bzj()' xlh='" + n + "' name='title' required  lay-verify='required' placeholder='请输入' autocomplete='off' class='layui-input sjj sjzj" + n + "'>").appendTo("#addsjjDiv")
            getaddyf(n)
            form.render('select')
        })

        $("#addFyDiv").on("click", ".clearAddFy", function () {
            $(this).parent().remove()
            $(".sjzj" + $(this).parent().find("select").attr("xlh")).remove()
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
                        // '  <div class="dialogDiv">\n' +
                        // '    <label class="layui-form-label"><span class="inputBtx">*</span>合同名称</label>\n' +
                        // '    <div class="layui-input-block">\n' +
                        // '      <input type="text" name="title" required  lay-verify="required" placeholder="*为选填项" autocomplete="off" class="layui-input dealName">\n' +
                        // '    </div>\n' +
                        // '  </div>\n' +
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
                        '    <label class="layui-form-label"><span class="inputBtx">*</span>是否有优惠</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <select class="isHaveDiscount">\n' +
                        '        <option value="2">无</option>\n' +
                        '        <option value="1">有</option>\n' +
                        '     </select>\n' +
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
                        '  <div class="dialogDiv">\n' +
                        '    <label class="layui-form-label" style="width: 125px;"><span class="inputBtx">*</span>实际租金(元/m²/月)</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="title" required  lay-verify="required" onkeyup="bzj()" placeholder="*为必填项" autocomplete="off" class="layui-input sjj sjzj">\n' +
                        '<div id="addsjjDiv">' +
                        '</div>' +
                        '    </div>\n' +
                        '  </div>\n' +
                        '  <div class="dialogDiv">\n' +
                        '    <label class="layui-form-label"><span class="inputBtx">*</span>保证金(元)</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="title" required onkeyup="clearNoNum(this)" lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input bzj">\n' +
                        '    </div>\n' +
                        '  </div>\n' +
                        '</form></div>' +
                        '</div>' +
                        '</div>',
                    look: function () {
                        // getfy()
                        getgldw()
                        getyf()
                        var fyArr = obj.data.houseResourceDetail
                        if (fyArr.length < 2) {
                            if ($(".houseFy").children().length < 2) {
                                $(".houseFy").children().remove()
                                var options2 = $("<option value='" + obj.data.houseResourceDetail[0].id + "'>" + obj.data.houseResourceDetail[0].location + "</option>").appendTo(".houseFy")
                                $(".houseFy").val(obj.data.houseResourceDetail[0].id)
                                $(".sjzj").val(obj.data.houseResourceDetail[0].realRentCharge)
                                form.render('select')
                            } else {
                                $(".houseFy").children().remove()
                                var options2 = $("<option value='" + obj.data.houseResourceDetail[0].id + "'>" + obj.data.houseResourceDetail[0].location + "</option>").appendTo(".houseFy")
                                $(".houseFy").val(obj.data.houseResourceDetail[0].id)
                                $(".sjzj").val(obj.data.houseResourceDetail[0].realRentCharge)
                                form.render('select')
                            }
                        } else {
                            $(fyArr).each(function (i, o) {
                                if (i > 0) {
                                    var selectDiv = $("<div class='layui-input-block' style='margin-top: 15px;margin-bottom: 15px;'><select xlh='" + i + "' class='houseResource houseFy" + i + "'></select><button type='button' class='layui-btn layui-btn-sm layui-btn-primary clearAddFy'  style='position: absolute;right: 29px;top: 5px;'><i class='layui-icon'>&#xe640;</i></button></div>").appendTo("#addFyDiv")
                                    var options2 = $("<option value='" + o.id + "'>" + o.location + "</option>").appendTo(".houseFy" + i)
                                    // getaddyf(i)
                                    var sjjDiv = $("<input type='text' onkeyup='bzj()' style='margin-top: 16px;' xlh='" + i + "' name='title' required  lay-verify='required' placeholder='*为必填项' autocomplete='off' class='layui-input sjj sjzj" + i + "'>").appendTo("#addsjjDiv")
                                    $(".houseFy" + i).val(o.id)
                                    $(".sjzj" + i).val(o.realRentCharge)
                                    form.render('select')
                                } else {
                                    var options2 = $("<option value='" + obj.data.houseResourceDetail[0].id + "'>" + obj.data.houseResourceDetail[0].location + "</option>").appendTo(".houseFy")
                                    $(".houseFy").val(obj.data.houseResourceDetail[0].id)
                                    $(".sjzj").val(obj.data.houseResourceDetail[0].realRentCharge)
                                    form.render('select')
                                }
                            })
                        }

                        $(".yf").val(obj.data.renterId)
                        $(".zjzfType").val(obj.data.payTypeCode)
                        $(".htType").val(obj.data.dealTypeCode)
                        $(".httime").val(obj.data.startTime)
                        $(".zsMouth").val(obj.data.rentMonth)
                        $(".mzMouth").val(obj.data.freeRentMonth)
                        $(".isHaveDiscount").val(obj.data.freeRentMonth)
                        $(".rentType").val(obj.data.isNewRentCode)
                        $(".isHaveDiscount").val(obj.data.isHaveDiscountCode)

                        $(obj.data.mustMoney).each(function (n, m) {
                            if (m.moneyType == "保证金") {
                                $(".bzj").val(m.money)
                            }
                        })


                        $("body").on("click", ".houseResource", function () {
                            var selectDiv = $(this).parent().parent().parent().find('.houseResource')
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
                                    if (req.status == "200") {
                                        $(req.data).each(function (i, o) {
                                            var option = $("<option value='" + o.id + "' resourceArea='" + o.resourceArea + "'>" + o.resourceName + "</option>").appendTo(selectDiv)
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
                        })

                        lay('.httime').each(function () {
                            laydate.render({
                                elem: this,
                                format: 'yyyy年MM月dd日'
                            });
                        })
                        $("#addFy").on("click", function () {
                            var n = $(".houseResource").length + 1
                            var selectDiv = $("<div class='layui-input-block' style='margin-top: 15px;margin-bottom: 15px;'><select class='houseResource houseFy" + n + "' xlh='" + n + "'><option value='houseF'>请选择</option></select><button type='button' class='layui-btn layui-btn-sm layui-btn-primary clearAddFy'  style='position: absolute;right: 29px;top: 5px;'><i class='layui-icon'>&#xe640;</i></button></div>").appendTo("#addFyDiv")
                            var sjjDiv = $("<input type='text' style='margin-top: 16px;' onkeyup='bzj()'  name='title' required  lay-verify='required' placeholder='*为必填项' autocomplete='off' class='layui-input sjj sjzj" + n + "'>").appendTo("#addsjjDiv")
                            getaddyf(n)
                            form.render('select')
                        })

                        $("#addFyDiv").on("click", ".clearAddFy", function () {
                            $(this).parent().remove()
                            $(".sjzj" + $(this).parent().find("select").attr("xlh")).remove()
                        })
                    },
                    put: function () {
                        var fyArr = []
                        var zjArr = []
                        $(".sjj").each(function (n, m) {
                            zjArr.push($(m).val())
                        })
                        $(".houseResource").each(function (i, o) {
                            if ($(o).val() !== "") {
                                var obj = {
                                    "fkHouseResourceId": $(o).val(),
                                    "realMoney": zjArr[i]
                                }
                                fyArr.push(obj)
                            }
                        })
                        if ($(".houseResource").length !== $(".sjj").length) {
                            layer.msg("房源和实际价格对应！")
                        } else {
                            if (fyArr.length !== 0) {
                                if ($.trim($(".yf").val()) !== "") {
                                    if ($.trim($(".bzj").val()) !== "") {
                                        if ($.trim($("#date").val()) !== "") {
                                            if ($.trim($(".zsMouth").val()) !== "") {
                                                if (checkMouth($(".zsMouth").val(), $(".zjzfType").val())) {
                                                    if ($.trim($(".zsMouth").val()) !== "") {
                                                        if ($(".htType").val() !== "") {
                                                            if (isCffy(fyArr)) {
                                                                if (!isBzj()) {
                                                                    layer.msg("保证金不能少于三个月的实际租金！")
                                                                } else {
                                                                    var data = {
                                                                        "id": obj.data.id,
                                                                        "createdBy": user,
                                                                        "rentMonth": $.trim($(".zsMouth").val()),
                                                                        "dealAndHouses": fyArr,
                                                                        "fkRenterId": $.trim($(".yf").val()),
                                                                        "startTime": sjc($("#date").val() + " 00:00:00"),
                                                                        "payType": $.trim($(".zjzfType").val()),
                                                                        "deposit": $.trim($(".bzj").val()),
                                                                        "freeRentMonth": $.trim($(".mzMouth").val()),
                                                                        "dealType": $.trim($(".htType").val()),
                                                                        "isNewRent": $.trim($(".rentType").val()),
                                                                        "isHaveDiscount": $(".isHaveDiscount").val()
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
                                                                layer.msg("房源不能选择相同的！")
                                                            }

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
                        // '  <div class="dialogDiv">\n' +
                        // '    <label class="layui-form-label">合同名称</label>\n' +
                        // '    <div class="layui-input-block">\n' +
                        // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dealName" readonly>\n' +
                        // '    </div>\n' +
                        // '  </div>\n' +
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
                        '    <label class="layui-form-label">免租期(月)</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input mzq" readonly>\n' +
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
                        '<div id="fyjcxx"></div>' +
                        '<div class="dialogTitle">应收款详细</div>' +
                        '<table id="zjlb"></table>' +
                        '<div class="dialogTitle">收款记录</div>' +
                        '<table id="skjl"></table>' +
                        '</form></div>' +
                        '</div>' +
                        '</div>',
                    look: function () {
                        $(".jf").val(obj.data.lessor)
                        $(".czfyf").val(obj.data.renter)
                        $("#date").val(obj.data.startTime)
                        $("#date2").val(obj.data.endTime)
                        $(".htshzt").val(obj.data.dealReviewStatus)
                        $(".htzt").val(obj.data.dealExistStatus)
                        $(".htType").val(obj.data.dealType)
                        $(".fkfs").val(obj.data.payType)
                        $(".zlys").val(obj.data.rentMonth)
                        $(".rentType").val(obj.data.isNewRent)
                        $(".mzq").val(obj.data.freeRentMonth)
                        var dzArr = obj.data.location.split(",")
                        $("#fyjcxx").children().remove()

                        $(obj.data.houseResourceDetail).each(function (i, o) {
                            var fjDiv = $("<div style='overflow: hidden'></div>").appendTo("#fyjcxx")
                            var num = i + 1
                            var div = $("<div class='dialogTitle'>房源" + num + "</div>").appendTo(fjDiv)
                            var gldw = $(" <div class='dialogDiv'><label class='layui-form-label'> 管理单位</label><div class='layui-input-block'><input type='text' name='title' required  lay-verify='required' placeholder='请输入' autocomplete='off' class='layui-input gldw" + i + "' readonly></div></div>").appendTo(fjDiv)
                            $(".gldw" + i).val(o.agency)
                            var mj = $(" <div class='dialogDiv'><label class='layui-form-label'> 面积(m²)</label><div class='layui-input-block'><input type='text' name='title' required  lay-verify='required' placeholder='请输入' autocomplete='off' class='layui-input mj" + i + "' readonly></div></div>").appendTo(fjDiv)
                            $(".mj" + i).val(o.resourceArea)
                            var dz = $(" <div class='dialogDiv'><label class='layui-form-label'>地址</label><div class='layui-input-block'><input type='text' name='title' required  lay-verify='required' placeholder='请输入' autocomplete='off' class='layui-input dz" + i + "' readonly></div></div>").appendTo(fjDiv)
                            $(".dz" + i).val(dzArr[i])
                            var yj = $(" <div class='dialogDiv'><label class='layui-form-label'>原价(元/m² *月)</label><div class='layui-input-block'><input type='text' name='title' required  lay-verify='required' placeholder='请输入' autocomplete='off' class='layui-input yj" + i + "' readonly></div></div>").appendTo(fjDiv)
                            $(".yj" + i).val(o.originRentCharge)
                            var sjj = $(" <div class='dialogDiv'><label class='layui-form-label'>实际价(元/m² *月)</label><div class='layui-input-block'><input type='text' name='title' required  lay-verify='required' placeholder='请输入' autocomplete='off' class='layui-input sjj" + i + "' readonly></div></div>").appendTo(fjDiv)
                            $(".sjj" + i).val(o.realRentCharge)
                            var sjj = $(" <div class='dialogDiv'><label class='layui-form-label'>指导价(元/m² *月)</label><div class='layui-input-block'><input type='text' name='title' required  lay-verify='required' placeholder='请输入' autocomplete='off' class='layui-input zdj" + i + "' readonly></div></div>").appendTo(fjDiv)
                            $(".zdj" + i).val(o.guideRentCharge)
                        })

                        $("#zjlb").children().remove()
                        if (obj.data.mustMoney.length !== 0) {
                            var sm = $("<tr></tr>").appendTo("#zjlb")
                            var smsm = $("<td>收款原因</td>").appendTo(sm)
                            var lxsm = $("<td>类型</td>").appendTo(sm)
                            var rqsm = $("<td>日期</td>").appendTo(sm)
                            var msm = $("<td>金额(元)</td>").appendTo(sm)
                            var zt = $("<td>状态</td>").appendTo(sm)

                            $(obj.data.mustMoney).each(function (i, o) {
                                if (o.moneyType == "往年欠款") {
                                    var wnqk = $("<tr></tr>").appendTo("#zjlb")
                                    var lxtd = $("<td>" + o.mustReason + "</td>").appendTo(tr)
                                    var lxtd = $("<td>" + o.moneyType + "</td>").appendTo(tr)
                                    var lxtd = $("<td>" + o.mustDate + "</td>").appendTo(tr)
                                    var lxtd = $("<td>" + o.money + "</td>").appendTo(tr)
                                    var lxtd = $("<td>" + o.payStatus + "</td>").appendTo(tr)
                                } else if (o.moneyType == "保证金") {
                                    var tr = $("<tr></tr>").appendTo("#zjlb")
                                    var lxtd = $("<td>" + o.mustReason + "</td>").appendTo(tr)
                                    var lxtd = $("<td>" + o.moneyType + "</td>").appendTo(tr)
                                    var lxtd = $("<td>" + o.mustDate + "</td>").appendTo(tr)
                                    var lxtd = $("<td>" + o.money + "</td>").appendTo(tr)
                                    var lxtd = $("<td>" + o.payStatus + "</td>").appendTo(tr)
                                } else {
                                    var tr = $("<tr></tr>").appendTo("#zjlb")
                                    var lxtd = $("<td>" + o.mustReason + "</td>").appendTo(tr)
                                    var lxtd = $("<td>" + o.moneyType + "</td>").appendTo(tr)
                                    var lxtd = $("<td>" + o.mustDate + "</td>").appendTo(tr)
                                    var lxtd = $("<td>" + o.money + "</td>").appendTo(tr)
                                    var lxtd = $("<td>" + o.payStatus + "</td>").appendTo(tr)
                                }
                            })
                        }
                        $("#skjl").children().remove()
                        if (obj.data.transFlows.length !== 0) {
                            var sm = $("<tr></tr>").appendTo("#skjl")
                            var smsm = $("<td>收款原因</td>").appendTo(sm)
                            var lxsm = $("<td>类型</td>").appendTo(sm)
                            var rqsm = $("<td>日期</td>").appendTo(sm)
                            var msm = $("<td>金额(元)</td>").appendTo(sm)
                            var certNosm = $("<td>凭证号</td>").appendTo(sm)

                            $(obj.data.transFlows).each(function (i, o) {
                                var tr = $("<tr></tr>").appendTo("#skjl")
                                var lxtd = $("<td>" + o.transReason + "</td>").appendTo(tr)
                                var lxtd = $("<td>" + o.moneyType + "</td>").appendTo(tr)
                                var lxtd = $("<td>" + o.moneyDate + "</td>").appendTo(tr)
                                var lxtd = $("<td>" + o.money + "</td>").appendTo(tr)
                                var lxtd = $("<td>" + o.certNo + "</td>").appendTo(tr)
                            })
                        }
                    }
                }
                layerLookOpen(openMes);
            } else if (layEvent == 'dy') {
                localStorage.heObj = JSON.stringify(obj.data)
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
        }
    );
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
                    var option = $("<option value='" + o.id + "' resourceArea='" + o.resourceArea + "'>" + o.resourceName + "</option>").appendTo(".houseFy")
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
            $('.houseFy' + n).children().remove()
            var options = $("<option value=''>请选择</option>").appendTo('.houseFy' + n)
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "' resourceArea='" + o.resourceArea + "'>" + o.resourceName + "</option>").appendTo('.houseFy' + n)
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


/*判断是否重复选择房源*/
function isCffy(arr) {
    var istrue = true
    var idArr = []
    $(arr).each(function (i, o) {
        idArr.push(o.fkHouseResourceId)
    })
    var nary = idArr.sort()
    for (var i = 0; i < arr.length; i++) {
        if (nary[i] == nary[i + 1]) {
            istrue = false
            break;
        }
    }

    return istrue
}

function bzj() {
    var bzj = 0
    var areaArr = []
    $(".houseResource option:selected").each(function (n,m) {
        if ($(m).attr("resourcearea")!==undefined){
            areaArr.push($(m).attr("resourcearea"))
        } else {
            areaArr.push(0)
        }

    })
    $(".sjj").each(function (i, o) {
        if ($(o).val() == "") {
            bzj = bzj + 0
        } else {
            bzj = bzj + parseInt($(o).val())*areaArr[i]
        }
    })
    bzj = bzj.toFixed(2);
    $(".bzj").val(bzj * 2)
}

function isBzj() {
    var bzj = 0
    var isTrue = true
    var areaArr = []
    $(".houseResource option:selected").each(function (n,m) {
        if ($(m).attr("resourcearea")!==undefined){
            areaArr.push($(m).attr("resourcearea"))
        } else {
            areaArr.push(0)
        }

    })
    $(".sjj").each(function (i, o) {
        if ($(o).val() == "") {
            bzj = bzj + 0
        } else {
            bzj = bzj + parseInt($(o).val())*areaArr[i]
        }
    })
    bzj = bzj.toFixed(2);
    if ($(".bzj").val() < bzj * 2) {
        isTrue = false
    }
    return isTrue
}