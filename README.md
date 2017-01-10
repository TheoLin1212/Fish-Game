# Fish-Game
An esay game created by Canvas and Javascript.

Control Mom fish to eat fruits and feed baby fish. With level up, the number of fruits will decrease and the speed of it will increase. Join to make a new record!

游戏中用到的API: save、restore、beginPath、moveTo、quadraticCurveTo、stroke、drawImage、Math.atan2、translate、rotate、shadowBlur、shadowColor、fillText、fillStyle；Canvas中的API和css的API类型，如有需求查找相关方法即可。

学习思考：
1. canvas游戏的实质是依靠window.requestAnimationFrame（gameLoop）进行不断的循环，以一定时间的间隔不断的把持续渐进变化画面(类状态)重绘在canvas上，达到动画游戏的效果；全过程为首先调用init方法，里面初始化相关的类；再调用gameLoop，里面应该含有代码window.requestAnimationFrame（gameLoop）使其不断循环，然后含有各个物体类的draw和update方法，以及一些如碰撞等方法；deltaTime在游戏当中非常重要，通常变化数值会与之挂钩；
2. 物体：不同类型物体是不同的JavaScript类，一个物体类中至少含有this.x、this.y属性和init、draw方法来把物体描绘在canvas上，一般还会有num、alive等属性和update等方法，注意有些属性和方法应该写在obj.prototype上；物体池是用alive属性把真的obj描绘出来，假的obj不描绘，num属性用以确定此物体一共的个数；
3. 碰撞检测：利用两物体的x、y属性算出直线距离，若小于设定值，即判断为碰撞；
4. requestAnimationFrame优于setTimeout/setInterval的地方在于它是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销。


