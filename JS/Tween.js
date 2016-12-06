function getId(name){//ID获取元素的方法
			return document.getElementById(name);
}
function getTag(parent,tag){//标签名获取元素的方法
	return parent.getElementsByTagName(tag);
}
function getClass(parent,name){//className获取元素的方法
	return parent.getElementsByClassName(name);
}
	// linear 匀速
	// easeIn 加速
	// easeOut 减速
	// 	 先加速后减速
	// easeInStrong 二次方加速
	// easeOutStrong 二次方减速
	// easeBothStrong 二次方先加速后减速
	// elasticIn 弹性在开始方向
	// elasticout 弹性在结束方向
	// elasticBoth 弹性 开始和结束都有
	// backIn 回弹 在开始方向
	// backOut 回弹 在结束方向
	// backBoth 回弹 开始和结束都有
	// bounceIn  碰撞 在开始方向
	// bounceOut 碰撞 在结束方向
	// bounceBoth 碰撞 开始和结束都有


var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};



//计算后样式获取或修改的框架


/* 当css的参数个数小于3，获取否则 设置 */
function css(el,attr,val) {
	if(arguments.length < 3) {
	//如果传输的参数小于3就是两位的那么就是获取计算后样式
		var val  = 0;//设置变量记录这个获取到样式的值
		if(el.currentStyle) {//如果是在IE下的走这行代码
			val = el.currentStyle[attr];
		} else {//不在IE下的走这个点吗获取计算后样式
			val = getComputedStyle(el)[attr];
		}
		if(attr == "opacity") {//如果写入得是透明度的话把小数换成整数
			val*=100;
		}
		return parseFloat(val);//返回这个计算后的样式的值
	}
	if(attr == "opacity") {//这是设置样式的代码就是传入三个参数的时候
		el.style.opacity = val/100;//这是正常版的
		//总结设置样式透明度传入*100后的整数
		el.style.filter = "alpha(opacity = "+val+")";//这是兼容IE的
	} else {//设置的样式不是透明度的时候
		el.style[attr] = val + "px";//传入的元素的样式的值单位为像素
	}
}



//带回调的多样式运动框架

//el改变的元素 target改变元素的对象例如{width:300,opacity:30} time运动时间type运动形式callBack回调函数
function mTween(el,target,time,type,callBack) {//带回调的多样式运动框架
			clearInterval(el.timer);//关闭 上一个的定时器
			var t = 0;			   // 当前执行次数
			var b = {}; 			  //初始值
			var c = {}; 			  // 为差值
			var d = time/20; 	//为执行次数 执行时间除以执行间隔
			for(var s in target) {	  //遍历target数组
				b[s] = css(el,s);  //获取元素的初始值给b数组的s属性 赋值当初始值
				c[s] = target[s] - b[s];//差值为传入的值- 计算后样式的值
			}
			el.timer = setInterval(function(){//走一个20ms的间隔定时器
				t++;                    //执行次数增加
				if(t>d) {			 //过界处理 执行次数大于了执行次数
					clearInterval(el.timer);//停止定时器
					callBack&&callBack();
					 //回调函数 动画执行完了以后，要执行的内容 ，类型 function	
				} else {
					for(var s in target) {//遍历函数target  运动路线的值
						var val = Tween[type](t,b[s],c[s],d);
						css(el,s,val);//传入改变样式
					}
				}
			},20);
		}

//抖动函数框架
function toShake(el,attr,second,callBack){// el抖动元素 attr改变的样式second抖动次数
			if(el.shake){//如果定时器在执行,证明在抖动中就不再执行新的抖动
				return;
			}
			var arr = [];//数组记录改变幅度的
			var b = css(el,attr);//现在的要改变样式的计算后样式
			var nub = 0;	     //记录抖动次数的变量
			for(var i = second-1; i >= 0; i--){//循环给数组添加改变量
				i%2?arr.push(i):arr.push(-i);
				//如果能被2整除就添加正i否则添加-i
				//数组就变成arr = [0,-1,2,-3....]
			}
			el.shake = setInterval(//开启一个定时器 用el.shake记录
				function(){
					if(nub >= second){//如果执行次数大于输入执行的次数
						clearInterval(el.shake);//停止定时器
						callBack&&callBack();//如果有回调函数再走回调函数
					} else {
						var val = b + arr[nub];// 设置变量算出每次改变的值
						css(el,attr,val);	//这是调用上面改变样式的函数
						nub++;//没执行一次就记录一次
					}
				},40//定时器间隔
			);
		}


