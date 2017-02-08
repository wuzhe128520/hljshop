/*常用函数*/
var HLJcomm = {
    //字符串对象
    StringBuilder: function () {
        //实体对象
        var StringBuilderObj = function (args) {
            this._buffers = [];
            this._length = 0;
            this._splitChar = args.length > 0 ? args[args.length - 1] : '';
            if (args.length > 0) {
                for (var i = 0, iLen = args.length - 1; i < iLen; i++) {
                    this.Append(args[i]);
                }
            }
        };
        //append方法
        StringBuilderObj.prototype.Append = function (str) {
            this._length += str.length;
            this._buffers[this._buffers.length] = str;
        };

        //向对象中添加字符串
        //参数：一个字符串值
        StringBuilderObj.prototype.Add = StringBuilderObj.prototype.append;

        //向对象附加格式化的字符串
        //参数：参数一是预格式化的字符串，如：'{0} {1} {2}'
        //格式参数可以是数组，或对应长度的arguments,
        StringBuilderObj.prototype.AppendFormat = function () {
            if (arguments.length > 1) {
                var TString = arguments[0];
                if (arguments[1] instanceof Array) {
                    for (var i = 0, iLen = arguments[1].length; i < iLen; i++) {
                        var jIndex = i;
                        var re = eval("/\\{" + jIndex + "\\}/g;");
                        TString = TString.replace(re, arguments[1][i]);
                    }
                }
                else {
                    for (var i = 1, iLen = arguments.length; i < iLen; i++) {
                        var jIndex = i - 1;
                        var re = eval("/\\{" + jIndex + "\\}/g;");
                        TString = TString.replace(re, arguments[i]);
                    }
                }
                this.Append(TString);
            }
            else if (arguments.length == 1) {
                this.Append(arguments[0]);
            }
        };

        //字符串长度（相当于ToString()后输出的字符串长度
        StringBuilderObj.prototype.Length = function () {
            if (this._splitChar.length > 0 && (!this.IsEmpty())) {
                return this._length + (this._splitChar.length * (this._buffers.length - 1));
            }
            else {
                return this._length;
            }
        };

        //字符串是否为空
        StringBuilderObj.prototype.IsEmpty = function () {
            return this._buffers.length <= 0;
        };

        //清空
        StringBuilderObj.prototype.Clear = function () {
            this._buffers = [];
            this._length = 0;
        };

        //输出
        //参数：可以指定一个字符串（或单个字符），作为字符串拼接的分隔符
        StringBuilderObj.prototype.ToString = function () {
            if (arguments.length == 1) {
                return this._buffers.join(arguments[1]);
            }
            else {
                return this._buffers.join(this._splitChar);
            }
        };

        return new StringBuilderObj(arguments);
    },

    //时间格式转换
    DateFormat: function (dateObj, format) {
        try {
            /*
             * eg:format="YYYY-MM-dd hh:mm:ss";
             */
            var o = {
                "Y+": dateObj.getFullYear(),
                "M+": dateObj.getMonth() + 1,  //month
                "d+": dateObj.getDate(),     //day
                "h+": dateObj.getHours(),    //hour
                "m+": dateObj.getMinutes(),  //minute
                "s+": dateObj.getSeconds(), //second
                "q+": Math.floor((dateObj.getMonth() + 3) / 3),  //quarter
                "S": dateObj.getMilliseconds() //millisecond
            }

            if (/(Y+)/.test(format)) {
                format = format.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        } catch (e) {
            return "";
        }
    },
    /**
     * 时间字符串转时间对象
     */
    strToDate:function(dateStr){
        var intArray=new Array();
        var patt = new RegExp("\\d+","g");
        var result;
        while ((result = patt.exec(dateStr)) != null)  {
            intArray.push(result);
        }

        if(intArray.length>=2){
            var month=intArray[1];
            intArray[1]=parseInt(month,10)-1;
            return eval("new Date("+intArray.join(",")+")");
        }
        return null;
    },

    /*某个字符串中是否包含另一个字符串或者包含另一个字符串以特殊字符分割的字符串，注意英文为英文单词
     * mainStr 为主字符串
     * strContained 被包含的字符串
     * splitMark 被包含字符串的分隔符，如果没有分隔符可以为空字符串
     * 返回实体对象{"isContain":true,"msg":""},true为都包含否则不全部包含或者全部不包含
     * */
    containsStr:function(mainStr,strContained,splitMark){
        var isContain=true;
        var msg="";
        var strArray=new Array();
        if(strContained==""){
            return {"isContain":false,"msg":"0"};
        }
        if(splitMark!=""){
            strArray=strContained.split(splitMark);
        }else{
            strArray.push(strContained);
        }

        for(var i=0;i<strArray.length;i++){
            //中文
            if(/[\u4e00-\u9fa5]+/g.test(strArray[i])){
                if(mainStr.indexOf(strArray[i])==-1){
                    isContain=false;
                    msg+=strArray[i]+"\r\n";
                }
            }else{
                //英文单词
                var regex=new RegExp("\\b"+strArray[i]+"\\b","g");
                if(!regex.test(mainStr)){
                    isContain=false;
                    msg+=strArray[i]+"\r\n";
                }
            }
        }

        return {"isContain":isContain,"msg":msg};
    },

    //数字格式化
    NumberFormat: {
        //以某个分隔符分开
        splitMarkFormat: function (numberStr, fixedNumber, markStr) {
            if (isNaN(Number(numberStr))) {
                return "";
            }
            fixedNumber = fixedNumber > 0 && fixedNumber <= 20 ? fixedNumber : 2;
            numberStr = parseFloat((numberStr + "").replace(/[^\d\.-]/g, "")).toFixed(fixedNumber) + "";
            var l = numberStr.split(".")[0].split("").reverse(),
                r = numberStr.split(".")[1];
            t = "";
            for (i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? markStr : "");
            }
            return t.split("").reverse().join("") + "." + r;
        },


        //移除分割符号
        removeSplitMark: function (str) {
            return str.replace(/[^\d\.-]/g, "");
        },

        //数字转中文大写
        numberToChinese: function (n) {
            if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
                return "error";
            var unit = "仟佰拾亿仟佰拾万仟佰拾圆角分", str = "";
            n += "00";
            var p = n.indexOf('.');
            if (p >= 0)
                n = n.substring(0, p) + n.substr(p + 1, 2);
            unit = unit.substr(unit.length - n.length);
            for (var i = 0; i < n.length; i++)
                str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
            str = str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(
                /零(万|亿|圆)/g, "$1").replace(/(亿)万|(壹拾)/g, "$1$2").replace(
                /^圆零?|零分/g, "").replace(/圆$/g, "圆整");
            return str;
        },

        //验证是否是数字或浮点型数字
        testNumber: function (numberStr) {
            if (/^-?(0|[1-9]\d*)(\.\d+)?$/.test(numberStr)) {
                return true;
            } else {
                return false;
            }
        },
        //保留几位有效数字 四舍五入
        toFixed:function(numStr,fixnum){
            var num_str
            if (!isNaN(Number(numStr))) {
                num_str= Number(numStr).toFixed(fixnum);
            }else{
                num_str = numStr;
            }
            return JCPublicUtil.NumberFormat.toFixed1(num_str,fixnum);
        },
        //保留几位有效数字截取
        toFixed1:function(numStr,fixnum){
            if (!isNaN(Number(numStr))) {
                var num_str = numStr.toString();
                var stringBuilder=JCPublicUtil.StringBuilder();
                if(num_str.indexOf(".")!=-1){
                    var numStrSplitArray=num_str.split(".");
                    if(fixnum != 0){
                        if(numStrSplitArray[1].length>fixnum){
                            stringBuilder.Append(numStrSplitArray[0]);
                            stringBuilder.Append('.');
                            stringBuilder.Append(numStrSplitArray[1].substr(0,fixnum));
                        }else if(numStrSplitArray[1].length<fixnum){
                            stringBuilder.Append(num_str);
                            var len = fixnum - numStrSplitArray[1].length;
                            for(var i=0;i<len;i++){
                                stringBuilder.Append('0');
                            }
                        }else{
                            stringBuilder.Append(num_str);
                        }
                    }else{
                        stringBuilder.Append(numStrSplitArray[0]);
                    }
                    return stringBuilder.ToString();
                }else{
                    if(fixnum > 0){
                        stringBuilder.Append(num_str);
                        stringBuilder.Append('.');
                        for(var i=0;i<fixnum;i++){
                            stringBuilder.Append('0');
                        }
                        return stringBuilder.ToString();
                    }
                }
            }
            return numStr;
        }


    },

    //地址相关类  http://localhost:8080/JC/
    Location: {
        getRootPath: function () {
            var strFullPath = window.document.location.href;
            var strPath = window.document.location.pathname;
            var pos = strFullPath.indexOf(strPath);
            var prePath = strFullPath.substring(0, pos);
            var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
            return (prePath + postPath);
        }
    },
    /**
     *
     * @param url  请求地址
     * @param method 请求类型。post或get
     * @param data  //发送到服务器的数据。将自动转换为请求字符串。get请求中将附加在URL后面。对象必须为"{键:值}"格式
     * @param successFunc //请求成功的回调
     * @param errorFunc   //请求失败的回调
     * @param timeout    //设置请求超时时间(毫秒)
     * @param cache      //如果设置为false，浏览器将不缓存此页面。
     * @param datatype   //预期服务器返回的数据类型。如果不指定，jQuery将自动根据HTTP包MIME信息来智能判断。
     * @param showLoadingType 1：覆盖整个界面的load   2：覆盖右侧推出的窗口
     * @param extendObj 扩展属性{async:false},详情查看jquery ajax api
     */
    Ajax:function(url,type,datatype,showLoading,extendObj,successFunc,errorFunc,successBeforeFn,successAfterFn){
        if(url.indexOf("?")!=-1){
            url+="&times="+Math.random();
        }else{
            url+="?times="+Math.random();
        }
        if(showLoading){
            $(document).ajaxStart(function(){
                var stringBuilder=HLJcomm.StringBuilder();
                var width=$(document).width();
                var height=$(document).height();
                var obj = {
                    width: width,
                    height: height
                };
                $("body").append(_.template($("#layout").html())(obj));//传入对象
                $(document).unbind("ajaxStart");
            });
          $(document).ajaxStop(function(){
                $("#divShowLoadingOverlay").remove();
                $("#divShowLoading").remove();
                $(document).unbind("ajaxStop");
            });
        }
        var defaultObj ={
            url: url,
            type: type,
            dataType:datatype,
            timeout: 1800000,
            cache: false,
            success: successFunc,
            error:errorFunc
        };

        if(extendObj){
            defaultObj = $.extend(defaultObj,extendObj)
        }
        var successFn = defaultObj.success;
             if(successFn){
                 successFn = _.wrap(successFn, wrapper);
             }
             function wrapper(successFn){
                 if(successBeforeFn){
                     successBeforeFn();
                 }
                  successFn(data);
                 if(successAfterFn){
                     successAfterFn();
                 }
             }
            $.ajax(defaultObj);
    },
    //javascript原生方法阻止冒泡
    stopPropagation:function(e){
        var e= e || window.event;
        if(e.stopPropagation) { //W3C阻止冒泡方法
            e.stopPropagation();
        } else {
            e.cancelBubble = true; //IE阻止冒泡方法
        }
    },
    /*
     * 根据类型，判断是否是符合条件的数字
     * type 1-非负浮点数，2-浮点数，3-正浮点数
     *
     * 成功返回true，失败返回false
     */
    checkNum : function(type, str){
        if(type == 1){//^\d+(\.\d+)?$
            if(str.match(/^\d+(\.\d+)?$/) === null){
                return false;
            }else{
                return true;
            }
        }
        if(type == 2){
            if(str.match(/^(-?\d+)(\.\d+)?$/) === null){
                return false;
            }else{
                return true;
            }
        }
        if(type == 3){
            if(str.match(/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/) === null){
                return false;
            }else{
                return true;
            }
        }

    },

    /**
     * 校验非负正整数
     */
    checkPosInt:function(number){
        var reg = /^(0|[1-9]\d*)$/;
        if(!reg.test(number)){
            JCLayer.alert("请输入非负正整数");
            return false;
        }
        return true;
    },

    /**
     * 初始化树
     * @param id 不带#
     * @param extendObj 扩展属性
     * {
  *   view:{
  *     addDiyDom:function(treeId, treeNode){}
  *   },
  *   callback:{
  *      onClick:function(event, treeId, treeNode){}
  *   }
  * }
     */
    zTreeInit:function(id,extendObj,zNodesGroup,callBack){
        var setting = {
            view : {
                showLine : false,
                showIcon : false,
                selectedMulti : false
            },
            data : {
                simpleData : {
                    enable : true
                }
            }
        };
        setting = $.extend(true,setting,extendObj);
        var treePartner = $("#"+id);
        var treeObj=$.fn.zTree.init(treePartner, setting, zNodesGroup);
        treeObj.selectNode(treeObj.getNodes()[0]);
        treeObj.expandAll(true);
        if(callBack != undefined){
            callBack(treeObj);
        }
    },
    /*全选，反选，当所有复选框都选中时，自动勾选"全选"对应的元素*/
    /**
     *
     * @param chooseId: "全选"元素的id
     * @param checkboxwrap 包裹所有checkbox的父级id(再其内的checkbox需要加上class="chosecheck")
     *
     */
    chooseAll: function(chooseId,checkboxwrap) {
        $("#"+chooseId).click(function(){ /*全选反选*/
            var flag=this.checked;
            $("#"+checkboxwrap).find(".chosecheck").prop("checked",flag);
        });
        $("#"+checkboxwrap).on("click",".chosecheck",function(){ /*勾选/不勾选 "全选"这个元素*/
            if(!this.checked){
                $("#"+chooseId).prop("checked",false);
            }
            else {
                var checkboxnum=$(".chosecheck").closest("#"+checkboxwrap).find(".chosecheck").length;
                if(checkboxnum===$("#"+checkboxwrap).find("input[type='checkbox']:checked").length){
                    $("#"+chooseId).prop("checked",true);
                }
            }
        });
    },

    //限制输入字符创长度
    limitInputSize:function(obj,size){
        $(obj).keyup(function(){
            var val = $(this).val();
            if(val != undefined && val.length > size){
                var tempVal = val.substr(0,size);
                $(this).val(tempVal)
            }
        });
    },
    //使用body缓存数据
    getData:function(id){
        if(!$("body").data(id)){
            $("body").data(id,$("#"+id).html());
        }
        return $("body").data(id);
    },
    //搜索下拉
    dropdown: function(){
        $("#dropdown").append(_.template($("#dropTpl").html()));
        //鼠标点击下拉箭头显示下拉
        $("#dropdown").on("click.dropdown",".js_drop_arrow",showDropDown);
        function showDropDown(e) {
            e.stopPropagation();
            var $target = $(this);
            var $options = $("#dropdown").find(".js_drop_option");
            //关闭下拉菜单
            showDropDown.leave =function(){
                $options.hide();
                $target.css("transform","rotate(0deg)").parent().removeClass("add-search-border");
            };
            //打开下来菜单
            showDropDown.on=function(){
                $options.fadeIn();
                $target.css("transform","rotate(180deg)").parent().addClass("add-search-border");
            };
            if($options.is(":hidden")) {
                showDropDown.on();
            }else {
                showDropDown.leave();
            }
            $(document).off("click.doc").on("click.doc",function(e){
                if($(e.target).parents(".js_drop_option").length === 0) {
                   showDropDown.leave();
                }
            });

            //绑定每个下拉li的事件
            $options.off("click.option").on("click.option","li",showSelectedTxt);
            function showSelectedTxt(e){
                e.stopPropagation();
                var $self = $(this);
                $("#dropdown").find(".js_drop_txt").text($self.text());
                showDropDown.leave();
            }
        }
    },
    /*
    鼠标移动到缩略图显示大图
        每个缩略图加上个自定义属性：data-big-src
    */
    showBigImg:function() {
        //给缩略图绑定mouseover事件
        var bigImgSrc;
        var mouseOverFn = function(){
            var $that = $(this);
            //获取缩略图的原始大图的地址
            $that.closest(".js_img_wrap").find(".js_thumb_img").parent().removeClass("thumb_border");
            $that.parent().addClass("thumb_border");
            bigImgSrc = $that.data("bigSrc");
            console.log(bigImgSrc);
            //切换主图为当前缩略图对应的大图
            $that.closest(".js_img_wrap").find(".js_main_img")
                .attr("src",bigImgSrc);
        };
        var newFn = _.throttle(mouseOverFn, 100);

        $(".js_thumb_img").on("mouseover.thumb",newFn);
    },
    /*
    *  加入购物车特效
    *  $targetWrap: 包含所有图片的父容器(jquery对象)
    *  .js_fly_btn: 加入购物车的按钮
    *  .js_img_wrap: 包裹主图的class
    *  .js_main_img: 主图
    */
    fly: function($targetWrap){
        var defaultObj = {
            start: {
                left: 0,
                top: 0
            },
            end: {
                left: 100,
                top: 100,
                width: 100,
                height: 100
            },
            autoPlay: true,
            speed: 1.1,
            vertex_Rtop: 100,
            onEnd: function(){
                this.destroy();
            }
        };
        $targetWrap.on("click.fly", ".js_fly_btn", flyFn);
        function flyFn(){
            var $target =$(this);
            var $flyImg =$target.closest(".js_img_wrap").find(".js_main_img");
            var $cloneImg = $flyImg.clone().css({
                borderRadius: "50%",
                width: "100px",
                height: "100px"
            });
            $.extend(
                defaultObj,
                {
                    start: {
                        left: $flyImg.offset().left,
                        top: $flyImg.offset().top
                    },
                    end: {
                        //这里应该是购物车div的位置信息
                        left: 800,
                        top: 800
                    }
                }
            );
            $cloneImg.fly(defaultObj);
        }
    },
    //点击向下箭头，向下滚动展示图片
    /*
    *   #recommendImg: 需要移动的容器id
    *   .js-recommend: 每个包含图片的容器class
    *   #showNextImg: 点击的向下箭头的id
    *   参数：
    *       showImgNum: 能显示的图片个数
    * */
    showNextImg: function(showImgNum){
        //点击向下箭头事件
        var index = 1,
             imgList = $("#recommendImg").find(".js-recommend");
             imgLength = imgList.length;
        var newShowFn = _.throttle(showNext, 300);
        $("#showNextImg").on("click.next",newShowFn);
        function showNext() {
            var $target = $(this);
            var $singleOption = imgList.eq(0);
            var optionHeight = $singleOption.outerHeight()+window.parseInt($singleOption.css("marginBottom"));
            $("#recommendImg").animate({
                    top: -(optionHeight * index) +"px"
                },
                300,function(){
                    /*
                     *判断滚动到了最后一个图片时，回到第一个图片
                     *当index + 要展示的图片的个数 = imgLength时候
                     * */
                    //这里的showImgNum代表的是展示的个数
                    console.log(index + showImgNum + ":" +  imgLength);
                    if(index + showImgNum >= imgLength){
                        index = 0;
                        console.log(index);
                    }
                    else {
                        index++;
                        console.log(index);
                    }
                });
        }
    },
    toggleClass: function(target,className) {

    }
};
