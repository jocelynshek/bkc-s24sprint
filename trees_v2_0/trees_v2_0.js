
let tile, sidebar;

let sidebarOn = false;
let hoverIndex = 0;
let hoverTimer = 0;

let ibg;
let wi, wh;
let images = [];

function preload() {
  ibg = loadImage('images/bkc_map2.png');
  img = loadImage('images/jp_tree.png');
  images.push(img);
}

function setup() {
  wi = windowWidth;
  wh = windowWidth/ibg.width * windowHeight;
  createCanvas(wi, wh);
  constructTiles();
  
  sidebar = new Sidebar();
}


function draw() {
  background(240);
  image(ibg, 0, 0, wi, wh);

  tiles.map(t => t.show());
  sidebar.show();
  
  handleHover();
}

function handleHover() {
  let tMax = 240;
  for (let tile of tiles) {
    if (tile.hovering) {hoverTimer=0;}
  }
  for (let tile of tiles) {
    if (hoverTimer == 0) {tile.timeout = false;}
  }
  
  if (hoverTimer % tMax >=tMax-60) {
    tiles[hoverIndex%tiles.length].timeout=true;
  }
  if (hoverTimer % tMax == tMax-1) {
    tiles[hoverIndex%tiles.length].timeout=false;
    hoverIndex += 1;
  }
  
  hoverTimer += 1;
  hoverTimer = hoverTimer % tMax;
}


class Sidebar {
  constructor() {
    this.wShadow = wi/24;
    this.pos = createVector(wi+this.wShadow, 0);
    this.w = wi/3;
    
    this.id = -1;
  }
  
  show() {
    if (sidebarOn) {
      this.pos.x = lerp(this.pos.x, wi-this.w, 0.1);
    }
    else {
      this.pos.x = lerp(this.pos.x, wi+this.wShadow, 0.1);
    }
    push();
    translate(this.pos.x, this.pos.y);
    fill(250, 255);
    strokeWeight(4);
    stroke(0);
    rect(0, 0, this.w, height);
    fill(20, 100);
    noStroke();
    rect(-this.wShadow, 0, this.wShadow, height);
    
    fill(0);
    textAlign(CENTER);
    textSize(32);
    text('SiDeBaR', this.w/2, 75);
    text(this.id, this.w/2, 100);
    pop();
  }
  
  setId(id) {
    this.id = id;
  }
}

class Background {
}

let yClick = 0;

function mousePressed() {
  // Handle interactions with tile clicks
  for (let tile of tiles) {
    if (tile.containsMouse()) {
      if (sidebar.id == tile.id) { // Close the sidebar if it was already showing the story of this tile
        sidebarOn= 1 - sidebarOn;
      }
      else { // Switch the sidebar content and open it if it was closed
        sidebar.setId(tile.id);
        sidebarOn = 1;
      }
      
      // Toggle the tile and confirm that it has been Clicked
      tile.justClicked = true;
      tile.clicked = true;
      yClick = mouseY;
      deselectOthers(tile.id);
    }
  }
  
  // Handle interactions with sidebar clicks
}

function mouseDragged() {
  for (let tile of tiles) {
    if (tile.justClicked) {
      tile.shift = lerp(tile.maxShift*constrain((yClick-mouseY)/100, 0, 1), tile.shift, 0.95);
    }
  }
}

function mouseReleased() {
  for (let tile of tiles) {
    if (tile.justClicked) {
      tile.selected = 1 - tile.selected;
      tile.justClicked = false;
    }
  }
}
