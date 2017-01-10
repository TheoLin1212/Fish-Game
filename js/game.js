var can1, can2, cxt1, cxt2, lastTime, deltaTime, canW, canH, backgroundImg;
var ane, fruits, momFish, babyFish, myX, myY, momTail, momEye, momBodyOra, momBodyBlu, babyTail, babyEye, babyBody;
var data, score, wavePool, haloPool, dust, dustPic, heart, level;

window.onload = function() {
	document.getElementById("play").addEventListener("click",function () {
		this.style.display = "none";
		document.getElementById("cover").style.display = "none";
		startGame();
	});
	
	document.getElementById("again").addEventListener("click", gameAgain);
}

function startGame () {
	init();
	lastTime = Date.now();
	gameLoop();
}

function init() {
	can1 = document.getElementById("canvas1"); //fish,dust,ui,circle
	can2 = document.getElementById("canvas2"); //bg,ane,fruits
	cxt1 = can1.getContext("2d");
	cxt2 = can2.getContext("2d");
	canW = can1.width;
	canH = can1.height;
	myX = canW * 0.5;
	myY = canH * 0.5;
	score = 0;
	level = 1;
	backgroundImg = new Image();
	backgroundImg.src = "img/src/background.jpg";

	ane = new aneObj();
	ane.init();
	fruits = new fruitObj();
	fruits.init();
//	console.log(Object.getOwnPropertyDescriptor(fruits,"num"));
	momFish = new momFishObj();
	momFish.init();
	babyFish = new babyFishObj();
	babyFish.init();
	data = new dataObj();

	wavePool = new waveObj();
	wavePool.init();

	haloPool = new haloObj();
	haloPool.init();

	heart = new heartObj();
	heart.init();

	momBodyBlu = [];
	momBodyOra = [];
	for(var i = 0; i < 8; i++) {
		momBodyBlu[i] = new Image();
		momBodyOra[i] = new Image();
		momBodyBlu[i].src = "img/src/bigSwimBlue" + i + ".png";
		momBodyOra[i].src = "img/src/bigSwim" + i + ".png";
	}

	momEye = [];
	for(var i = 0; i < 2; i++) {
		momEye[i] = new Image();
		momEye[i].src = "img/src/bigEye" + i + ".png";
	}

	momTail = [];
	for(var i = 0; i < 8; i++) {
		momTail[i] = new Image();
		momTail[i].src = "img/src/bigTail" + i + ".png";
	}

	babyTail = [];
	for(var i = 0; i < 8; i++) {
		babyTail[i] = new Image();
		babyTail[i].src = "img/src/bigTail" + i + ".png";
	}

	babyEye = [];
	for(var i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		babyEye[i].src = "img/src/babyEye" + i + ".png";
	}

	babyBody = [];
	for(var i = 0; i < 20; i++) {
		babyBody[i] = new Image();
		babyBody[i].src = "img/src/babyFade" + i + ".png"
	}

	dustPic = [];
	for(var i = 0; i < 7; i++) {
		dustPic[i] = new Image();
		dustPic[i].src = "img/src/dust" + i + ".png";
	}
	dust = new dustObj();
	dust.init();

	can1.addEventListener("mousemove", mouseMove, false);

	cxt1.fillStyle = "white";
	cxt1.font = "20px Verdana";
	cxt1.textAlign = "center";
}

function gameLoop() {
	window.requestAnimationFrame(gameLoop);
	drawBg();
	var now = Date.now();
	deltaTime = now - lastTime;
	deltaTime = deltaTime > 18 ? 18 : deltaTime;
	lastTime = now;

	ane.draw();

	heart.update();
	heart.draw();

	fruits.update();
	fruits.draw();

	cxt1.clearRect(0, 0, canW, canH);
	momFish.draw();
	babyFish.draw();
	data.draw();
	wavePool.draw();
	haloPool.draw();
	dust.draw();

	eatFruits();
	momTouchBaby();
	//	console.log(deltaTime);
}

