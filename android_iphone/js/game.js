var time1 = 0; 					//耗时
var interval1;						//耗时循环计时器
var interval2;						//倒计时循环计时器
var userzhi = "";				//记录用户输入的内容,字符串型
var soundopen = 1;			//声音状态 1开启，0关闭
var player = new people();//玩家 包括分数、错误数、总耗时
var timu = new question();//题目 包括题、题等级、题答案、生成题目方法

/* 进入页面，游戏开始 */
window.uexOnload = function(type){
		soundopen = parseInt(localStorage.getItem('soundopen'));
		if(soundopen!=1 && soundopen!=0)soundopen=1;
		
		uexAudio.open("res://game.mp3");	//添加音乐跟音效
		uexAudio.openSoundPool();
		uexAudio.addSound(1,"res://v.wav");
		uexAudio.addSound(2,"res://error.wav");
		uexAudio.addSound(3,"res://popup.wav");
		$("#exitgame").bind("touchend",function(){	//绑定退出游戏事件
		  	uexWidgetOne.exit();
		});
		  
		initPage();		//页面初始化
		pageShow();	//开始游戏
}

/* 游戏开始记录耗时 */
function time1start(){
	time1++;
	var fen = 0;
	var miao = time1;
	if(time1>=60)
	{
		fen = parseInt(time1/60);
		miao = time1-fen*60;
	}
	if(fen<10)fen="0"+fen;
	if(miao<10)miao="0"+miao;	
	$("#p2_time").text("耗时:"+fen+":"+miao);
	}

/*此方法将出的题目显示到页面 并记录正确答案 并开始倒计时*/
function chuTiShow(ti){
	timu.jieguo = eval(ti);
	$("#p2_3").text(ti+"=?");
	time2 = 15;															//刷新倒计时
	$("#thetime").width($("#timebox").width()).css("background","#00FFFF");
	window.clearInterval(interval2);
	interval2 = window.setInterval("time2Go()",200);	//启动倒计时
	levelStar();
	}
	
/* 用户点击键盘按钮触发 */
function btnclick(){
	var tempuserzhi = $(this).attr("lang");
	
	if(tempuserzhi=="cl")			//用户点击了清除按钮
	{
		stopSound(3);
		playSound(3,120);				//播放音效
		userzhi = "";
		$("#usershuru").text(userzhi);
	}
	else if(tempuserzhi == "ok")	//用户点击确认按钮
	{
		var tempzhi = eval($("#usershuru").text());
		if(tempzhi - timu.jieguo ==0)
		{
			stopSound(1);
			playSound(1,1100);		//播放音效
			$("#vximg").attr("src","img/v.png?random="+Math.random());
			$("#p2_3").text("good!");
			window.setTimeout("putong()",500);
			player.fenshu = player.fenshu + timu.fenzhi;
			$("#p2_fen").html("得分:"+player.fenshu+"&nbsp;&nbsp;");
			
			userzhi = "";
			$("#usershuru").text(userzhi);
		}
		else
		{
			stopSound(2);
			playSound(2,120);			//播放音效
			//回答错误的处理
			player.cuowu++;
			if (player.cuowu <= 10) {	//如果错误数<=10，则继续下一题
				$("#vximg").attr("src", "img/x.png?random=" + Math.random());
				$("#p2_3").text("oh,no.");
				window.setTimeout("putong()", 500);
			}
			else{									//如果错误数>10，则游戏结束
				window.clearInterval(interval1);	//停止耗时
				window.clearInterval(interval2);	//停止倒计时
				$("#timeout").text("你错太多了");
				gameover();
			}
			userzhi = "";
			$("#usershuru").text(userzhi);
			$("#p2_cuo").text("错误:" + player.cuowu);	
		}
	}
	else											//用户点击数字键
	{
		stopSound(3);
		playSound(3,120);					//播放音效
		userzhi = userzhi+$(this).attr("lang");	
		$("#usershuru").text(userzhi);
	}
	
	//按钮按下后的效果
	$(this).css({"border-bottom":"solid 0 #ccc","box-shadow":"0 0 15px rgba(58,112,249,0.8)"}).stop()
	.animate({},100);
}

/* 控制倒计时条 */
function time2Go(){
	var $thetime = $("#thetime");
	$thetime.width($thetime.width()-$("#timebox").width()/60);//6.5
	if($thetime.width()<10)						//超时
	{
			window.clearInterval(interval1);	//停止耗时
			window.clearInterval(interval2);	//停止倒计时
			gameover();
			
	}
	else if($thetime.width()<100)$thetime.css("background","#FF0000");
	else if($thetime.width()<300)$thetime.css("background","#FFFF00");
}

