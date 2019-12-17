//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});

layui.use(['table', 'form'], function () {
    var form = layui.form;
    var table = layui.table;
    form.render()

    var dateList = []

    $.ajax({
        url: IPzd + '/report/rent/area',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "POST",   //请求方式
        data: JSON.stringify({
            "date" : ""
        }),
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            dateList = req.data
        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
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
            {field: 'agency', title: '管理中心'}
        ]]
    });

    $("#sousuo").on("click", function () {
        form.on('submit(search)', function (data) {
            getDatas()
            return false;//false：阻止表单跳转  true：表单跳转
        })

    })
})


$(function () {
    // getDatas()
})

function getDatas() {
    var agency = []
    if ($(".mangit").length !== 0) {
        agency = []
        $(".mangit").each(function (i, o) {
            if ($(this).is(':checked')) {
                agency.push($(o).attr("id"))
            }
        })
    } else {
        agency = []
    }

    var data = {
        "agency": agency,
        "endStart": "",
        "startDate": ""
    }

    $.ajax({
        url: IPzd + '/report/house_assets',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "POST",   //请求方式
        data: JSON.stringify(data),
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            if (req.status == 200) {
                $(".agencyName").children().remove()
                $(".houseAssetsNum").children().remove()
                $(".totalBuildArea").children().remove()
                $(".totalOtherArea").children().remove()
                $(".totalRealArea").children().remove()

                var zgldw = $("<td class='bj'>管理单位</td>").appendTo(".agencyName")
                var zfynum = $("<td class='bj'>总房产数</td>").appendTo(".houseAssetsNum")
                var zjzmj = $("<td class='bj'>总建筑面积(m²)</td>").appendTo(".totalBuildArea")
                var qfTd = $("<td class='bj'>总套内面积(m²)</td>").appendTo(".totalRealArea")
                var zqtmj = $("<td class='bj'>总其他面积(m²)</td>").appendTo(".totalOtherArea")

                $(req.data).each(function (i, o) {
                    var mtd = $("<td class='mouthTD bjTD'>" + o.agencyName + "</td>").appendTo(".agencyName")
                    var mtd = $("<td class='mouthTD'>" + o.houseAssetsNum + "</td>").appendTo(".houseAssetsNum")
                    var ytd = $("<td class='mouthTD'>" + o.totalBuildArea + "</td>").appendTo(".totalBuildArea")
                    var std = $("<td class='mouthTD'>" + o.totalRealArea + "</td>").appendTo(".totalRealArea")
                    var qtd = $("<td class='mouthTD'>" + o.totalOtherArea + "</td>").appendTo(".totalOtherArea")
                })
            } else {
                $(".agencyName").children().remove()
                $(".houseAssetsNum").children().remove()
                $(".totalBuildArea").children().remove()
                $(".totalOtherArea").children().remove()
                $(".totalRealArea").children().remove()

                var zgldw = $("<td class='bj'>管理单位</td>").appendTo(".agencyName")
                var zfynum = $("<td class='bj'>总房产数</td>").appendTo(".houseAssetsNum")
                var zjzmj = $("<td class='bj'>总建筑面积(m²)</td>").appendTo(".totalBuildArea")
                var qfTd = $("<td class='bj'>总套内面积(m²)</td>").appendTo(".totalRealArea")
                var zqtmj = $("<td class='bj'>总其他面积(m²)</td>").appendTo(".totalOtherArea")

                var td = $("<td style='text-align: center' rowspan='5'>暂无数据</td>").appendTo(".agencyName")
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
