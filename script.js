enchant();
window.onload = function(){
	var game = new Game(1000 , 1000);
	
	game.preload('img/title1000-1000.png','img/player.png','img/tama.png','img/enemy.png');

	game.onload = function(){
		// タイトル画面シーン
		var title = new Scene();
		// なんか次のシーン
		var novel = new Scene();
		// ゲーム（？）シーン
		var shooting = new Scene();	
		// リザルトシーン
		var result = new Scene();	

		// タイトル画面のスプライト
		var titleSprite = new Sprite(1000,1000);
		titleSprite.image = game.assets['img/title1000-1000.png'];
		title.addChild(titleSprite);
		// タイトル画面のスプライトのイベント
		titleSprite.addEventListener('touchend',function(){
			game.popScene();
			game.pushScene(novel);
		});
		
		/*** 文字も出せる ***/

		// なんかラベル
		var label = new Label("超駅再ティんな３Dアクションクソゲー");
		var n = 0;
		label.x = 50; label.y = 500; label.height = 900; label.width = 900; label.font = "48px meiryo";
		label.addEventListener('touchend', function(){
			game.popScene();
			game.pushScene(shooting);
		});
		label.addEventListener('enterframe',function(){
			n += 1;
			if( n > 60){
				game.popScene();
				game.pushScene(shooting);
			}
		});
		novel.addChild(label);

		/*** シューティングっぽい奴 ***/
		// スコア変数
		var shootNum = 0; // 攻撃数
		var score = 0; // スコア
		
		// 攻撃ボタンのバインド
		game.keybind('Z'.charCodeAt(0),'a');
		// FPS
		game.fps = 30;
		// スケール
		game.scale = 1/2;

		// --プレイヤー--
		//　自分の位置
		var player = new Sprite(100,100);
		player.x = 500; player.y = 900;
		player.image = game.assets['img/player.png'];	
		var sFlag = false;	// 攻撃中かどうかのフラグ
		shooting.addChild(player);

		// --自分の玉--
		var tama = new Sprite(50,50);
		tama.x = 0; tama.y = 0;
		tama.image = game.assets['img/tama.png'];
		var tamaAtk = 10;	// 攻撃力	

		// --敵--
		var enemy = new Sprite(100,100);
		enemy.x = 10; enemy.y = 500;
		enemy.image = game.assets['img/enemy.png'];
		var esFlag = false;	// 攻撃中のフラグ
		var eHP = 100;		// ライフ
		shooting.addChild(enemy);

		// --スコアラベル--
		var scoreLabel = new Label("Enemy:"+eHP + "Shoot:" + shootNum);
		scoreLabel.x = 300; scoreLabel.y = 200;
		scoreLabel.font = "40px meiryo";
		shooting.addChild(scoreLabel);

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
					shootNum += 1;
			}
			scoreLabel.text = "Enemy:"+eHP + "Shoot:" + shootNum;
		});

		// 敵のイベント
		enemy.addEventListener('enterframe' , function(){
			var movement = [-50,-20,0,0,0,20,50];
			enemy.x += movement[ Math.floor(Math.random() * movement.length) ];
			if(enemy.x < 0) enemy.x = 0;
			if(enemy.x > 1000) enemy.x = 1000;
			if(!esFlag){
				esFlag = true;
			}
			if(eHP < 0){
				score = 110 - shootNum;
				game.popScene();
				eHP = 100;
				game.pushScene(result);
			}
		});

		// 弾のイベント
		tama.addEventListener('enterframe' , function(){
			tama.y -= 30;
			if(tama.y < 0){
				shooting.removeChild(tama);
				sFlag = false;
			}
			// 衝突判定
			if(tama.intersect(enemy)){
				console.log("hit!",eHP);
				eHP -= tamaAtk;
				shooting.removeChild(tama);
				sFlag = false;
			}
		});
	
		/*** リザルト ***/
		resultLabel = new Label();
		resultLabel.text = "あなたは"+String(shootNum)+"ｼｭｰｯ!で敵を倒しました。\nｳｰﾜﾔｯﾀｧｧｧｧｱｱｱｱ\n"
							+"スコア: "+ score;
		resultLabel.font = "28px meiryo";
		resultLabel.x = 20; 
		resultLabel.y = 20;
		resultLabel.height = 1000;
		resultLabel.addEventListener('enterframe',function(){
			n += 1;
			if( n > 90){
				n = 0;
				game.popScene();
				game.pushScene(title);	// 終わったらタイトルに戻る
			}
		});
		result.addChild(resultLabel);

		// ゲームの開始
		game.pushScene(title);
		
	};
	game.start();
}
