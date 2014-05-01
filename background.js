function Sky (_screen_width, _screen_height)
{
	this.width = _screen_width;
	this.height = _screen_height;
    this.x =0;
	this.y = 0;
	
	this.bg;
	
	
	this.clouds;
	this.clouds2;
	
	this.cloudWidth = (_screen_width * 2) + (_screen_width/7);
	//this.cloudWidth = 100;
	this.cloudHeight = _screen_height/3;
	
	this.cloudsX = 0;
	this.cloudsY = _screen_height/6;
	this.clouds2X = this.cloudWidth;
	
	this.speed = 20;
	
	this.cloudAlpha = 0.3;
}

Sky.prototype.loadSprite = function()
{
	this.bg = new Image();
	this.bg.src = "assets/sprites/bg.png";
	
	this.clouds = new Image();
	this.clouds.src = "assets/sprites/clouds.png";
	
	this.clouds2 = new Image();
	this.clouds2.src = "assets/sprites/clouds.png";
	
	
};

Sky.prototype.update = function(deltaTime)
{
	this.cloudsX -= this.speed * deltaTime;
	this.clouds2X -= this.speed * deltaTime;
	
	if(this.cloudsX < 0-this.cloudWidth)
	{
		this.cloudsX = this.clouds2X + this.cloudWidth;
	}
	
	if(this.clouds2X < 0-this.cloudWidth)
	{
		this.clouds2X = this.cloudsX + this.cloudWidth;
	}
}

Sky.prototype.draw = function(ctx)
{
				  //sprite     sx sy swidth      sheight      x_world y_world world_width  world_height
		ctx.drawImage(this.bg, 0, 0, 128,        192,         0,      0,      this.width,  this.height);
		
		ctx.globalAlpha = this.cloudAlpha;
		
				      //sprite     sx sy swidth      sheight      x_world      y_world       world_width       world_height
		ctx.drawImage(this.clouds, 0, 0, 288,        85,         this.cloudsX, this.cloudsY, this.cloudWidth,  this.cloudHeight);
				      //sprite     sx sy swidth      sheight      x_world      y_world       world_width       world_height
		ctx.drawImage(this.clouds, 0, 0, 288,        85,         this.clouds2X, this.cloudsY, this.cloudWidth,  this.cloudHeight);
		
		ctx.globalAlpha = 1.0;
}