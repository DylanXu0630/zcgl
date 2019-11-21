//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});
layui.use(['laydate', 'table', 'form'], function () {
    var table = layui.table;
    var laydate = layui.laydate;
    var form = layui.form;


    //第一个实例
    table.render({
        elem: '#tableList'
        // , toolbar: '#toolbarDemo'
        // , url: '../json/zctj.json' //数据接口
        , url: IPzd + '/deal/all/noreview' //数据接口
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
            , {field: 'resourceName', title: '房源'}
            , {field: 'renter', title: '承租方',}
            , {field: 'startTime', title: '开始时间',}
            , {field: 'endTime', title: '结束时间',}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', fixed: 'right', width: 200}
        ]], parseData: function (res) {//将原始数据解析成 table 组件所规定的数据
            return {
                "code": 0, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.data.total, //解析数据长度
                "data": res.data.records //解析数据列表
            };
        }
    });

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
                    url: IPzd + '/deal/all/noreview' //数据接口
                    , method: 'post'
                });
            }
            return false;//false：阻止表单跳转  true：表单跳转
        });


    })

    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'yes') {
            /*通过操作*/
            layer.confirm('确定审核通过？', function (index) {
                $.ajax({
                    url: IPzd + '/deal/review/' + obj.data.id+'/2',    //请求的url地址
                    dataType: "json",   //返回格式为json
                    async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                    type: "PUT",   //请求方式
                    contentType: "application/json;charset=UTF-8",
                    // headers: {"token": sessionStorage.token},
                    beforeSend: function () {
                        //请求前的处理
                    },
                    success: function (req) {
                        if (req.status == "200") {
                            layer.close(indexDig);
                            layer.msg("操作成功！")
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
                layer.close(index);
            });

        } else if (layEvent === 'no') {
            /*不通过操作*/
            layer.confirm('确定审核不通过？', function (index) {
                $.ajax({
                    url: IPzd + '/deal/review/' + obj.data.id+'/3',    //请求的url地址
                    dataType: "json",   //返回格式为json
                    async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                    type: "PUT",   //请求方式
                    contentType: "application/json;charset=UTF-8",
                    // headers: {"token": sessionStorage.token},
                    beforeSend: function () {
                        //请求前的处理
                    },
                    success: function (req) {
                        if (req.status == "200") {
                            layer.close(indexDig);
                            layer.msg("操作成功！")
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
                layer.close(index);
            });

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
        }
    });
})


/*获取房产证号*/
function getfy() {
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
                layer.msg("房源产证获取失败")
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
                layer.msg("管理单位获取失败")
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

