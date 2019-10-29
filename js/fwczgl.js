//JavaScript代码区域

var reload;
layui.use('element', function () {
    var element = layui.element;
});
layui.use(['table', 'laydate', 'form'], function () {
    var table = layui.table;
    var form = layui.form;
    var laydate = layui.laydate;
    form.render();
    //第一个实例
    table.render({
        elem: '#tableList'
        , id: 'idTest'
        , toolbar: '#toolbarDemo'

        // , url: '../json/sysUser.json'
        , url: IPzd + '/assets/house?asc=1' //数据接口
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
            { field: 'id', title: 'ID', width: 160 }
            , { field: 'houseId', title: '房权证证号', width: 200 }
            , { field: 'manageUnit', title: '房屋所有权人', width: 260 }
            , { field: 'shareType', title: '共有情况', width: 160 }
            , { field: 'owner', title: '管理单位', width: 160 }
            , { field: 'parkId', title: '园区/楼宇', width: 160 }
            , { field: 'houseNum', title: '楼号', width: 160 }
            , { field: 'registerTime', title: '登记时间', width: 200, templet: "<div>{{layui.util.toDateString(d.ordertime, 'yyyy.MM.dd HH:mm:ss')}}</div>" }
            , { field: 'hourseType', title: '房屋性质', width: 160 }
            , { field: 'housePlanUse', title: '房产规划用途', width: 160 }
            , { field: 'totalLevel', title: '房屋总层数', width: 160 }
            , { field: 'buildArea', title: '建筑面积㎡', width: 160 }
            , { field: 'realArea', title: '套内建筑面积㎡', width: 160 }
            , { field: 'otherArea', title: '其他', width: 160 }
            , { field: 'landNum', title: '土地地号', width: 160 }
            , { field: 'landGetMethod', title: '土地使用权取得方式', width: 160 }
            , { field: 'landUseYear', title: '土地使用年限', width: 160 }
            , { field: 'remark', title: '附记', width: 160 }
            , { fixed: 'right', title: '操作', toolbar: '#barDemo', width: 220 }
        ]]
    });

    //监听行工具事件
    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: IPzd + '/assets/house/' + obj.data.id,    //请求的url地址
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
                            table.reload('idTest', {
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
                    '    <label class="layui-form-label">房权证证号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入"  autocomplete="off" class="layui-input houseId">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋所有人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input owner">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">共有情况</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="share shareType">\n' +
                    '    <option value="">请选择</option>\n' +
                    '       </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">管理单位</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="co manageUnit">\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">所在园区</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input parkId">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">楼号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input houseNum">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">登记时间</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋性质</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  placeholder="请输入" autocomplete="off" class="layui-input hourseType">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房产规划用途</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <select class="usage ">\n' +
                    '     </select>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">总层数</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input totalLevel">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">建筑面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required|number" placeholder="请输入" autocomplete="off" class="layui-input buildArea">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">套内面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required|number" placeholder="请输入" autocomplete="off" class="layui-input realArea">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">其他面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input otherArea">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input landNum">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地获得方式</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input landGetMethod">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地使用年限</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input landUseYear">\n' +
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
                    getgyqk()
                    getytqk()
                    getcqdw()
                    $(".houseId").val(obj.data.houseId)
                    $(".owner").val(obj.data.owner)
                    $(".shareType").val(obj.data.shareTypeId)
                    $(".manageUnit").val(obj.data.manageUnitId)
                    $(".parkId").val(obj.data.parkId)
                    $(".houseNum").val(obj.data.houseNum)
                    $("#date").val(obj.data.registerTime)
                    $(".hourseType").val(obj.data.hourseType)
                    $(".housePlanUse").val(obj.data.housePlanUse)
                    $(".totalLevel").val(obj.data.totalLevel)
                    $(".buildArea").val(obj.data.buildArea)
                    $(".realArea").val(obj.data.realArea)
                    $(".otherArea").val(obj.data.otherArea)
                    $(".landNum").val(obj.data.landNum)
                    $(".landGetMethod").val(obj.data.landGetMethod)
                    $(".landUseYear").val(obj.data.landUseYear)
                    $(".remark").val(obj.data.remark)
                    laydate.render({
                        elem: '#date',
                        value: obj.data.registerTime,
                        format: 'yyyy年MM月dd日'
                    });

                },
                put: function () {
                    var data = {
                        "id": obj.data.id,
                        "houseId": $(".houseId").val(),
                        "owner": $(".owner").val(),
                        "shareType": $(".shareType").val(),
                        "manageUnit": $(".manageUnit").val(),
                        "parkId": $(".parkId").val(),
                        "houseNum": $(".houseNum").val(),
                        "registerTime": sjc($("#date").val() + " 23:59:59"),
                        "hourseType": $('hourseType').val(),
                        "housePlanUse": 0,
                        "totalLevel": $(".totalLevel").val(),
                        "buildArea": $(".buildArea").val(),
                        "realArea": $(".realArea").val(),
                        "otherArea": $(".otherArea").val(),
                        "landNum": $(".landNum").val(),
                        "landGetMethod": $(".landGetMethod").val(),
                        "landUseYear": $(".landUseYear").val(),
                        "remark": $(".remark").val(),

                    }
                    $.ajax({
                        url: IPzd + '/assets/house',    //请求的url地址
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
                                var demoReload = $('#demoReload');
                                //执行重载
                                table.reload('idTest', {
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

                    /*调用弹窗方法*/
                    layerOpen(openMes);
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
                    '<div><form class="layui-form" action="">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房权证证号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required   class=" layui-input houseId" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋所有人</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input manageUnit" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">共有情况</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input shareType" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">管理单位</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input owner " readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">所在园区</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input parkId" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">楼号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input houseNum" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">登记时间</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input registerTime" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房屋性质</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required   class=" layui-input hourseType" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">房产规划用途</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input housePlanUse"  readonly >\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">总层数</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input totalLevel" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">建筑面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input buildArea" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">套内面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input realArea" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">其他面积</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input otherArea"readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">地号</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input landNum" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地获得方式</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input landGetMethod" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '<div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">土地使用年限</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required    class=" layui-input landUseYear" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">备注</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required      class=" layui-input remark" readonly>\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    $(".houseId").val(obj.data.houseId)
                    $(".owner").val(obj.data.owner)
                    $(".shareType").val(obj.data.shareType)
                    $(".manageUnit").val(obj.data.manageUnit)
                    $(".parkId").val(obj.data.parkId)
                    $(".houseNum").val(obj.data.houseNum)
                    $(".registerTime").val(getMyDate(obj.data.registerTime))
                    $(".hourseType").val(obj.data.hourseType)
                    $(".housePlanUse").val(obj.data.housePlanUse)
                    $(".totalLevel").val(obj.data.totalLevel)
                    $(".buildArea").val(obj.data.buildArea)
                    $(".realArea").val(obj.data.realArea)
                    $(".otherArea").val(obj.data.otherArea)
                    $(".landNum").val(obj.data.landNum)
                    $(".landGetMethod").val(obj.data.landGetMethod)
                    $(".landUseYear").val(obj.data.landUseYear)
                    $(".remark").val(obj.data.remark)
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
                '    <label class="layui-form-label">房权证证号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入"  autocomplete="off" class="layui-input houseId">\n' +
                '    </div>\n' +
                '</div>\n' +

                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房屋所有人</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="co  manageUnit  ">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +

                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">共有情况</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="share  shareType">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">管理单位</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input owner">\n' +
                '    </div>\n' +
                '</div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">所在园区</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input parkId">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">楼号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input houseNum">\n' +
                '    </div>\n' +
                '</div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">登记时间</label>\n' +
                '    <div class="layui-input-block">\n' +
                '       <input type="text" name="date" id="date" autocomplete="off" class="layui-input">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房屋性质</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  placeholder="请输入" autocomplete="off" class="layui-input hourseType">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房产规划用途</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="usage housePlanUse">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">总层数</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input totalLevel">\n' +
                '    </div>\n' +
                '</div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">建筑面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required|number" placeholder="请输入" autocomplete="off" class="layui-input buildArea">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">套内面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required|number" placeholder="请输入" autocomplete="off" class="layui-input realArea">\n' +
                '    </div>\n' +
                '</div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">其他面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="number" placeholder="请输入" autocomplete="off" class="layui-input otherArea">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">地号</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input landNum">\n' +
                '    </div>\n' +
                '</div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">土地获得方式</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input landGetMethod">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="dialogDiv">\n' +
                '    <label class="layui-form-label">土地使用年限</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input landUseYear">\n' +
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

            add: function () {

                var data = {
                    "houseId": $(".houseId").val(),
                    "fkOwnId": $(".owner").val(),
                    "shareType": $(".shareType").val(),
                    "manageUnit": $(".manageUnit").val(),
                    "parkId": $(".parkId").val(),
                    "houseNum": $(".houseNum").val(),
                    "registerTime": sjc($("#date").val() + " 23:59:59"),
                    "hourseType": $('hourseType').val(),
                    "housePlanUse": 0,
                    "totalLevel": $(".totalLevel").val(),
                    "buildArea": $(".buildArea").val(),
                    "realArea": $(".realArea").val(),
                    "otherArea": $(".otherArea").val(),
                    "landNum": $(".landNum").val(),
                    "landGetMethod": $(".landGetMethod").val(),
                    "landUseYear": $(".landUseYear").val(),
                    "remark": $(".remark").val(),
                }
                console.log($(".shareType").find("option:selected").text())
                $.ajax({
                    url: IPzd + '/assets/house',    //请求的url地址
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
                            var demoReload = $('#demoReload');
                            //执行重载
                            table.reload('idTest', {
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
            },
        }
        /*调用弹窗方法*/
        layerOpen(openMes);
        layui.use('laydate', function () {
            var laydate = layui.laydate;
            //自定义验证规则
            //执行一个laydate实例
            laydate.render({
                elem: '#date'
            });
        });
        getgyqk()
        getytqk()
        getcqdw()
        form.render();

    })
})


function getOneUser() {
    $.ajax({
        url: IPzd + '/assets/house',    //请求的url地址
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
                var demoReload = $('#demoReload');
                //执行重载
                table.reload('idTest', {
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
function getMyDate(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen);//最后拼接时间
    return oTime;
};

function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}