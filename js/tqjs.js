//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
});
layui.use(['laydate', 'table', 'form'], function () {
    var table = layui.table;
    var laydate = layui.laydate;
    var form = layui.form;


    //第一个实例
    table.render({
        elem: '#tableList'
        // , toolbar: '#toolbarDemo'
        // , url: '../json/zctj.json' //数据接口
        , url: IPzd + '/deal/all/stop/apply' //数据接口
        , method: "POST"
        , contentType: "application/json"
        , where: {
            "asc": 1,
            "aid": aid,
            "agencyId": "",
            "dealExistStatusCode": "",
            "dealName": "",
            "dealReviewStatusCode": "",
            "dealTypeCode": "",
            "endTime": "",
            "houseUsageId": "",
            "lessorId": "",
            "maxGuideRentCharge": "",
            "maxOriginRentCharge": "",
            "maxRealRentCharge": "",
            "maxRentMonth": "",
            "maxResourceArea": "",
            "minGuideRentCharge": "",
            "minOriginRentCharge": "",
            "minRealRentCharge": "",
            "minRentMonth": "",
            "minResourceArea": "",
            "payTypeCode": "",
            "renterId": "",
            "startTime": ""
        }
        , page: true //开启分页
        , cols: [[ //表头
            {field: 'dealSerial', title: '合同编号'}
            , {field: 'dealType', title: '合同类型'}
            , {field: 'location', title: '座落'}
            , {field: 'renter', title: '承租方'}
            , {field: 'startTime', title: '开始时间'}
            , {field: 'endTime', title: '结束时间'}
            , {field: 'dealReviewStatus', title: '审核状态'}
            , {field: 'dealExistStatus', title: '合同状态'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo', fixed: 'right', width: 200}
        ]], parseData: function (res) {//将原始数据解析成 table 组件所规定的数据
            return {
                "code": 0, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.data.total, //解析数据长度
                "data": res.data.records //解析数据列表
            };
        }
    });


    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'yes') {
            /*通过操作*/
            var openMes = {
                title: '确认提前结束',
                leixing: '编辑',
                maxmin: true,
                btn: ['确定', '取消'],
                area: ['500px', '250px'],

                id: obj.data.id,
                content: '<div style="width: 100%;height: 100%;overflow: hidden;background: #a9a9a9;">' +
                    '<div class="addDig">' +
                    '<div><form class="layui-form" lay-filter="look" action="">\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">收款时间</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '       <input type="text" name="date" id="date" placeholder="请选择时间" autocomplete="off" class="layui-input httime">\n' +
                    '    </div>\n' +
                    '</div>\n' +
                    '  <div class="dialogDiv">\n' +
                    '    <label class="layui-form-label">违约金</label>\n' +
                    '    <div class="layui-input-block">\n' +
                    '      <input type="text" name="title" required onkeyup="clearNoNum(this)"  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input moneyTh">\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '</form></div>' +
                    '</div>' +
                    '</div>',
                look: function () {
                    lay('.httime').each(function () {
                        laydate.render({
                            elem: this,
                            format: 'yyyy年MM月dd日'
                        });
                    })
                },

                put: function () {
                    var data = {
                        "money": $(".moneyTh").val(),
                        "mustDate": sjc(delKg($(".httime"))),
                        "id": obj.data.id
                    }

                    $.ajax({
                        url: IPzd + '/deal/stop/ok', //数据接口
                        dataType: "json",   //返回格式为json
                        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
                        data: JSON.stringify(data),    //参数值
                        type: "PUT",   //请求方式
                        contentType: "application/json;charset=UTF-8",
                        // headers: {"token": sessionStorage.token},
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                            if (req.status == "200") {
                                layer.close(indexDig);
                                layer.msg("操作成功")
                                //执行重载
                                table.reload('tableList');
                            } else {
                                layer.msg("操作失败")
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

            layerOpen(openMes);
        } else if (layEvent == 'detail') {
            if (obj.data.dealTypeCode == 1) {
                var content = '<div id="htall" style="font-size: 20px !important;">\n' +
                    '    <div class="firstPage">\n' +
                    '        <div class="titleBt">蠡园开发区房屋出租审核表（协商出租）</div>\n' +
                    '        <div class="thbh">合同编号：<span class="pageSpan s-bbh"></span></div>\n' +
                    '        <table class="pageTable" border="1" cellspacing="0" style="margin-bottom: 300px;height: 1000px;font-size: 20px;">\n' +
                    '            <tr>\n' +
                    '                <td style="padding:0 10px;">管理中心（或经营托管单位)</td>\n' +
                    '                <td colspan="5" style="padding:0 10px;"><span class="glzx"></span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td style="padding:0 10px;">房屋产权单位</td>\n' +
                    '                <td colspan="5" style="padding:0 10px;"><span class="jf"></span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td style="padding:0 10px;">房产坐落</td>\n' +
                    '                <td colspan="5" style="padding:0 10px;"><span class="fczl"></span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td style="padding:0 10px;">承租人</td>\n' +
                    '                <td colspan="5" style="padding:0 10px;"><span class="yf"></span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td style="padding:0 10px;">合同面积（㎡）</td>\n' +
                    '                <td style="padding:0 10px;"><span class="tbmjjz"></span></td>\n' +
                    '                <td style="padding:0 10px;">合同单价（元/㎡/月）</td>\n' +
                    '                <td style="padding:0 10px;"><span class="sjzj"></span></td>\n' +
                    '                <td style="padding:0 10px;">开发区指导价（元/㎡/月）</td>\n' +
                    '                <td style="padding:0 10px;"><span class="zdj"></span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td style="padding:0 10px;">租赁期限</td>\n' +
                    '                <td style="padding:0 10px;" colspan="3"><span class="synx"></span></td>\n' +
                    '                <td style="padding:0 10px;min-width: 80px;">新签<img src="../images/choose01.svg" class="choose" id="new"></td>\n' +
                    '                <td style="padding:0 10px;min-width: 80px;">续签<img src="../images/choose01.svg" class="choose" id="old"></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td colspan="1" style="padding:0 10px;">免租期限</td>\n' +
                    '                <td colspan="3" style="padding:0 10px;"><span class="mzq"></span></td>\n' +
                    '                <td colspan="1" style="padding:0 10px;">有无优惠条款</td>\n' +
                    '                <td colspan="1" style="padding:0 10px;width: 112px;"><span class="ywyhtj"></span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td colspan="6" style="padding:0 10px;">经办人签字：<span class="qzDate" style="float: right;margin-right: 20px;"><span\n' +
                    '                        class="" style="margin: 0 20px;"></span>年<span class="" style="margin: 0 20px;"></span>月<span class=""\n' +
                    '                                                                                                                      style="margin: 0 20px;"></span>日</span>\n' +
                    '                </td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td colspan="6" style="padding:0 10px;">管理中心负责人签字：<span class="qzDate" style="float: right;margin-right: 20px;"><span\n' +
                    '                        class="" style="margin: 0 20px;"></span>年<span class="" style="margin: 0 20px;"></span>月<span class=""\n' +
                    '                                                                                                                      style="margin: 0 20px;"></span>日</span>\n' +
                    '                </td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td colspan="6" style="padding:0 10px;">资产办审核：<span class="qzDate" style="float: right;margin-right: 20px;"><span\n' +
                    '                        class="" style="margin: 0 20px;"></span>年<span class="" style="margin: 0 20px;"></span>月<span class=""\n' +
                    '                                                                                                                      style="margin: 0 20px;"></span>日</span>\n' +
                    '                </td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td colspan="6" style="padding:0 10px;">财政审计局审核：<span class="qzDate" style="float: right;margin-right: 20px;"><span\n' +
                    '                        class="" style="margin: 0 20px;"></span>年<span class="" style="margin: 0 20px;"></span>月<span class=""\n' +
                    '                                                                                                                      style="margin: 0 20px;"></span>日</span>\n' +
                    '                </td>\n' +
                    '            </tr>\n' +
                    '        </table>\n' +
                    '    </div>\n' +
                    '    <div class="bbh">版本号：<span class="htSpan bt-bbh"></span></div>\n' +
                    '    <h2>房屋租赁合同</h2>\n' +
                    '    <div style="line-height: 37px;">出租方（下称甲方）:<span class="htSpan jf"></span></div>\n' +
                    '    <div style="line-height: 37px;">承租方（下称乙方）:<span class="htSpan yf"></span></div>\n' +
                    '    <div style="overflow: hidden;font-size: 20px;line-height: 30px;">\n' +
                    '        &nbsp;&nbsp;根据《中华人民共和国合同法》及其他有关法律、法规规定，在平等、自愿、协商一致的基础上，甲、乙双方就下列房屋的租赁达成如下协议：<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">一、租赁房屋的坐落、面积、租赁期限</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;甲方将座落于<span class="zlwz"></span>租赁期限为<span\n' +
                    '            class="htSpan zlqx"></span>年，从<span\n' +
                    '            class="htSpan starTime"></span>起至<span class="htSpan endTime"></span>止。<span class="freeZq">其中<span\n' +
                    '            class="htSpan mzq"></span>为房屋装修期,免收房租。</span><br>\n' +
                    '        &nbsp;&nbsp;<span class="title">二、房屋的租金</span><br>\n' +
                    '        &nbsp;&nbsp;（一）租赁房屋每月租金为<span\n' +
                    '            class="htSpan htsjzj"></span>元，乙方先支付租金再使用房屋，乙方应当在下一个周期开始前5天支付租金，第一期租金应当在本合同签署之日同时支付，甲方收到房屋租金和履约保证金后再向乙方交付租赁房屋。<br>\n' +
                    '        &nbsp;&nbsp;（二）乙方按照以下第<span class="htSpan fkfs"></span>项方式支付租金：<br>\n' +
                    '        &nbsp;&nbsp;(1) 以十二个月为一周期支付;(3) 以三个月为一周期支付<br>\n' +
                    '        &nbsp;&nbsp;(2) 以六个月为一周期支付;(4) 以一个月为周期支付<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">三、履约保证金</span><br>\n' +
                    '        &nbsp;&nbsp;（一） 为保证乙方全面履行本合同的义务，乙方同意于本合同签订之日向甲方交纳履约保证金<span class="htSpan bzj"></span>元。甲方无须向乙方支付履约保证金的利息。租赁期内，乙方不得以保证金抵付租金等任何应付费用。该保证金将随本合同规定之租金的增加而相应地追加，乙方应于租金增加后3日内追加保证金；否则，视为乙方对甲方违约。<br>\n' +
                    '        &nbsp;&nbsp;（二）如乙方违反本合同的任何约定或条款，拖欠支付本合同规定的任何款项包括但不限于租金等费用，甲方有权以保证金抵付任何欠款或甲方因乙方的违约而根据本合同规定及法律规定可以要求其承担的任何款项或甲方的任何损失。甲方根据本合同抵扣保证金后，乙方必须于3日内把甲方扣除部分保证金额补足。否则，视为乙方对甲方违约。<br>\n' +
                    '        &nbsp;&nbsp;（三）在不影响上述规定的前提下，在租赁期结束后（或按本合同规定提前终止时）及乙方按合同约定返还该房屋予甲方，该保证金在扣除本合同上条规定之款项后，将由甲方无息退还乙方。但根据本合同约定甲方有权不予退还的除外。<br>\n' +
                    '        &nbsp;&nbsp;（四）如乙方按期续租，则履约保证金不退给乙方，自动转为下一期合同履约保证金。<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">四、房屋交付和装修改造</span><br>\n' +
                    '        &nbsp;&nbsp;（一）甲方应在<span class="htSpan starTime"></span>前按照合同约定，将出租的房屋全部交给乙方使用。<br>\n' +
                    '        &nbsp;&nbsp;（二）乙方未能按期接受房屋的，甲方将通知乙方接受房屋且甲方通知的交房时间即视为乙方接受房屋的时间；同时，乙方接到甲方交房通知后5日内未来交接房屋的，甲方有权解除本合同，甲方已经收取的履约保证金不予返还。<br>\n' +
                    '        &nbsp;&nbsp;（三）租赁期间，如果甲方将财产所有权转移给第三方时，租赁合同对受让方继续有效。如甲方在房屋上设置他项权益的，将不影响乙方对房屋的使用。<br>\n' +
                    '        &nbsp;&nbsp;（四）乙方对租赁房屋进行装修改造前，应当将装修改造方案书面汇报给甲方，经甲方书面同意后，方可对租赁房屋进行装修改造。<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">五、物业费、水电费等费用的支付</span><br>\n' +
                    '        &nbsp;&nbsp;（一）出租房屋的水费、电费、空调使用等费用由乙方支付。<br>\n' +
                    '        &nbsp;&nbsp;（二）乙方同意自房屋交付之日起，将房屋纳入甲方委托的物业管理机构进行统一管理，并遵守有关管理规定，由乙方与物业公司另签协议,乙方自行承担相应的物管费用等所有费用。乙方拒绝签订物业管理协议或合同的，视为乙方对甲方的违约行为。<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">六、合同的解除和补偿</span><br>\n' +
                    '        &nbsp;&nbsp;乙方有下列情形之一的，甲方有权在情形发生后的任何时间，解除本合同，提前收回出租房屋。在此情形下，甲方无需对乙方承担包括但不限于装修费、设备添加费等任何补偿，且甲方已收取的履约保证金不予退还，同时甲方还有权要求乙方再支付相当于6个月租金的违约金；如违约金不足以弥补甲方损失的，乙方还应承担赔偿责任。<br>\n' +
                    '        &nbsp;&nbsp;（一）乙方发生无正当理由拖欠租金、水费、电费、物业费、综合服务管理费等违反、不履行本合同及附件规定之任何条款、条件规定的行为，并在甲方发出书面通知后30天内未予纠正的及具有本合同其他条款约定的违约行为的；<br>\n' +
                    '        &nbsp;&nbsp;（二）乙方未经甲方书面同意擅自改变出租房屋租赁用途的；<br>\n' +
                    '        &nbsp;&nbsp;（三）乙方未经甲方书面同意擅自转租、分租、抵押、出借、转让出租房屋的；<br>\n' +
                    '        &nbsp;&nbsp;（四）因乙方的原因造成出租房屋结构损坏，影响房屋安全、擅自拆改、损坏房屋且不予修复或不予赔偿的；<br>\n' +
                    '        &nbsp;&nbsp;（五）乙方中途擅自退租的；<br>\n' +
                    '        &nbsp;&nbsp;（六）乙方被宣告破产的；<br>\n' +
                    '        &nbsp;&nbsp;（七）乙方利用出租房屋进行违法犯罪活动的；<br>\n' +
                    '        &nbsp;&nbsp;（八）乙方违反第八条第二款的规定，拒不改正的。<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">七、租赁房屋的维护</span><br>\n' +
                    '        &nbsp;&nbsp;租赁期间，租用房屋和配套设施损坏损毁，由乙方负责修缮恢复原状，并需要赔偿甲方的经济损失。<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">八、双方的权利和义务</span><br>\n' +
                    '        &nbsp;&nbsp;（一）甲方有权督促乙方按约使用房屋，保障使用的安全；乙方应当爱护房屋并按时交纳租金，乙方逾期交付房屋租金的，每逾期一日乙方应当向甲方支付应付房屋租金千分之一的滞纳金。<br>\n' +
                    '        &nbsp;&nbsp;（二）乙方对甲方正常的房屋检查给予协助，乙方不得擅自改变房屋结构和用途，不得贮存任何违禁品、易燃品、爆炸品等物，不得擅自转租、转让、转借房屋，不得以承租房屋设定抵押等他项权利，合同终止时主动将房屋和配套设施完好地交还给甲方。<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">九、违约责任：</span><br>\n' +
                    '        &nbsp;&nbsp;(一)乙方的责任<br>\n' +
                    '        &nbsp;&nbsp;1、由于使用不当或者人为因素造成租赁财产损坏、灭失的，负责修复、赔偿。<br>\n' +
                    '        &nbsp;&nbsp;2、乙方擅自拆改房屋、设备、机具等财产，负责赔偿由此而造成的损失。<br>\n' +
                    '        &nbsp;&nbsp;3、无正当理由影响房屋修缮工期，乙方应当赔偿甲方因此而造成的损失。<br>\n' +
                    '        &nbsp;&nbsp;4、合同终止后，乙方逾期不返还租赁房屋的，按照租金的2倍标准支付房屋占用费。<br>\n' +
                    '        &nbsp;&nbsp;(二)甲方的责任<br>\n' +
                    '        &nbsp;&nbsp;1、未按合同规定的面积、标准提供出租房屋及配套设施，负责赔偿由此给乙方造成的损失。<br>\n' +
                    '        &nbsp;&nbsp;2、房屋倒塌，因甲方的责任发生的，赔偿因此而致使乙方遭受的财产损失。<br>\n' +
                    '        &nbsp;&nbsp;本合同其他条款对违约责任另有约定的，将与本第九条的约定同时适用。<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">十、合同解除或终止后的处理</span><br>\n' +
                    '        &nbsp;&nbsp;无论因任何原因导致本合同解除或终止的，乙方必须在5日内搬出属于乙方所有的全部物件，逾期未搬离的，则视为乙方放弃对余物的所有权且甲方或甲方聘请第三方予以清理且因此发生的损失及费用均由乙方承担，乙方对此保证不提出任何异议，并不主张任何权利。<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">十一、优先承租权</span><br>\n' +
                    '        &nbsp;&nbsp;合同期满，如甲方的房屋继续出租，在同等条件下，乙方享有优先权，但乙方必须在三个月之前提出书面续租申请，否则，视为乙方不继续承租。<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">十二、通知条款</span><br>\n' +
                    '        &nbsp;&nbsp;（一）涉及本合同权利义务变化的或其他必要通知，应以书面形式传递，收到方应签收。如无法向另一方直接送达或另一方不予签收，可邮寄送达，邮件寄至本合同记载之地址时，即视为送达。<br>\n' +
                    '        &nbsp;&nbsp;（二）本合同下述的地址、电话为双方通知送达的地址、电话，如果任何一方变更，应在变更后3日内书面通知对方，否则任何一方通知送达前述地址，即视为被送达方收到，由此引发的法律后果由被送达人承担。<br>\n' +
                    '        甲方：<span class="htSpan jf"></span><br>\n' +
                    '        联系人<span class=""></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：<span\n' +
                    '            class=""></span><br>\n' +
                    '        联系地址：<span class=""></span><br>\n' +
                    '        乙方:<span class="htSpan yf"></span><br>\n' +
                    '        联系人<span class=""></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：<span\n' +
                    '            class=""></span><br>\n' +
                    '        联系地址：<span class=""></span><br>\n' +
                    '        &nbsp;&nbsp;（三）本条约定的通知和送达将适用于法院及执法机关的通知和送达即法院和执法机关按照前述联系方式发出通知和送达的即视为有效通知和送达。<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">十三、争议解决条款</span><br>\n' +
                    '        &nbsp;&nbsp;本合同如发生纠纷，甲、乙双方应通过友好协调解决，不能解决时向租赁房屋所在地人民法院起诉。因此所发生的案件受理费、保全费、保全保险费及差旅费和律师费均由败诉方承担。<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">十四、合同的签署和生效</span><br>\n' +
                    '        &nbsp;&nbsp;本合同共三页，为一式四份，甲方执三份、乙方执一份，经双方签字或盖章之日起生效。<br>\n' +
                    '        &nbsp;&nbsp;<span class="title">十五、其它条款:</span><br>\n' +
                    '        <xmp class="qtbz"></xmp>\n' +
                    '        <table style="width: 100%;font-size: 20px;">\n' +
                    '            <tr>\n' +
                    '                <td style="font-size: 20px;">出租方（盖章）:</td>\n' +
                    '                <td style="font-size: 20px;">承租方（盖章）:</td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td style="font-size: 20px;">法定代表人或授权代表（签字）:</td>\n' +
                    '                <td style="font-size: 20px;">法定代表人或授权代表（签字）:</td>\n' +
                    '            </tr>\n' +
                    '        </table>\n' +
                    '        <!--出租方（盖章）: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;承租方（盖章）:<br>-->\n' +
                    '        <!--法定代表人或授权代表（签字）:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;法定代表人或授权代表（签字）:-->\n' +
                    '        <br><br><br><br>\n' +
                    '        <div style="text-align: right;margin-top: 20px">\n' +
                    '            本合同签订时间<span class="" style="margin: 0 20px;margin-left: 60px"></span>年<span class="" style="margin: 0 20px;"></span>月<span class=""\n' +
                    '                                                                                                                                        style="margin: 0 20px;"></span>日\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>'
            } else if (obj.data.dealTypeCode == 2) {
                var content = '<div id="htall" style="font-size: 20px !important;">\n' +
                    '    <div class="titleBt">蠡园开发区房屋出租审核表（一事一议）</div>\n' +
                    '    <div class="thbh">合同编号：<span class="pageSpan s-bbh"></span></div>\n' +
                    '    <table class="pageTable" border="1" cellspacing="0" style="margin-bottom: 300px;height: 1000px">\n' +
                    '        <tr>\n' +
                    '            <td style="padding:0 10px;">管理中心（或经营托管单位)</td>\n' +
                    '            <td colspan="5" style="padding:0 10px;"><span class="glzx"></span></td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td>房屋产权单位</td>\n' +
                    '            <td colspan="5" style="padding:0 10px;"><span class="jf"></span></td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td>房产坐落</td>\n' +
                    '            <td colspan="5" style="padding:0 10px;"><span class="fczl"></span></td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td>承租人</td>\n' +
                    '            <td colspan="5" style="padding:0 10px;"><span class="yf"></span></td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td style="padding:0 10px;">合同面积（㎡）</td>\n' +
                    '            <td style="padding:0 10px;"><span class="mjjz"></span></td>\n' +
                    '            <td style="padding:0 10px;">合同单价（元/㎡/月）</td>\n' +
                    '            <td style="padding:0 10px;"><span class="sjzj"></span></td>\n' +
                    '            <td style="padding:0 10px;">开发区指导价（元/㎡/月）</td>\n' +
                    '            <td style="padding:0 10px;"><span class="zdj"></span></td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td style="padding:0 10px;">租赁期限(月)</td>\n' +
                    '            <td colspan="3" style="padding:0 10px;"><span class="synx"></span></td>\n' +
                    '            <td style="padding:0 10px;">新签/续签</td>\n' +
                    '            <td style="padding:0 10px;"><span class="sfxq"></span></td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td style="padding:0 10px;">免租期限</td>\n' +
                    '            <td colspan="5" style="padding:0 10px;"><span class="mzq"></span></td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td colspan="6" style="padding:0 10px;">优惠条款简要说明：</td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td colspan="2" style="padding:0 10px;">管理中心经办人签字：</td>\n' +
                    '            <td colspan="4" style="padding:0 10px;">负责人签字：<span class="qzDate" style="float: right;margin-right: 20px;"><span class=""\n' +
                    '                                                                                                      style="margin: 0 20px;"></span>年<span\n' +
                    '                    class="" style="margin: 0 20px;"></span>月<span class="" style="margin: 0 20px;"></span>日</span></td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td colspan="6" style="padding:0 10px;">律师审核：<span class="qzDate" style="float: right;margin-right: 20px;"><span\n' +
                    '                    class="" style="margin: 0 20px;"></span>年<span class="" style="margin: 0 20px;"></span>月<span class=""\n' +
                    '                                                                                                                              style="margin: 0 20px;"></span>日</span>\n' +
                    '            </td>\n' +
                    '        </tr>\n' +
                    '                \n' +
                    '        <tr>\n' +
                    '            <td colspan="6" style="padding:0 10px;">资产办审核：<span class="qzDate" style="float: right;margin-right: 20px;"><span\n' +
                    '                    class="" style="margin: 0 20px;"></span>年<span class="" style="margin: 0 20px;"></span>月<span class=""\n' +
                    '                                                                                                                              style="margin: 0 20px;"></span>日</span>\n' +
                    '            </td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td colspan="6" style="padding:0 10px;">财政审计局审核：<span class="qzDate" style="float: right;margin-right: 20px;"><span\n' +
                    '                    class="" style="margin: 0 20px;"></span>年<span class="" style="margin: 0 20px;"></span>月<span class=""\n' +
                    '                                                                                                                              style="margin: 0 20px;"></span>日</span>\n' +
                    '            </td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td colspan="6" style="padding:0 10px;">分管领导审核：<span class="qzDate" style="float: right;margin-right: 20px;"><span\n' +
                    '                    class="" style="margin: 0 20px;"></span>年<span class="" style="margin: 0 20px;"></span>月<span class=""\n' +
                    '                                                                                                                              style="margin: 0 20px;"></span>日</span>\n' +
                    '            </td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td colspan="6" style="padding:0 10px;">主要领导签批： <span class="qzDate" style="float: right;margin-right: 20px;"><span\n' +
                    '                    class="" style="margin: 0 20px;"></span>年<span class="" style="margin: 0 20px;"></span>月<span class=""\n' +
                    '                                                                                                                              style="margin: 0 20px;"></span>日</span>\n' +
                    '            </td>\n' +
                    '        </tr>\n' +
                    '    </table>\n' +
                    '    <div class="bbh">版本号：<span class="htSpan s-bbh"></span></div>\n' +
                    '    <h2>房屋租赁合同</h2>\n' +
                    '    <div style="line-height: 37px;">出租方（下称甲方）:<span class="htSpan jf"></span></div>\n' +
                    '    <div style="line-height: 37px;">承租方（下称乙方）:<span class="htSpan yf"></span></div>\n' +
                    '    <div style="overflow: hidden;font-size: 20px;line-height: 37px;">\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据《中华人民共和国合同法》及其他有关法律、法规规定，在平等、自愿、协商一致的基础上，甲、乙双方就下列房屋的租赁达成如下协议：<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">一、租赁房屋的坐落、面积、租赁期限</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;甲方将座落于<span class="zlwz"></span>，租赁期限为<span\n' +
                    '            class="htSpan synx"></span>个月，从<span\n' +
                    '            class="htSpan starTime"></span>起至<span class="htSpan endTime"></span>止。<span class="freeZq">免租期<span\n' +
                    '            class="htSpan mzq">1</span>个月</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">二、房屋的租金</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）租赁房屋每月租金为<span class="htSpan htsjzj"></span>元，乙方先支付租金再使用房屋，乙方应当在下一个周期开始前5天支付租金，第一期租金应当在本合同签署之日同时支付，甲方收到房屋租金和履约保证金后再向乙方交付租赁房屋。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）乙方按照以下第<span class="htSpan fkfs"></span>项方式支付租金：<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (1) 以十二个月为一周期支付;(3) 以三个月为一周期支付<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (2) 以六个月为一周期支付;(4) 以一个月为周期支付<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">三、履约保证金</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一） 为保证乙方全面履行本合同的义务，乙方同意于本合同签订之日向甲方交纳履约保证金<span class="htSpan bzj"></span>元。甲方无须向乙方支付履约保证金的利息。租赁期内，乙方不得以保证金抵付租金等任何应付费用。该保证金将随本合同规定之租金的增加而相应地追加，乙方应于租金增加后3日内追加保证金；否则，视为乙方对甲方违约。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）如乙方违反本合同的任何约定或条款，拖欠支付本合同规定的任何款项包括但不限于租金等费用，甲方有权以保证金抵付任何欠款或甲方因乙方的违约而根据本合同规定及法律规定可以要求其承担的任何款项或甲方的任何损失。甲方根据本合同抵扣保证金后，乙方必须于3日内把甲方扣除部分保证金额补足。否则，视为乙方对甲方违约。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）在不影响上述规定的前提下，在租赁期结束后（或按本合同规定提前终止时）及乙方按合同约定返还该房屋予甲方，该保证金在扣除本合同上条规定之款项后，将由甲方无息退还乙方。但根据本合同约定甲方有权不予退还的除外。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（四）如乙方按期续租，则履约保证金不退给乙方，自动转为下一期合同履约保证金。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">四、房屋交付和装修改造</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）甲方应在<span class="htSpan starTime"></span>前按照合同约定，将出租的房屋全部交给乙方使用。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）乙方未能按期接受房屋的，甲方将通知乙方接受房屋且甲方通知的交房时间即视为乙方接受房屋的时间；同时，乙方接到甲方交房通知后5日内未来交接房屋的，甲方有权解除本合同，甲方已经收取的履约保证金不予返还。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）租赁期间，如果甲方将财产所有权转移给第三方时，租赁合同对受让方继续有效。如甲方在房屋上设置他项权益的，将不影响乙方对房屋的使用。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（四）乙方对租赁房屋进行装修改造前，应当将装修改造方案书面汇报给甲方，经甲方书面同意后，方可对租赁房屋进行装修改造。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">五、物业费、水电费等费用的支付</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）出租房屋的水费、电费、空调使用等费用由乙方支付。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）乙方同意自房屋交付之日起，将房屋纳入甲方委托的物业管理机构进行统一管理，并遵守有关管理规定，由乙方与物业公司另签协议,乙方自行承担相应的物管费用等所有费用。乙方拒绝签订物业管理协议或合同的，视为乙方对甲方的违约行为。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">六、合同的解除和补偿</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乙方有下列情形之一的，甲方有权在情形发生后的任何时间，解除本合同，提前收回出租房屋。在此情形下，甲方无需对乙方承担包括但不限于装修费、设备添加费等任何补偿，且甲方已收取的履约保证金不予退还，同时甲方还有权要求乙方再支付相当于6个月租金的违约金；如违约金不足以弥补甲方损失的，乙方还应承担赔偿责任。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）乙方发生无正当理由拖欠租金、水费、电费、物业费、综合服务管理费等违反、不履行本合同及附件规定之任何条款、条件规定的行为，并在甲方发出书面通知后30天内未予纠正的及具有本合同其他条款约定的违约行为的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）乙方未经甲方书面同意擅自改变出租房屋租赁用途的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）乙方未经甲方书面同意擅自转租、分租、抵押、出借、转让出租房屋的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（四）因乙方的原因造成出租房屋结构损坏，影响房屋安全、擅自拆改、损坏房屋且不予修复或不予赔偿的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（五）乙方中途擅自退租的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（六）乙方被宣告破产的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（七）乙方利用出租房屋进行违法犯罪活动的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（八）乙方违反第八条第二款的规定，拒不改正的。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">七、租赁房屋的维护</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;租赁期间，租用房屋和配套设施损坏损毁，由乙方负责修缮恢复原状，并需要赔偿甲方的经济损失。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">八、双方的权利和义务</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）甲方有权督促乙方按约使用房屋，保障使用的安全；乙方应当爱护房屋并按时交纳租金，乙方逾期交付房屋租金的，每逾期一日乙方应当向甲方支付应付房屋租金千分之一的滞纳金。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）乙方对甲方正常的房屋检查给予协助，乙方不得擅自改变房屋结构和用途，不得贮存任何违禁品、易燃品、爆炸品等物，不得擅自转租、转让、转借房屋，不得以承租房屋设定抵押等他项权利，合同终止时主动将房屋和配套设施完好地交还给甲方。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">九、违约责任：</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(一)乙方的责任<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、由于使用不当或者人为因素造成租赁财产损坏、灭失的，负责修复、赔偿。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、乙方擅自拆改房屋、设备、机具等财产，负责赔偿由此而造成的损失。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、无正当理由影响房屋修缮工期，乙方应当赔偿甲方因此而造成的损失。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、合同终止后，乙方逾期不返还租赁房屋的，按照租金的2倍标准支付房屋占用费。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(二)甲方的责任<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、未按合同规定的面积、标准提供出租房屋及配套设施，负责赔偿由此给乙方造成的损失。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、房屋倒塌，因甲方的责任发生的，赔偿因此而致使乙方遭受的财产损失。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本合同其他条款对违约责任另有约定的，将与本第九条的约定同时适用。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">十、合同解除或终止后的处理</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无论因任何原因导致本合同解除或终止的，乙方必须在5日内搬出属于乙方所有的全部物件，逾期未搬离的，则视为乙方放弃对余物的所有权且甲方或甲方聘请第三方予以清理且因此发生的损失及费用均由乙方承担，乙方对此保证不提出任何异议，并不主张任何权利。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">十一、优先承租权</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合同期满，如甲方的房屋继续出租，在同等条件下，乙方享有优先权，但乙方必须在三个月之前提出书面续租申请，否则，视为乙方不继续承租。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">十二、通知条款</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）涉及本合同权利义务变化的或其他必要通知，应以书面形式传递，收到方应签收。如无法向另一方直接送达或另一方不予签收，可邮寄送达，邮件寄至本合同记载之地址时，即视为送达。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）本合同下述的地址、电话为双方通知送达的地址、电话，如果任何一方变更，应在变更后3日内书面通知对方，否则任何一方通知送达前述地址，即视为被送达方收到，由此引发的法律后果由被送达人承担。<br>\n' +
                    '        甲方：<span class="htSpan jf"></span><br>\n' +
                    '        联系人<span class=""></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：<span\n' +
                    '            class=""></span><br>\n' +
                    '        联系地址：<span class=""></span><br>\n' +
                    '        乙方:<span class=""></span><br>\n' +
                    '        联系人<span class=""></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：<span\n' +
                    '            class=""></span><br>\n' +
                    '        联系地址：<span class=""></span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）本条约定的通知和送达将适用于法院及执法机关的通知和送达即法院和执法机关按照前述联系方式发出通知和送达的即视为有效通知和送达。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">十三、争议解决条款</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本合同如发生纠纷，甲、乙双方应通过友好协调解决，不能解决时向租赁房屋所在地人民法院起诉。因此所发生的案件受理费、保全费、保全保险费及差旅费和律师费均由败诉方承担。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">十四、合同的签署和生效</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本合同共四页，为一式四份，甲方执三份、乙方执一份，经双方签字或盖章之日起生效。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">十五、其它条款:</span><br>\n' +
                    '        <textarea class="qtbz" readonly></textarea>\n' +
                    '        出租方（盖章）: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;承租方（盖章）:<br>\n' +
                    '        法定代表人或授权代表（签字）:<span class=""></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;法定代表人或授权代表（签字）:<span\n' +
                    '            class=""></span><br>\n' +
                    '        <div style="text-align: right;margin-top: 20px">\n' +
                    '            本合同签订时间<span class="" style="margin: 0 20px;margin-left: 60px"></span>年<span class="" style="margin: 0 20px;"></span>月<span class=""\n' +
                    '                                                                                                                                        style="margin: 0 20px;"></span>日\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>'
            } else if (obj.data.dealTypeCode == 3) {
                var content = '<div id="htall" style="font-size: 20px !important;">\n' +
                    '    <div class="firstPage">\n' +
                    '        <div class="titleBt">蠡园开发区房屋出租审核表（挂靠合同）</div>\n' +
                    '        <div class="thbh">合同编号：<span class="pageSpan s-bbh"></span></div>\n' +
                    '        <table class="pageTable" border="1" cellspacing="0" style="margin-bottom: 300px;height: 1000px">\n' +
                    '            <tr>\n' +
                    '                <td style="padding:0 10px;">出租方(甲方)</td>\n' +
                    '                <td colspan="3"><span class="jf"></span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td style="padding:0 10px;">承租方(乙方)</td>\n' +
                    '                <td colspan="3" style="padding:0 10px;"><span class="yf"></span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td  style="padding:0 10px;">挂靠地址</td>\n' +
                    '                <td colspan="3"  style="padding:0 10px;"><span class="fczl"></span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td  style="padding:0 10px;">租赁期限(月)</td>\n' +
                    '                <td colspan="3"  style="padding:0 10px;"><span class="synx"></span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td  style="padding:0 10px;">合同面积(m²)</td>\n' +
                    '                <td  style="padding:0 10px;"><span class="mjjz"></span></td>\n' +
                    '                <td  style="padding:0 10px;">合同单价(元/m²/月)</td>\n' +
                    '                <td  style="padding:0 10px;"><span class="sjzj"></span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td colspan="4"  style="padding:0 10px;">双方申请：甲乙双方签订上述租赁合同（详见合同原文）,合同内容对甲乙双方没有法律约束力</td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td colspan="2" style="padding:0 10px;">\n' +
                    '                    挂靠原因说明：\n' +
                    '                </td>\n' +
                    '                <td colspan="2"  style="padding:0 10px;">\n' +
                    '                    原租户意见\n' +
                    '                </td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td colspan="2"  style="padding:0 10px;">\n' +
                    '                    甲方：（签章）\n' +
                    '                </td>\n' +
                    '                <td colspan="2"  style="padding:0 10px;">\n' +
                    '                    乙方：（签章）\n' +
                    '                </td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td colspan="4"  style="padding:0 10px;">经办人签字：<span class="qzDate" style="float: right;margin-right: 20px;"><span class="" style="margin: 0 20px;"></span>年<span class="" style="margin: 0 20px;"></span>月<span class="" style="margin: 0 20px;"></span>日</span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td colspan="4"  style="padding:0 10px;">管理中心负责人签字：<span class="qzDate" style="float: right;margin-right: 20px;"><span class="" style="margin: 0 20px;"></span>年<span class="" style="margin: 0 20px;"></span>月<span class="" style="margin: 0 20px;"></span>日</span></td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '                <td colspan="4"  style="padding:0 10px;">财政审计局审核：<span class="qzDate" style="float: right;margin-right: 20px;"><span class="" style="margin: 0 20px;"></span>年<span class="" style="margin: 0 20px;"></span>月<span class="" style="margin: 0 20px;"></span>日</span></td>\n' +
                    '            </tr>\n' +
                    '        </table>\n' +
                    '    </div>\n' +
                    '    <div class="bbh">版本号：<span class="htSpan s-bbh"></span></div>\n' +
                    '    <h2>房屋租赁合同</h2>\n' +
                    '    <div style="line-height: 37px;">出租方（下称甲方）:<span class="htSpan jf"></span></div>\n' +
                    '    <div style="line-height: 37px;">承租方（下称乙方）:<span class="htSpan yf"></span></div>\n' +
                    '    <div style="overflow: hidden;font-size: 20px;line-height: 37px;">\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据《中华人民共和国合同法》及其他有关法律、法规规定，在平等、自愿、协商一致的基础上，甲、乙双方就下列房屋的租赁达成如下协议：<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">一、租赁房屋的坐落、面积、租赁期限</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;甲方将座落于<span class="zlwz"></span>，租赁期限为<span\n' +
                    '            class="htSpan synx"></span>个月，从<span\n' +
                    '            class="htSpan starTime"></span>起至<span class="htSpan endTime"></span>止。<span class="freeZq">免租期<span\n' +
                    '            class="htSpan mzq">1</span>个月</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">二、房屋的租金</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）租赁房屋每月租金为<span class="htSpan htsjzj"></span>元，乙方先支付租金再使用房屋，乙方应当在下一个周期开始前5天支付租金，第一期租金应当在本合同签署之日同时支付，甲方收到房屋租金和履约保证金后再向乙方交付租赁房屋。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）乙方按照以下第<span class="htSpan fkfs"></span>项方式支付租金：<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (1) 以十二个月为一周期支付;(3) 以三个月为一周期支付<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (2) 以六个月为一周期支付;(4) 以一个月为周期支付<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">三、履约保证金</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一） 为保证乙方全面履行本合同的义务，乙方同意于本合同签订之日向甲方交纳履约保证金<span class="htSpan bzj"></span>元。甲方无须向乙方支付履约保证金的利息。租赁期内，乙方不得以保证金抵付租金等任何应付费用。该保证金将随本合同规定之租金的增加而相应地追加，乙方应于租金增加后3日内追加保证金；否则，视为乙方对甲方违约。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）如乙方违反本合同的任何约定或条款，拖欠支付本合同规定的任何款项包括但不限于租金等费用，甲方有权以保证金抵付任何欠款或甲方因乙方的违约而根据本合同规定及法律规定可以要求其承担的任何款项或甲方的任何损失。甲方根据本合同抵扣保证金后，乙方必须于3日内把甲方扣除部分保证金额补足。否则，视为乙方对甲方违约。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）在不影响上述规定的前提下，在租赁期结束后（或按本合同规定提前终止时）及乙方按合同约定返还该房屋予甲方，该保证金在扣除本合同上条规定之款项后，将由甲方无息退还乙方。但根据本合同约定甲方有权不予退还的除外。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（四）如乙方按期续租，则履约保证金不退给乙方，自动转为下一期合同履约保证金。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">四、房屋交付和装修改造</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）甲方应在<span class="htSpan starTime"></span>前按照合同约定，将出租的房屋全部交给乙方使用。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）乙方未能按期接受房屋的，甲方将通知乙方接受房屋且甲方通知的交房时间即视为乙方接受房屋的时间；同时，乙方接到甲方交房通知后5日内未来交接房屋的，甲方有权解除本合同，甲方已经收取的履约保证金不予返还。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）租赁期间，如果甲方将财产所有权转移给第三方时，租赁合同对受让方继续有效。如甲方在房屋上设置他项权益的，将不影响乙方对房屋的使用。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（四）乙方对租赁房屋进行装修改造前，应当将装修改造方案书面汇报给甲方，经甲方书面同意后，方可对租赁房屋进行装修改造。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">五、物业费、水电费等费用的支付</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）出租房屋的水费、电费、空调使用等费用由乙方支付。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）乙方同意自房屋交付之日起，将房屋纳入甲方委托的物业管理机构进行统一管理，并遵守有关管理规定，由乙方与物业公司另签协议,乙方自行承担相应的物管费用等所有费用。乙方拒绝签订物业管理协议或合同的，视为乙方对甲方的违约行为。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">六、合同的解除和补偿</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乙方有下列情形之一的，甲方有权在情形发生后的任何时间，解除本合同，提前收回出租房屋。在此情形下，甲方无需对乙方承担包括但不限于装修费、设备添加费等任何补偿，且甲方已收取的履约保证金不予退还，同时甲方还有权要求乙方再支付相当于6个月租金的违约金；如违约金不足以弥补甲方损失的，乙方还应承担赔偿责任。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）乙方发生无正当理由拖欠租金、水费、电费、物业费、综合服务管理费等违反、不履行本合同及附件规定之任何条款、条件规定的行为，并在甲方发出书面通知后30天内未予纠正的及具有本合同其他条款约定的违约行为的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）乙方未经甲方书面同意擅自改变出租房屋租赁用途的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）乙方未经甲方书面同意擅自转租、分租、抵押、出借、转让出租房屋的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（四）因乙方的原因造成出租房屋结构损坏，影响房屋安全、擅自拆改、损坏房屋且不予修复或不予赔偿的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（五）乙方中途擅自退租的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（六）乙方被宣告破产的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（七）乙方利用出租房屋进行违法犯罪活动的；<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（八）乙方违反第八条第二款的规定，拒不改正的。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">七、租赁房屋的维护</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;租赁期间，租用房屋和配套设施损坏损毁，由乙方负责修缮恢复原状，并需要赔偿甲方的经济损失。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">八、双方的权利和义务</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）甲方有权督促乙方按约使用房屋，保障使用的安全；乙方应当爱护房屋并按时交纳租金，乙方逾期交付房屋租金的，每逾期一日乙方应当向甲方支付应付房屋租金千分之一的滞纳金。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）乙方对甲方正常的房屋检查给予协助，乙方不得擅自改变房屋结构和用途，不得贮存任何违禁品、易燃品、爆炸品等物，不得擅自转租、转让、转借房屋，不得以承租房屋设定抵押等他项权利，合同终止时主动将房屋和配套设施完好地交还给甲方。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">九、违约责任：</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(一)乙方的责任<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、由于使用不当或者人为因素造成租赁财产损坏、灭失的，负责修复、赔偿。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、乙方擅自拆改房屋、设备、机具等财产，负责赔偿由此而造成的损失。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、无正当理由影响房屋修缮工期，乙方应当赔偿甲方因此而造成的损失。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、合同终止后，乙方逾期不返还租赁房屋的，按照租金的2倍标准支付房屋占用费。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(二)甲方的责任<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、未按合同规定的面积、标准提供出租房屋及配套设施，负责赔偿由此给乙方造成的损失。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、房屋倒塌，因甲方的责任发生的，赔偿因此而致使乙方遭受的财产损失。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本合同其他条款对违约责任另有约定的，将与本第九条的约定同时适用。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">十、合同解除或终止后的处理</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无论因任何原因导致本合同解除或终止的，乙方必须在5日内搬出属于乙方所有的全部物件，逾期未搬离的，则视为乙方放弃对余物的所有权且甲方或甲方聘请第三方予以清理且因此发生的损失及费用均由乙方承担，乙方对此保证不提出任何异议，并不主张任何权利。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">十一、优先承租权</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合同期满，如甲方的房屋继续出租，在同等条件下，乙方享有优先权，但乙方必须在三个月之前提出书面续租申请，否则，视为乙方不继续承租。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">十二、通知条款</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）涉及本合同权利义务变化的或其他必要通知，应以书面形式传递，收到方应签收。如无法向另一方直接送达或另一方不予签收，可邮寄送达，邮件寄至本合同记载之地址时，即视为送达。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）本合同下述的地址、电话为双方通知送达的地址、电话，如果任何一方变更，应在变更后3日内书面通知对方，否则任何一方通知送达前述地址，即视为被送达方收到，由此引发的法律后果由被送达人承担。<br>\n' +
                    '        甲方：<span class="htSpan jf"></span><br>\n' +
                    '        联系人<span class=""></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：<span\n' +
                    '            class=""></span><br>\n' +
                    '        联系地址：<span class=""></span><br>\n' +
                    '        乙方:<span class=""></span><br>\n' +
                    '        联系人<span class=""></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：<span\n' +
                    '            class=""></span><br>\n' +
                    '        联系地址：<span class=""></span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）本条约定的通知和送达将适用于法院及执法机关的通知和送达即法院和执法机关按照前述联系方式发出通知和送达的即视为有效通知和送达。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">十三、争议解决条款</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本合同如发生纠纷，甲、乙双方应通过友好协调解决，不能解决时向租赁房屋所在地人民法院起诉。因此所发生的案件受理费、保全费、保全保险费及差旅费和律师费均由败诉方承担。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">十四、合同的签署和生效</span><br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本合同共四页，为一式四份，甲方执三份、乙方执一份，经双方签字或盖章之日起生效。<br>\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="title">十五、其它条款:</span><br>\n' +
                    '        <textarea class="qtbz" readonly></textarea>\n' +
                    '        出租方（盖章）: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
                    '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;承租方（盖章）:<br>\n' +
                    '        法定代表人或授权代表（签字）:<span class=""></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;法定代表人或授权代表（签字）:<span\n' +
                    '            class=""></span><br>\n' +
                    '        <div style="text-align: right;margin-top: 20px">\n' +
                    '            本合同签订时间<span class="" style="margin: 0 20px;margin-left: 60px"></span>年<span class="" style="margin: 0 20px;"></span>月<span class=""\n' +
                    '                                                                                                                                        style="margin: 0 20px;"></span>日\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>'
            }

            /*查看操作*/
            var openMes = {
                title: '查看合同详情',
                area: ['1300px', '650px'],
                leixing: '查看',
                maxmin: true,
                id: obj.data.id,
                content: content,
                look: function () {
                    var heObj = obj.data
                    if (obj.data.dealTypeCode == 1) {
                        $(".fczl").text(heObj.location)
                        $(".s-bbh").text(heObj.dealSerial)
                        $(".yf").text(heObj.renter)
                        $(".jf").text(heObj.lessor)
                        $(".yf").text(heObj.renter)
                        // $(".mjjz").text(heObj.resourceArea)
                        // $(".syyt").text(heObj.houseUsage)
                        $(".synx").text(heObj.startTime + "至" + heObj.endTime)
                        $(".zlqx").text(heObj.rentMonth / 12)
                        $(".starTime").text(heObj.startTime)
                        $(".endTime").text(heObj.endTime)
                        $(".bt-bbh").text(getYear() + " v1.1")
                        if (heObj.extraInfo == "") {
                            $(".qtbz").text("无")
                        } else {
                            $(".qtbz").text(heObj.extraInfo)
                        }

                        // $(".sjzj").text(heObj.realRentCharge)
                        if (heObj.payType == "以三个月为一周期支付") {
                            $(".fkfs").text("3")
                        } else if (heObj.payType == "以十二个月为一周期支付") {
                            $(".fkfs").text("1")
                        } else if (heObj.payType == "以六个月为一周期支付") {
                            $(".fkfs").text("2")
                        } else if (heObj.payType == "以一个月为周期支付") {
                            $(".fkfs").text("4")
                        }
                        if (heObj.freeRentMonth == 0) {
                            $(".freeZq").css("display", "none")
                        } else {
                            $(".mzq").text(heObj.startTime + "至" + heObj.freeEndTime)
                        }

                        // $(".bzj").text(heObj.deposit)
                        // $(".sfxq").text()
                        if (heObj.isNewRent == "新签") {
                            $("#new").attr("src", "../images/choose.svg")
                            $("#old").attr("src", "../images/choose01.svg")
                        } else {
                            $("#old").attr("src", "../images/choose.svg")
                            $("#new").attr("src", "../images/choose01.svg")
                        }
                        $(".zdj").text(heObj.guideRentCharge)

                        $(".ywyhtj").text(heObj.isHaveDiscount)

                        $(heObj.mustMoney).each(function (i, o) {
                            if (o.moneyType == "保证金") {
                                $(".bzj").text(o.money)
                            }
                        })

                        var zlArr = heObj.location.split(",")
                        $("<span class='htSpan zl'></span><span>房屋(</span>建筑面积<span class='htSpan mjjz'></span>平方米)<span>,</span>租给乙方作<span class='htSpan syyt'></span>使用<span><span>,该房屋性质为非住宅。</span>").appendTo(".zlwz")

                        if (heObj.houseResourceDetail.length < 2) {
                            $(".tbmjjz").text(heObj.houseResourceDetail[0].resourceArea)
                            $(".glzx").text(heObj.houseResourceDetail[0].agency)
                            $(".mjjz").text(heObj.houseResourceDetail[0].resourceArea)
                            $(".sjzj").text(heObj.houseResourceDetail[0].realRentCharge)
                            $(".zdj").text(heObj.houseResourceDetail[0].guideRentCharge)
                            $(".htsjzj").text(heObj.houseResourceDetail[0].realRentCharge * heObj.houseResourceDetail[0].resourceArea)
                            $(".syyt").text(heObj.houseResourceDetail[0].resourceUsage)
                            $(".fczl").text(heObj.houseResourceDetail[0].realLocation)
                            $(".zl").text(heObj.houseResourceDetail[0].realLocation)
                            // $(".mpfsjzj").text(heObj.houseResourceDetail[0].rentMoneyPerArea)
                        } else {
                            var glzxArr = []
                            var tbAreaArr = []
                            var heAreaArr = 0
                            var djArr = []
                            var zdjArr = []
                            var yzjArr = []
                            var realArr = []
                            var yt = []
                            var yzj = 0
                            var dzArr = []
                            $(heObj.houseResourceDetail).each(function (i, o) {
                                glzxArr.push(o.agency)
                                tbAreaArr.push(o.resourceArea)
                                djArr.push(o.realRentCharge)
                                zdjArr.push(o.guideRentCharge)
                                yzjArr.push(o.originRentCharge)
                                yt.push(o.resourceUsage)
                                heAreaArr = heAreaArr + o.resourceArea
                                yzj = yzj + o.realRentCharge * o.resourceArea
                                dzArr.push(o.realLocation)
                                // if (i > 0) {
                                //     $("<span>;</span><span class='htSpan zl'>" + zlArr[i] + "</span><span>房屋(</span>建筑面积<span class='htSpan mjjz'>" + heObj.resourceArea + "</span>平方米<span>,</span>租给乙方作<span class='htSpan syyt'>" + o.houseUsage + "</span><span>使用</span><span>,</span><span class='htSpan mpfsjzj'>" + o.realRentCharge + "</span><span>元/m²/月</span><span>,该房屋性质为非住宅)</span>").appendTo(".zlwz")
                                // } else {
                                //     $("<span class='htSpan zl'>" + zlArr[i] + "</span><span>房屋(</span>建筑面积<span class='htSpan mjjz'>" + heObj.resourceArea + "</span>平方米<span>,</span>租给乙方作<span class='htSpan syyt'>" + o.houseUsage + "</span><span>使用</span><span>,</span><span class='htSpan mpfsjzj'>" + o.realRentCharge + "</span><span>元/m²/月</span><span>,该房屋性质为非住宅)</span>").appendTo(".zlwz")
                                // }
                            })

                            var glzx = $.unique(glzxArr).join(";");
                            $(".glzx").text(glzx)
                            var tbArea = tbAreaArr.join(";");
                            $(".tbmjjz").text(tbArea)
                            $(".mjjz").text(heAreaArr)
                            var dj = djArr.join(";");
                            // $(".mpfsjzj").text(dj)
                            $(".sjzj").text(dj)
                            var zdj = zdjArr.join(";");
                            $(".zdj").text(zdj)
                            var sjzj = $.unique(yzjArr).join(";");
                            $(".htsjzj").text(yzj)
                            var oyt = $.unique(yt).join(";");
                            $(".syyt").text(oyt)
                            var dz = $.unique(dzArr).join(";");
                            $(".fczl").text(dz)
                            $(".zl").text(dz)
                        }
                    } else if (obj.data.dealTypeCode == 2) {
                        $(".fczl").text(heObj.location)
                        $(".s-bbh").text(heObj.dealSerial)
                        $(".yf").text(heObj.renter)
                        $(".jf").text(heObj.lessor)
                        $(".mjjz").text(heObj.resourceArea)
                        $(".syyt").text(heObj.houseUsage)
                        $(".synx").text(heObj.rentMonth)
                        $(".starTime").text(heObj.startTime)
                        $(".endTime").text(heObj.endTime)
                        // $(".sjzj").text(heObj.realRentCharge)
                        // $(".fkfs").text(heObj.payType)
                        if (heObj.payType == "一季度一付") {
                            $(".fkfs").text("3")
                        } else if (heObj.payType == "一年一付") {
                            $(".fkfs").text("1")
                        } else if (heObj.payType == "半年一付") {
                            $(".fkfs").text("2")
                        } else if (heObj.payType == "一月一付") {
                            $(".fkfs").text("4")
                        }
                        if (heObj.freeRentMonth == 0) {
                            $(".freeZq").css("display", "none")
                        } else {
                            $(".mzq").text(heObj.freeRentMonth)
                        }
                        // $(".bzj").text(heObj.deposit)
                        $(".sfxq").text(heObj.isNewRent)
                        $(".zdj").text(heObj.guideRentCharge)

                        $(heObj.mustMoney).each(function (i, o) {
                            if (o.moneyType == "保证金") {
                                $(".bzj").text(o.money)
                            }
                        })


                        var zlArr = heObj.location.split(",")
                        if (heObj.houseResourceDetail.length < 2) {
                            $(".glzx").text(heObj.houseResourceDetail[0].agency)
                            $(".mjjz").text(heObj.houseResourceDetail[0].resourceArea)
                            $(".sjzj").text(heObj.houseResourceDetail[0].realRentCharge)
                            $(".zdj").text(heObj.houseResourceDetail[0].guideRentCharge)
                            $("<span class='htSpan zl'>" + zlArr[0] + "</span><span>房屋(</span>建筑面积<span class='htSpan mjjz'>" + heObj.houseResourceDetail[0].resourceArea + "</span>平方米<span>,</span>租给乙方作<span class='htSpan syyt'>" + heObj.houseResourceDetail[0].houseUsage + "</span>使用<span>,</span><span class='htSpan mpfsjzj'>" + heObj.houseResourceDetail[0].realRentCharge + "</span><span>元/m²/月</span><span>,该房屋性质为非住宅)</span>").appendTo(".zlwz")
                            $(".htsjzj").text(heObj.houseResourceDetail[0].realRentCharge)
                            $(".mpfsjzj").text(heObj.houseResourceDetail[0].rentMoneyPerArea)
                        } else {
                            var glzxArr = []
                            var heAreaArr = []
                            var djArr = []
                            var zdjArr = []
                            var yzjArr = []
                            var realArr = []
                            $(heObj.houseResourceDetail).each(function (i, o) {
                                glzxArr.push(o.agency)
                                heAreaArr.push(o.resourceArea)
                                djArr.push(o.rentMoneyPerArea)
                                zdjArr.push(o.guideRentMoneyPerArea)
                                yzjArr.push(o.realRentCharge)

                                if (i > 0) {
                                    $("<span>;</span><span class='htSpan zl'>" + zlArr[i] + "</span><span>房屋(</span>建筑面积<span class='htSpan mjjz'>" + heObj.resourceArea + "</span>平方米<span>,</span>租给乙方作<span class='htSpan syyt'>" + o.houseUsage + "</span><span>使用</span><span>,</span><span class='htSpan mpfsjzj'>" + o.realRentCharge + "</span><span>元/m²/月</span><span>,该房屋性质为非住宅)</span>").appendTo(".zlwz")
                                } else {
                                    $("<span class='htSpan zl'>" + zlArr[i] + "</span><span>房屋(</span>建筑面积<span class='htSpan mjjz'>" + heObj.resourceArea + "</span>平方米<span>,</span>租给乙方作<span class='htSpan syyt'>" + o.houseUsage + "</span><span>使用</span><span>,</span><span class='htSpan mpfsjzj'>" + o.realRentCharge + "</span><span>元/m²/月</span><span>,该房屋性质为非住宅)</span>").appendTo(".zlwz")
                                }
                            })

                            var glzx = $.unique(glzxArr).join(";");
                            $(".glzx").text(glzx)
                            var heArea = $.unique(heAreaArr).join(";");
                            $(".mjjz").text(heArea)
                            var dj = $.unique(djArr).join(";");
                            $(".mpfsjzj").text(dj)
                            $(".sjzj").text(dj)
                            var zdj = $.unique(zdjArr).join(";");
                            $(".zdj").text(zdj)
                            var sjzj = $.unique(yzjArr).join(";");
                            $(".htsjzj").text(sjzj)
                        }
                    } else if (obj.data.dealTypeCode == 3) {
                        $(".fczl").text(heObj.location)
                        $(".s-bbh").text(heObj.dealSerial)
                        $(".yf").text(heObj.renter)
                        $(".jf").text(heObj.lessor)
                        $(".mjjz").text(heObj.resourceArea)
                        $(".syyt").text(heObj.houseUsage)
                        $(".synx").text(heObj.rentMonth)
                        $(".starTime").text(heObj.startTime)
                        $(".endTime").text(heObj.endTime)
                        // $(".sjzj").text(heObj.realRentCharge)
                        // $(".fkfs").text(heObj.payType)
                        if (heObj.payType == "一季度一付") {
                            $(".fkfs").text("3")
                        } else if (heObj.payType == "一年一付") {
                            $(".fkfs").text("1")
                        } else if (heObj.payType == "半年一付") {
                            $(".fkfs").text("2")
                        } else if (heObj.payType == "一月一付") {
                            $(".fkfs").text("4")
                        }
                        if (heObj.freeRentMonth == 0) {
                            $(".freeZq").css("display", "none")
                        } else {
                            $(".mzq").text(heObj.freeRentMonth)
                        }
                        // $(".bzj").text(heObj.deposit)
                        $(".sfxq").text(heObj.isNewRent)
                        $(".zdj").text(heObj.guideRentCharge)
                        $(heObj.mustMoney).each(function (i, o) {
                            if (o.moneyType == "保证金") {
                                $(".bzj").text(o.money)
                            }
                        })

                        var zlArr = heObj.location.split(",")
                        if (heObj.houseResourceDetail.length < 2) {
                            $(".glzx").text(heObj.houseResourceDetail[0].agency)
                            $(".mjjz").text(heObj.houseResourceDetail[0].resourceArea)
                            $(".sjzj").text(heObj.houseResourceDetail[0].realRentCharge)
                            $(".zdj").text(heObj.houseResourceDetail[0].guideRentCharge)
                            $("<span class='htSpan zl'>" + zlArr[0] + "</span><span>房屋(</span>建筑面积<span class='htSpan mjjz'>" + heObj.houseResourceDetail[0].resourceArea + "</span>平方米<span>,</span>租给乙方作<span class='htSpan syyt'>" + heObj.houseResourceDetail[0].houseUsage + "</span>使用<span>,</span><span class='htSpan mpfsjzj'>" + heObj.houseResourceDetail[0].realRentCharge + "</span><span>元/m²/月</span><span>,该房屋性质为非住宅)</span>").appendTo(".zlwz")
                            $(".htsjzj").text(heObj.houseResourceDetail[0].realRentCharge)
                            $(".mpfsjzj").text(heObj.houseResourceDetail[0].rentMoneyPerArea)
                        } else {
                            var glzxArr = []
                            var heAreaArr = []
                            var djArr = []
                            var zdjArr = []
                            var yzjArr = []
                            var realArr = []
                            $(heObj.houseResourceDetail).each(function (i, o) {
                                glzxArr.push(o.agency)
                                heAreaArr.push(o.resourceArea)
                                djArr.push(o.rentMoneyPerArea)
                                zdjArr.push(o.guideRentMoneyPerArea)
                                yzjArr.push(o.realRentCharge)

                                if (i > 0) {
                                    $("<span>;</span><span class='htSpan zl'>" + zlArr[i] + "</span><span>房屋(</span>建筑面积<span class='htSpan mjjz'>" + heObj.resourceArea + "</span>平方米<span>,</span>租给乙方作<span class='htSpan syyt'>" + o.houseUsage + "</span><span>使用</span><span>,</span><span class='htSpan mpfsjzj'>" + o.realRentCharge + "</span><span>元/m²/月</span><span>,该房屋性质为非住宅)</span>").appendTo(".zlwz")
                                } else {
                                    $("<span class='htSpan zl'>" + zlArr[i] + "</span><span>房屋(</span>建筑面积<span class='htSpan mjjz'>" + heObj.resourceArea + "</span>平方米<span>,</span>租给乙方作<span class='htSpan syyt'>" + o.houseUsage + "</span><span>使用</span><span>,</span><span class='htSpan mpfsjzj'>" + o.realRentCharge + "</span><span>元/m²/月</span><span>,该房屋性质为非住宅)</span>").appendTo(".zlwz")
                                }
                            })

                            var glzx = $.unique(glzxArr).join(";");
                            $(".glzx").text(glzx)
                            var heArea = $.unique(heAreaArr).join(";");
                            $(".mjjz").text(heArea)
                            var dj = $.unique(djArr).join(";");
                            $(".mpfsjzj").text(dj)
                            $(".sjzj").text(dj)
                            var zdj = $.unique(zdjArr).join(";");
                            $(".zdj").text(zdj)
                            var sjzj = $.unique(yzjArr).join(";");
                            $(".htsjzj").text(sjzj)
                        }

                    }
                }
            }
            layerLookOpen(openMes);
        }
    });
})


/*获取房产证号*/
function getfy() {
    $.ajax({
        url: IPzd + '/hresource/simple',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".houseFy").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".houseFy")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.resourceName + "</option>").appendTo(".houseFy")
                })
            } else {
                layer.msg("房源产证获取失败")
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

/*获取乙方*/
function getyf() {
    $.ajax({
        url: IPzd + '/renter/all',    //请求的url地址
        dataType: "json",   //返回格式为json
        async: false,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "GET",   //请求方式
        contentType: "application/json;charset=UTF-8",
        // headers: {"token": sessionStorage.token},
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            $(".yf").children().remove()
            var options = $("<option value=''>请选择</option>").appendTo(".yf")
            if (req.status == "200") {
                $(req.data).each(function (i, o) {
                    var option = $("<option value='" + o.id + "'>" + o.name + "</option>").appendTo(".yf")
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
    var date = new Date()
    return date.getFullYear()
}

