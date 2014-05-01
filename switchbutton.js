function SwitchButton (_screen_width, _screen_height)
{
	this.width = _screen_width;
	this.height = _screen_height/4;
    this.x = 0;
	this.y = _screen_height - this.height;
	this.sprite;
	this.pressedSprite;
	
	this.pressed = false;
}

SwitchButton.prototype.loadSprite = function()
{
	this.sprite = new Image();
	this.sprite.src = "assets/sprites/switchbutton1.png";
	
	this.pressedSprite = new Image();
	this.pressedSprite.src = "assets/sprites/switchbutton2.png";
};

SwitchButton.prototype.checkMouseCollision = function(mouse_x, mouse_y)
{
	if(mouse_y > this.y)
	{
		return true;
	}
	
	return false;
}

SwitchButton.prototype.update = function(mouse_x, mouse_y, mouse_pressed)
{
	this.pressed = (mouse_pressed && this.checkMouseCollision(mouse_x, mouse_y));
}

SwitchButton.prototype.draw = function(ctx)
{
	if(this.pressed)
	{
					  //sprite     sx sy swidth      sheight      x_world y_world world_width  world_height
		ctx.drawImage(this.pressedSprite, 0, 0, 128,        48,         this.x, this.y, this.width,  this.height);
	}
	else
	{
				  //sprite     sx sy swidth      sheight      x_world y_world world_width  world_height
		ctx.drawImage(this.sprite, 0, 0, 128,        48,         this.x, this.y, this.width,  this.height);
	}
}