function drawBg() { //这里可以用drwaImage方法代替,一定要注意要在img.onload中运行，不然图片出不来. 但是这里需要多次调用方法，onload只能执行一次，所以不能用，这里在较前处加载图片防止出不来。
	cxt2.drawImage(backgroundImg, 0, 0, canW, canH);
	//	backgroundImg.onload = function() {
	//		//		var myPattern = cxt2.createPattern(backgroundImg, "no-repeat");
	//		//		cxt2.fillStyle = myPattern;
	//		//		cxt2.fillRect(0, 0, 800, 600);
	//		cxt2.drawImage(backgroundImg, 0, 0, canW, canH);
	//	}
}

//ane methods as below
var aneObj = function() {
	this.rootX = [];
	this.headX = [];
	this.headY = [];
	this.alpha = 0;
	this.amp = [];
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.rootX[i] = i * 16 + Math.random() * 20;
		this.headY[i] = canH - 250 + Math.random() * 70;
		this.amp[i] = Math.random() * 50 + 20;
	}
}
aneObj.prototype.draw = function() {
	this.alpha += 0.01;
	var l = Math.sin(this.alpha);
	cxt2.save();
	cxt2.globalAlpha = 0.6;
	cxt2.lineWidth = 20;
	cxt2.lineCap = "round";
	cxt2.strokeStyle = "#3b154e";
	for(var i = 0; i < this.num; i++) {
		cxt2.beginPath();
		cxt2.moveTo(this.rootX[i], canH);
		this.headX[i] = this.rootX[i] + l * this.amp[i];
		cxt2.quadraticCurveTo(this.rootX[i], canH - 100, this.headX[i], this.headY[i]);
		//		cxt2.closePath();//有closePath就不能出现圆形的linecap；
		cxt2.stroke();
	}
	cxt2.restore();
}

