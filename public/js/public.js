/*定义接口域名*/
// var IPdz = "http://172.1.1.95:18000/uum"
// var IPzd = "http://172.1.1.95:14000/estate"
// var login = "http://172.1.1.95:16401/auth"
var IPdz = "http://192.168.1.21:18000/uum"
var IPzd = "http://192.168.1.21:14000/estate"
var login = "http://192.168.1.21:16401/auth"
var indexDig

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


function sjc(str) {
    var date = new Date(str);
    var time = date.getTime() / 1000;
    return time
}


/*获取产权单位*/
function getcqdw() {
    $.ajax({
        url: IPzd + '/dic/co1',    //请求的url地址
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


/*获取产权性质*/
function getcqxz() {
    $.ajax({
        url: IPzd + '/dic/pronature1',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".pronature").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".pronature")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".pronature")
                })
            } else {
                layer.msg("产权性质失败")
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

/*获取产权类型*/
function getcqlx() {
    $.ajax({
        url: IPzd + '/dic/protype1',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".protype").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".protype")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".protype")
                })
            } else {
                layer.msg("产权类型失败")
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

/*获取共有*/
function getgyqk() {
    $.ajax({
        url: IPzd + '/dic/share1',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".share").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".share")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".share")
                })

            } else {
                layer.msg("产权类型失败")
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


/*获取用途*/
function getytqk() {
    $.ajax({
        url: IPzd + '/dic/usage1',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".usage").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".usage")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".usage")
                })
            } else {
                layer.msg("产权类型失败")
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

