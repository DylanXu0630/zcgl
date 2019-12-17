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
            "date" : "2019-12-17"
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
            {type: 'numbers', title: '序号', fixed: 'left',rowspan:2}
            , {field: 'agency', title: '资产管理单位', sort: true, width: 100,rowspan:2}
            , {align: 'center', title: '本月新增出租面积', sort: true, width: 200,colspan:4}
            , {align: 'center', title: '本月减少出租面积', sort: true, width: 200,colspan:4}
            , {align: 'center', title: '房产出售、办证情况（累计）', sort: true, width: 200,colspan:2}
        ],[
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
})

layui.use(['form', 'laydate'], function () {
    var form = layui.form;
    var laydate = layui.laydate;
    getgldwcheck()
    form.render()
    lay('.httime').each(function () {
        laydate.render({
            elem: this,
            format: 'yyyy年MM月dd日'
        });
    })

    $("#sousuo").on("click", function () {
        form.on('submit(search)', function (data) {
            getDatas()
            return false;//false：阻止表单跳转  true：表单跳转
        })
    })
    $("#sx").on("click", function () {
        window.reload
    })
})


$(function () {
    getDatas()
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

    if ($("#s-date2").val() !== "") {
        var endStart = $("#s-date2").val()
    } else {
        var endStart = getYear() + "年12月31日"
    }

    if ($("#s-date").val() !== "") {
        var startDate = $("#s-date").val()
    } else {
        var startDate = getYear() + "年01月01日"
    }


    var data = {
        "agency": agency,
        "endStart": sjc(endStart),
        "startDate": sjc(startDate)
    }

    $.ajax({
        url: IPzd + '/report/house_resource',    //请求的url地址
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

            }
            //     $(".month").children().remove()
            //     $(".totalResourceArea").children().remove()
            //     $(".totalResourceYzArea").children().remove()
            //     $(".totalResourceWzArea").children().remove()
            //     $(".totalRentedResourceArea").children().remove()
            //     $(".totalResourceNum").children().remove()
            //     $(".totalRentedResourceNum").children().remove()
            //
            //     var zgldw = $("<td class='bj'>月份</td>").appendTo(".month")
            //     var qfTd = $("<td class='bj'>房源总面积(m²)</td>").appendTo(".totalResourceArea")
            //     var zqtmj = $("<td class='bj'>总有证面积(m²)</td>").appendTo(".totalResourceYzArea")
            //     var zqtmj = $("<td class='bj'>总无证面积(m²)</td>").appendTo(".totalResourceWzArea")
            //     var zfynum = $("<td class='bj'>总出租面积(m²)</td>").appendTo(".totalRentedResourceArea")
            //     var zqtmj = $("<td class='bj'>房源总数</td>").appendTo(".totalResourceNum")
            //     var zjzmj = $("<td class='bj'>总出租个数</td>").appendTo(".totalRentedResourceNum")
            //
            //     var mtd = $("<td class='mouthTD' colspan='" + req.data.length + "'>" + req.data[0].totalResourceArea + "</td>").appendTo(".totalResourceArea")
            //     var ytd = $("<td class='mouthTD' colspan='" + req.data.length + "'>" + req.data[0].totalResourceYzArea + "</td>").appendTo(".totalResourceYzArea")
            //     var std = $("<td class='mouthTD' colspan='" + req.data.length + "'>" + req.data[0].totalResourceWzArea + "</td>").appendTo(".totalResourceWzArea")
            //     var qtd = $("<td class='mouthTD' colspan='" + req.data.length + "' >" + req.data[0].totalResourceNum + "</td>").appendTo(".totalResourceNum")
            //
            //     // $(req.data).each(function (i, o) {
            //     //     var mtd = $("<td class='mouthTD bjTD'>" + o.month + "</td>").appendTo(".month")
            //     //
            //     //     var qtd = $("<td class='mouthTD'>" + o.totalRentedResourceNum + "</td>").appendTo(".totalRentedResourceNum")
            //     //     var qtd = $("<td class='mouthTD'>" + o.totalRentedResourceArea + "</td>").appendTo(".totalRentedResourceArea")
            //     // })
            // } else {
            //     $(".month").children().remove()
            //     $(".totalRentedResourceArea").children().remove()
            //     $(".totalRentedResourceNum").children().remove()
            //     $(".totalResourceArea").children().remove()
            //     $(".totalResourceNum").children().remove()
            //     $(".totalResourceWzArea").children().remove()
            //     $(".totalResourceYzArea").children().remove()
            //
            //
            //     var zgldw = $("<td class='bj'>月份</td>").appendTo(".month")
            //     var qfTd = $("<td class='bj'>房源总面积(m²)</td>").appendTo(".totalResourceArea")
            //     var zqtmj = $("<td class='bj'>总有证面积(m²)</td>").appendTo(".totalResourceYzArea")
            //     var zqtmj = $("<td class='bj'>总无证面积(m²)</td>").appendTo(".totalResourceWzArea")
            //     var zfynum = $("<td class='bj'>总出租面积</td>").appendTo(".totalRentedResourceArea")
            //     var zqtmj = $("<td class='bj'>房源总数</td>").appendTo(".totalResourceNum")
            //     var zjzmj = $("<td class='bj'>总出租个数</td>").appendTo(".totalRentedResourceNum")
            //
            //     var td = $("<td style='text-align: center' rowspan='7'>暂无数据</td>").appendTo(".month")
            // }
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

function getYear() {
    var date = new Date;
    var y = date.getFullYear()
    return y
}