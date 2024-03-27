
let tree, sb;
let trees = [];

let sidebarOn = false;
let hoverCounter = 0;
let hoverTimer = 0;

let ibg;
let wi, wh;
let images = [];

function preload() {
  ibg = loadImage('images/bkc_map.png');
  img = loadImage('images/jp_tree.png');
  images.push(img);
}

function setup() {
  wi = windowWidth;
  wh = windowWidth/ibg.width * windowHeight;
  createCanvas(wi, wh);
  let points = [];
  points.push(createVector(0.265*wi, 0.865*wh));
  points.push(createVector(0.25*wi, 0.79*wh));
  points.push(createVector(0.18*wi, 0.78*wh));
  points.push(createVector(0.192*wi, 0.685*wh));
  points.push(createVector(0.335*wi, 0.533*wh));
  points.push(createVector(0.36*wi, 0.6*wh));
  points.push(createVector(0.42*wi, 0.66*wh));
  tree = new Tree(points, 0, 150, color(76, 162, 38, 255));
  tree.image = img;
  trees.push(tree);
  
  points = [];
  points.push(createVector(0.188*wi, 0));
  points.push(createVector(0.473*wi, 0));
  points.push(createVector(0.45*wi, 0.13*wh));
  points.push(createVector(0.428*wi, 0.165*wh));
  points.push(createVector(0.275*wi, 0.26*wh));
  points.push(createVector(0.225*wi, 0.225*wh));
  tree = new Tree(points, 0, 150, color(76, 162, 38, 255));
  trees.push(tree);
  
  points = [];
  points.push(createVector(0.425*wi, 0.665*wh));
  points.push(createVector(0.521*wi, 0.735*wh));
  points.push(createVector(0.521*wi, 0.815*wh));
  points.push(createVector(0.458*wi, 1*wh));
  points.push(createVector(0.287*wi, 1*wh));
  points.push(createVector(0.27*wi, 0.87*wh));
  
  tree = new Tree(points, 0, 150, color(76, 162, 38, 255));
  trees.push(tree);
  
  sb = new Sidebar();
  
  
}


function draw() {
  background(240);
  image(ibg, 0, 0, wi, wh);

  for (let i = 0; i < 20; i++) {
    stroke(122+122*(i%2));
    line(i*wi/20, 0, i*wi/20, wh);
  }
  
  for (let j = 0; j < 10; j++) {
    stroke(200);
    line(0, j*wh/10, wi, j*wh/10);
  }
  
  
  trees.map(t => t.show());
  sb.show();
  
  handleHover();
}

function handleHover() {
  let tMax = 240;
  for (let tree of trees) {
    if (tree.hovering) {hoverTimer=0;}
  }
  for (let tree of trees) {
    if (hoverTimer == 0) {tree.timeout = false;}
  }
  
  if (hoverTimer % tMax >=tMax-60) {
    trees[hoverCounter%trees.length].timeout=true;
  }
  if (hoverTimer % tMax == tMax-1) {
    trees[hoverCounter%trees.length].timeout=false;
    hoverCounter += 1;
  }
  
  hoverTimer += 1;
  hoverTimer = hoverTimer % tMax;
}

class Tree {
  constructor(points, id, w, c) {
    this.w = w;
    this.s = w;
    this.ps = points;
    this.id = id;
    this.c = c;
    this.a = 1; // a scaling factor of the overall size
    this.hovering = false;
    this.timeout = false;
    this.clicked = false;
    
    this.image = 0;
  }
  
  
  show() {
    this.checkHover();
    if (this.hovering || this.timeout) {this.a = 0.1*1.1 + 0.9*this.a; this.c = lerpColor(color(76, 162, 38, 230), this.c, 0.95);}
    else {this.a = constrain(0.05*1 + 0.95*this.a, 1, 10); this.c = lerpColor(color(150, 170, 146, 0), this.c, 0.95);}
    this.s = this.a*this.w;
    
    push();
    stroke(0);
    fill(this.c);
    beginShape();
    for (let point of this.ps) {
      vertex(point.x, point.y);
    }
    endShape(CLOSE);
    for (let point of this.ps) {
      fill(0);
      circle(point.x, point.y, 10);
    }
    
    if (this.image != 0 && (this.hovering || this.timeout)) {
      let joshFactor = 1.00;
      image(this.image, 0.11*wi, 0.38*wh, joshFactor*this.image.width*wi/ibg.width, joshFactor*this.image.height*wi/ibg.width);
    }
    
    pop();
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
      if (intersect) inside = !inside;
    }
    return inside;
  }
  
}

class Sidebar {
  constructor() {
    this.pos = createVector(wi, 0);
    this.w = wi/5;
  }
  
  show() {
    if (sidebarOn) {
      this.pos.x = lerp(this.pos.x, wi-this.w, 0.1);
    }
    else {
      this.pos.x = lerp(this.pos.x, wi, 0.1);
    }
    push();
    translate(this.pos.x, this.pos.y);
    fill(250, 220);
    noStroke();
    rect(0, 0, this.w, height);
    
    fill(0);
    textAlign(CENTER);
    textSize(32);
    text('SiDeBaR', this.w/2, 75);
    pop();
  }
}

class Background {
}

function mousePressed() {
  for (let tree of trees) {
    if (tree.containsMouse()) {
      sidebarOn=1 - sidebarOn;
      tree.clicked = true;
    }
  }
}
