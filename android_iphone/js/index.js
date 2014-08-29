//进入页面
window.uexOnload = function(type){
		 initPage();
		$("body").fadeIn(200);
		$("#backimg").delay(200).animate({"left":"10%"},{easing:"easeInOutQuart",duration:1500});
		$("#title,#p1btns").delay(1500).fadeIn(1500);
	}

//点击开始游戏
function startGame(){
	$("#page1").animate({"width":"90%","height":"90%","marginTop":"5%","marginLeft":"5%"},300)
					   .animate({"left":"-105%"},300,function(){
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
	//背景音乐和退出游戏事件
	uexAudio.open("res://main.mp3");
　　	uexAudio.play(-1);
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
