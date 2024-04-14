class Sidebar {
  constructor() {
    this.wShadow = wi/24;
    this.pos = createVector(wi+this.wShadow, 0);
    this.w = 0.42*wi;
    this.h = wh;
    
    this.id = -1;
    this.on = 0;
    this.i3 = loadImage('assets/story_trees/Boston_CommonTree.PNG');
    this.i6 = loadImage('assets/story_trees/Jamaica_PlainTree.PNG');
    this.i7 = loadImage('assets/story_trees/MattapanTree.PNG');
    this.i9 = loadImage('assets/story_trees/KenmoreTree.PNG');
    this.i14 = loadImage('assets/story_trees/East_BostonTree.PNG');
    
    this.xSize = this.w/16;
    
    this.slides3 = constructStory3();
    this.slides6 = constructStory6();
    this.slides7 = constructStory7();
    this.slides9 = constructStory9();
    this.slides14 = constructStory14();
    
    this.slideIndex = 0;
  }
  
  show() {
    if (this.on) {
      this.pos.x = lerp(this.pos.x, wi-this.w, 0.1);
    }
    else {
      this.pos.x = lerp(this.pos.x, wi+this.wShadow, 0.1);
    }
    if (abs(this.pos.x - (wi+this.wShadow)) < 1) {
      this.slideIndex = 0;
    }
    
    push();
    translate(this.pos.x, this.pos.y);
    fill(250, 250);
    noStroke();
    rect(0, 0, this.w, this.h);
    this.showShadow();
    // this.showStory3();
    switch (this.id) {
      case 3:
        this.showStory3(); break;
      case 6:
        this.showStory6(); break;
      case 7:
        this.showStory7(); break;
      case 9:
        this.showStory9(); break;
      case 14:
        this.showStory14(); break;
    }
    this.showSlides();
    this.showX();
    pop();
  }
  
  showSlides() {
    push();
    translate(0.05*this.w, 0.5*this.h);
    let slides;
    switch (this.id) {
      case 3:
        slides = this.slides3; break;
      case 6:
        slides = this.slides6; break;
      case 7:
        slides = this.slides7; break;
      case 9:
        slides = this.slides9; break;
      case 14:
        slides = this.slides14; break;
    }
    if (this.slideIndex > 0 && slides) {
      if (this.slideIndex < slides.length+1) {slides[this.slideIndex-1].show();}
    }
    pop();
  }
  
  showX() {
    let b = 20;
    let wx = this.xSize - b;
    strokeWeight(4);
    if(this.on) {stroke(200);}
    else{stroke(200, 20, 20);}
    noFill();
    line(b, b, b+wx, b+wx);
    line(b+wx, b, b, b+wx);
  }
  
  
  showStory3() {
    // Show title
    textAlign(CENTER, CENTER);
    textSize(52);
    textFont('Times New Roman');
    noStroke();
    fill(0);
    text('A Story of Progress', this.w/2, this.h/5);
    
    
    noFill();
    let hS = 55;
    let wS = 0.9*this.w/4
    stroke(190);
    strokeWeight(3);
    line(this.w/2-wS, this.h/5-hS, this.w/2+wS, this.h/5-hS);
    line(this.w/2-wS, this.h/5+hS, this.w/2+wS, this.h/5+hS);
    
    
    // Show subtitle
    textFont(fReg);
    textSize(18);
    textAlign(CENTER, BASELINE);
    textWrap(WORD);
    noStroke();
    fill(0);
    text('These two elm trees were planted in Boston Commons by John Hancock! They tell a story of 244 years of progress.', 
    this.w/2-1.5*wS, this.h/5+2*hS, 3*wS, 200);
    
    let im = this.i3;
    let h = 1.4*this.h/2
    let w = h/im.height * im.width;
    image(im, (this.w-w)/2, this.h-h, w, h);
  }
  
  showStory6() {
    // Show title
    textAlign(CENTER, CENTER);
    textSize(52);
    textFont(fReg);
    noStroke();
    fill(0);
    text('THE POWER OF PETITION', this.w/2, this.h/5);
    
    noFill();
    let hS = 55;
    let wS = 0.9*this.w/4
    stroke(190);
    strokeWeight(3);
    line(this.w/2-wS, this.h/5-hS, this.w/2+wS, this.h/5-hS);
    line(this.w/2-wS, this.h/5+hS, this.w/2+wS, this.h/5+hS);
    
    
    // Show subtitle
    textSize(18);
    textAlign(CENTER, BASELINE);
    textWrap(WORD);
    noStroke();
    fill(0);
    text('This tree shows us the power each of us has in shaping our environment.', 
    this.w/2-1.5*wS, this.h/5+2*hS, 3*wS, 200);
    
    let im = this.i6;
    let h = 1.3*this.h/2
    let w = h/im.height * im.width;
    image(im, (this.w-w)/2, this.h-h, w, h);
  }
  
  showStory7() {
    // Show title
    textAlign(CENTER, CENTER);
    textSize(52);
    textFont(fReg);
    noStroke();
    fill(0);
    text('THE SECRET GARDEN', this.w/2, this.h/5);
    
    noFill();
    let hS = 55;
    let wS = 0.9*this.w/4
    stroke(190);
    strokeWeight(3);
    line(this.w/2-wS, this.h/5-hS, this.w/2+wS, this.h/5-hS);
    line(this.w/2-wS, this.h/5+hS, this.w/2+wS, this.h/5+hS);
    
    
    // Show subtitle
    textSize(18);
    textAlign(CENTER, BASELINE);
    textWrap(WORD);
    noStroke();
    fill(0);
    text('This tree saw a forgotten piece land transform into a community garden.', 
    this.w/2-1.5*wS, this.h/5+2*hS, 3*wS, 200);
    
    let im = this.i7;
    let h = 1.4*this.h/2
    let w = h/im.height * im.width;
    image(im, (this.w-w)/2, this.h-h, w, h);
  }
  
  showStory9() {
    // Show title
    textAlign(CENTER, CENTER);
    textSize(52);
    textFont(fReg);
    noStroke();
    fill(0);
    text('KEEPING IT GREEN', this.w/2, this.h/5);
    
    noFill();
    let hS = 55;
    let wS = 0.9*this.w/4
    stroke(190);
    strokeWeight(3);
    line(this.w/2-wS, this.h/5-hS, this.w/2+wS, this.h/5-hS);
    line(this.w/2-wS, this.h/5+hS, this.w/2+wS, this.h/5+hS);
    
    
    // Show subtitle
    textSize(18);
    textAlign(CENTER, BASELINE);
    textWrap(WORD);
    noStroke();
    fill(0);
    text('From the Green Line to a park, these trees have seen a lot.', 
    this.w/2-1.5*wS, this.h/5+2*hS, 3*wS, 200);
    
    let im = this.i9;
    let h = 1.4*this.h/2
    let w = h/im.height * im.width;
    image(im, (this.w-w)/2, this.h-h, w, h);
  }
  
  showStory14() {
    // Show title
    textAlign(CENTER, CENTER);
    textSize(52);
    textFont(fReg);
    noStroke();
    fill(0);
    text('REBUILDING THE CANOPY', this.w/2, this.h/5);
    
    noFill();
    let hS = 55;
    let wS = 0.9*this.w/4
    stroke(190);
    strokeWeight(3);
    line(this.w/2-wS, this.h/5-hS, this.w/2+wS, this.h/5-hS);
    line(this.w/2-wS, this.h/5+hS, this.w/2+wS, this.h/5+hS);
    
    
    // Show subtitle
    textSize(18);
    textAlign(CENTER, BASELINE);
    textWrap(WORD);
    noStroke();
    fill(0);
    text('East Boston has the fewest trees of any neighborhood. Bostonians coming together to change that.', 
    this.w/2-1.5*wS, this.h/5+2*hS, 3*wS, 200);
    
    let im = this.i14;
    let h = 1.3*this.h/2
    let w = h/im.height * im.width;
    image(im, (this.w-w)/2, this.h-h, w, h);
  }
  
  
  showShadow(){
    push();
    noStroke();
    for (let i = 0; i < 40; i++) {
      fill(10, 120-i*3);
      rect(-i, 0, 2, this.h);
    }
    pop();
  }
  
  setId(id) {
    this.id = id;
  }
  
  containsMouse() {
    return mouseX > this.pos.x && mouseX < this.pos.x + this.w && mouseY > 0 && mouseY < this.h;
  }
  
  mouseOnX() {
    return mouseX > this.pos.x && mouseX < this.pos.x + this.xSize && mouseY > 0 && mouseY < this.xSize;
  }
}




