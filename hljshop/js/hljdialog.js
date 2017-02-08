/*
* 自定义皮肤：
* 		【第一步】：命名文件夹
 在layer的skin目录建立一个文件夹，假设您将该文件夹命名为：yourskin

 【第二步】：创建样式等文件
 在yourskin文件夹下建立一个单独的样式文件，务必命名为：style.css。并且你可能用到的图片也要存放在该文件夹下

 【第三步】：书写样式

 通过body前缀，是为了确保你皮肤的优先级
 你可以通过调试工具重置更多样式

body .layer-ext-yourskin .layui-layer-title{}
body .layui-ext-yourskin .layui-layer-btn{}
body .layui-ext-yourskin .layui-layer-btn a{}

【第四步】：调试
通过全局配置看看你的皮肤定义的如何：
layer.config({
	extend: 'myskin/style.css', //加载您的扩展样式
	skin: 'layer-ext-yourskin'
});
layer.alert('layer皮肤-Yourskin');

【最后一步】：发布
1. 现在你已经成功制作了一个皮肤了，如果你觉得它很美，你可以共享出更多的人使用。
2. 那么你应该制作一个简单的页面来介绍你的皮肤，提供尽可能简单的使用说明（就像这个：layer.seaning.com）。
3. 然后将你的皮肤主题页网址通过任意渠道发给贤心（比如可以通过邮箱：xu@sentsin.com）
*
* */
var HLJdialog= {
	/*
	 type:弹窗类型-  0:(信息框，默认) 1:(页面层)  2:(iframe层)  3:(加载层)  4:(tips层)
	 title:弹窗标题
	 content:弹窗内容（可以是字符串和DOM）  若type是2，则content是iframe的src地址
	 buttons:按钮 类型为数组
	 methods：按钮对应的方法 类型为function数组
	 extendObj：扩展属性，对于弹框的其他属性方法进行自定义扩展
	 Dialog有一个默认的返回值，为当前弹框的唯一索引值
	 shadeClose - 是否点击遮罩关闭(true,false)
	 btnAlign - 按钮排列(l:左,c: 中间，r：右)
	 */
	dialog: function (type, title, content, buttons, methods, extendObj) {
		//全局配置自定义皮肤样式
		layer.config({
			//extend: 'hlj/style.css', //加载您的扩展样式
			skin: 'layer-ext-hlj'
		});
		var defaultObj = {
			type: type,
			title: title,
			content: content,
			closeBtn: 1,
			scrollbar: false,
			shift: 2,
		};

			if(buttons){
			 	defaultObj.btn = buttons;
			 }
			 if(methods){
					 for(var i=1,j=methods.length+1;i<=j;i++){
					 defaultObj["btn"+i]=methods[i-1];
				 }
			 }
		$.extend(defaultObj, extendObj);
		return layer.open(defaultObj);
	},
	/*content:提醒内容  okBtn:确定事件  icon:信息图片展示 6:笑脸  5：哭脸    4：锁   3：问号  2：错误   1：成功   0：警告*/
	alert: function (content, okBtn, icon) {
		layer.alert(content, {icon: icon}, okBtn);
	},
	/*content:提示内容  okBtn:确定事件  cancelBtn:取消事件  icon:信息图片展示*/
	confirm: function (content, okBtn, cancelBtn, icon) {
		layer.confirm(content, {icon: icon}, okBtn, cancelBtn);
	},
	/*content:提示内容 callback:提示完成后的回调函数  time:信息框自动消失毫秒值  icon:信息图片展示*/
	msg: function (content, callback, time, icon) {
		//layer.msg(content,{icon:icon,time:time}, callback)
		layer.msg(content, {icon: icon, time: time, offset: ['0px'], area: ['250px']}, callback);
	},
	/*参数为弹框返回的唯一索引值*/
	close: function (index) {
		layer.close(index);
	},
	/*设置弹窗样式*/
	css: function (cssObj) { // cssObj: css样式的对象,如：{ left: 100,top: 100 }
		var defaultCss = {};
		$.extend(defaultCss, cssObj);
		layer.style(index, defaultCss);
	},
	/*页面loading */
	loading: function (type, time) {

		//没有参数的情况下、默认加载type为2的加载层
		if (!arguments.length) {
			return layer.load(2);
		}

		//有两个参数的情况下、如果需要加载一段时间后自动关闭，则加上time参数
		if (time) {
			return layer.load(type, {time: time});
		}

		//有一个参数的情况，加载对应type的加载层
		return layer.load(type);

	},
	/*
	 弹窗内部多个选项卡 PS:需要引入layer.ext.js
	 titles:选项卡的标题，类型为字符串数组
	 contents:选项卡的内容，类型为字符串数组
	 */
	tabs: function (titles, contents) {
		var tabPage = [];
		var defaultTab = {area: ['600px', '300px']};
		for (var i = 0, j = titles.length; i < j; i++) {
			tabPage.push({title: titles[i], content: contents[i]});
		}
		defaultTab.tab = tabPage;
		layer.tab(defaultTab);
	},
	/*图片浏览功能，参数为图片容器*/
	photos: function (picsId) {
		layer.ready(function () { //为了layer.ext.js加载完毕再执行
			layer.photos({
				photos: "#" + picsId
				//0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
			});
		});
	},
	loadWindowID: "loadwindow_jc",
	/**
	 * 导入右侧html窗口
	 * 冒泡事件不在里面处理，请在外层function处理
	 * document点击事件也在外层自己处理
	 * @param width
	 * @param height
	 * @param urlStr
	 * @param dataObj
	 * @param initFunc 初始化load html中的事件绑定
	 * @param isShow true 为不关闭重新加载界面 ，false为关闭当前窗口然后再打开新窗口
	 */
	loadRightDialog: function (width, height, urlStr, dataObj, initFunc, isShow) {
		var id = JCLayer.loadWindowID;
		if (isShow == false || isShow == undefined) {
			if ($("#" + id).length > 0) {
				$("#" + id).remove();
			}
		}

		//自动定义宽度，高度
		height = $(window).height() - $(".head").height() - $(".head").offset().top;

		function resizeRightDialog() {
			var newHeight = $(window).height() - $(".head").height() - $(".head").offset().top;
			$("#loadwindow_jc").height(newHeight + "px");

			var bodyer = $("#loadwindow_jc").find(".dialog_bodyer");
			var header = $("#loadwindow_jc").find(".dialog_header");

			var bodyerHeight = newHeight - header.height();
			bodyer.height(bodyerHeight + "px");
			bodyer.css("max-height", bodyerHeight + "px");
			bodyer.css("min-height", bodyerHeight + "px");
		}

		$(window).unbind("resize.rightdialog").bind("resize.rightdialog", function () {
			resizeRightDialog();
		});

		var isFirst = false;//isShow 为true时 是否是第一次显示弹窗
		if ((isShow == true && $("#" + id).length == 0) || isShow == false || isShow == undefined) {
			if ((isShow == true && $("#" + id).length == 0)) {
				isFirst = true;
			}
			var dialog = $('<div id="' + id + '" class="dialog_contentright" style="width:' + width + 'px;height:' + height + 'px;top:auto;"></div>')
			JCLayer.hideLoadRightDialog(dialog);
			$("body").append(dialog);
		}

		if (urlStr.indexOf("?") != -1) {
			urlStr += "&rnd=" + Math.random();
		} else {
			urlStr += "?rnd=" + Math.random();
		}
		$("#" + id).load(urlStr,
			dataObj,
			function (response, status, xhr) {

				if (response != null && response.indexOf("resultCode") != -1) {
					response = $.parseJSON(response);
					if (response.resultCode == "E70003") {
						JCLayer.alert("登录失效，请重新<a href='pc?trxCode=P20100'>登录</a>", null, 2);
						return;
					} else {
						JCLayer.alert(response.resultMsg, null, 2);
						return;
					}
				}

				resizeRightDialog();
				//加入遮罩层
				var stringBuilder = JCPublicUtil.StringBuilder();
				stringBuilder.Append('<div style="z-index:9999;width:' + width + 'px;height:' + height + 'px;position:absolute; top:0px; left:0px; background:gray;opacity:0.5;filter:alpha(opacity=50); display:none;" id="jc_Overlay"><iframe frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);"></iframe>');
				stringBuilder.Append('<div style="width:300px; height:60px; font-weight:bold; position:absolute; top:50%; left:50%; margin-top:-30px; margin-left:-150px;" id="jc_ShowLoading">');
				stringBuilder.Append('<table style="width:100%;"><tr><td  style="text-align:center;"><img src="asserts/themes/default/Images/smallload.gif" /><br/>正在努力处理中...</td></tr></table>');
				stringBuilder.Append('</div></div>');
				$("#" + id).append(stringBuilder.ToString());


				//初始化方法，用于绑定load中内容中的按钮事件
				if (initFunc != undefined) {
					initFunc($("#" + id));
				}

				setTimeout(function () {
					JCLayer.showLoadRightDialog($("#" + id));
				}, 100);
			});
		//阻止冒泡
		$("#" + id).click(function (e) {
			e.stopPropagation();
		})

		$("#loadwindow_jc").unbind("resize.jcload").bind("resize.jcload", function () {
			var offsetTop = $(window).height() - height,
				offsetLeft = $(window).width() - width;
			$current.css({"left": offsetLeft, "top": offsetTop});
		});
		return $("#" + id);
	},
	//显示右侧框
	showLoadRightDialog: function (obj) {
		obj.css({
			"transform": "translateX(0px) translateY(0px)",
			"-ms-transform": "translateX(0px) translateY(0px)",
			"-moz-transform": "translateX(0px) translateY(0px)",
			"-o-transform": "translateX(0px) translateY(0px)",
			"-webkit-transform": "translateX(0px) translateY(0px)"
		});
	},
	//隐藏右侧框
	hideLoadRightDialog: function (obj) {
		if (obj.prop("id") != JCLayer.loadWindowID) {
			return;
		}
		var newWidth = obj.width() + 10;
		obj.css({
			"transform": "translateX(" + newWidth + "px) translateY(0px)",
			"-ms-transform": "translateX(" + newWidth + "px) translateY(0px)",
			"-moz-transform": "translateX(" + newWidth + "px) translateY(0px)",
			"-o-transform": "translateX(" + newWidth + "px) translateY(0px)",
			"-webkit-transform": "translateX(" + newWidth + "px) translateY(0px)"
		});

	},
	/*
	 htmlId:页面上弹框静态布局结构的id
	 dialogtitle: 弹框的标题,字符串
	 btnclass: 弹框的图标的css样式(保存，取消等图标的样式)，为数组。
	 btntitles: 图标 的title(鼠标移上去显示的title)，为数组
	 btnfns: 点击图标时的回调函数，为数组。回调函数里面有两个参数，第一个是layer的id，
	 用来关闭弹框;另一个是commdialog的id，用来给弹框里面的元素赋值。如果想关闭弹框，在回调函数最后返回true。否则，返回false。
	 option: 弹框的参数设置，如{area:['350px','500px'],offset: 'auto'}设置宽350，高500，位置居中.参考JCLayer.js里的dialog参数extendObj
	 dialogType: 弹框的类型，1:(页面层)  2 :(iframe层)  3:(加载层)    默认是页面层(加载层，iframe层暂未考虑)
	 最后返回当前commdialog的对象。
	 调用示例：JCLayer.commdialog("createRole","弹框标题",["dialogIcon1_2","dialogIcon1_1"],
	 ["tittle1","title2"],[fn1,fn2],{area:['350px','500px'],offset: 'auto'},null);
	 */
	commdialog: function (htmlId, dialogtitle, btnclass, btntitles, btnfns, option, dialogType) {  //点击确定或取消时要获取当前layer的index
		var stringBuilder = JCPublicUtil.StringBuilder(),
			time = JCPublicUtil.DateFormat(new Date(), "YYYYMMddhhmmss"),
			dialogId = "commDialog_" + time,
			dialogCloseId = "dialogClose_" + time;
		if (!dialogType && dialogType != 0) {
			dialogType = 1;
		}
		if (Object.prototype.toString.call(option) == "[object Object]") {
			option = option;
		}
		else {
			option = {area: ['350px', '500px']};
		}
		stringBuilder.Append('<div class="commdialogs" id="' + dialogId + '">');
		stringBuilder.Append('<div class="dialog_header">');
		stringBuilder.Append('<span class="dialog_title">' + dialogtitle + '</span>');
		stringBuilder.Append('<span class="dialog_button dialogIcon1_2" id="' + dialogCloseId + '" title="取消"></span>');
		if ($.isArray(btntitles) && $.isArray(btnclass)) {
			var btntitle_length = btntitles.length;
			for (var i = 0; i < btntitle_length; i++) {
				stringBuilder.Append('<span class="dialog_button js_btn ' + btnclass[i] + '" title="' + btntitles[i] + '"></span>');
			}
		}
		else if (btntitles) {
			stringBuilder.Append('<span class="dialog_button js_btn ' + btnclass + '" title="' + btntitles + '"></span>');
		}
		stringBuilder.Append('</div>');
		stringBuilder.Append('<div class="dialog_bodyer">');
		var dialogBodyHtml = JCPublicUtil.getHtmlById(htmlId);
		if ($("#" + htmlId).length > 0) {
			$("#" + htmlId).remove();
		}
		stringBuilder.Append(dialogBodyHtml);
		stringBuilder.Append('</div>');
		stringBuilder.Append('</div>');
		//先加载layer的html，在加上上面stringBuilder的内容。
		var strs = stringBuilder.ToString();
		var layerIndex = JCLayer.dialog(dialogType, false, strs, null, null, option);
		/*阻止当前layer层和layer遮罩层冒泡触发document事件*/
		var psId = "layui-layer" + layerIndex;//当前layer的id
		var psShadeId = $("#" + psId).prev().attr("id");//当前layer遮罩层id
		$("#" + psId + ",#" + psShadeId).click(function (e) {
			e.stopPropagation();
		});
		$("#" + dialogCloseId).click(function (e) {
			e.stopPropagation();
			layer.close(layerIndex);
		});
		$("#" + dialogId).find(".js_btn").each(function (i, target) {
			//判断当前的按钮是否有对应的响应事件，如果有，则绑定事件，否则，直接绑定关闭事件
			if (btnfns) {//btnfns不为空时
				if ($.isArray(btnfns)) {//是否是数组
					if ($.isFunction(btnfns[i])) {//数组里的元素是不是函数
						$(target).click(function (e) {
							e.stopPropagation();
							var isClose = btnfns[i](layerIndex, $("#" + dialogId));
							if (isClose) {
								layer.close(layerIndex);
							}
						});
					}
					else {//如果不是函数，抛出错误
						$.error(btnfns[i] + " is not a function!");
					}
				}
				else {
					if ($.isFunction(btnfns)) {
						$(target).click(function (e) {
							e.stopPropagation();
							var isClose = btnfns(layerIndex, $("#" + dialogId));
							if (isClose) {
								layer.close(layerIndex);
							}
						});
					}
					else {
						$.error(btnfns + " is not a function!");
					}
				}
			} else {//如果btnfns参数为空,null,undefined，则绑定关闭事件
				$(target).click(function (e) {
					e.stopPropagation();
					layer.close(layerIndex);
				});
			}
		});
		return $("#" + dialogId);
	},
}