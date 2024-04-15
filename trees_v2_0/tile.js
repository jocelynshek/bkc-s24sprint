let designTiles = false;
let tiles = [];

class Tile {
  constructor(points, id, hasStory) {
    this.ps = points;
    this.perimeter = 0;
    this.hasStory = hasStory;
    for (let i = 0; i < this.ps.length; i++) {
      let i1 = i;
      let i2 = (i+1)%this.ps.length;
      let p1 = this.ps[i1];
      let p2 = this.ps[i2];
      
      this.perimeter += dist(p1.x, p1.y, p2.x, p2.y);
    }
    this.id = id;
    this.name = findName(id);
    if (this.name) {
      // ID-associated image
      this.image = loadImage('assets/map/' + this.name + '.PNG');
      if (this.hasStory) {
        this.imageComplete = loadImage('assets/map/' + this.name + '_CompletionTree.PNG');
      }
    }
    else {
      this.image = 0;
    }
    this.complete = false;
    
    // Idle animation parameters
    this.a = 0;
    this.idleTimer = 0;
    this.posR = 0;
    this.speedR = 3;
    
    // Interaction booleans
    this.hovering = false;
    this.timeout = false;
    this.clicked = false;
    this.selected = false;
    this.justClicked = false;
    
    
    
    // Elevation parameters
    this.shift = 0;
    this.maxShift = 30;
  }
  
  showElevation() {
    stroke(20);
    fill(20);
    strokeWeight(2);
    beginShape();
    for (let p of this.ps) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    noStroke();
    for (let i = 0; i < this.shift; i++) {
      push();
      translate(0, -i);
      fill(57, 53, 58);
      beginShape();
      for (let p of this.ps) {
        vertex(p.x, p.y);
      }
      endShape(CLOSE);
      pop();
    }
    
  }
  
  showTile() {
      stroke(0);
      fill(227, 223, 228);
      if (this.hasStory) {fill(254, 249, 253);}
      else {fill(240, 235, 225);}
      strokeWeight(4);
      beginShape();
      for (let i = 0; i < this.ps.length; i++) {
        let p = this.ps[i];
        vertex(p.x, p.y);
      }
      endShape(CLOSE);  
  }
  
  showIdle() {
    if (this.idleTimer < fr) {
      stroke(255, 0, 0, 180);
      strokeWeight(8);
      let iMax = this.ps.length;
      let loc = this.posR;
      for (let i = 0; i < iMax; i++) {
        let i1 = i;
        let i2 = (i+1) % iMax;
        let d = dist(this.ps[i1].x, this.ps[i1].y, this.ps[i2].x, this.ps[i2].y);
        if (d < loc) {
          loc -= d;
          line(this.ps[i].x, this.ps[i].y, this.ps[i2].x, this.ps[i2].y);
        }
        else {
          let ratio = loc/d;
          let xR = (1-ratio)*this.ps[i1].x + (ratio)*this.ps[i2].x;
          let yR = (1-ratio)*this.ps[i1].y + (ratio)*this.ps[i2].y;
          line(this.ps[i].x, this.ps[i].y, xR, yR);
          break;
        }
      }
      
      this.posR += this.perimeter/fr;
      this.posR = this.posR % this.perimeter;
    }
    else {
      let alpha = 255*sin(PI*(this.idleTimer-fr)/fr);
      stroke(255, 0, 0, alpha);
      noFill();
      strokeWeight(6);
      beginShape();
      for (let i = 0; i < this.ps.length; i++) {
        let p = this.ps[i];
        vertex(p.x, p.y);
      }
      endShape(CLOSE);
    }
    this.idleTimer += 1;
  }
  