class Slide {
  constructor(id, title, content, img, src, author, sbw) {
    this.title=title;
    this.content=content;
    this.img = loadImage('assets/stories/story' + id + '/' + img + '.jpg');
    this.src = src;
    this.author = author;
    this.w = 0.9*sbw;
    this.h = 0.4*wh;
    
    this.imgWidth = 0.5 * this.w;
    this.imgHeight = 0;
  }
  
  show() {
    this.showBacking();
    this.showTitle();
    this.showImage();
    this.showCaption();
    this.showContent();
  }
  
  showBacking() {
    stroke(0);
    fill(255, 250);
    rect(0, 0, this.w, this.h);
  }
  
  showTitle() {
    textFont(fBold);
    textSize(32);
    textAlign(LEFT, CENTER);
    fill(0);
    noStroke();
    text(this.title, 0.05*this.w, 0.15*this.h); // TO CHANGE: alter coordinates
  }
  
  showImage() {
    push();
    translate(0.05*this.w, 100);
    this.imgHeight = this.imgWidth / this.img.width * this.img.height
    image(this.img, 0, 0, this.imgWidth, this.imgHeight); //, this.imgWidth, this.imgHeight
    pop();
  }
  
  showCaption() {
    textFont(fReg);
    textSize(16);
    textAlign(LEFT, CENTER);
    fill(0);
    noStroke();
    text('Image Source: ' + this.src, 0.05*this.w, 100+this.imgHeight+20); // TO CHANGE: alter coordinates
    text('Artist: ' + this.author, 0.05*this.w, 100+this.imgHeight+40);
  }
  
