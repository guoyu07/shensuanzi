var soundopen = 1;	//声音状态，1开启，0关闭

//进入页面
window.uexOnload = function(type){
		 initPage();
		$("body").fadeIn(200);
		$("#backimg").delay(200).animate({"left":"10%"},{easing:"easeInOutQuart",duration:1500});
		$("#title,#p1btns").delay(1500).fadeIn(1500);
	}

//点击开始游戏
function startGame(){
	$("#page1").fadeOut(300,function(){
					   		localStorage.setItem('soundopen',soundopen);	//将声音状态存储在本地，用于其他页面读取
							window.location.href="game.html";
						});
}

//点击游戏简介
function gameInfo(){
	$("#gameinfobox").animate({"left":"0"},500);
	$("#page1").animate({"left":"-50%"},500);
}

//点击返回
function returnMenu(){
	$("#gameinfobox").animate({"left":"100%"},500);
	$("#page1").animate({"left":"0"},500);
}

//页面初始化
function initPage(){
	soundopen = parseInt(localStorage.getItem('soundopen'));
	if(soundopen!=1 && soundopen!=0)soundopen=1;
	
	//声音开关初始化及绑定开关事件
	$("#soundcheck").iCheck({
		 checkboxClass: 'icheckbox_square-green',
		 radioClass: 'iradio_square-green',
		 increaseArea: '20%'
	});
	
	if(soundopen == 0)$('#soundcheck').iCheck('uncheck'); 
	
	$("#soundcheck").bind("ifChecked",function(){
		soundopen = 1;
		uexAudio.play(-1);
	}).bind("ifUnchecked",function(){
		soundopen = 0;
		uexAudio.pause();
	});
	
	//背景音乐和退出游戏事件
	uexAudio.open("res://main.mp3");
	if(soundopen==1)uexAudio.play(-1);
    $("#exitgame").bind("touchend",function(){
  		uexWidgetOne.exit();
    });
		  
	//绑定按钮事件
	$("#playgame").bind("touchstart",startGame);
	$("#gameinfo").bind("touchstart",gameInfo);
	$("#gamebtn").bind("touchstart",returnMenu);
	
	//根据页面分辨率调整字体大小
	 winheight = $(window).height();
    if (winheight < 960) {
		$("#theinfo").css("font-size","24px");
    }
}

/* 获取页面参数的方法 */
function getParameter(val){
		var uri = window.location.search;
		var re = new RegExp("" +val+ "=([^&?]*)", "ig");
		return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
}
