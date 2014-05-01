function Bullet (_screen_width, _screen_height, type, picture, picture2, _speed)
{
	this.width = _screen_width/4;
	this.height = _screen_height/6;
    this.x =(_screen_width / 2 ) - ( this.width /2);
	this.y = 0 - this.height;
	
	this.Color = type;
	
	this.sprite = picture;
	this.sprite2 = picture2;
	this.speed = _speed;
	
	this.spriteTime = 0;
	this.spriteSpeed = 0.1;
	this.actualSprite = 0;
}

Bullet.prototype.update = function(deltaTime)
{
	this.y += this.speed * deltaTime;
	this.spriteTime += deltaTime;
	
	if(this.spriteTime > this.spriteSpeed)
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

Bullet.prototype.checkCollision = function(player_y)
{
	if(this.y + this.height >= player_y)
	{
		return true;
	}
	
	return false;
}

Bullet.prototype.draw = function(ctx)
{
	
	if(this.actualSprite == 0)
	{
					  //sprite     sx sy swidth      sheight      x_world y_world world_width  world_height
		ctx.drawImage(this.sprite, 0, 0, 32,        32,         this.x, this.y, this.width,  this.height);
	}
	else
	{
					  //sprite     sx sy swidth      sheight      x_world y_world world_width  world_height
		ctx.drawImage(this.sprite2, 0, 0, 32,        32,         this.x, this.y, this.width,  this.height);
	}
}