function M(sele) {//获取元素的框架可直接传入任何形式
			var first = sele.substr(0,1);// 截取的一位
			var isArr = sele.split(' ');  // 用空格把字符串转化成数组
			if(first === '#' && isArr.length == 1){  
			//如果传进来的第一位带#证明是id 切 数组长度为一证明传进来了一位并且没有 子集选择
				return document.getElementById(sele.substr(1));//返回Id查找方法
			}else{//from 把一个类数组转换为真正的数组  
				var arr = Array.from(document.querySelectorAll(sele));
				return arr.length == 1 ? arr[0] : arr;
			}
		}
		//M('#wrap');
		//console.log(M('#wrap'))
		
//——————————下面是不涉及时间的运动关于速度运动框架———————


//带回调的多样式运动一起结束的匀速运动函数,根据改变样式差值最大的那个计算速度
function linearMove(el,target,speed,callBack){//el是元素target是运动的样式为对象{}speed是每次数值改变多少
	clearInterval(el.timer);//执行前先关闭定时器
	var d = 0;			//记录计算出来的的需要执行的总次数
	var t = 0;			//记录执行了多少次的
	var speeds = {};		//对象记录
	for(var s in target){	//遍历传参进来的对象
		var now = css(el,s);	//记录元素的对应样式的初始值
		var dis = target[s] - now;//计算出要改变样式的差值
		var sD = Math.ceil(Math.abs(dis/speed));//求运动次数  差值除以每次运动量 绝对值 取最大值向上取整  
		d = Math.max(d,sD);//返回最大值 运动次数最大的那个数
	}
	for(var s in target){//遍历传进来的对象
		var now = css(el,s);  //记录元素的对应样式的初始值
		var dis = target[s] - now; //计算出要改变样式的差值
		speeds[s] = dis/d;    //对象记录每个样式每次需要改变的数值
		//差值 除以最大的执行次数
	}
	el.timer = setInterval(function(){			//开启定时器
		t++;								//执行次数增加
		if(t >= d){							//定时器关闭条件
			clearInterval(el.timer);
			for(var s in target){//遍历传进来的对象
				var now = css(el,s);//再次记录传进来样式的当前值
				now = target[s];//每次都执行了计算出来对应的差值
				css(el,s,now);//进行修改样式操作
			}
			callBack&&callBack();//如果回调函数存在就执行回调函数
		}else{
			for(var s in target){//遍历传进来的对象
				var now = css(el,s);//再次记录传进来样式的当前值
				now += speeds[s];//每次都执行了计算出来对应的差值
				css(el,s,now);//进行修改样式操作
			}
		}
		
	},20);
}	

//这是先快后慢的减速运动形式
function jiansu(el,attr,target,AC){//el元素attr样式target目标点AC是减速系数0-1之间越小越慢
	clearInterval(el.timer);//先关闭定时器
	el.timer = setInterval(function(){//开启定时器
		var now = css(el,attr);//先记录初始的样式
		var speed = (target - css(el,attr))*AC;	//目标点减去当前的 再乘以运动的系数 
		if( Math.abs(target - now) < 2){//差值小于2时直接就让他到目标点 避免误差
			clearInterval(el.timer);  //到目标点关闭定时器
			now = target;//记录当前的位置 为目标点
			css(el,attr,now);//直接改变最后的位置到目标点
		} else {
			now += speed;//每次的speed都有变化所以记录当前值
			css(el,attr,now);//改变元素的位置到 新计算的位置
		}
	},20);
}


//------------------------------------- 单独的拖拽函数--------------------------------
//调用之间传入元素的id名字就行下面会自行获取     Drag('div2');
//拖拽函数框架		
function Drag1(id){
	var obj = document.getElementById(id);
	obj.addEventListener('mousedown',fnDown);
	function fnDown(ev){
		var disX = ev.pageX - obj.offsetLeft;
		var disY = ev.pageY - obj.offsetTop;
		
		document.addEventListener('mousemove',fnMove);
		document.addEventListener('mouseup',fnUp);
		
		function fnMove(ev){
			var l = ev.pageX - disX;
			var t = ev.pageY - disY;	
			//这里可以写入限制范围的if判断
			// if(l < 0){
			// 	l = 0;
			// }else if(l > document.documentElement.clientWidth - obj.clientWidth){
			// 	l = document.documentElement.clientWidth - obj.clientWidth;	
			// }
			// if(t < 50){//磁力吸附；还没到顶边就强行拉到顶边。
			// 	t = 0;
			// }else if(t > document.documentElement.clientHeight - obj.clientHeight){
			// 	t = document.documentElement.clientHeight - obj.clientHeight;
			// }
			obj.style.left = l + 'px';
			obj.style.top = t + 'px';
		}
		function fnUp(){
			document.removeEventListener('mousemove',fnMove);
			document.removeEventListener('mouseup',fnUp);
		}				
		ev.preventDefault();//阻止默认行为
	}
}

