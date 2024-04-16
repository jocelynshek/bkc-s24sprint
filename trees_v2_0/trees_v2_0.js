
let tile, sidebar;

let hoverIndex = 0;
let hoverTimer = 0;
let fReg, fBold;

let ibg, iInstruction;
let iWater;

let wi, wh;
let scaleFactor;
let images = [];
let iBuildings = [];

let instructed = false; // Parameter to indicate if the user has read the instructions

let fr = 60;

function preload() {
  // Preload images
  ibg = loadImage('assets/map/BaseMap.PNG');
  iWater = loadImage('assets/map/Water.PNG');
  iInstruction = loadImage('assets/map/Instruction.png');
  images.push(loadImage('assets/map/Location_Tags.PNG'));
  
  // Preload building images
  iBuildings.push(loadImage('assets/map/Allston_Brighton.PNG'))
  iBuildings.push(loadImage('assets/map/Charlestown.PNG'))
  iBuildings.push(loadImage('assets/map/Dorchester.PNG'))
  iBuildings.push(loadImage('assets/map/Mission_Hill.PNG'))
  iBuildings.push(loadImage('assets/map/Allston_Brighton.PNG'))
  iBuildings.push(loadImage('assets/map/Roxbury.PNG'))
  iBuildings.push(loadImage('assets/map/South_Boston.PNG'))
  iBuildings.push(loadImage('assets/map/South_End.PNG'))
  iBuildings.push(loadImage('assets/map/West_Roxbury.PNG'))
  iBuildings.push(loadImage('assets/map/Roslindale.PNG'))
  iBuildings.push(loadImage('assets/map/North_End.PNG'))
  iBuildings.push(loadImage('assets/map/Hyde_Park.PNG'))
  
  // Preload fonts
  fReg = loadFont('assets/fonts/OpenSans-Regular.ttf');
  fBold = loadFont('assets/fonts/OpenSans-Bold.ttf');
}

function setup() {
  frameRate(fr); 
  
  wi = windowWidth;
  scaleFactor = windowWidth/ibg.width;
  wh = scaleFactor * windowHeight;
  createCanvas(wi, wh);
  constructTiles();
  
  sidebar = new Sidebar();
}


function draw() {
  drawBackground();
  
  
  tiles.map(t => t.show());
  drawBuildings();
  drawTags();
  
  if (!instructed) {
    fill(0, 100);
    rect(0, 0, width, height);
    let iiw = 0.6*width;
    let iih = iiw/iInstruction.width*iInstruction.height;
    image(iInstruction, width/2-iiw/2, height/2-iih/2, iiw, iih);
  }
  
  sidebar.show();
  
  handleHover();
}

function drawTags() {
  images.map(i => image(i, 0, 0, wi, wh));
  drawTagRect(0.220*wi, 0.126*wh, 95, 'Elm Trees');
  drawTagRect(0.375*wi, 0.596*wh, 176, 'Honeylocust Trees');
  drawTagRect(0.280*wi, 0.816*wh, 90, 'Oak Tree');
  drawTagRect(0.345*wi, 0.950*wh, 172, 'Black Walnut Tree');
  drawTagRect(0.715*wi, 0.230*wh, 122, 'New Canopy');
}

function drawTagRect(x, y, w, t) {
  noStroke();
  textFont(fBold);
  textSize(20);
  fill(116, 92, 85, 200); 
  rect(x, y, w, 30, 3);
  fill(255, 0, 0);
  rect(x, y, w, 25, 3);
  textAlign(LEFT, CENTER);
  fill(255);
  text(t, x+3, y+20/2);
}


let posWave = 0;
function drawBackground() {
  background(240);
  image(ibg, 0, 0, wi, wh);
  
  // Animate waves and buoys
  posWave = 20*sin(0.01*frameCount);
  // Draw waves and buoys
  image(iWater, posWave, -abs(0.2*posWave), wi, wh);
}

function drawBuildings() {
  iBuildings.map(i => image(i, 0, 0, wi, wh));
}

function handleHover() {
  let tMax = 4*fr;
  for (let tile of tiles) {
    if (tile.hovering) {hoverTimer=0;}
  }
  for (let tile of tiles) {
    if (hoverTimer == 0) {tile.timeout = false;}
  }
  
  if (hoverTimer % tMax >=tMax-2*fr) {
    if (tiles[hoverIndex].selected) {hoverIndex = (hoverIndex+1)%tiles.length;}
    tiles[hoverIndex].timeout=true;
  }
  if (hoverTimer % tMax == tMax-1) {
    tiles[hoverIndex].resetIdle();
    hoverIndex = (hoverIndex+1)%tiles.length;
  }
  
  while (!tiles[hoverIndex].hasStory) {
    hoverIndex = (hoverIndex+1)%tiles.length;
  }
  
  hoverTimer += 1;
  hoverIndex = hoverIndex % tiles.length;
  hoverTimer = hoverTimer % tMax;
}




let xClick = 0;
let yClick = 0;

function mousePressed() {
  // Handle instructions page
  if (!instructed) {
    instructed = true;
    return;
  }
  // Handle interactions with sidebar clicks
  if (sidebar.containsMouse()) {
    if (sidebar.mouseOnX()) {
      sidebar.on = 0;
      for (let tile of tiles) {
        if (tile.selected) {tile.selected = 0;}
      }
    }
    else {
      sidebar.justClicked=true;
      xClick = mouseX;
      yClick = mouseY;
    }
    return;
  }
  // Handle interactions with tile clicks
  for (let tile of tiles) {
    if (tile.containsMouse() && tile.hasStory) {
      if (sidebar.id == tile.id) { // Close the sidebar if it was already showing the story of this tile
        sidebar.on = 1 - sidebar.on;
      }
      else { // Switch the sidebar content and open it if it was closed
        sidebar.setId(tile.id);
        sidebar.on = 1;
      }
      
      // Toggle the tile and confirm that it has been Clicked
      tile.justClicked = true;
      tile.clicked = true;
      tile.complete = true;
      sidebar.slidePos=0;
      sidebar.slideIndex=0;
      xClick = mouseX;
      yClick = mouseY;
      deselectOthers(tile.id);
    }
  }
}

function mouseDragged() {
  if (sidebar.justClicked) {
    sidebar.slidePos = lerp(sidebar.slidePos, -sidebar.slideIndex + constrain(0.001*(mouseY-yClick), -100, 100), 0.1);
    return;
  }
  
  for (let tile of tiles) {
    if (tile.justClicked) {
      tile.shift = lerp(tile.maxShift*constrain((yClick-mouseY)/100, 0, 1), tile.shift, 0.95);
      return;
    }
  }
}

function mouseReleased() {
  if (sidebar.justClicked) {
    sidebar.justClicked = false;
    if (mouseY > yClick && sidebar.slideIndex > 0) {sidebar.slideIndex -= 1;}
    else {sidebar.slideIndex += 1;}
    return;
  }
  for (let tile of tiles) {
    if (tile.justClicked) {
      tile.justClicked = false;
      tile.justTimer = 0;
      tile.selected = 1 - tile.selected;
      noFill();
      stroke(0, 200, 0);
      circle(xClick, yClick, 100);
      hoverTimer = 0;
    }
  }
}
