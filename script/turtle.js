const rad = deg => (deg * Math.PI) / 180.0;
class turtle{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.angle = rad(-90);
    this.k = 1;    
  }
  
  forward(distance, color){
    const newX = this.x + distance * Math.cos(this.angle) * this.k;
    const newY = this.y + distance * Math.sin(this.angle) * this.k;
    line(this.x, this.y, newX, newY, color, thickness);
    this.x = newX;
    this.y = newY;
  }
  
  backward(distance, color){
    this.forward(-distance, color);
  }
  
  right(angle){
    this.angle -= rad(angle);
  }
  
  left(angle){
    this.angle += rad(angle);
  }
  
  setpos(x, y){
    this.x = x;
    this.y = y;
  }
}

function line(x1, y1, x2, y2, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}