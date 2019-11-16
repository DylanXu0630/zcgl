//JavaScript代码区域

layui.use('element', function () {
    var element = layui.element;
});
layui.use(['table', 'laydate', 'form'], function () {
    var table = layui.table;
    var form = layui.form;
    var laydate = layui.laydate;
    sgetcqdw()
    sgetgldw()
    form.render('select');
    //第一个实例
    table.render({
        elem: '#tableList'
        // , toolbar: '#toolbarDemo'
        , url: IPzd + '/assets/house/all?asc=0' //数据接口
        , method: "POST"
        , contentType: "application/json"
        , async: true
        , where: {
            "agencyId": "",
            "location": "",
            "ownerId": "",
        }
        , parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": 0, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.data.total, //解析数据长度
                "data": res.data.records //解析数据列表
            };
        }
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'houseId', title: '房权证证号', width: 200}
            , {field: 'assetsName', title: '产权名称', width: 160}
            , {field: 'owner', title: '房屋所有权人', width: 260}
            , {field: 'houseShare', title: '共有情况', width: 160}
            , {field: 'agency', title: '管理单位', width: 160}
            , {field: 'location', title: '座落', width: 200}
            , {field: 'houseNature', title: '房屋性质', width: 160}
            , {field: 'houseUsage', title: '房产规划用途', width: 160}
            , {field: 'totalLevel', title: '房屋总层数(层)', width: 160}
            , {field: 'buildArea', title: '建筑面积(㎡)', width: 160}
            , {field: 'realArea', title: '套内建筑面积(㎡)', width: 160}
            , {field: 'otherArea', title: '其他面积(㎡)', width: 160}
            , {field: 'landNum', title: '土地地号', width: 160}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', width: 220}
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
            var agencyId = $(".s-gldw").val()
            var formData = data.field;

            //执行重载
            table.reload('tableList', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                , where: {//这里传参  向后台
                    "agencyId": agencyId,
                    "location": location,
                    "ownerId": ownId
                },
                url: IPzd + '/assets/house/all?asc=0' //数据接口
                , method: 'post'
            });
            return false;//false：阻止表单跳转  true：表单跳转
        });


    })


    //监听行工具事件
    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: IPzd + '/assets/house/' + obj.data.id,    //请求的url地址
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
                            table.reload('tableList', {
                                page: {
                                    curr: 1 //重新从第 1 页开始
                                }
                            });
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
                title: '编辑房屋产证',
                leixing: '编辑',
                maxmin: true,
                btn: ['确定', '取消'],
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" lay-filter="look" action="">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>房权证证号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="*为必填项"  autocomplete="off" class="layui-input houseId">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>产权名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="*为必填项" autocomplete="off" class="layui-input assetsName">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>房屋所有权人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="co fkOwnId">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>土地产证</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="fkLandAssetsId">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +

                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">共有情况</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="fwgyqk  shareType">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    // '<div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label">坐落</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input zl">\n' +
                    // '    </div>\n' +
                    // '  </div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">管理单位</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="gldw manageUnit">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">登记时间</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input" placeholder="请选择时间">\n' +
                    '    </div>\n' +
                    '</div>\n' +

                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋性质</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="fcxz hourseType">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +

                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房产规划用途</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="fwghyt housePlanUse">\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>总层数(层)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="number" placeholder="*为必填项" autocomplete="off" class="layui-input totalLevel">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    ' <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>建筑面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required|number" placeholder="*为必填项" autocomplete="off" class="layui-input buildArea">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label"><span class="inputBtx">*</span>套内面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required|number" placeholder="*为必填项" autocomplete="off" class="layui-input realArea">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">其他面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input otherArea">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">座落</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input location">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">备注</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    placeholder="请输入"  autocomplete="off" class="layui-input remark">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    getcqdw()//获取房屋所有人
                    getfwgyqk()//获取房屋共有情况
                    getgldw()//获取管理单位
                    getfcxz()//获取房屋性质
                    getfwghyt()//获取房屋规划用途 
                    getfkLandAssetsId()//获取土地证号

                    $(".assetsName").val(obj.data.assetsName)
                    $(".buildArea").val(obj.data.buildArea)
                    $(".gldw.manageUnit").val(obj.data.agencyId)
                    $(".fcxz.hourseType").val(obj.data.houseNatureId)
                    $(".fwgyqk.shareType").val(obj.data.houseShareId)
                    $(".fwghyt.housePlanUse").val(obj.data.houseUsageId)
                    $(".fkLandAssetsId").val(obj.data.landAssetsId)
                    $(".co.fkOwnId").val(obj.data.fkOwnerId)
                    $(".houseId").val(obj.data.houseId)
                    $(".houseNum").val(obj.data.houseNum)
                    $(".otherArea").val(obj.data.otherArea)
                    $(".realArea").val(obj.data.realArea)
                    $(".remark").val(obj.data.remark)
                    $(".totalLevel").val(obj.data.totalLevel)
                    $("#date").val(obj.data.registerTime)
                    $(".location").val(obj.data.location)
                    laydate.render({
                        elem: '#date',
                        value: obj.data.registerTime,
                        format: 'yyyy年MM月dd日'
                    });

                },
                put: function () {
                    if ($(".houseId").val() !== "") {
                        if ($(".assetsName").val() !== "") {
                            if ($(".co.fkOwnId").val() !== "") {
                                if ($(".fkLandAssetsId").val() !== "") {
                                    if ($(".totalLevel").val() !== "") {
                                        if ($(".buildArea").val() !== "") {
                                            if ($(".realArea").val() !== "") {
                                                if (parseInt($(".buildArea").val()) < parseInt($(".realArea").val())) {
                                                    layer.msg("建筑面积应大于套内面积")
                                                } else {
                                                    var data = {
                                                        "id": obj.data.id,
                                                        "assetsName": $(".assetsName").val(),
                                                        "buildArea": $(".buildArea").val(),
                                                        "createdBy": user,
                                                        "fkAgencyId": $(".gldw.manageUnit").val(),
                                                        "fkHouseNature": $(".fcxz.hourseType").val(),
                                                        "fkHouseShareId": $(".fwgyqk.shareType").val(),
                                                        "fkHouseUsage": $(".fwghyt.housePlanUse").val(),
                                                        "fkLandAssetsId": $(".fkLandAssetsId").val(),
                                                        "fkOwnId": $(".co.fkOwnId").val(),
                                                        "houseId": $(".houseId").val(),
                                                        "otherArea": $(".otherArea").val(),
                                                        "realArea": $(".realArea").val(),
                                                        "remark": $(".remark").val(),
                                                        "totalLevel": $(".totalLevel").val(),
                                                        "registerTime": sjc($("#date").val() + " 00:00:00")
                                                    }
                                                    $.ajax({
                                                        url: IPzd + '/assets/house',    //请求的url地址
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
                                            } else {
                                                layer.msg("套内面积不能为空！")
                                            }
                                        } else {
                                            layer.msg("建筑面积不能为空！")
                                        }
                                    } else {
                                        layer.msg("总楼层不能为空！")
                                    }
                                } else {
                                    layer.msg("土地产证不能为空！")
                                }
                            } else {
                                layer.msg("房屋所有权人不能为空！")
                            }
                        } else {
                            layer.msg("产权名称不能为空！")
                        }
                    } else {
                        layer.msg("房权证证号不能为空！")
                    }


                    /*调用弹窗方法*/

                    layui.use('laydate', function () {
                        var laydate = layui.laydate;
                        //自定义验证规则
                        //执行一个laydate实例
                        laydate.render({
                            elem: '#date'
                        });
                    });
                },

            }

            layerOpen(openMes);
        } else if (layEvent == 'detail') {
            /*查看操作*/
            var openMes = {
                title: '查看房屋产证',
                leixing: '查看',
                maxmin: true,
                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" lay-filter="look" action="">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房权证证号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入"  autocomplete="off" class="layui-input houseId" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">产权名称</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input assetsName" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋所有权人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input co fkOwnId" readonly>\n' +
                    '    </div>\n' +
                    '  </div>\n' +


                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">共有情况</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="fwgyqk  shareType" disabled>\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +

                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">管理单位</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="gldw manageUnit" disabled>\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">所在园区</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input parkId" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">登记时间</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +

                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋性质</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="fcxz hourseType" disabled>\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +

                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房产规划用途</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="fwghyt housePlanUse" disabled>\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">总层数(层)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input totalLevel" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    ' <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">建筑面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required|number" placeholder="请输入" autocomplete="off" class="layui-input buildArea" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">套内面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required|number" placeholder="请输入" autocomplete="off" class="layui-input realArea" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">其他面积(m²)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input otherArea" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">座落</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input location" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地产证</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="fkLandAssetsId" disabled>\n' +
                    '    <option value="">请选择</option>\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input landNum" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    // '<div class="dialogDiv">\n' +
                    // '    <label class="layui-form-label " style="width:84px;padding-left:11px">土地获得方式</label>\n' +
                    // '    <div class="layui-input-block">\n' +
                    // '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input landGetMethod" readonly>\n' +
                    // '    </div>\n' +
                    // '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label ">土地使用年限(年)</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input landUseYear" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">备注</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    placeholder="请输入"  autocomplete="off" class="layui-input remark" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +


                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    getcqdw()//获取房屋所有人
                    getfwgyqk()//获取房屋共有情况
                    getgldw()//获取管理单位
                    getfcxz()//获取房屋性质
                    getfwghyt()//获取房屋规划用途
                    getfkLandAssetsId()//获取土地证号
                    $(".assetsName").val(obj.data.assetsName)
                    $(".buildArea").val(obj.data.buildArea)
                    $(".gldw.manageUnit").val(obj.data.agencyId)
                    $(".fcxz.hourseType").val(obj.data.houseNatureId)
                    $(".fwgyqk.shareType").val(obj.data.houseShareId)
                    $(".fwghyt.housePlanUse").val(obj.data.houseUsageId)
                    $(".fkLandAssetsId").val(obj.data.landAssetsId)
                    $(".co.fkOwnId").val(obj.data.owner)
                    $(".houseId").val(obj.data.houseId)
                    $(".houseNum").val(obj.data.houseNum)
                    $(".otherArea").val(obj.data.otherArea)
                    $(".realArea").val(obj.data.realArea)
                    $(".remark").val(obj.data.remark)
                    $(".totalLevel").val(obj.data.totalLevel)
                    $("#date").val(obj.data.registerTime)
                    $(".landNum").val(obj.data.landNum)
                    $(".landUseYear").val(obj.data.landUseYear)
                    $(".location").val(obj.data.location)
                }
            }
            layerOpen(openMes);
        }
    });

    var reload = table.reload({
        page: {
            curr: 1 //重新从第 1 页开始
        }
    }); //只重载数据


    /*添加点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm", function () {
        /*生成一个对象
        * 传入标题和内容
        * 生成弹窗
        * */

        var openMes = {

            title: '房屋产证添加',
            leixing: '添加',
            maxmin: true,
            btn: ['确定', '取消'],
            content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                '<div class="addDig">' +
                '<div><form class="layui-form" lay-filter="look" action="">\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>房权证证号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="*号为必填项"  autocomplete="off" class="layui-input houseId">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>产权名称</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="*号为必填项" autocomplete="off" class="layui-input assetsName">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>房屋所有权人</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="co fkOwnId">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>土地产证</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="fkLandAssetsId">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +

                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">共有情况</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="fwgyqk  shareType">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                // '<div class="dialogDiv">\n' +
                // '    <label class="layui-form-label">坐落</label>\n' +
                // '    <div class="layui-input-block">\n' +
                // '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input zl">\n' +
                // '    </div>\n' +
                // '  </div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">管理单位</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="gldw manageUnit">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">登记时间</label>\n' +
                '    <div class="layui-input-block">\n' +
                '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input" placeholder="请选择时间">\n' +
                '    </div>\n' +
                '</div>\n' +

                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房屋性质</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="fcxz hourseType">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +

                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房产规划用途</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="fwghyt housePlanUse">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>总层数(层)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required onkeyup="checkNum(this)"  lay-verify="number" placeholder="*号为必填项" autocomplete="off" class="layui-input totalLevel">\n' +
                '    </div>\n' +
                '</div>\n' +
                ' <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>建筑面积(m²)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required|number" placeholder="*号为必填项" autocomplete="off" class="layui-input buildArea">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label"><span class="inputBtx">*</span>套内面积(m²)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required|number" placeholder="*号为必填项" autocomplete="off" class="layui-input realArea">\n' +
                '    </div>\n' +
                '</div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">其他面积(m²)</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input otherArea">\n' +
                '    </div>\n' +
                '</div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">座落</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input location">\n' +
                '    </div>\n' +
                '</div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">备注</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required placeholder="请输入"  autocomplete="off" class="layui-input remark">\n' +
                '    </div>\n' +
                '</div>\n' +
                '</form></div>' +
                '</div>' +
                '</div>',

            add: function () {
                if ($(".houseId").val() !== "") {
                    if ($(".assetsName").val() !== "") {
                        if ($(".co.fkOwnId").val() !== "") {
                            if ($(".fkLandAssetsId").val() !== "") {
                                if ($(".totalLevel").val() !== "") {
                                    if ($(".buildArea").val() !== "") {
                                        if ($(".realArea").val() !== "") {
                                            if (parseInt($(".buildArea").val()) < parseInt($(".realArea").val())) {

                                                layer.msg("建筑面积应大于套内面积")
                                            } else {
                                                var data = {
                                                    "assetsName": $(".assetsName").val(),
                                                    "buildArea": $(".buildArea").val(),
                                                    "createdBy": user,
                                                    "fkAgencyId": $(".gldw.manageUnit").val(),
                                                    "fkHouseNature": $(".fcxz.hourseType").val(),
                                                    "fkHouseShareId": $(".fwgyqk.shareType").val(),
                                                    "fkHouseUsage": $(".fwghyt.housePlanUse").val(),
                                                    "fkLandAssetsId": $(".fkLandAssetsId").val(),
                                                    "fkOwnId": $(".co.fkOwnId").val(),
                                                    "houseId": $(".houseId").val(),
                                                    "otherArea": $(".otherArea").val(),
                                                    "realArea": $(".realArea").val(),
                                                    "remark": $(".remark").val(),
                                                    "totalLevel": $(".totalLevel").val(),
                                                    "registerTime": sjc($("#date").val() + " 00:00:00"),
                                                    "location": $(".location").val()
                                                }
                                                $.ajax({
                                                    url: IPzd + '/assets/house',    //请求的url地址
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
                                            }

                                        } else {
                                            layer.msg("套内面积不能为空！")
                                        }
                                    } else {
                                        layer.msg("建筑面积不能为空！")
                                    }
                                } else {
                                    layer.msg("总楼层不能为空！")
                                }
                            } else {
                                layer.msg("土地产证不能为空！")
                            }
                        } else {
                            layer.msg("房屋所有权人不能为空！")
                        }
                    } else {
                        layer.msg("产权名称不能为空！")
                    }
                } else {
                    layer.msg("房权证证号不能为空！")
                }
            },
        }
        /*调用弹窗方法*/
        layerOpen(openMes);
        layui.use('laydate', function () {
            var laydate = layui.laydate;
            //自定义验证规则
            //执行一个laydate实例
            laydate.render({
                elem: '#date',
                format: 'yyyy年MM月dd日'
            });
        });
        getcqdw()//获取房屋所有人
        getfwgyqk()//获取房屋共有情况
        getgldw()//获取管理单位
        getfcxz()//获取房屋性质
        getfwghyt()//获取房屋规划用途 
        getfkLandAssetsId()//获取土地证号
        form.render();

    })
})


