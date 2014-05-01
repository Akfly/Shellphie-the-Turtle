function VolumeButton (_screen_width, _screen_height, xpos, ypos)
{
	this.width = _screen_width/8;
	this.height = this.width;
    this.x = xpos;
	this.y = ypos;
	
	this.soundOn = true;
	
	this.spriteOn;
	this.spriteOff;
	
	this.active = true;
}

VolumeButton.prototype.loadSprite = function()
{
	this.spriteOn = new Image();
	this.spriteOn.src = "assets/sprites/volumeon.png";
	
	this.spriteOff = new Image();
	this.spriteOff.src = "assets/sprites/volumeoff.png";
};

VolumeButton.prototype.checkMouseCollision = function(mouse_x, mouse_y)
{
	if( this.active &&( mouse_y > this.y && mouse_y < this.y + this.height &&
		mouse_x > this.x && mouse_x < this.x + this.width))
	{
		return true;
	}
	
	return false;
}

VolumeButton.prototype.setSound = function(isSoundOn)
{
	this.soundOn = isSoundOn;
}

VolumeButton.prototype.draw = function(ctx)
{
	if(this.active)
	{
		if(this.soundOn)
		{
						  //sprite      sx sy swidth sheight      x_world y_world world_width  world_height
			ctx.drawImage(this.spriteOn, 0, 0, 32,   32,         this.x, this.y, this.width,  this.height);
		}
		else
		{
						  //sprite      sx sy swidth sheight      x_world y_world world_width  world_height
			ctx.drawImage(this.spriteOff, 0, 0, 32,   32,         this.x, this.y, this.width,  this.height);
		}
	}
		
}