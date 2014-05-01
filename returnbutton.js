function ReturnButton (_screen_width, _screen_height)
{
	this.width = _screen_width/8;
	this.height = this.width;
    this.x = _screen_width - 20 - this.width;
	this.y = 20;
	
	this.active = true;
}

ReturnButton.prototype.loadSprite = function()
{
	this.sprite = new Image();
	this.sprite.src = "assets/sprites/exit.png";
};

ReturnButton.prototype.checkMouseCollision = function(mouse_x, mouse_y)
{
	if(this.active &&(	mouse_y > this.y && mouse_y < this.y + this.height &&
		mouse_x > this.x && mouse_x < this.x + this.width))
	{
		return true;
	}
	
	return false;
}

ReturnButton.prototype.draw = function(ctx)
{
	if(this.active && this.sprite)
	{
					  //sprite     sx sy swidth      sheight      x_world y_world world_width  world_height
		ctx.drawImage(this.sprite, 0, 0, 32,        32,         this.x, this.y, this.width,  this.height);
	}
}