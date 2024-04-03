let designTiles = false;
let tiles = [];

class Tile {
  constructor(points, id) {
    this.ps = points;
    this.perimeter = 0;
    for (let i = 0; i < this.ps.length; i++) {
      let i1 = i;
      let i2 = (i+1)%this.ps.length;
      let p1 = this.ps[i1];
      let p2 = this.ps[i2];
      
      this.perimeter += dist(p1.x, p1.y, p2.x, p2.y);
    }
    this.id = id;
    this.c = color(0, 0, 0);
    
    // Idle animation parameters
    this.a = 0;
    this.posR = 0;
    this.speedR = 20;
    
    
    this.hovering = false;
    this.timeout = false;
    this.clicked = false;
    this.selected = false;
    this.justClicked = false;
    
    this.image = 0;
    
    // Elevation parameters
    this.shift = 0;
    this.maxShift = 30;
  }
  
  showElevation() {
    stroke(20);
    fill(20);
    strokeWeight(2);
    beginShape();
    for (let point of this.ps) {
      vertex(point.x, point.y);
    }
    endShape(CLOSE);
    noStroke();
    for (let i = 0; i < this.shift; i++) {
      push();
      translate(0, -i);
      fill(57, 53, 58);
      beginShape();
      for (let point of this.ps) {
        vertex(point.x, point.y);
      }
      endShape(CLOSE);
      pop();
    }
    
  }
  
  showTile() {
      stroke(0);
      fill(227, 223, 228);
      strokeWeight(4);
      beginShape();
      for (let i = 0; i < this.ps.length; i++) {
        point = this.ps[i];
        vertex(point.x, point.y);
      }
      endShape(CLOSE);
      
      noFill();
      strokeWeight(3);
      let iMax = this.ps.length;
      for (let i = 0; i < iMax; i++) {
        let i1 = i;
        let i2 = (i+1) % iMax;
        if ((i+1)/(iMax+1) < this.a) { 
          stroke(255, 0, 0, 200);
        }
        else {
           stroke(0);
        }
        line(this.ps[i].x, this.ps[i].y, this.ps[i2].x, this.ps[i2].y);
      }
      
      // Runner animation
      if (this.a > 0.05) {
        noStroke();
        
        for (let j = 10; j >0; j-=2) {
          let loc = this.posR + 5*j;
          for (let i = 0; i < iMax; i++) {
            let i1 = i;
            let i2 = (i+1) % iMax;
            let d = dist(this.ps[i1].x, this.ps[i1].y, this.ps[i2].x, this.ps[i2].y);
            if (d < loc) {
              loc -= d;
            }
            else {
              let ratio = loc/d;
              let xR = (1-ratio)*this.ps[i1].x + (ratio)*this.ps[i2].x;
              let yR = (1-ratio)*this.ps[i1].y + (ratio)*this.ps[i2].y;
              fill(155+10*j, 0, 0, this.a*(120+10*j));
              circle(xR, yR, 10+j);
              console.log(xR);
              console.log(yR);
              console.log('\n');
              break;
            }
          }
        }
        
        this.posR += this.a * this.speedR;
        this.posR = this.posR % this.perimeter;
      }
  }
  
  show() {
    this.checkHover();
    let maxShift = 30;
    
    // Control Idle animation parameters
    if (this.hovering || this.timeout) {
      this.a = lerp(1, this.a, 0.95); 
      this.c = lerpColor(color(190, 40, 38, 255), this.c, 0.95);
      
    }
    else {
      this.a = lerp(0, this.a, 0.95); 
      this.c = lerpColor(color(190, 40, 38, 0), this.c, 0.95);
    }
    
    // Control animation parameters for a Selected tile (there can only be one)
    if (this.justClicked) {
    }
    else if (this.selected) {
      this.shift = lerp(maxShift, this.shift, 0.95);
    }
    else {
      this.shift = lerp(0, this.shift, 0.95);
    }
    
    if (!designTiles) {
      this.showElevation();
      push();
      translate(0, -this.shift);
      this.showTile();
      pop();
    }
    else {
    
      push();
      
      stroke(0);
      fill(227, 223, 228);
      noFill();
      strokeWeight(2);
      beginShape();
      for (let p of this.ps) {
        vertex(p.x, p.y);
      }
      endShape(CLOSE);
      
      for (let p of this.ps) {
        fill(0);
        circle(p.x, p.y, 5);
      }
   
      stroke(this.c);
      strokeWeight(6);
      noFill();
      beginShape();
      for (let point of this.ps) {
        vertex(point.x, point.y);
      }
      endShape(CLOSE);
      
       noFill();
       stroke(0);
       strokeWeight(1);
       text(this.id, this.ps[0].x+20, this.ps[0].y+20)
      
      pop();
    }
  }
  
  checkHover() {
    if (this.hovering) {
      if (!this.containsMouse()) {this.hovering=false;}
    }
    else {
      if (this.containsMouse()) {this.hovering=true;}
    }
  }
  
