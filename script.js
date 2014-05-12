enchant();
window.onload = function(){
	var game = new Game(1000 , 1000);
	
	game.preload('img/title1000-1000.png','img/player.png','img/tama.png');

	game.onload = function(){
		// タイトル画面シーン
		var title = new Scene();
		// なんか次のシーン
		var novel = new Scene();
		// ゲーム（？）シーン
		var shooting = new Scene();		

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
		label.addEventListener('touchend', function(){
			game.popScene();
			game.pushScene(shooting);
		});
		novel.addChild(label);

		//---シューティングっぽい奴---		
		// 攻撃ボタンのバインド
		game.keybind('Z'.charCodeAt(0),'a');
		// 攻撃中かどうかのフラグ
		var sFlag = false;

		// --プレイヤー--
		//　自分の位置
		var player = new Sprite(100,100);
		player.x = 500; player.y = 900;
		player.image = game.assets['img/player.png'];
		shooting.addChild(player);

		// --自分の玉--
		var tama = new Sprite(50,50);
		tama.x = 0; tama.y = 0;
		tama.image = game.assets['img/tama.png'];
		
		// プレイヤーのイベント
		player.addEventListener('enterframe' , function(){
			if(game.input.left){
				player.x -= 50;
				if(player.x < 0) player.x = 0;
			}
			if(game.input.right){
				player.x += 50;
				if(player.x > 1000) player.x = 1000;
			}
			if(game.input.a && !sFlag){
					tama.x = player.x;
					tama.y = player.y;
					shooting.addChild(tama);
					sFlag = true;
			}
		});

		// 弾のイベント
		tama.addEventListener('enterframe' , function(){
			tama.y -= 40;
			if(tama.y < 0){
				shooting.removeChild(tama);
				sFlag = false;
			}
		});

		// ゲームの開始
		game.pushScene(title);
		
	};
	game.start();
}
