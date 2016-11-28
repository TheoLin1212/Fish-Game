//wave methods below
var waveObj = function  () {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
	this.alpha = [];
}
waveObj.prototype.num = 10;
waveObj.prototype.init = function  () {
	for (var i = 0; i<this.num; i++) {
		this.alive[i] = false;
	}
}
waveObj.prototype.draw = function () {
	cxt1.save();
	cxt1.lineWidth = 1;
	cxt1.shadowBlur = 10;
	cxt1.shadowColor = "white";
	for (var i = 0; i<this.num; i++) {
		if (this.alive[i]) {
			this.r[i] += 0.5;
			this.alpha[i] -= 0.01;
			if (this.alpha[i]<0) {//这里不能==0
				this.alive[i] = false;
				break;//防止alpha变为负值然后显示不透明
			}
			cxt1.beginPath();
			cxt1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			cxt1.closePath();
			cxt1.strokeStyle = "rgba(255,255,255," + this.alpha[i] + ")";
			cxt1.stroke();
		}
	}
	cxt1.restore();
}

waveObj.prototype.born = function  (x,y) {
	for (var i = 0; i<this.num; i++) {
		if (!this.alive[i]) {
			this.alive[i] = true;
			this.r[i] = 20;
			this.alpha[i] = 1;
			this.x[i] = x;
			this.y[i] = y;
			return;
		}
	}
}

//helo methods below
var haloObj = function  () {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
//	this.alpha = [];
}
haloObj.prototype.num = 10;
haloObj.prototype.init = function  () {
	for (var i = 0; i<10; i++) {
		this.alive[i] = false;
	}
}
haloObj.prototype.draw = function  () {
	cxt1.save();
	cxt1.lineWidth = 1;
	cxt1.shadowBlur = 10;
	cxt1.shadowColor = "rgba(203,91,0,1)";
	for (var i = 0; i<10; i++) {
		if (this.alive[i]) {
			this.r[i] += 0.5;
			var alpha = 1 - this.r[i]/60
			if (alpha<0) {//这里不能==0
				this.alive[i] = false;
				break;//防止alpha变为负值然后显示不透明
			}
			cxt1.beginPath();
			cxt1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			cxt1.closePath();
			cxt1.strokeStyle = "rgba(203,91,0," + alpha + ")";
			cxt1.stroke();
		}
	}
	cxt1.restore();
}
haloObj.prototype.born = function  (x,y) {
	for (var i = 0; i<10; i++) {
		if (!this.alive[i]) {
			this.alive[i] = true;
			this.r[i] = 20;
//			this.alpha[i] = 1;
			this.x[i] = x;
			this.y[i] = y;
			return;
		}
	}
}