//fruits methods below
var fruitObj = function() {
	this.alive = [];
	this.x = [];
	this.y = [];
	this.aneNum = [];
	this.l = [];
	this.spd = [];
	this.fruitType = [];
	this.orange = new Image();
	this.blue = new Image();
//	this.num;
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {
	for(var i = 0; i < this.num / 2; i++) {
		this.alive[i] = true;
		this.born(i);
	}
	this.orange.src = "img/src/fruit.png";
	this.blue.src = "img/src/blue.png";
}
fruitObj.prototype.draw = function() {
	for(var i = 0; i < this.num; i++) {
		if(this.alive[i]) {
			if(this.l[i] < 20) {
				this.l[i] += this.spd[i] / 10 * deltaTime;
				var num = this.aneNum[i];
				this.x[i] = ane.headX[num];
				this.y[i] = ane.headY[num];
			} else {
				this.y[i] -= this.spd[i] * deltaTime;
			}
			if(this.fruitType[i] === "orange") {
				cxt2.drawImage(this.orange, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
			} else {
				cxt2.drawImage(this.blue, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
			}
			if(this.y[i] < 0) {
				this.alive[i] = false;
			}
		}
	}
}
fruitObj.prototype.update = function() {
	var num = 0;
	for(var i = 0; i < this.num; i++) {
		if(this.alive[i]) {
			num++;
		}
	}
//	console.log(this.num);
	if(num < this.num / 2) {
		for(var i = 0; i < this.num; i++) {
			if(!this.alive[i]) {
				this.born(i);
				this.alive[i] = true;
				return;
			}
		}
	}
}
fruitObj.prototype.born = function(i) {
	this.aneNum[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.spd[i] = Math.random() * 0.05 + 0.05 * level;
	if(Math.random() < 0.15) {
		this.fruitType[i] = "blue";
	} else {
		this.fruitType[i] = "orange";
	}
}

//mother fish methods below
var momFishObj = function() {
	this.x;
	this.y;
	this.angle;
	this.momTailTimer = 0;
	this.momTailCount = 0;
	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;
	this.momBodyCount = 0;
}

momFishObj.prototype.init = function() {
	this.x = canW * 0.5;
	this.y = canH * 0.5;
	this.angle = 0;
}

momFishObj.prototype.draw = function() {
	this.x = lerpDistance(myX, this.x, 0.98);
	this.y = lerpDistance(myY, this.y, 0.98);

	var deltaX = myX - this.x,
		deltaY = myY - this.y;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;
	this.angle = lerpAngle(beta, this.angle, 0.6);

	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50) {
		this.momTailTimer %= 50;
		this.momTailCount += 1;
		if(this.momTailCount == 8) {
			this.momTailCount = 0;
		}
	}

	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer > this.momEyeInterval) {
		this.momEyeCount += 1;
		this.momEyeTimer %= this.momEyeInterval;
		if(this.momEyeCount == 2) {
			this.momEyeCount = 0;
		}
		if(this.momEyeCount == 0) {
			this.momEyeInterval = Math.random() * 2000 + 2000;
		} else {
			this.momEyeInterval = 150;
		}
	}

	cxt1.save();
	cxt1.translate(this.x, this.y);
	cxt1.rotate(this.angle);
	if(data.double == 2) {
		cxt1.drawImage(momBodyBlu[this.momBodyCount], -momBodyBlu[this.momBodyCount].width * 0.5, -momBodyBlu[this.momBodyCount].height * 0.5);
	} else {
		cxt1.drawImage(momBodyOra[this.momBodyCount], -momBodyOra[this.momBodyCount].width * 0.5, -momBodyOra[this.momBodyCount].height * 0.5);
	}
	cxt1.drawImage(momEye[this.momEyeCount], -momEye[this.momEyeCount].width * 0.5, -momEye[this.momEyeCount].height * 0.5);
	cxt1.drawImage(momTail[this.momTailCount], -momTail[this.momTailCount].width * 0.5 + 30, -momTail[this.momTailCount].height * 0.5);
	cxt1.restore();
}

function mouseMove(e) {
	if(data.gameOver) {
		return;
	}
	if(e.offsetX || e.layerX) {
		myX = e.offsetX == undefined ? e.layerX : e.offsetX;
		myY = e.offsetY == undefined ? e.layerY : e.offsetY;
		//		console.log(myX);
	}
}

//momfish eat fruits method
function eatFruits() {
	if(data.gameOver) {
		return;
	}
	for(var i = 0; i < fruits.num; i++) {
		if(!fruits.alive[i]) {
			break;
		}
		var dis = calLength2(fruits.x[i], fruits.y[i], momFish.x, momFish.y);
		if(dis < 900) {
			fruits.alive[i] = false;
			data.fruitNum++;
			momFish.momBodyCount++;
			if(momFish.momBodyCount > 7) {
				momFish.momBodyCount = 7;
			}
			if(fruits.fruitType[i] == "blue") {
				data.double = 2;
			} else {
				data.double = 1;
			}
			wavePool.born(fruits.x[i], fruits.y[i]);
			data.score = data.fruitNum * data.double * 100;
		}
	}
}

//baby fish methods below
var babyFishObj = function() {
	this.x;
	this.y;
	this.angle;
	this.babyTailTimer = 0;
	this.babyTailCount = 0;
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}

babyFishObj.prototype.init = function() {
	this.angle = 0;
	this.x = canW * 0.5;
	this.y = canH * 0.5;
}

babyFishObj.prototype.draw = function() {
	this.x = lerpDistance(momFish.x, this.x, 0.995);
	this.y = lerpDistance(momFish.y, this.y, 0.995);

	var deltaX = momFish.x - this.x,
		deltaY = momFish.y - this.y;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;
	this.angle = lerpAngle(beta, this.angle, 0.9);

	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50) {
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}

	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval) {
		this.babyEyeTimer %= this.babyEyeInterval;
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		if(this.babyEyeCount == 0) {
			this.babyEyeInterval = Math.random() * 2000 + 1500;
		} else {
			this.babyEyeInterval = 150;
		}
	}

	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 300) {
		this.babyBodyTimer %= 300;
		this.babyBodyCount += 1;
		if(this.babyBodyCount > 19) {
			this.babyBodyCount = 19;
			data.gameOver = true;
		}
	}

	cxt1.save();
	cxt1.translate(this.x, this.y);
	cxt1.rotate(this.angle);
	cxt1.drawImage(babyTail[this.babyTailCount], 11, -18, 27, 37);
	cxt1.drawImage(babyBody[this.babyBodyCount], -babyBody[this.babyBodyCount].width * 0.5, -babyBody[this.babyBodyCount].height * 0.5);
	cxt1.drawImage(babyEye[this.babyEyeCount], -babyEye[this.babyEyeCount].width * 0.5, -babyEye[this.babyEyeCount].height * 0.5);
	cxt1.restore();
}

