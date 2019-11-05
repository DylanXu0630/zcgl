/*定义接口域名*/
// var IPdz = "http://172.1.1.95:18000/uum"
// var IPzd = "http://172.1.1.95:14000/estate"
// var login = "http://172.1.1.95:16401/auth"
var IPdz = "http://192.168.1.17:18000/uum"
var IPzd = "http://192.168.1.17:14000/estate"
var login = "http://192.168.1.17:16401/auth"
var indexDig
var user = 0
layui.use('element', function () {
    var element = layui.element;
});

layui.use('layer', function () {
    var layer = layui.layer;

})

/*调用弹框*/
function layerOpen(openMes) {
    indexDig = layer.open({
        type: 1,
        title: openMes.title,
        content: openMes.content,
        btn: openMes.btn,
        area: ['1184px', '660px'],
        maxmin: true,
        success: function () {


            if (openMes.leixing == "查看" || openMes.leixing == "编辑") {
                openMes.look()
            }

            layui.use('form', function () {
                var form = layui.form;
                //自定义验证规则
                form.render();
                form.render('select')
            });
        },
        end: function () {

        },
        btn1: function () {
            if (openMes.leixing == "添加") {
                openMes.add()
            } else if (openMes.leixing == "编辑") {
                openMes.put()
            }
        },
        btn2: function (index, layero) {
            layer.confirm('确定关闭？', {
                btn: ['确定', '取消'] //按钮
            }, function (index) {
                layer.close(index);
                layer.close(indexDig);
            }, function () {

            });
            return false;
        },
        cancel: function (index, layero) {
            layer.confirm('确定关闭？', {
                btn: ['确定', '取消'] //按钮
            }, function (index) {
                layer.close(index);
                layer.close(indexDig);
            }, function () {
            });
            return false;
        }
    });
}




/*获取产权单位*/
function getcqdw() {
    $.ajax({
        url: IPzd + '/dic/assetsco/co1',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".co").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".co")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".co")
                })
            } else {
                layer.msg("产权单位获取失败")
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


/*获条件筛选取产权单位*/
function sgetcqdw() {
    $.ajax({
        url: IPzd + '/dic/assetsco/co1',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".s-co").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".s-co")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".s-co")
                })

            } else {
                layer.msg("产权单位获取失败")
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


/*获取合同状态*/
function gethtzt() {
    $.ajax({
        url: IPzd + '/dic/deal/status/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".htzt").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".htzt")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".htzt")
                })

            } else {
                layer.msg("产权单位获取失败")
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
/*获条件筛选取合同状态*/
function sgethtzt() {
    $.ajax({
        url: IPzd + '/dic/deal/status/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".s-htzt").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".s-htzt")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".s-htzt")
                })

            } else {
                layer.msg("产权单位获取失败")
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




/*获取土地使用类型*/
function gettdsylx() {
    $.ajax({

        url: IPzd + '/dic/land/nature/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".tdsylx").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".tdsylx")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".tdsylx")
                })

            } else {
                layer.msg("产权单位获取失败")
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
/*获条件筛选取土地使用类型*/
function sgettdsylx() {
    $.ajax({
        url: IPzd + '/dic/land/nature/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".s-tdsylx").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".s-tdsylx")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".s-tdsylx")
                })

            } else {
                layer.msg("产权单位获取失败")
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



/*获取土地用途（地类）*/
function gettdyt() {
    $.ajax({
        url: IPzd + '/dic/land/usage/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".tdyt").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".tdyt")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".tdyt")
                })

            } else {
                layer.msg("产权单位获取失败")
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
/*获条件筛选取土地用途（地类）*/
function sgettdyt() {
    $.ajax({
        url: IPzd + '/dic/land/usage/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".s-tdyt").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".s-tdyt")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".s-tdyt")
                })

            } else {
                layer.msg("产权单位获取失败")
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

/*获取房产性质*/
function getfcxz() {
    $.ajax({
        url: IPzd + '/dic/house/nature/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".fcxz").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".fcxz")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".fcxz")
                })
            } else {
                layer.msg("房产性质获取失败")
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
/*获取条件筛选取房产性质*/
function sgetfcxz() {
    $.ajax({
        url: IPzd + '/dic/house/nature/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".s-fcxz").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".s-fcxz")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".s-fcxz")
                })

            } else {
                layer.msg("房产性质获取失败")
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

/*获取房屋共有情况*/
function getfwgyqk() {
    $.ajax({
        url: IPzd + '/dic/house/share/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".fwgyqk").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".fwgyqk")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".fwgyqk")
                })
            } else {
                layer.msg("房屋共有情况获取失败")
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
/*获条件筛选取房屋共有情况*/
function sgetfwgyqk() {
    $.ajax({
        url: IPzd + '/dic/house/share/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".s-fwgyqk").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".s-fwgyqk")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".s-fwgyqk")
                })

            } else {
                layer.msg("房屋共有情况获取失败")
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



/*获取房屋规划用途*/
function getfwghyt() {
    $.ajax({
        url: IPzd + '/dic/house/usage/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".fwghyt").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".fwghyt")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".fwghyt")
                })
            } else {
                layer.msg("房屋规划用途获取失败")
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
/*获条件筛选取房屋规划用途*/
function sgetfwghyt() {
    $.ajax({
        url: IPzd + '/dic/house/usage/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".s-fwghyt").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".s-fwghyt")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".s-fwghyt")
                })

            } else {
                layer.msg("房屋规划用途获取失败")
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



/*获取管理单位*/
function getgldw() {
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
            $(".gldw").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".gldw")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".gldw")
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
/*获条件筛选取管理单位*/
function sgetgldw() {
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
            $(".s-gldwd").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".s-gldw")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".s-gldw")
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

/*获取土地证号*/
function getfkLandAssetsId() {
    $.ajax({


        url: IPzd + '/assets/land/simple',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".fkLandAssetsId").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".fkLandAssetsId")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.assetsName + "</option>").appendTo(".fkLandAssetsId")
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
function getMyDate(str){
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
    return oTime;
};

function getzf(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}

function zDate(str) {
    var str = str;
    var year = str.split('')[0]+str.split('')[1]+str.split('')[2]+str.split('')[3];
    var month = str.split('')[5]+str.split('')[6];
    var day = str.split('')[08]+str.split('')[9];
    var dateStr = year+"-"+month+"-"+day
    return dateStr
}

function sjc(str) {
    var str = zDate(str)
    var date = new Date(str);
    var time = date.getTime();
    return time
}