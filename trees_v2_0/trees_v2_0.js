
let tree, sb;
let trees = [];

let sidebarOn = false;
let hoverCounter = 0;
let hoverTimer = 0;


function setup() {
  createCanvas(1050, 850);
  
  tree = new Tree(createVector(125, 125), 0, 150, color(76, 162, 38));
  trees.push(tree);
  tree = new Tree(createVector(525, 325), 0, 150, color(76, 162, 38));
  trees.push(tree);
  tree = new Tree(createVector(725, 525), 0, 150, color(76, 162, 38));
  trees.push(tree);
  
  sb = new Sidebar();
}


function draw() {
  background(240);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      noStroke();
      fill(200);
      rect(50+i*200, 50+j*200, 150, 150);
    }
  }
  trees.map(t => t.show());
  sb.show();
  
  for (let tree of trees) {
    if (tree.hovering) {hoverTimer=0;}
  }
  for (let tree of trees) {
    if (hoverTimer == 0) {tree.timeout = false;}
  }
  
  if (hoverTimer % 120 >=75) {
    trees[hoverCounter%trees.length].timeout=true;
  }
  if (hoverTimer % 120 == 119) {
    trees[hoverCounter%trees.length].timeout=false;
    hoverCounter += 1;
  }
  
  hoverTimer += 1;
  hoverTimer = hoverTimer % 120;
}

class Tree {
  constructor(pos, id, w, c) {
    this.w = w;
    this.s = w;
    this.pos = pos;
    this.id = id;
    this.c = c;
    this.a = 1; // a scaling factor of the overall size
    this.hovering = false;
    this.timeout = false;
    
    this.image = 0;
  }
  
  
  show() {
    this.checkHover();
    if (this.hovering || this.timeout) {this.a = 0.1*1.1 + 0.9*this.a; this.c = lerpColor(color(76, 162, 38), this.c, 0.95);}
    else {this.a = constrain(0.05*1 + 0.95*this.a, 1, 10); this.c = lerpColor(color(150, 170, 146), this.c, 0.95);}
    this.s = this.a*this.w;
    
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.c);
    rect(-this.s/2, -this.s/2, this.s, this.s);
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
    return (mouseX > this.pos.x - this.s/2) &&
    (mouseX < this.pos.x + this.s/2) &&
    (mouseY > this.pos.y - this.s/2) &&
    (mouseY < this.pos.y + this.s/2);
  }
}

class Sidebar {
  constructor() {
    this.pos = createVector(width, 0);
    this.w = 300;
  }
  
  show() {
    if (sidebarOn) {
      this.pos.x = lerp(this.pos.x, width-this.w, 0.1);
    }
    else {
      this.pos.x = lerp(this.pos.x, width, 0.1);
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
    }
  }
}
