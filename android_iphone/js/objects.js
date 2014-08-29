
/* 玩家对象 */
function people(){
	this.fenshu = 0;	//分数
	this.cuowu = 0;	//错误数
}
	
/* 题目对象 */
function question(){
	this.gongshi = "1+1";	//题目
	this.level = 1;				//等级
	this.jieguo = -1;			//答案
	this.nowlevelno = 0;		//当前等级的第几题
	this.maxlevelno = 10;	//当前等级共有多少道题
	this.fenzhi = 1;				//题目的分值
	
	//生成题目
	this.chuTi = function(){
		var a = 0;
		var b = 0;
		var c = 0;
		var d = 0;
		if(this.level == 1)	//第1阶段
		{
			a = Math.round(Math.random()*11);
			b = Math.round(Math.random()*9);
			
			this.gongshi = a+this.chuTiFuHao()+b;
			if(eval(this.gongshi)<0)	//如果生成的题答案为负数，则重新生成
			{
				return this.chuTi();
			}
			else
			{
				this.nowlevelno++;
				if(this.maxlevelno - this.nowlevelno <=0)	//如果当前等级的题都答完了，则进入下一等级
				{
					this.nextLevel();	//进入下一等级
				}
				return this.gongshi;	
			}
		}
		else if(this.level == 2)
		{
			a = Math.round(Math.random()*46+9);//9-55
			b = Math.round(Math.random()*20);
			this.gongshi = a+this.chuTiFuHao()+b;
			var tempzhi = eval(this.gongshi);
			if(tempzhi<9 || tempzhi>999)	//如果生成的题答案为负数或超过3位数，则重新生成
			{
				return this.chuTi();
			}
			else
			{
				this.nowlevelno++;
				if(this.maxlevelno - this.nowlevelno <=0)	//如果当前等级的题都答完了，则进入下一等级
				{
					this.nextLevel();	//进入下一等级
				}
				return this.gongshi;	
			}
		}
		else if(this.level == 3)
		{
			a = Math.round(Math.random()*50);
			b = Math.round(Math.random()*15);
			c = Math.round(Math.random()*15);
			this.gongshi = a+this.chuTiFuHao()+b+this.chuTiFuHao()+c;
			var tempzhi = eval(this.gongshi);
			if(tempzhi<9 || tempzhi>9999)	//如果生成的题答案为负数或超过4位数，则重新生成
			{
				return this.chuTi();
			}
			else
			{
				this.nowlevelno++;
				if(this.maxlevelno - this.nowlevelno <=0)	//如果当前等级的题都答完了，则进入下一等级
				{
					this.nextLevel();	//进入下一等级
				}
				return this.gongshi;	
			}
		}
		else if(this.level == 4)
		{
			a = Math.round(Math.random()*65);
			b = Math.round(Math.random()*40);
			c = Math.round(Math.random()*40);
			this.gongshi = a+this.chuTiFuHao()+b+this.chuTiFuHao()+c;
			var tempzhi = eval(this.gongshi);
			if(tempzhi<9 || tempzhi>99999)	//如果生成的题答案为负数或超过5位数，则重新生成
			{
				return this.chuTi();
			}
			else
			{
				this.nowlevelno++;
				if(this.maxlevelno -this.nowlevelno <=0)	//如果当前等级的题都答完了，则进入下一等级
				{
					this.nextLevel();	//进入下一等级
				}
				return this.gongshi;	
			}
		}
		else if(this.level == 5)
		{
			a = Math.round(Math.random()*60);
			b = Math.round(Math.random()*40);
			c = Math.round(Math.random()*20);
			d = Math.round(Math.random()*10)
			this.gongshi = a+this.chuTiFuHao()+b+this.chuTiFuHao()+c+this.chuTiFuHao()+d;
			var tempzhi = eval(this.gongshi);
			if(tempzhi<9 || tempzhi>999999)	//如果生成的题答案为负数，则重新生成
			{
				return this.chuTi();
			}
			else
			{
				this.nowlevelno++;
				if(this.maxlevelno - this.nowlevelno <=0)	//如果当前等级的题都答完了，则进入下一等级
				{
					this.nextLevel();	//进入下一等级
				}
				return this.gongshi;	
			}
		}
		else
		{
			a = Math.round(Math.random()*90);
			b = Math.round(Math.random()*80);
			c = Math.round(Math.random()*70);
			d = Math.round(Math.random()*60)
			this.gongshi = a+this.chuTiFuHao()+b+this.chuTiFuHao()+c+this.chuTiFuHao()+d;
			if(eval(this.gongshi)<9)	//如果生成的题答案为负数，则重新生成
			{
				return this.chuTi();
			}
			else
			{
				this.nowlevelno++;
				if(this.maxlevelno - this.nowlevelno <=0)	//如果当前等级的题都答完了，则进入下一等级
				{
					this.nextLevel();	//进入下一等级
				}
				return this.gongshi;	
			}
		}
	}
	
	//生成随机运算符
	this.chuTiFuHao = function(){
		var temp = Math.round(Math.random()*2+1);/*1-3随机数*/
		var tempfuhao = "+";
		if(temp==1)tempfuhao="*";
		else if(temp==2 )tempfuhao="-";
		return tempfuhao;
	}
	
	//进入下一等级
	this.nextLevel = function(){
		this.level++;								//等级增加
		if(this.level<=5)this.fenzhi=this.level;	//分值等于等级，但最大为5
		this.maxlevelno = this.level*9;	//该等级的题目数量
		this.nowlevelno = 0;					//刷新当前第几题
	}

}