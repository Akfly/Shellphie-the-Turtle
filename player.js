function Player (_x, _y, _screen_width, _screen_height)
{
	this.width = _screen_width/4;
	this.height = _screen_height/6;
    this.x = _x - (this.width/2) + (this.width/10);
	this.y = _y;
	
	this.topLimit = this.y;
	
	this.actualColor = "r";
	this.nextColor = "r";
	this.changeColor = 0;
	
	this.actualSprite = 0;
	this.spriteTime = 0;
	this.maxSpriteTime = 0.2;
	
	this.changeShieldTime = 0;
	this.changeShieldMaxTime = 0.1;
}

Player.prototype.loadSprite = function()
{
	//Switch
	this.sprite_s1 = new Image();
	this.sprite_s1.src = "assets/sprites/player_switch_blue.png";
	this.sprite_s2 = new Image();
	this.sprite_s2.src = "assets/sprites/player_switch_red.png";
	
	//Idle 1
	this.sprite_b = new Image();
	this.sprite_b.src = "assets/sprites/player_idle_blue01.png";
	this.sprite_r = new Image();
	this.sprite_r.src = "assets/sprites/player_idle_red01.png";
	
	//Idle 2
	this.sprite_b2 = new Image();
	this.sprite_b2.src = "assets/sprites/player_idle_blue02.png";
	this.sprite_r2 = new Image();
	this.sprite_r2.src = "assets/sprites/player_idle_red02.png";
};

Player.prototype.switchShield = function (newColor)
{
	this.actualColor = newColor;
	//this.changeColor = 0;
	this.changeShieldTime=0;
}

Player.prototype.update = function(deltaTime)
{
	this.spriteTime += deltaTime;
	this.changeShieldTime += deltaTime;
	
	if(this.spriteTime > this.maxSpriteTime)
	{
		this.spriteTime = 0;
		if(this.actualSprite == 0)
		{
			this.actualSprite = 1;
		}
		else
		{
			this.actualSprite = 0;
		}
	}
}



Player.prototype.draw = function(ctx)
{
	if(this.changeShieldTime < this.changeShieldMaxTime)
	{
		if(this.actualColor == "b")
		{
						  //sprite     sx   sy  swidth      sheight      x_world y_world world_width  world_height
			ctx.drawImage(this.sprite_s1, 0, 0, 32,        32,         this.x, this.y, this.width,  this.height);
		}
		else if(this.actualColor == "r")
		{
						  //sprite     sx    sy swidth      sheight      x_world y_world world_width  world_height
			ctx.drawImage(this.sprite_s2, 0, 0, 32,        32,         this.x, this.y, this.width,  this.height);
		}
	}
	else
	{
		if(this.actualColor == "r")
		{
			if(this.actualSprite == 0)
			{
							  //sprite     sx   sy swidth      sheight      x_world y_world world_width  world_height
				ctx.drawImage(this.sprite_r, 0, 0, 32,        32,         this.x, this.y, this.width,  this.height);
			}
			else
			{
							  //sprite     sx   sy swidth      sheight      x_world y_world world_width  world_height
				ctx.drawImage(this.sprite_r2, 0, 0, 32,        32,         this.x, this.y, this.width,  this.height);
			}
		}
		else if(this.actualColor == "b")
		{		
			if(this.actualSprite == 0)
			{
							  //sprite     sx   sy swidth      sheight      x_world y_world world_width  world_height
				ctx.drawImage(this.sprite_b, 0, 0, 32,        32,         this.x, this.y, this.width,  this.height);
			}
			else
			{
							  //sprite     sx   sy swidth      sheight      x_world y_world world_width  world_height
				ctx.drawImage(this.sprite_b2, 0, 0, 32,        32,         this.x, this.y, this.width,  this.height);
			}
		}
	}
}