//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});
layui.use(['table', 'laydate', 'form'], function () {
    var table = layui.table;
    var laydate = layui.laydate;
    var form = layui.form

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
    var dataList = []

    $.ajax({
        url: IPzd + '/report/rent/money',    //请求的url地址
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
        // , toolbar: '#toolbarDemo'
        , data: dataList
        , page: false //开启分页
        , cols: [[ //表头
            {type: 'numbers', title: '序号', fixed: 'left', rowspan: 3}
            , {field: 'agency', title: '资产管理单位', sort: true, width: 200, rowspan: 3}
            , {align: 'center', title: '租金收入情况', sort: true, width: 200, colspan: 5}
            , {align: 'center', title: '销售收入情况', sort: true, width: 200, colspan: 2}
            , {align: 'center', title: '收到往年欠租', sort: true, width: 200, colspan: 2}
            , {align: 'center', title: '备注', sort: true, width: 200, rowspan: 3}
            , {align: 'center', title: '考核目标', sort: true, width: 200, rowspan: 3}
        ], [
            {align: 'center', title: '应收租金', sort: true, width: 200, colspan: 2}
            , {align: 'center', title: '到账租金', sort: true, width: 200, colspan: 2}
            , {field: 'rate', title: '到账率', sort: true, width: 200, rowspan: 2}
            , {align: 'center', title: '本年累计应收', sort: true, width: 200, rowspan: 2}
            , {align: 'center', title: '本年累计到账', sort: true, width: 200, rowspan: 2}
            , {field: 'monthArrears', title: '本月', sort: true, width: 200, rowspan: 2}
            , {field: 'yearArrears', title: '本年累计', sort: true, width: 200, rowspan: 2}
        ], [
            {field: 'monthMustMoney', title: '本月', sort: true, width: 200}
            , {field: 'yearMustMoney', title: '本年累计', sort: true, width: 200}
            , {field: 'monthRealMoney', title: '本月', sort: true, width: 200}
            , {field: 'yearRealMoney', title: '本年累计', sort: true, width: 200}
        ]]
    });


    $("#sousuo").on("click", function () {
        form.on('submit(search)', function (data) {
            // getDatas()
            //执行重载
            $.ajax({
                url: IPzd + '/report/rent/money',    //请求的url地址
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