function momTouchBaby() {
	if(data.gameOver) {
		return;
	}
	var l = calLength2(momFish.x, momFish.y, babyFish.x, babyFish.y);
	if(l < 900) {
		if(data.fruitNum == 0) {
			return;
		}
		var x = (momFish.x + babyFish.x) * 0.5,
			y = (momFish.y + babyFish.y) * 0.5;
		haloPool.born(x, y);
		babyFish.babyBodyCount = 0;
		score += data.score;
		data.reset();
	}
}

//data class 
var dataObj = function() {
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0.0;
}
dataObj.prototype.reset = function() {
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	momFish.momBodyCount = 0;
}
dataObj.prototype.draw = function() {
	var a = Math.floor(score / 1000);
	if (a) {
		level = a+1;
		fruits.num = 30 - a * 2;
	}
	cxt1.save();
	cxt1.shadowBlur = 10;
	cxt1.shadowColor = "black";
	cxt1.fillText("score: "+score, canW * 0.5, canH - 50);
	cxt1.fillText("level: " + level, canW * 0.5, canH - 100);
	if(this.gameOver) {
		if(this.alpha < 0.8) {
			this.alpha += 0.01;
		}
		cxt1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
		cxt1.font = "50px Verdana";
		cxt1.fillText("Game Over", canW * 0.5, 200);
		cxt1.font = "20px Verdana";
		cxt1.fillText("总得分为：" + score, canW * 0.5, 250);
		document.getElementById("again").style.display = "block";
	}
	cxt1.restore();
}

//dust methods below
var dustObj = function() {
	this.x = [];
	this.y = [];
	this.amp = [];
	this.no = [];
	this.alpha;
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.x[i] = Math.random() * canW;
		this.y[i] = Math.random() * canH;
		this.amp[i] = Math.random() * 15 + 20;
		this.no[i] = Math.floor(Math.random() * 7);
		this.alpha = 0;
	}
}
dustObj.prototype.draw = function() {
	this.alpha += 0.01;
	var l = Math.sin(this.alpha);
	for(var i = 0; i < this.num; i++) {
		cxt1.drawImage(dustPic[this.no[i]], this.x[i] + l * this.amp[i], this.y[i]);
	}
}

//heart method below
var heartObj = function() {
	this.alive = [];
}
heartObj.prototype.num = 5;
heartObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.alive[i] = true;
	}
}
heartObj.prototype.draw = function() {
	for(var i = 0; i < 5; i++) {
		cxt2.save();
		if(!this.alive[i]) {
			cxt2.globalAlpha = 0;
		}
		cxt2.translate(50 * i, 0);
		cxt2.scale(0.4, 0.4);
		cxt2.beginPath();
		cxt2.moveTo(75, 40);
		cxt2.bezierCurveTo(75, 37, 70, 25, 50, 25);
		cxt2.bezierCurveTo(20, 25, 22, 62.5, 22, 55);
		cxt2.bezierCurveTo(20, 80, 40, 102, 75, 120);
		cxt2.bezierCurveTo(110, 102, 130, 80, 128, 55);
		cxt2.bezierCurveTo(128, 55, 130, 25, 100, 25);
		cxt2.bezierCurveTo(85, 25, 75, 37, 75, 40);
		cxt2.closePath();
		cxt2.fillStyle = "red";
		cxt2.strokeStyle = "white";
		cxt2.fill();
		cxt2.stroke();
		cxt2.restore();
	}
}
heartObj.prototype.update = function() {
	var num = Math.floor((babyFish.babyBodyCount + 1) / 4);
	for(var i = 0; i < this.num; i++) {
		this.alive[i] = true;
	}
	for(var i = 0, heartsNum = 4; i < num; i++, heartsNum--) {
		this.alive[heartsNum] = false;
	}
}

function gameAgain () {
	data.gameOver = false;
	babyFish.babyBodyCount = 0;
	
	babyFish.x = canW * 0.5;
	babyFish.y = canH * 0.5;
	
	momFish.x = canW * 0.5;
	momFish.y = canH * 0.5;
	
	score = 0;
	data.reset();
	
	document.getElementById("again").style.display = "none";
	
	fruits.num = 30;
	level = 1 ;
	fruits.init();
}