  showSelected() {
    stroke(20, 150, 50);
    noStroke();
    fill(170, 190, 66);
    strokeWeight(6);
    beginShape();
    for (let i = 0; i < this.ps.length; i++) {
      let p = this.ps[i];
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    
    //let iMax = this.ps.length;
    //noStroke();
    //let kMax = 5;
    //for (let k = 0; k < kMax; k++) {
    //  for (let j = 10; j >5; j-=2) {
    //    let loc = (this.posR + k*this.perimeter/kMax+ 5*j)%this.perimeter;
    //    for (let i = 0; i < iMax; i++) {
    //      let i1 = i;
    //      let i2 = (i+1) % iMax;
    //      let d = dist(this.ps[i1].x, this.ps[i1].y, this.ps[i2].x, this.ps[i2].y);
    //      if (d < loc) {
    //        loc -= d;
    //      }
    //      else {
    //        let ratio = loc/d;
    //        let xR = (1-ratio)*this.ps[i1].x + (ratio)*this.ps[i2].x;
    //        let yR = (1-ratio)*this.ps[i1].y + (ratio)*this.ps[i2].y;
    //        fill(20, 55+10*j, 50, (60+10*j));
    //        circle(xR, yR, 4+j/2);
    //        break;
    //      }
    //    }
    //  }
    //}
    
    //this.posR += this.speedR;
    //this.posR = this.posR % this.perimeter;
  }
  
  show() {
    this.checkHover();
    let maxShift = 30;
    
    // Control animation parameters for a Selected tile (there can only be one)
    if (this.justClicked) {
    }
    else if (this.selected) {
      this.shift = lerp(0, this.shift, 0.95); // maxShift
    }
    else {
      this.shift = lerp(0, this.shift, 0.95);
    }
    
    
    if (!designTiles) {
      this.showElevation(); // Display tile sides if elevated
      push();
      translate(0, -this.shift);
      this.showTile(); // Display tile
      if (this.selected) { // Play selected animation
        this.showSelected();
      }
      else if (this.timeout) { // Play idle animation
        this.showIdle();
      }
      if (this.image) {
        image(this.image, 0, -15, wi, wh);
        if (this.complete) {image(this.imageComplete, 0, -15, wi, wh);}
        
      }
      pop();
    }
    else {
      push();
      
      stroke(70);
      fill(227, 223, 228);
      noFill();
      strokeWeight(2);
      beginShape();
      for (let p of this.ps) {
        vertex(p.x, p.y);
      }
      endShape(CLOSE);
      
      for (let p of this.ps) {
        fill(70);
        circle(p.x, p.y, 8);
      }
       
      //stroke(0);
      //strokeWeight(6);
      //noFill();
      //beginShape();
      //for (let p of this.ps) {
      //  vertex(p.x, p.y);
      //}
      //endShape(CLOSE);
          
      noFill();
      stroke(0);
      strokeWeight(1);
      text(this.id, this.ps[0].x+20, this.ps[0].y+20)
      
      pop();
    }
  }
  
  checkHover() { // Obsolete function to check hovering
    //if (this.hovering) {
    //  if (!this.containsMouse()) {this.hovering=false;}
    //}
    //else {
    //  if (this.containsMouse()) {this.hovering=true;}
    //}
  }
  
  resetIdle() { // Reset the idle animation timer
    this.timeout=false;
    this.idleTimer = 0;
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






// Utility functions for tiles

function deselectOthers(id) {
  for (let tile of tiles) {
    if (tile.id != id) {
      tile.selected = false;
    }
  }
}

function findName(id) {
  let name = '';
  if (id == 0) {//name='West_Roxbury';
  }
  else if (id == 3) {name='Backbay';}
  else if (id == 4) {//name='Roxbury';
  }
  else if (id == 5) {//name='Mission_Hill';
  }
  else if (id == 6) {name='Jamaica_Plain';}
  else if (id == 7) {name='Mattapan';}
  else if (id == 9) {name='Kenmore';}
  else if (id == 14) {name='East_Boston';}
  
  return name;
}

// Detail tile construction and dimension

function constructTiles() {
  tiles.push(constructTile0());
  tiles.push(constructTile1());
  tiles.push(constructTile2());
 
  tiles.push(constructTile3());
  tiles.push(constructTile4());
  tiles.push(constructTile5());
  tiles.push(constructTile6());
  tiles.push(constructTile7());
  
  // tiles.push(constructTile8());
  tiles.push(constructTile9());
  
  tiles.push(constructTile14());
}

function constructTile0() {
  let points = [];
  points.push(createVector(0*wi, 0.0*wh));
  points.push(createVector(0*wi, 0.470*wh));
  points.push(createVector(0.116*wi, 0.439*wh));
  points.push(createVector(0.109*wi, 0.290*wh));
  points.push(createVector(0.205*wi, 0.225*wh));
  points.push(createVector(0.166*wi, 0.0*wh));
  
  tile = new Tile(points, 0, false);
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
  
  tile = new Tile(points, 1, false);
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
  
  tile = new Tile(points, 2, false);
  return tile;
}

function constructTile3() {
  let points = [];
  points.push(createVector(0.194*wi, 0));
  points.push(createVector(0.475*wi, 0));
  points.push(createVector(0.442*wi, 0.15*wh));
  points.push(createVector(0.278*wi, 0.25*wh));
  points.push(createVector(0.228*wi, 0.209*wh));
  
  tile = new Tile(points, 3, true);
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
  
  tile = new Tile(points, 4, false);
  return tile;
}

function constructTile5() {
  let points = [];
  
  points.push(createVector(0.160*wi, 0.538*wh));
  points.push(createVector(0.316*wi, 0.490*wh));
  points.push(createVector(0.317*wi, 0.601*wh));
  points.push(createVector(0.193*wi, 0.678*wh));
  points.push(createVector(0.144*wi, 0.593*wh));
  
  tile = new Tile(points, 5, false);
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
  
  tile = new Tile(points, 6, true);
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
  
  
  tile = new Tile(points, 7, true);
  return tile;
}

function constructTile8() {
  let points = [];
  points.push(createVector(0.295*wi, 0.288*wh));
  points.push(createVector(0.582*wi, 0.205*wh));
  points.push(createVector(0.482*wi, 0.305*wh));
  
  tile = new Tile(points, 8, false);
  return tile;
}

function constructTile9() {
  let points = [];
  points.push(createVector(0.388*wi, 0.481*wh));
  points.push(createVector(0.437*wi, 0.457*wh));
  points.push(createVector(0.496*wi, 0.496*wh));
  points.push(createVector(0.501*wi, 0.626*wh));
  points.push(createVector(0.515*wi, 0.655*wh));
  points.push(createVector(0.484*wi, 0.700*wh));
  points.push(createVector(0.349*wi, 0.547*wh));
  
  tile = new Tile(points, 9, true);
  return tile;
}

function constructTile14() {
  let points = [];
  points.push(createVector(0.584*wi, 0.00*wh));
  points.push(createVector(0.848*wi, 0.00*wh));
  points.push(createVector(0.846*wi, 0.046*wh));
  points.push(createVector(0.863*wi, 0.050*wh));
  points.push(createVector(0.859*wi, 0.089*wh));
  points.push(createVector(0.849*wi, 0.094*wh));
  points.push(createVector(0.849*wi, 0.115*wh));
  points.push(createVector(0.838*wi, 0.121*wh));
  points.push(createVector(0.827*wi, 0.087*wh));
  points.push(createVector(0.809*wi, 0.095*wh));
  points.push(createVector(0.806*wi, 0.113*wh));
  points.push(createVector(0.790*wi, 0.129*wh));
  points.push(createVector(0.801*wi, 0.156*wh));
  points.push(createVector(0.820*wi, 0.125*wh));
  points.push(createVector(0.832*wi, 0.137*wh));
  points.push(createVector(0.826*wi, 0.191*wh));
  points.push(createVector(0.836*wi, 0.196*wh));
  points.push(createVector(0.845*wi, 0.219*wh));
  points.push(createVector(0.860*wi, 0.205*wh));
  points.push(createVector(0.860*wi, 0.255*wh));
  points.push(createVector(0.851*wi, 0.265*wh));
  points.push(createVector(0.837*wi, 0.247*wh));
  points.push(createVector(0.828*wi, 0.251*wh));
  points.push(createVector(0.821*wi, 0.305*wh));
  points.push(createVector(0.756*wi, 0.307*wh));
  points.push(createVector(0.703*wi, 0.238*wh));
  points.push(createVector(0.706*wi, 0.217*wh));
  points.push(createVector(0.701*wi, 0.206*wh));
  points.push(createVector(0.690*wi, 0.230*wh));
  points.push(createVector(0.674*wi, 0.218*wh));
  points.push(createVector(0.660*wi, 0.166*wh));
  points.push(createVector(0.668*wi, 0.157*wh));
  points.push(createVector(0.666*wi, 0.118*wh));
  points.push(createVector(0.688*wi, 0.095*wh));
  points.push(createVector(0.698*wi, 0.104*wh));
  points.push(createVector(0.723*wi, 0.068*wh));
  points.push(createVector(0.726*wi, 0.036*wh));
  points.push(createVector(0.717*wi, 0.026*wh));
  points.push(createVector(0.699*wi, 0.055*wh));
  points.push(createVector(0.623*wi, 0.066*wh));
  
  tile = new Tile(points, 14, true);
  return tile;
}
