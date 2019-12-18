//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});

layui.use(['table', 'form', 'laydate'], function () {
    var form = layui.form;
    var table = layui.table;
    var laydate = layui.laydate;

    laydate.render({
        elem: '#test1',
        format: 'yyyy年MM月',
        value: getNOW(),
        type: 'month',
        ready: function (date) {
            $("#layui-laydate1").off('click').on('click', '.laydate-month-list li', function () {
                $("#layui-laydate1").remove();
            });
        },
        change: function (value, dates, edate) {
            $('#test1').val(value);
        }
    });

    var dateList = []

    $.ajax({
        url: IPzd + '/report/rent/house',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "POST",   //请求方式
        data: JSON.stringify({
            "date": sjc(getNOW() + "1日 23:59:59")
        }),
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            dateList = req.data
        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });


    table.render({
        elem: '#tableList'
        , id: 'idTest'
        , data: dateList
        , contentType: "application/json"
        , parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": 0, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.data.total, //解析数据长度
                "data": res.data.records //解析数据列表
            };
        }
        , page: false //开启分页
        , cols: [[ //表头
            {field: 'agency', title: '管理中心', colspan: 3},
            {field: 'houseName', title: '房产名称', colspan: 3},
            {align: 'center', title: '经营性房产面积(m²)', sort: true, rowspan: 6},
            {align: 'center', title: '经营性房产状况(m²)', sort: true, rowspan: 6},
            {field: 'noRentArea', title: '闲置', sort: true, colspan: 3},
            {field: 'selledNoProArea', title: '出售未过户', sort: true, colspan: 3},
        ], [
            {align: 'center', title: '房产证面积', sort: true, rowspan: 3},
            {align: 'center', title: '土地证面积', sort: true, rowspan: 3},
            {align: 'center', title: '出租', sort: true, rowspan: 2},
            {align: 'center', title: '自用', sort: true, rowspan: 4}
        ], [
            {field: 'houseYzArea', title: '有证面积'},
            {field: 'houseWzArea', title: '无证面积'},
            {field: 'houseTotalArea', title: '小计'},
            {field: 'landYzArea', title: '有证面积'},
            {field: 'landWzArea', title: '无证面积'},
            {field: 'landTotalArea', title: '小计'},
            {field: 'normalRentArea', title: '正常出租'},
            {field: 'longRentArea', title: '政策减免长期无收益、一次性收取租金'},
            {field: 'publicRentArea', title: '公共设施'},
            {field: 'garageRentArea', title: '车库'},
            {field: 'totalRentArea', title: '小计'}
        ]]
    });

    $("#sousuo").on("click", function () {
        form.on('submit(search)', function (data) {
            var newData = []
            $.ajax({
                url: IPzd + '/report/rent/house',    //请求的url地址
                dataType: "json",   //返回格式为json
                async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                type: "POST",   //请求方式
                data: JSON.stringify({
                    "date": sjc($("#test1").val() + "1日 23:59:59")
                }),
                contentType: "application/json;charset=UTF-8",
                // headers: {"token": sessionStorage.token},
                beforeSend: function () {
                    //请求前的处理
                },
                success: function (req) {
                    newData = req.data
                },
                complete: function () {
                    //请求完成的处理
                },
                error: function () {
                    //请求出错处理
                }
            });


            table.reload('tableList', {
                data: newData
            });
            return false;//false：阻止表单跳转  true：表单跳转
        })

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