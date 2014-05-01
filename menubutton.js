function MenuButton (b_x, b_y, b_width, b_height, sprite_width, sprite_height)
{
	this.width = b_width;
	this.height = b_height;
    this.x = b_x;
	this.y = b_y;
	
	this.sprite;
	
	this.spriteWidth = sprite_width;
	this.spriteHeight = sprite_height;
}

MenuButton.prototype.setSprite = function(picture_src)
{
	this.sprite = new Image();
	this.sprite.src = picture_src;
};

MenuButton.prototype.checkMouseCollision = function(mouse_x, mouse_y)
{
	if(	mouse_y > this.y && mouse_y < this.y + this.height &&
		mouse_x > this.x && mouse_x < this.x + this.width)
	{
		return true;
	}
	
	return false;
}

MenuButton.prototype.draw = function(ctx)
{
				  //sprite     sx sy swidth            sheight             x_world y_world world_width  world_height
	ctx.drawImage(this.sprite, 0, 0, this.spriteWidth, this.spriteHeight,  this.x, this.y, this.width,  this.height);
}