//---------------------------------------拖拽和碰撞函数 都在一起了--------------------
/*单独拖拽调用：
		Drag({
			id:'div1'
		});
碰撞调用方法：
参数含义： 	id:要拖拽的id
				id2:要碰撞的元素id
				fnDuang:碰到之后做什么的函数
				fnNoDuang：没碰到的时候做什么的函数
				function fn1(a) //形式上的参数：形参
				fn1(1) //实实在在的参数：实参

	
调用写法：Drag({
				id:'div1',
				fnDuang:function(o1,o2){
		//这两个形参不用管o1为拖拽的元素o2为碰到的元素
					o1.className = 'c4';
				},
				id2:'div2',
				fnNoDuang:function(o1,o2){
					o1.className = 'c3';
				}
			});
 */
function Drag(json){
	var settings = {
		id:json.id,
		id2:json.id2,
		fnDuang:json.fnDuang,
		fnNoDuang:json.fnNoDuang
	}


	
	// var obj = document.getElementById(settings.id);
	// var obj2 = document.getElementById(settings.id2);
	var obj = settings.id;
	var obj2 =settings.id2;
	//记得变回来  现在传元素进来就行不用传id了
	
	
	obj.addEventListener('mousedown',fnDown);
	function fnDown(ev){
		var disX = ev.pageX - obj.offsetLeft;//这是按下时的点于元素左边框的差值
		var disY = ev.pageY - obj.offsetTop;//这是按下时的点于元素上边框的差值
		
		document.addEventListener('mousemove',fnMove);//鼠标移动事件绑定函数
		document.addEventListener('mouseup',fnUp);//鼠标抬起事件绑定函数
		
		function fnMove(ev){//鼠标移动事件绑定函数
			obj.style.left = ev.pageX - disX + 'px';
			obj.style.top = ev.pageY - disY + 'px';	
			//如果传入一个obj2 并且 obj2要是个元素 并且 碰到了
			if(obj2 && obj2.nodeType === 1 && duang(obj,obj2)){
				//fnDuang是不是一个函数
				if(settings.fnDuang && typeof settings.fnDuang === 'function'){
					settings.fnDuang(obj,obj2);
				}
			}else{
				//要传入一个fnNoDuang为真 并且 fnNoDuang为函数
				if(settings.fnNoDuang && typeof settings.fnNoDuang === 'function'){
					settings.fnNoDuang(obj,obj2);
				}
			}	
		}
		function fnUp(){//鼠标抬起事件绑定函数
			document.removeEventListener('mousemove',fnMove);//解除事件绑定函数
			document.removeEventListener('mouseup',fnUp);//解除事件绑定函数
		}				
		ev.preventDefault();//阻止默认行为
	}
}	
//------------------------------------这是碰撞函数 上面的这个函数也用了--------------------------------
//碰到了返回true没碰到返回false   和上面的一起用  也可以单独用
//注意函数的返回值是  true  和 false   调用duang(obj1,obj2)
function duang(obj1,obj2){
	var l1 = obj1.offsetLeft;
	var t1 = obj1.offsetTop;
	var b1 = t1 + obj1.offsetHeight;
	var r1 = l1 + obj1.offsetWidth;
	
	var l2 = obj2.offsetLeft;
	var t2 = obj2.offsetTop;
	var b2 = t2 + obj2.offsetHeight;
	var r2 = l2 + obj2.offsetWidth;
	
	if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2){
		//没碰到
		return false;
	}else{
		//碰到了
		return true;
	}
}
//------------------------------------拖拽和碰撞函数结束-----------------------------------------

//-------------------------search 获取函数  和hash -----------------------

