enchant();
window.onload = function(){
	var game = new Game(1000 , 1000);
	
	game.preload('img/title1000-1000.png');
	game.onload = function(){
		// タイトル画面シーン
		var title = new Scene();
		// なんか次のシーン
		var novel = new Scene();
		
		// タイトル画面のスプライト
		var titleSprite = new Sprite(1000,1000);
		titleSprite.image = game.assets['img/title1000-1000.png'];
		title.addChild(titleSprite);
		// タイトル画面のスプライトのイベント
		titleSprite.addEventListener('touchend',function(){
			game.popScene();
			game.pushScene(novel);
		});
		
		// なんかラベル
		var label = new Label("超駅再ティんな３Dアクションクソゲー");
		label.x = 50; label.y = 500; label.height = 900; label.width = 900; label.font = "48px meiryo";
		novel.addChild(label);
		// ゲームの開始
		game.pushScene(title);
		
	};
	game.start();
}
