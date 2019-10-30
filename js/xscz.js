//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});
layui.use(['laydate', 'table','form'], function () {
    var table = layui.table;
    var laydate = layui.laydate;
    var form = layui.form;


    //第一个实例
    table.render({
        elem: '#tableList'
        , toolbar: '#toolbarDemo'
        , url: '../json/zctj.json' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'htbh', title: '合同编号', sort: true, fixed: 'left', width: 200}
            , {field: 'jytgdw', title: '经营托管单位', sort: true, width: 200}
            , {field: 'gldw', title: '管理单位', width: 160}
            , {field: 'yq', title: '园区/楼宇', width: 160}
            , {field: 'lh', title: '楼号', width: 160}
            , {field: 'lc', title: '楼层', width: 160}
            , {field: 'fh', title: '房号', width: 160}
            , {field: 'czf', title: '出租方', sort: true, width: 200}
            , {field: 'czfmc', title: '承租方名称', sort: true, width: 200}
            , {field: 'czmj', title: '出租面积(㎡)', sort: true, width: 200}
            , {field: 'fkfs', title: '付款方式', sort: true, width: 200}
            , {field: 'htksrq', title: '合同开始日期', sort: true, width: 200}
            , {field: 'htzzrq', title: '合同终止日期', sort: true, width: 200}
            , {field: 'htqdrq', title: '合同签订日期', sort: true, width: 200}
            , {field: 'mzq', title: '免租期', sort: true, width: 200}
            , {field: 'bzj', title: '保证金是否已交', sort: true, width: 200}
            , {field: 'fzksr', title: '付租起始日', sort: true, width: 200}
            , {field: 'htnzj', title: '合同年租金（元）', sort: true, width: 200}
            , {field: 'dj', title: '单价(元/㎡/天）', sort: true, width: 200}
            , {field: 'yzj', title: '原租价', sort: true, width: 200}
            , {field: 'zdj', title: '指导价', sort: true, width: 200}
            , {field: 'xq', title: '新（续）签', sort: true, width: 200}
            , {field: 'bz', title: '备注', sort: true, width: 200}
            , {field: 'bz', title: '审核状态', sort: true, width: 200}
            , {field: 'bz', title: '合同状态', sort: true, width: 200}

            , {fixed: 'right', title: '操作', toolbar: '#barDemo', fixed: 'right', width: 165}
        ]]
    });

    /*添加点击事件*/
    $("body").on("click", ".layui-btn.layui-btn-sm", function () {
        /*生成一个对象
        * 传入标题和内容
        * 生成弹窗
        * */
        var openMes = {
            title: '添加合同',
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
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label"> 管理单位</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="fkManageId">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">房产</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="fkHouseAssetsId">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">承租人</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <select class="fkRenterId">\n' +
                '    <option value="">请选择</option>\n' +
                '     </select>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input area">\n' +
                '    </div>\n' +
                '  </div>\n' + '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">单价</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input unitPrice">\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="dialogDiv">\n' +
                '    <label class="layui-form-label">指导价</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input type="text" name="title" required  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input guidePrice">\n' +
                '    </div>\n' +
                '  </div>\n' +
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
                    "assetsName": $(".cqmz").val(),
                    "assetsLocation": $(".zl").val(),
                    "assetsQueue": $(".symj").val(),
                    "createdBy": 0,
                    "endTime": sjc($("#date").val() + " 23:59:59"),
                    "fkOwnId": $(".co").val(),
                    "landNum": $(".dh").val(),
                    "money": $(".qdjz").val(),
                    "picNum": $(".th").val(),
                    "remark": $(".bz").val(),
                    "selfQueue": $(".dzmj").val(),
                    "shareQueue": $(".ftmj").val(),
                    "useRight": $(".pronature").val(),
                    "useType": $(".usage").val()
                }

                $.ajax({
                    url: IPzd + '/assets/land',    //请求的url地址
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
            },
        }
        /*调用弹窗方法*/
        layerOpen(openMes);
        lay('.httime').each(function(){
            laydate.render({
                elem: this,
                format: 'yyyy年MM月dd日'
            });
        })


        form.render();
    })
})
