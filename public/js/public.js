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


function sjc(str) {
    var date = new Date(str);
    var time = date.getTime() / 1000;
    return time
}

/*获取产权性质*/
function getcqxz() {

}


