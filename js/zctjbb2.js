//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});

layui.use('table', function () {
    var table = layui.table;

    var dataList = []

    $.ajax({
        url: IPzd + '/report/rent/area',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "POST",   //请求方式
        data: JSON.stringify({
            "date": sjc(getNOW() + "1日 23:59:59")
        }),
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            dataList = req.data
        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });

    //第一个实例
    table.render({
        elem: '#tableList'
        , data: dataList
        , page: false //开启分页
        , cols: [[ //表头
            {type: 'numbers', title: '序号', fixed: 'left', rowspan: 2}
            , {field: 'agency', title: '资产管理单位', sort: true, width: 100, rowspan: 2}
            , {align: 'center', title: '本月新增出租面积', sort: true, width: 200, colspan: 4}
            , {align: 'center', title: '本月减少出租面积', sort: true, width: 200, colspan: 4}
            , {align: 'center', title: '房产出售、办证情况（累计）', sort: true, width: 200, colspan: 2}
        ], [
            {field: 'oldRentArea', title: '其中：续租', sort: true, width: 200}
            , {field: 'newRentArea', title: '新增出租', sort: true, width: 200}
            , {field: 'totalMonthRentArea', title: '小计', sort: true, width: 200}
            , {field: 'totalYearRentArea', title: '本年新增出租累计', sort: true, width: 200}
            , {field: 'expireReduceRentArea', title: '合同到期退租', sort: true, width: 200}
            , {field: 'aheadReduceRentArea', title: '合同未到期退租', sort: true, width: 200}
            , {field: 'totalMonthReduceRentArea', title: '小计', sort: true, width: 200}
            , {field: 'totalYearReduceRentArea', title: '本年退租累计', sort: true, width: 200}
            , {field: 'totalSellNoPro', title: '出售未办房产面积', sort: true, width: 200}
            , {field: 'totalSellHasPro', title: '已办理过户面积', sort: true, width: 200}
        ]]
    });

    layui.use(['form', 'laydate'], function () {
        var form = layui.form;
        var laydate = layui.laydate;
        getgldwcheck()
        form.render()
        laydate.render({
            elem: '.httime',
            format: 'yyyy年MM月',
            value: getNOW(),
            type: 'month',
            ready: function (date) {
                $("#layui-laydate1").off('click').on('click', '.laydate-month-list li', function () {
                    $("#layui-laydate1").remove();
                });
            },
            change: function (value, dates, edate) {
                $('.httime').val(value);
            }
        });

        $("#sousuo").on("click", function () {
            form.on('submit(search)', function (data) {
                // getDatas()
                //执行重载
                $.ajax({
                    url: IPzd + '/report/rent/area',    //请求的url地址
                    dataType: "json",   //返回格式为json
                    async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                    type: "POST",   //请求方式
                    data: JSON.stringify({
                        "date": sjc($('#s-date').val() + "1日 23:59:59")
                    }),
                    contentType: "application/json;charset=UTF-8",
                    // headers: {"token": sessionStorage.token},
                    beforeSend: function () {
                        //请求前的处理
                    },
                    success: function (req) {
                        dataList = req.data
                    },
                    complete: function () {
                        //请求完成的处理
                    },
                    error: function () {
                        //请求出错处理
                    }
                });

                table.reload('tableList', {
                    data: dataList
                });
                return false;//false：阻止表单跳转  true：表单跳转
            })
        })
        $("#sx").on("click", function () {
            window.reload
        })
    })
})


// $(function () {
//     getDatas()
// })


function getgldwcheck() {
    $.ajax({
        url: IPzd + '/dic/agency/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $("#gldwCheck").children().remove()
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<input type='checkbox' name='gldw' id='" + o.id + "' title='" + o.name + "' class='mangit'>").appendTo("#gldwCheck")
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


function getNOW() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    var currentdate = year + "年" + month + "月";
    return currentdate;
}