  containsMouse() {
    return this.isMouseInsidePolygon(this.ps);
  }
  
  isMouseInsidePolygon(vertices) {
    let inside = false;
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      let xi = vertices[i].x, yi = vertices[i].y;
      let xj = vertices[j].x, yj = vertices[j].y;
  
      let intersect = ((yi > mouseY) != (yj > mouseY)) && 
        (mouseX < (xj - xi) * (mouseY - yi) / (yj - yi) + xi);
      if (intersect) {inside = !inside;}
    }
    return inside;
  }
  
}




function deselectOthers(id) {
  for (let tile of tiles) {
    if (tile.id != id) {
      tile.selected = false;
    }
  }
}

function constructTiles() {
  tiles.push(constructTile0());
  tiles.push(constructTile1());
  tiles.push(constructTile2());
 
  tiles.push(constructTile3());
  tiles.push(constructTile4());
  tiles.push(constructTile5());
  tiles.push(constructTile6());
  tiles.push(constructTile7());
  
  
}

function constructTile0() {
  let points = [];
  points.push(createVector(0*wi, 0.0*wh));
  points.push(createVector(0*wi, 0.470*wh));
  points.push(createVector(0.116*wi, 0.439*wh));
  points.push(createVector(0.109*wi, 0.290*wh));
  points.push(createVector(0.205*wi, 0.225*wh));
  points.push(createVector(0.166*wi, 0.0*wh));
  
  tile = new Tile(points, 0);
  return tile;
}

function constructTile1() {
  let points = [];
  
  points.push(createVector(0*wi, 0.518*wh));
  points.push(createVector(0.118*wi, 0.486*wh));
  points.push(createVector(0.135*wi, 0.532*wh));
  points.push(createVector(0.119*wi, 0.594*wh));
  points.push(createVector(0.159*wi, 0.673*wh));
  points.push(createVector(0.153*wi, 0.708*wh));
  points.push(createVector(0*wi, 0.767*wh));
  
  tile = new Tile(points, 1);
  return tile;
}

function constructTile2() {
  let points = [];
  
  points.push(createVector(0*wi, 0.81*wh));
  points.push(createVector(0.170*wi, 0.740*wh));
  points.push(createVector(0.155*wi, 0.818*wh));
  points.push(createVector(0.240*wi, 0.828*wh));
  points.push(createVector(0.265*wi, 1.00*wh));
  points.push(createVector(0*wi, 1.0*wh));
  
  tile = new Tile(points, 2);
  return tile;
}

function constructTile3() {
  let points = [];
  points.push(createVector(0.194*wi, 0));
  points.push(createVector(0.475*wi, 0));
  points.push(createVector(0.442*wi, 0.15*wh));
  points.push(createVector(0.278*wi, 0.25*wh));
  points.push(createVector(0.228*wi, 0.209*wh));
  
  tile = new Tile(points, 3);
  return tile;
}

function constructTile4() {
  let points = [];
  
  points.push(createVector(0.136*wi, 0.319*wh));
  points.push(createVector(0.234*wi, 0.281*wh));
  points.push(createVector(0.265*wi, 0.306*wh));
  points.push(createVector(0.250*wi, 0.386*wh));
  points.push(createVector(0.259*wi, 0.463*wh));
  points.push(createVector(0.150*wi, 0.492*wh));
  
  tile = new Tile(points, 4);
  return tile;
}

function constructTile5() {
  let points = [];
  
  points.push(createVector(0.160*wi, 0.538*wh));
  points.push(createVector(0.316*wi, 0.490*wh));
  points.push(createVector(0.317*wi, 0.601*wh));
  points.push(createVector(0.193*wi, 0.678*wh));
  points.push(createVector(0.144*wi, 0.593*wh));
  
  tile = new Tile(points, 5);
  return tile;
}

function constructTile6() {
  let points = [];
  
  points.push(createVector(0.2*wi, 0.715*wh));
  points.push(createVector(0.34*wi, 0.61*wh));
  points.push(createVector(0.41*wi, 0.67*wh));
  points.push(createVector(0.265*wi, 0.86*wh));
  points.push(createVector(0.262*wi, 0.785*wh));
  points.push(createVector(0.185*wi, 0.788*wh));
  
  tile = new Tile(points, 6);
  return tile;
}

function constructTile7() {
  let points = [];
  points.push(createVector(0.282*wi, 0.905*wh));
  points.push(createVector(0.430*wi, 0.688*wh));
  points.push(createVector(0.470*wi, 0.735*wh));
  points.push(createVector(0.515*wi, 0.722*wh));
  points.push(createVector(0.518*wi, 0.815*wh));
  points.push(createVector(0.453*wi, 1*wh));
  points.push(createVector(0.297*wi, 1*wh));
  
  
  tile = new Tile(points, 7);
  return tile;
}
