var requestAnimationFrame = 
      window.requestAnimationFrame || 
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame || 
      window.msRequestAnimationFrame; 

window.onload = setup;
	AppState = 
	{
		LOGO : 0,
		MENU : 1,
		GAME : 2
	}
	
	actualAppState = AppState.MENU;
	
	var canvas;
	var ctx;
	
	var screen_width = window.innerWidth;
	var screen_height = window.innerHeight;
	var player;
	player = new Player(screen_width/2, screen_height/1.777, screen_width, screen_height);
	switch_b = new SwitchButton(screen_width,screen_height);
	retry_b = new RetryButton(screen_width,screen_height);
	return_b = new ReturnButton(screen_width, screen_height);
	volume_b = new VolumeButton(screen_width, screen_height, 20, 20);
	
	volume_bMenuX = screen_width - 20 - volume_b.width;
	volume_bMenuY = screen_height - 20 - volume_b.height;
	volume_bGameX = 20;
	volume_bGameY = 20;
	
	sky = new Sky(screen_width, screen_height);
	
	var redbullet;
	var blubullet;
	var redbullet2;
	var blubullet2;
	
	var scoreTextImage;
	
	var projectiles = [];
	var createBulletID;
	
	var previousDate;
	var deltaTime = 0;
	
	var score = 0;
	
	var isGameOver = false;
	
	var mouse_pressed = false;
	var mouse_x = 0;
	var mouse_y = 0;
	
	var tutorialImage;
	var menuBGImg;
	var soundEnabled = true;
	var bShowCredits = false;
	var bShowTutorial = false;
	
	//MENU
	
	var titleSprite;
	//                                 X                                         Y                  WIDTH             HEIGHT              SPRITE W/H
	var menu_play =    new MenuButton((screen_width/2) - ((screen_width*0.7)/2), screen_height/3.1, screen_width*0.7, screen_height*0.15, 100, 33);
	var menu_help =    new MenuButton((screen_width/2) - (screen_width*0.4/2),   screen_height*0.5, screen_width*0.4, screen_height*0.1,  71, 24);
	var menu_credits = new MenuButton((screen_width/2) - (screen_width*0.4/2),   screen_height*0.61, screen_width*0.4, screen_height*0.1,  71, 24);
	var menu_exit =    new MenuButton((screen_width/2) - (screen_width*0.4/2),   screen_height*0.72, screen_width*0.4, screen_height*0.1,  71, 24);
	
	//SOUND
	var music;
	var buttonSound;
	var collisionSound;
	
	function setup()
	{
		
		previousDate = Date.now();
		canvas = document.getElementById('leccionCanvas');
		canvas.width = screen_width;
		canvas.height = screen_height;
		
		if (canvas.getContext)
		{
			ctx = canvas.getContext('2d');
			ctx.imageSmoothingEnabled = false;
			ctx.webkitImageSmoothingEnabled = false;
			ctx.mozImageSmoothingEnabled = false;
			
			player.loadSprite();
			switch_b.loadSprite();
			retry_b.loadSprite();
			volume_b.loadSprite();
			volume_b.active = false;
			return_b.loadSprite();
			sky.loadSprite();
			
			titleSprite = new Image();
			titleSprite.src = 'assets/sprites/title.png';
			
			menu_play.setSprite('assets/sprites/playbutton.png');
			menu_help.setSprite('assets/sprites/helpbutton.png');
			menu_credits.setSprite('assets/sprites/creditsbutton.png');
			menu_exit.setSprite('assets/sprites/exitbutton.png');
			
			redbullet = new Image();
			redbullet.src = 'assets/sprites/firered1.png';
			redbullet2 = new Image();
			redbullet2.src = 'assets/sprites/firered2.png';
			
			blubullet = new Image();
			blubullet.src = 'assets/sprites/fireblu1.png';	
			blubullet2 = new Image();
			blubullet2.src = 'assets/sprites/fireblu2.png';
			
			scoreTextImage = new Image();
			scoreTextImage.src = 'assets/sprites/scoretext.png';
			
			tutorialImage = new Image();
			tutorialImage.src = 'assets/sprites/tutorial.png';
			
			menuBGImg = new Image();
			menuBGImg.src = 'assets/sprites/menubg.png';
			
			music = document.getElementById("backgroundMusic");
			buttonSound = document.getElementById("buttonSound");
			collisionSound = document.getElementById("collisionSound");
			
			canvas.addEventListener("mousedown", getMousePosition, false);
			canvas.addEventListener("mouseup", mouseUp, false);
			canvas.addEventListener("mousemove", mouseMove, false);
			
			canvas.addEventListener("touchstart", getMousePosition, false);
			canvas.addEventListener("touchend", mouseUp, false);
			canvas.addEventListener("touchmove", mouseMove, false);

		}
		
		volume_b.active = true;
		volume_b.x = volume_bMenuX;
		volume_b.y = volume_bMenuY;
		return_b.active = false;
		
		if(soundEnabled)
		{
			music.play();
		}
		main();
    }
	
	function updateDelta()
	{
		var now = Date.now()
		deltaTime = (now - previousDate) / 1000;
		previousDate = now;
	}
	
	function createBullet()
	{
		var d = Math.floor((Math.random()*2)+1);
		
		if(d == 1)
		{
			projectiles.push(new Bullet(screen_width, screen_height, "r", redbullet, redbullet2, screen_height * 1.1));
		}
		else
		{
			projectiles.push(new Bullet(screen_width, screen_height, "b", blubullet, blubullet2, screen_height * 1.1));
		}
	}
	
	function mouseUp(e)
	{
		mouse_pressed = false;
	}
	
	function mouseMove(e)
	{
		if (e.pageX || e.pageY)
		{
		  mouse_x = e.pageX;
		  mouse_y = e.pageY;
		}
	}
	
	function getMousePosition(e)
	{
		if(bShowCredits)
		{
			bShowCredits = false;
			return;
		}
		if(bShowTutorial)
		{
			bShowTutorial = false;
			return;
		}
		mouse_pressed = true;
		
		var x;
		var y;
		if (e.pageX || e.pageY)
		{
		  x = e.pageX;
		  y = e.pageY;
		}
		
		if(volume_b.checkMouseCollision(x, y))
		{
			soundEnabled = !soundEnabled;
			volume_b.soundOn = soundEnabled;
			
			if(soundEnabled)
			{
				music.play();
			}
			else
			{
				music.pause();
				music.currentTime = 0;
			}
		}
		
		if(actualAppState == AppState.GAME)
		{
			if(!isGameOver)
			{
				MouseGamePlay(x, y);
			}
			else
			{
				MouseGameOver(x, y);
			}
		}
		else if(actualAppState == AppState.MENU)
		{
			/*
			menu_play = 
			menu_help = 
			menu_credits
			menu_exit = 
			*/
			
			if(menu_play.checkMouseCollision(x, y))
			{
				//Play
				volume_b.x = volume_bGameX;
				volume_b.y = volume_bGameY;
				
				actualAppState = AppState.GAME;
				
				createBulletID = window.setInterval( createBullet, 400 );
				createBullet();
				
				isGameOver=false;
				volume_b.active = false;
				score=0;
				player.switchShield("r");
				
				if(soundEnabled)
				{
					buttonSound.play();
				}
				
			}
			else if(menu_help.checkMouseCollision(x, y))
			{
				//Show Help Menu
				bShowTutorial = true;
				if(soundEnabled)
				{
					buttonSound.play();
				}
			}
			else if(menu_credits.checkMouseCollision(x, y))
			{
				//Show Credits
				bShowCredits = true;
				if(soundEnabled)
				{
					buttonSound.play();
				}
			}
			else if(menu_exit.checkMouseCollision(x, y))
			{
				//Leave App
				window.close();
			}
		}
	}
	
	function MouseGamePlay(x, y)
	{
		if(switch_b.checkMouseCollision(x, y))
		{
			if(player.actualColor == "r")
			{
				player.switchShield("b");
			}
			else
			{
				player.switchShield("r");
			}
		}
	}
	
	function MouseGameOver(x, y)
	{
		if(retry_b.checkMouseCollision(x, y))
		{
			//play again
			isGameOver=false;
			volume_b.active = false;
			return_b.active = false;
			score=0;
			createBulletID = window.setInterval( createBullet, 400 );
			player.switchShield("r");
			
			if(soundEnabled)
			{
				buttonSound.play();
			}
		}
		else if(return_b.checkMouseCollision(x, y))
		{
			actualAppState = AppState.MENU;
			volume_b.x = volume_bMenuX;
			volume_b.y = volume_bMenuY;
			
			if(soundEnabled)
			{
				buttonSound.play();
			}
			
		}
		
	}
	
	function drawScore()
	{
		ctx.font=(screen_height * 0.05) + "px oab";
		
		ctx.fillStyle = "#ffffff";
		ctx.fillText(""+score, screen_width * 0.916, screen_height * 0.0375);
	}
	
	function drawGameOver()
	{
		ctx.fillStyle = ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
		ctx.fillRect(0, 0, screen_width, screen_height );
		
		ctx.font="bold " + (screen_height * 0.05) + "px oab";
		ctx.fillStyle = "#dd0000";
		ctx.textAlign="center";
		ctx.fillText("YOU LOSE!", screen_width/2, screen_height * 0.0625);
		
		ctx.drawImage(scoreTextImage, 0, 0, 93, 22, (screen_width - (screen_width * 0.465))/2, screen_height * 0.125, screen_width * 0.465, screen_height * 0.0825);
		
		ctx.font="bold " + (screen_height * 0.1875) + "px oab";
		ctx.fillStyle = "#000000";
		ctx.fillText("" + score, (screen_width/2) + (screen_width * 0.0083), screen_height * 0.38125);
		ctx.fillStyle = "#ffffff";
		ctx.fillText("" + score, screen_width/2, screen_height * 0.375);
		
		retry_b.draw(ctx);
		return_b.draw(ctx);
	}
	
	function GamePlayUpdate()
	{
		player.update(deltaTime);
		switch_b.update(mouse_x, mouse_y, mouse_pressed);
		
		for(var i in projectiles)
		{
			projectiles[i].update(deltaTime);
			
			if(projectiles[i].checkCollision(player.y))
			{
				if(projectiles[i].Color != player.actualColor)
				{
					window.clearInterval(createBulletID);
					//alert("GAME OVER");
					isGameOver = true;
					volume_b.active = true;
					return_b.active = true;
				}
				else
				{
					score++;
					if(soundEnabled)
					{
						collisionSound.play();
					}
				}
			}
		}
		
		projectiles = projectiles.filter
				(
					function(bullet)
					{
						return((!bullet.checkCollision(player.y)) && !isGameOver);
					}
				);
	}
	
	function gameUpdate()
	{
		sky.update(deltaTime);
		
		
		if(!isGameOver)
		{
			GamePlayUpdate();
		}
	}
	
	function update()
	{
		updateDelta();
		
		switch(actualAppState)
		{
			case AppState.LOGO:
			break;
			
			case AppState.MENU:
			break;
			
			case AppState.GAME:
				gameUpdate();
			break;
		}
	}
	
	function creditsDraw()
	{
		ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
		ctx.fillRect(0,0,screen_width, screen_height);
		ctx.fillStyle = "#ffffff";
		var fontsize = (screen_height *0.04);
		ctx.font= fontsize + "px oab";
		ctx.textAlign="center";
		ctx.fillText("DESIGN:", screen_width/2, fontsize);
		ctx.fillText("Luis Gomez", screen_width/2, fontsize*2);
		ctx.fillText("PROGRAM AND GRAPHICS:", screen_width/2, fontsize*4);
		ctx.fillText("Ruben Negredo", screen_width/2, fontsize*5);
		
		ctx.fillText("SOUND:", screen_width/2, fontsize*7);
		ctx.fillText("\"Ouroboros\" Kevin MacLeod", screen_width/2, fontsize*8);
		ctx.fillText("(incompetech.com)", screen_width/2, fontsize*9);
		ctx.fillText("Licensed under", screen_width/2, fontsize*10);
		ctx.fillText("Creative Commons:", screen_width/2, fontsize*11);
		ctx.fillText("By Attribution 3.0", screen_width/2, fontsize*12);
		ctx.fillText("http://creativecommons.org/", screen_width/2, fontsize*13);
		ctx.fillText("licenses/by/3.0/", screen_width/2, fontsize*14);
		/*
		ctx.fillText("Licensed under Creative Commons: By Attribution 3.0", screen_width/2, screen_height/2 + 160);
		ctx.fillText("http://creativecommons.org/licenses/by/3.0/", screen_width/2, screen_height/2 + 192);*/
		
	}
	
	function tutorialDraw()
	{
		ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
		ctx.fillRect(0,0,screen_width, screen_height);
		ctx.drawImage(tutorialImage, 0, 0, 600, 800, 0, 0, screen_width, screen_height);
	}
	
	function gameDraw()
	{
		sky.draw(ctx);
		
		for(var i in projectiles)
		{
			projectiles[i].draw(ctx);
		}
		
		player.draw(ctx);
		switch_b.draw(ctx);
		
		drawScore();
		
		if(isGameOver)
		{
			drawGameOver();
		}
		
		volume_b.draw(ctx);
	}
	
	function logoDraw()
	{
	}
	
	function menuDraw()
	{
		/*ctx.fillStyle="#FF00FF";
		ctx.fillRect(0,0,600,800);*/
		
		ctx.drawImage(menuBGImg, 0,0, 600, 800, 0, 0, screen_width, screen_height);
		ctx.drawImage(titleSprite, 0,0, 119, 43, (screen_width/2) - (screen_width*0.9)/2, screen_height/15, screen_width*0.9, screen_height*0.22);
		menu_play.draw(ctx);
		menu_help.draw(ctx);
		menu_credits.draw(ctx);
		menu_exit.draw(ctx);
		volume_b.draw(ctx);
		
		if(bShowCredits)
		{
			creditsDraw();
		}
		else if(bShowTutorial)
		{
			tutorialDraw();
		}
	}
	
	function draw()
	{
		switch(actualAppState)
		{
			case AppState.LOGO:
				logoDraw();
			break;
			
			case AppState.MENU:
				menuDraw();
			break;
			
			case AppState.GAME:
				gameDraw();
			break;
		}
	}
	
	function main()
	{
		requestAnimationFrame(main);
		
		update();
		draw();
	}