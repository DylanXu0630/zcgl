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
            // , {field: 'dealType', title: '合同类型'}
            , {field: 'location', title: '座落'}
            , {field: 'renter', title: '承租方',}
            , {field: 'startTime', title: '开始时间',}
            , {field: 'endTime', title: '结束时间',}
            , {
                title: '应退款(保证金)', templet: function (d) {
                    var sjhk = 0
                    $(d.mustMoney).each(function (i, o) {
                        if (o.moneyType=="保证金"){
                            sjhk = o.money
                        }
                    })
                    return returnFloat(sjhk)
                }
            }
            , {
                title: '实际退款(保证金)', templet: function (d) {
                    var sjhk = 0
                    $(d.depositReturns).each(function (i, o) {
                        sjhk = sjhk + Number(o.money)
                    })
                    return returnFloat(sjhk)
                }
            }
            , {field: 'dealExistStatus', title: '合同状态',}
            , {
                fixed: 'right', title: '操作', fixed: 'right', width: 220, templet: function (d) {
                    return '<a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>\n' +
                        '    <a class="layui-btn layui-btn-xs" lay-event="edit">退还保证金</a>\n'
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


    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data //获得当前行数据
                , layEvent = obj.event; //获得 lay-event 对应的值
            if (layEvent === 'edit') {
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
                        '    <label class="layui-form-label"><span class="inputBtx">*</span>退还时间</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '       <input type="text" name="date" id="date" placeholder="请选择时间" autocomplete="off" class="layui-input httime">\n' +
                        '    </div>\n' +
                        '  </div>\n' +
                        '  <div class="dialogDiv">\n' +
                        '    <label class="layui-form-label"><span class="inputBtx">*</span>退还金额</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input moneyTh">\n' +
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
                        var isTrue = true
                        var yjMoney = 0
                        var yjMoeny = 0
                        $(obj.data.mustMoney).each(function (i, o) {
                            if (o.moneyType=="保证金"){
                                yjMoney = o.money
                            }
                        })
                        $(obj.data.depositReturns).each(function (n, m) {
                            yjMoeny = yjMoeny + Number(m.money)
                        })
                        var syMoeny = yjMoney - yjMoeny
                        if (Number($(".moneyTh").val()>syMoeny)){
                            layer.msg("退还保证金不能大于实际保证金")
                        }else{
                            if ($(".httime").val() == "") {
                                layer.msg("退还时间不能为空!")
                            } else {
                                if (delKg($(".moneyTh")).length>0){
                                    var data = {
                                        "createdBy": user,
                                        "fkDealId": obj.data.id,
                                        "money": $(".moneyTh").val(),
                                        "returnDate": sjc($(".httime").val())
                                    }

                                    $.ajax({
                                        url: IPzd + '/deposit/return',    //请求的url地址
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
                                                layer.msg("操作成功")
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
                                }else {
                                    layer.msg("退还金额不能为空!")
                                }

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
                        '  <div class="dialogDiv">\n' +
                        '    <label class="layui-form-label">使用用途</label>\n' +
                        '    <div class="layui-input-block">\n' +
                        '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input syType" readonly>\n' +
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
                        $(".syType").val(obj.data.houseResourceDetail[0].resourceUsage)
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
                            $(".dz" + i).val(o.realLocation)
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
                            if (sjc($("#date").val()) < sjc(obj.data.startTime)) {
                                layer.msg("提前结束时间不能小于合同开始时间!")
                            } else {
                                if (sjc($("#date").val()) > sjc(obj.data.endTime)) {
                                    layer.msg("提前结束时间不能大于合同结束时间!")
                                } else {
                                    var data = {
                                        "id": obj.data.id,
                                        "date": sjc($("#date").val())
                                    }
                                    $.ajax({
                                        url: IPzd + '/deal/stop/apply',    //请求的url地址
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
                                                layer.msg("提前结束申请成功!")
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
                            }
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
            // $('.houseFy' + n).children().remove()
            // var options = $("<option value=''>请选择</option>").appendTo('.houseFy' + n)
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


function getManagementUnit() {
    $.ajax({
        url: IPzd + '/hresource/agency?aid=' + (aid == '' ? 0 : aid),    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            if (aid == '') {
                // 没有绑定机构
                var options = $("<option value=''>请选择管理单位</option>").appendTo(".managementUnit")
                req.data.forEach(element => {
                    var option = $("<option value='" + element.id + "'>" + element.name + "</option>").appendTo(".managementUnit")
                });
            } else {
                req.data.forEach(element => {
                    var option = $("<option value='" + element.id + "'>" + element.name + "</option>").appendTo(".managementUnit")
                    $.ajax({
                        url: IPzd + '/hresource/park?aid=' + element.id,    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                        type: "GET",   //请求方式
                        contentType: "application/json;charset=UTF-8",
                        // headers: {"token": sessionStorage.token},
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                            $('<option value="">请选择楼宇</option>').appendTo(".building")
                            req.data.forEach(element => {
                                var option = $("<option value='" + element.id + "'>" + element.name + "</option>").appendTo(".building")
                            });
                            form.render('select')
                        },
                        complete: function () {
                            //请求完成的处理
                        },
                        error: function () {
                            //请求出错处理
                        }
                    });
                });
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
    $(".roomNum option:selected").each(function (n, m) {
        if ($(m).attr("resourcearea") !== undefined) {
            areaArr.push($(m).attr("resourcearea"))
        } else {
            areaArr.push(0)
        }

    })
    $(".sjj").each(function (i, o) {
        if ($(o).val() == "") {
            bzj = bzj + 0
        } else {
            bzj = bzj + parseInt($(o).val()) * areaArr[i]
        }
    })
    bzj = bzj.toFixed(2);
    $(".bzj").val(returnFloat(bzj * 2))
}

function isBzj() {
    var bzj = 0
    var isTrue = true
    var areaArr = []
    $(".houseResource option:selected").each(function (n, m) {
        if ($(m).attr("resourcearea") !== undefined) {
            areaArr.push($(m).attr("resourcearea"))
        } else {
            areaArr.push(0)
        }

    })
    $(".sjj").each(function (i, o) {
        if ($(o).val() == "") {
            bzj = bzj + 0
        } else {
            bzj = bzj + parseInt($(o).val()) * areaArr[i]
        }
    })
    bzj = bzj.toFixed(2);
    if ($(".bzj").val() < bzj * 2) {
        isTrue = false
    }
    return isTrue
}

function isguid() {
    var guidArr = []
    var sjzjArr = []
    var isTrue = true
    $(".sjj").each(function (i, o) {
        sjzjArr.push($(o).val())

    })
    $(".roomNum option:selected").each(function (n, m) {
        guidArr.push($(m).attr("guiderentcharge"))
    })

    $(sjzjArr).each(function (v, b) {
        if (b < guidArr[v]) {
            isTrue = false
        }
    })

    return isTrue

}

/*保留两位小数,位数不够补零*/
function returnFloat(value) {
    var value = Math.round(parseFloat(value) * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
}