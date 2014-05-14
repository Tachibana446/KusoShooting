enchant();
window.onload = function(){
	// ゲーム本体のオブジェクト
	var game = new Game(1000 , 1000);
	
	// ファイル名
	var imgDir = 'img-iphone5/';
	var fileName = {
		title : 'title.png'	 ,
		player : 'player.png',
		enemy : 'enemy.png'	 ,
		bullet : 'bullet.png'
	};
	
	// 画像のプリロード
	for(var i in fileName){
		fileName[i] = imgDir + fileName[i];
		game.preload( fileName[i] );
	}
	
	// 画面サイズ
	var W = 1136;
	var H = 640;
	// 自機などの正方形のサイズ
	var L = 96;

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
		var titleSprite = new Sprite(W,H);
		titleSprite.image = game.assets[ fileName['title'] ];
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
		game.fps = 15;
		// スケール
		game.scale = 1;

		// --プレイヤー--
		//　自分の位置
		var player = new Sprite(L,L);
		player.x = W / 2; player.y = H - L;
		player.image = game.assets[ fileName['player'] ];	
		var sFlag = false;	// 攻撃中かどうかのフラグ
		shooting.addChild(player);

		// --自分の弾--
		var bullet = new Sprite(L,L);
		bullet.x = 0; bullet.y = 0;
		bullet.image = game.assets[ fileName['bullet'] ];
		var bulletAtk = 10;	// 攻撃力	

		// --敵--
		var enemy = new Sprite(L,L);
		enemy.x = L; enemy.y = 0;
		enemy.image = game.assets[ fileName['enemy'] ];
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
				if(player.x > W - L ) player.x = W - L;
			}
			if(game.input.a && !sFlag){
					bullet.x = player.x;
					bullet.y = player.y;
					shooting.addChild(bullet);
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
			if(enemy.x > W - L) enemy.x = W - L;
			if(!esFlag){
				esFlag = true;
			}
			if(eHP < 0){
				score = 110 - shootNum;
				game.popScene();
				game.pushScene(result);
			}
		});

		// 弾のイベント
		bullet.addEventListener('enterframe' , function(){
			bullet.y -= 30;
			if(bullet.y < 0){
				shooting.removeChild(bullet);
				sFlag = false;
			}
			// 衝突判定
			if(bullet.intersect(enemy)){
				console.log("hit!",eHP);
				eHP -= bulletAtk;
				shooting.removeChild(bullet);
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
		result.addChild(resultLabel);

		// ゲームの開始
		game.pushScene(title);
		
	};
	game.start();
}
