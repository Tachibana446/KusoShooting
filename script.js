enchant();
window.onload = function(){
	var game = new Game(1000 , 1000);
	
	game.preload('img/title1000-1000.png');
	game.onload = function(){
		var scene = new Scene();
		var sprite = new Sprite(1000,1000);
		sprite.image = game.assets['img/title1000-1000.png'];
		scene.addChild(sprite);
		game.pushScene(scene);
		
	};
	game.start();
}