  showContent() {
    textFont(fReg);
    textSize(16);
    textAlign(LEFT, CENTER);
    fill(0);
    noStroke();
    text(this.content, 0.6*this.w, 100, wi-0.05*this.w, wh); // TO CHANGE: alter coordinates
  }
}

function constructStory3() {
  let slides = [];
  slides.push(new Slide(3, 'Banana', 'Banana bananan', 'img1', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(3, 'Lemon', 'Banana bananan', 'img2', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(3, 'Lime', 'Banana bananan', 'img3', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(3, 'Apple', 'Banana bananan', 'img4', 'orange', 'Me, Chase', 0.42*wi));
  return slides
}

function constructStory6() {
  let slides = [];
  slides.push(new Slide(6, 'Banana', 'Banana bananan', 'img1', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(6, 'Lemon', 'Banana bananan', 'img2', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(6, 'Lime', 'Banana bananan', 'img3', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(6, 'Apple', 'Banana bananan', 'img4', 'orange', 'Me, Chase', 0.42*wi));
  return slides
}

function constructStory7() {
  let slides = [];
  slides.push(new Slide(7, 'Banana', 'Banana bananan', 'img1', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(7, 'Lemon', 'Banana bananan', 'img2', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(7, 'Lime', 'Banana bananan', 'img3', 'orange', 'Me, Chase', 0.42*wi));
  return slides
}

function constructStory9() {
  let slides = [];
  slides.push(new Slide(9, 'Banana', 'Banana bananan', 'img1', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(9, 'Lemon', 'Banana bananan', 'img2', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(9, 'Lime', 'Banana bananan', 'img3', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(9, 'Lemon', 'Banana bananan', 'img4', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(9, 'Lime', 'Banana bananan', 'img5', 'orange', 'Me, Chase', 0.42*wi));
  return slides
}

function constructStory14() {
  let slides = [];
  slides.push(new Slide(14, 'Banana', 'Banana bananan', 'img1', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(14, 'Lemon', 'Banana bananan', 'img2', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(14, 'Lime', 'Banana bananan', 'img3', 'orange', 'Me, Chase', 0.42*wi));
  slides.push(new Slide(14, 'Lemon', 'Banana bananan', 'img4', 'orange', 'Me, Chase', 0.42*wi));
  return slides
}
