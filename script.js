enchant();
window.onload = function(){
	var game = new Game(1000 , 1000);
	
	game.preload('murasame1.png');
	game.onload = function(){
		var scene = new Scene();
		var sprite = new Sprite(300,225);
		sprite.image = game.assets['murasame1.png'];
		scene.addChild(sprite);
		game.pushScene(scene);
		
	};
	game.start();
}
