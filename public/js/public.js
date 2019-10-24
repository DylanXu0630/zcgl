/*定义接口域名*/
var IPdz = "http://192.168.1.21:18000/uum"
var IPzd = "http://192.168.1.21:14000/estate"
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
                //自定义验证规则

                form.render();
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

/*ajax*/
// function postAjax(obj, data) {
//     $.ajax({
//         url: obj.url,    //请求的url地址
//         dataType: "json",   //返回格式为json
//         async: false,//请求是否异步，默认为异步，这也是ajax重要特性
//         data: JSON.stringify(data),    //参数值
//         type: "POST",   //请求方式
//         contentType: "application/json;charset=UTF-8",
//         // headers: {"token": sessionStorage.token},
//         beforeSend: function () {
//             //请求前的处理
//         },
//         success: function (req) {
//             if (req.status == "200") {
//                 layer.close(indexDig);
//                 layer.msg("添加成功")
//                 obj.reload
//             } else {
//                 layer.msg("添加失败")
//             }
//
//         },
//         complete: function () {
//             //请求完成的处理
//         },
//         error: function () {
//             //请求出错处理
//         }
//     });
// }
//
// function getAjax(obj) {
//     $.ajax({
//         url: obj.url,    //请求的url地址
//         dataType: "json",   //返回格式为json
//         async: false,//请求是否异步，默认为异步，这也是ajax重要特性
//         type: "GET",   //请求方式
//         beforeSend: function () {
//             //请求前的处理
//         },
//         success: function (req) {
//             //请求成功时处理
//         },
//         complete: function () {
//             //请求完成的处理
//         },
//         error: function () {
//             //请求出错处理
//         }
//     });
// }
//
// function upAjax(obj) {
//     $.ajax({
//         url: obj.url,    //请求的url地址
//         dataType: "json",   //返回格式为json
//         async: false,//请求是否异步，默认为异步，这也是ajax重要特性
//         type: "PUT",   //请求方式
//         beforeSend: function () {
//             //请求前的处理
//         },
//         success: function (req) {
//             //请求成功时处理
//         },
//         complete: function () {
//             //请求完成的处理
//         },
//         error: function () {
//             //请求出错处理
//         }
//     });
// }
//
// function delAjax(obj) {
//     $.ajax({
//         url: obj.url,    //请求的url地址
//         dataType: "json",   //返回格式为json
//         async: false,//请求是否异步，默认为异步，这也是ajax重要特性
//         type: "DELETE",   //请求方式
//         beforeSend: function () {
//             //请求前的处理
//         },
//         success: function (req) {
//             //请求成功时处理
//         },
//         complete: function () {
//             //请求完成的处理
//         },
//         error: function () {
//             //请求出错处理
//         }
//     });
// }