// var search = window.location.search.substr(1);//从第一位截取
// var hash = window.location.hash.substr(1).split('=')[1] || 1;//设置默认的哈希
// var lx = getSearchValue('s') || 'sh';//记录search  确定类型 的变量默认为 社招
//hash = window.location.hash.substr(1).split('=')[1];

//调用方法  getSearchValue(key);参数key代表 你的那个 search 是什么就传什么
//比如file:///E:/A0/content.html?s=xy#page=5     s就是这个参数getSearchValue(s);
//他的返回值是这个页面的search值
// 获取search列表的值
function getSearchValue(key) {
    var val = '';
    if(!search){//没有search值时 返回 false
        return false;
    }
    if (search.indexOf('&') != -1) {//查看是否有多个search值 有的话
        var arr = search.split('&');//用&号分隔字符串 用数组记录
        arr.forEach((item, i) => {
            var arr = item.split('=');
            if (arr[0] == key) {
               val = arr[1]
            }
        });
    } else {//这是只有一个search值时
        var arr = search.split('=');
        if (arr[0] == key) {
            val =  arr[1];//返回这个值
        }
    }
     return val;//返回这个值
}

//-----------------------------------------------滚轮事件---------------------------------------------------------
// 兼容 火狐的函数  正常的事chrom和IE兼容  
//调用方法
// myWheel(box,function(o){//o 是一个开关在函数里返回了 true 就是上滚轮
// 		if(o){
// 			//向上滚动
			
// 		}else{
// 			//向下滚动
// 	});

function myWheel(obj,callback){//参数是1 事件元素 2 滚轮要执行的事件函数
	// if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
	// 	//ff就要走DOMMouseScroll
	// 	document.addEventListener('DOMMouseScroll',fn1);
	// }else{
	// 	//chrome就要走mousewheel
	// 	document.addEventListener('mousewheel',fn1);
	// }
	obj.addEventListener('DOMMouseScroll',whellFn);//ff就要走DOMMouseScroll
	obj.addEventListener('mousewheel',whellFn);//chrome就要走mousewheel
	function whellFn(ev){
		var down = true;//代理判断上下的开关
		if(ev.wheelDelta){//如果支持ev.wheelDelta说明不是火狐
			//如果ev.wheelDelta大于0,说明向上true，否则向下false
			down = ev.wheelDelta > 0 ? true : false;
		}else{//这是火狐的
			//ev.detail小于0为向上，大于0向下 
			down = ev.detail < 0 ? true : false;
		}
		if(callback && typeof callback === 'function'){
			callback(down);
		}
		ev.preventDefault();
	}
}

//-------------------getByclassName()可以找到含多个名字的 也兼容IE-------------
//参数1 是要找的class名字参2是要找的元素的父级  可以写可以不写 调用方法getByClass('li',ul2)

	function getByClass(cName,parent){
		parent = parent?parent:document;
		//找到所有的元素
		if(parent.getElementsByClassName){//高版本浏览器
			return parent.getElementsByClassName(cName);
		}else{//低版本
			var aEle = parent.getElementsByTagName('*');
			var arr = [];//存已经找到的元素
			for(var i=0;i<aEle.length;i++){
				//为了避免一个元素上有多个class,所以用空格分开['li','active']
				var re = new RegExp('\\b'+cName+'\\b','g');//正则边界符
			    //var re = new RegExp('(^|\\s)'+cName+'(\\s|$)','g');//正则空格
				if(re.test(aEle[i].className)){
					arr.push(aEle[i]);
				}
			}
			return arr;
		}
	}


//------------------------阻止赋址的深度克隆方法----------------------------
	// var arr = [1,2,3,4,[1,2],function abc(){},{name:'momo'}];
	// var arr2 = clone(arr);//调用这个递归的克隆函数
	
	// 调用的方法 clone(arr);  参数是 要克隆的数组或对象
	function clone(obj){
		var o = !!obj.push?[]:{};//用有没有push方法判断是数组还是对象
		for(var attr in obj){
			if(typeof obj[attr] == 'object'){
				o[attr] = extend(obj[attr]);//里面的子项是对象就递归
			}else{
				o[attr] = obj[attr];
			}
		}
		return o;//把克隆好的对象返回去
	}


//--------------------------------克隆原型方法的函数---------------
//调用方法clone(Move,Move2);
//
function clone(P,N){//P是父级prototype N是新的原型  
    for(var s  in P.prototype){
        if(P.prototype.hasOwnProperty(s)){
            N.prototype[s] = P.prototype[s];
        }
    }
}











































































