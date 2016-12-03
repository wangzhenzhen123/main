function Animate(name,type){
	this.name=name;
	this.type=type;
}

Animate.prototype.say=function(){
	alert("我是"+this.name);
}

Animate.prototype.sport=function(){
	alert("hello");
}
var cat=new Animate("Kitty","猫");

var dog=new Animate("gougou","狗");