function RetryButton (_screen_width, _screen_height)
{
	this.width = _screen_width/1.5;
	this.height = _screen_height/5;
    this.x = (_screen_width / 2) - (this.width / 2);
	this.y = _screen_height - (this.height*2.5);
}

RetryButton.prototype.loadSprite = function()
{
	this.sprite = new Image();
	this.sprite.src = "assets/sprites/playagaintext.png";
};

RetryButton.prototype.checkMouseCollision = function(mouse_x, mouse_y)
{
	if(	mouse_y > this.y && mouse_y < this.y + this.height &&
		mouse_x > this.x && mouse_x < this.x + this.width)
	{
		return true;
	}
	
	return false;
}

RetryButton.prototype.draw = function(ctx)
{
				  //sprite     sx sy swidth      sheight      x_world y_world world_width  world_height
	ctx.drawImage(this.sprite, 0, 0, 91,        49,         this.x, this.y, this.width,  this.height);
}