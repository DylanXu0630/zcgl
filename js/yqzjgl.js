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
        , url: IPzd + '/deal/all?asc=0' //数据接口
        , method: "POST"
        , contentType: "application/json"
        ,async: true
        , where: {}
        , page: true //开启分页
        , cols: [[ //表头
            // {field: 'dealSerial', title: '合同编号'}
            // , {field: 'dealName', title: '合同名称'},
            {field: 'resourceName', title: '房源'}
            , {field: 'renter', title: '承租方',}
            , {field: 'startTime', title: '开始时间',}
            , {field: 'endTime', title: '结束时间',}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', fixed: 'right', width: 165}
        ]], parseData: function (res) {//将原始数据解析成 table 组件所规定的数据
            return {
                "code": 0, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.data.total, //解析数据长度
                "data": res.data.records //解析数据列表
            };
        }
    });

    /*添加点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm", function () {
        /*生成一个对象
        * 传入标题和内容
        * 生成弹窗
        * */
        var openMes = {
            title: '添加合同',
            area:['1000px','500px'],
            leixing: '添加',
            maxmin: true,
            btn: ['确定', '取消'],
            content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" action="">\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">合同名称</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dealName">\n' +
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
                '    <label class="layui-form-label">房源</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="houseFy">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">承租人（乙方）</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="yf">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                // '  </div>\n' + '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">单价</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input unitPrice">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                // '  <div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">指导价</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input guidePrice">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '  </div>\n' + '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">开始日期</label>\n' +
                '    <div class="layui-input-block">\n' +
                '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input httime">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">终止日期</label>\n' +
                '    <div class="layui-input-block">\n' +
                '       <input type="text" name="date" id="date2" autocomplete="off" class="layui-input httime">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>',
            add: function () {
                var data = {
                    "createdBy": user,
                    "dealName": $(".dealName").val(),
                    "endTime": sjc($("#date2").val() + " 23:59:59"),
                    "fkHouseResourceId": $(".houseFy").val(),
                    "fkRenterId": $(".yf").val(),
                    "startTime": sjc($("#date").val() + " 23:59:59"),
                }

                $.ajax({
                    url: IPzd + '/deal',    //请求的url地址
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
                title: '编辑',
                area:['1000px','300px'],
                leixing: '编辑',
                maxmin: true,
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">合同名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dealName">\n' +
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
                    '    <label class="layui-form-label">房源</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="houseFy">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">承租人（乙方）</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="yf">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    // '  </div>\n' + '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">单价</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input unitPrice">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    // '  <div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">指导价</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input guidePrice">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '  </div>\n' + '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">开始日期</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input httime">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">终止日期</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date2" autocomplete="off" class="layui-input httime">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    getfy()
                    getgldw()
                    getyf()
                    $(".dealName").val(obj.data.dealName)
                    $("#date2").val(obj.data.endTime)
                    $(".houseFy").val(obj.data.resourceId)
                    $(".yf").val(obj.data.renterId)
                    $("#date").val(obj.data.startTime)
                    lay('.httime').each(function () {
                        laydate.render({
                            elem: this,
                            format: 'yyyy年MM月dd日'
                        });
                    })
                },
                put: function () {
                    var data = {
                        "id": obj.data.id,
                        "createdBy": user,
                        "dealName": $(".dealName").val(),
                        "endTime": sjc($("#date2").val() + " 23:59:59"),
                        "fkHouseResourceId": $(".houseFy").val(),
                        "fkRenterId": $(".yf").val(),
                        "startTime": sjc($("#date").val() + " 23:59:59"),
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
                },
            }
            layerOpen(openMes);

        } else if (layEvent == 'detail') {
            /*查看操作*/
            var openMes = {
                title: '查看合同租金详情',
                area:['1300px','700px'],
                leixing: '查看',
                maxmin: true,
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" action="" style="overflow: hidden;">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">合同名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input dealName" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"> 管理单位 </label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input gldw" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">出租人（家方）</label>\n' +
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
                    '    <label class="layui-form-label">付款方式</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input fkfs" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">原价(元/m²/月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input yj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">实际价(元/m²/月)</label>\n' +
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
                    '    <label class="layui-form-label">指导价(元/m²/月)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input zdj" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '  </div>\n' +
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
                    '</form>' +
                    '<div>' +
                    '  <table id="zjTbale">' +
                    '    <tr class="sm">' +
                    '      ' +
                    '    </tr>' +
                    '    <tr class="tableMouth">' +
                    '      ' +
                    '    </tr>' +
                    '    <tr class="ysMoney">' +
                    '      ' +
                    '    </tr>' +
                    '    <tr class="ssMoney">' +
                    '      ' +
                    '    </tr>' +
                    '    <tr class="qkMoney">' +
                    '      ' +
                    '    </tr>' +
                    '  </table>' +
                    '</div>\n' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    var year = getYear()
                    $.ajax({
                        url: IPzd + '/rent/detail/' + obj.data.id ,    //请求的url地址
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
                                $(".dealName").val(req.data.detailDeal.dealName)
                                $(".jf").val(req.data.detailDeal.lessor)
                                $(".czfyf").val(req.data.detailDeal.renter)
                                $(".dz").val(req.data.detailDeal.location)
                                $(".mj").val(req.data.detailDeal.resourceArea)
                                $(".fyyc").val(req.data.detailDeal.houseUsage)
                                $(".gldw").val(req.data.detailDeal.manageUnit)
                                $(".zpqxt").val(req.data.detailDeal.rentMonth)
                                $(".yj").val(req.data.detailDeal.originRentCharge)
                                $(".zdj").val(req.data.detailDeal.guideRentCharge)
                                $(".sjj").val(req.data.detailDeal.realRentCharge)
                                $("#date").val(req.data.detailDeal.startTime)
                                $("#date2").val(req.data.detailDeal.endTime)
                                $(".fkfs").val(req.data.detailDeal.payType)

                                $(".tableMouth").children().remove()
                                $(".ysMoney").children().remove()
                                $(".ssMoney").children().remove()
                                $(".qkMoney").children().remove()
                                var smTd = $("<td>说明</td>").appendTo(".sm")
                                var mouthTd = $("<td>时间</td>").appendTo(".tableMouth")
                                var ysTd = $("<td>应收（元）</td>").appendTo(".ysMoney")
                                var ssTd = $("<td>实收（元）</td>").appendTo(".ssMoney")
                                var qfTd = $("<td>欠费（元）</td>").appendTo(".qkMoney")
                                $(req.data.monthRentCharge).each(function (i, o) {
                                    var mtd = $("<td class='mouthTD'>" + o.rentStatus + "</td>").appendTo(".sm")
                                    var mtd = $("<td class='mouthTD'>" + o.rentMonth + "</td>").appendTo(".tableMouth")
                                    var ytd = $("<td>" + o.mustCharge + "</td>").appendTo(".ysMoney")
                                    var std = $("<td>" + o.actualCharge + "</td>").appendTo(".ssMoney")
                                    var qtd = $("<td>" + o.arrears + "</td>").appendTo(".qkMoney")
                                })
                                // for (var i = 0; i < 12; i++) {
                                //     var mouth = i + 1
                                //     var mtd = $("<td class='mouthTD'>" + mouth + "</td>").appendTo(".tableMouth")
                                //     if (req.data.monthRentCharge[i].mustCharge !== undefined || req.data.monthRentCharge[i].mustCharge !== null) {
                                //         var ytd = $("<td>" + req.data.monthRentCharge[i].mustCharge + "</td>").appendTo(".ysMoney")
                                //     } else {
                                //         var ytd = $("<td>0</td>").appendTo(".ysMoney")
                                //     }
                                //     if (req.data.monthRentCharge[i].monthRentCharge !== undefined || req.data.monthRentCharge[i].mustCharge !== null) {
                                //         var std = $("<td>" + req.data.monthRentCharge[i].actualCharge + "</td>").appendTo(".ssMoney")
                                //     } else {
                                //         var std = $("<td>0</td>").appendTo(".ssMoney")
                                //     }
                                //     if (req.data.monthRentCharge[i].mustCharge !== undefined || req.data.monthRentCharge[i].mustCharge !== null) {
                                //         var qtd = $("<td>" + req.data.monthRentCharge[i].arrears + "</td>").appendTo(".qkMoney")
                                //     } else {
                                //         var qtd = $("<td>0</td>").appendTo(".qkMoney")
                                //     }
                                // }

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
        }
    });
})


/*获取房产证号*/
function getfy() {
    $.ajax({
        url: IPzd + '/hresource/simple',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: true,//请求是否异步，默认为异步，这也是ajax重要特性
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
        async: true,//请求是否异步，默认为异步，这也是ajax重要特性
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

/*获取当前年*/
function getYear() {
    var data = new Date()
    return data.getFullYear()
}