/* 游戏结束 结果处理 */
function gameover(){
	
	//解除绑定键盘按键事件
	 $("#p2_4 div").unbind("touchestart");	
	 
	 //停止背景音乐
	 uexAudio.stop();
	 
	 //动画效果							
	$("#timeout").animate({"margin-left":"-150px","margin-top":"-75px","width":"300px","height":"150px",opacity:"show"},100)
				 .delay(1000).animate({"margin-left":"0","margin-top":"0","width":"0","height":"0",opacity:"hide"},100,function(){
					$("#page2").fadeOut(300);
					$("#page3").fadeIn(300);
				});
				
	//统计成绩
	var over_fenshu = player.fenshu;
	var over_cuowu = player.cuowu;
	var over_haoshi = $("#p2_time").text().substring(3);
	
	//将成绩保存到数据库并回显名次
	saveData(over_fenshu,over_cuowu,over_haoshi);
	
	//在结果页面上显示成绩信息
	$("#df").text(over_fenshu);
	$("#cw").text(over_cuowu);
	$("#hs").text(over_haoshi);
	if(over_fenshu>=90)	//大神
	{
		$("#p3_chenhao").text("大神");
	}
	else if(over_fenshu>=80)//高手
	{
		$("#p3_chenhao").text("高手");
	}
	else if(over_fenshu>=60)//及格
	{
		$("#p3_chenhao").text("及格啦");
	}
	else//学渣
	{
		$("#p3_chenhao").text("学渣");
	}
}
	
/* 进入页面动画 */
function pageShow(){
		$("#page2").fadeIn(300,function(){
				var ti = timu.chuTi();													//进入页面时就产生一道题
				chuTiShow(ti);															//将题显示到页面上，并记录正确答案												
				interval1 = window.setInterval("time1start()",1000);	//开始计时											   
		 });
	}
	
/* 跳转页面动画（返回首页和再来一次） */
function returnpage(e){
		localStorage.setItem('soundopen',soundopen);	//将声音状态存储在本地，用于其他页面读取
		$("#page3").fadeOut(300,function(){
								window.location.href=e.data.page;							  
							});
	}
	
/* 游戏结束后将数据存入数据库 */
function saveData(f,c,s){
	$.ajax({
		 type: "POST",
		 url: "http://localhost:8080/SSJ1/test/appcan.do",
		 data: "fenshu="+f+"&cuowu="+c+"&haoshi="+s,
		 dataType:"json",
		 success: function(msg){
				if(msg!=null)
				{
					$("#mingci").text(msg.m+13560);
					$("#beyound").text(msg.b+5640);
				}
		}
	})
}

/* 玩家回答后的处理 */
function putong(){
	$("#vximg").attr("src","img/putong.png?random="+Math.random());
	var ti = timu.chuTi();	//新生成一道题
	chuTiShow(ti);
}

/* 控制难度星级的显示 */
function levelStar(){
	if(timu.level<=6)$("#levelbox").css("width",(70+timu.level*34)+"px");
}

/* 页面初始化 */
function initPage(){
	$("#p2_4 div").bind("touchstart",btnclick);												//绑定键盘按键事件
	$("#p2_4 div").bind("touchend",btnclickEnd);											//绑定键盘按键弹起事件
  	$("#returnindex").bind("touchstart",{page:"index.html?soundopen="+soundopen},returnpage);		//绑定返回首页
    $("#onemoretime").bind("touchstart",{page:"game.html?soundopen="+soundopen},returnpage);	//绑定再来一次
   
    winheight = $(window).height();	//根据页面分辨率调整字体大小
    if (winheight < 960) {
	   	$("#p2_4 div").css({"font-size":"30px","line-height":"50px"});
		$("#p2_1,#p3_info").css("font-size","24px");
    }

	if (soundopen == 1)uexAudio.play(-1);	//播放背景音乐
}

/* 播放音效 */
function playSound(id,time){
	if(soundopen==1){
		uexAudio.playFromSoundPool(id);
		window.setTimeout(function(){uexAudio.stopFromSoundPool(id);},time);
	}
}

/* 停止音效 */
function stopSound(id){
	uexAudio.stopFromSoundPool(id);
}

/* 屏幕键盘弹起后的效果 */
function btnclickEnd(){
	//按钮弹起后的效果
	$(this).css({"border-bottom":"solid 5px #ccc","box-shadow":"0 0 0 rgba(58,112,249,0.8)"}).stop()
	.animate({},100);
}

/* 获取页面参数的方法 */
function getParameter(val){
		var uri = window.location.search;
		var re = new RegExp("" +val+ "=([^&?]*)", "ig");
		return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
}
