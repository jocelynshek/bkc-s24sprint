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
    if (this.on == 0) {this.slideIndex = 0;}
    
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
    text('Growing Together', this.w/2, this.h/5);
    
    
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
    text('Two elm trees, planted in the Boston Common by John Hancock, tell a story of 244 years of progress.', 
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
    text('The Power of Petition', this.w/2, this.h/5);
    
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
    text('Finding Purpose', this.w/2, this.h/5);
    
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
    text('Keeping it green', this.w/2, this.h/5);
    
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
    text('From the Green Line to a park, these trees have seen a lot in their lifetime.', 
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
    text('Seeds of Change', this.w/2, this.h/5);
    
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
    text('East Boston has the fewest trees of any neighborhood. Bostonians are coming together to change that.', 
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
    this.h = 0.45*wh;
    
    this.imgWidth = this.w;
    this.imgHeight = this.h;
  }
  
  rescale() {
    if (this.imgHeight > 0.6*this.h) {
      this.imgHeight = 0.6*this.h;
      this.imgWidth = this.imgHeight/this.img.height * this.img.width;
    }
    if (this.imgWidth > 0.5*this.w) {
      this.imgWidth = 0.5*this.w;
      this.imgHeight = this.imgWidth/this.img.width * this.img.height;
    }
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
    this.rescale();
    // this.imgWidth = this.imgHeight / this.img.height * this.img.width;
    image(this.img, 0, 0, this.imgWidth, this.imgHeight); //, this.imgWidth, this.imgHeight
    pop();
  }
  
  showCaption() {
    textFont(fReg);
    textSize(14);
    textAlign(LEFT, CENTER);
    fill(0);
    noStroke();
    if (this.src) {
      text('Source: ' + this.src, 0.05*this.w, 100+this.imgHeight+20); // TO CHANGE: alter coordinates
      text(this.author, 0.05*this.w, 100+this.imgHeight+40);
    }
    else {
      text(this.author, 0.05*this.w, 100+this.imgHeight+20);
    }
  }
  
  showContent() {
    textFont(fReg);
    textSize(14);
    textAlign(LEFT, TOP);
    fill(0);
    noStroke();
    text(this.content, 0.08*this.w+this.imgWidth, 100, this.w-this.imgWidth-0.13*this.w, wh); // TO CHANGE: alter coordinates
  }
}






function constructStory3() {
  let slides = [];
  slides.push(new Slide(
    3, 
    'Fighting for Independence', // Title
    'See the two trees below the arrow in this painting of Boston Commons in 1808? They are the same trees standing today! When they were planted back in 1780, Boston was a very different place. The US was still fighting for independence from the British, and slavery was legal.', //  Content
    'img1', // Image Path
    'Boston Public Library', // Source
    'Artist: John Rubens Smith', // Artist Credit
     0.42*wi // Sidebar Width
  ));
  slides.push(new Slide(
    3, 
    'The Fight Against Slavery', 
    'This picture from 1897 is one of the first photos of the two elm trees. Notice the memorial that was built around them? The Shaw Memorial honors one of the first black regiments in the Civil War that fought to end slavery in the US.', 
    'img2', 
    'Massachusetts Historical Society', 
    '', 
     0.42*wi
  ));
  slides.push(new Slide(
    3, 
    'Women\’s Suffrage', 
    'This photo, taken in the early 1900s, captures a time when women fought for and got the right to vote. Looming in the left corner is the elm tree which is now well over 100 years old!', 
    'img3', 
    'Boston Public Library', 
    'Photographer: J.S. Johnston', 
     0.42*wi
  ));
  slides.push(new Slide(
    3, 
    'Marriage Equality', 
    'In 2004, Massachusetts became the first state to legalize same-sex marriage. In this photo, demonstrators react moments after the state court upheld the decision. Can you spot the elm tree in the upper right corner?\n\nWhat other moments of progress have these two elms witnessed in their 244 years of life?', 
    'img4', 
    '', 
    'Photographer: Tim Pierce', 
     0.42*wi
  ));
  return slides
}

function constructStory14() {
  let slides = [];
  slides.push(new Slide(
    14, 
    'East Boston has the fewest trees in Boston', // Title
    'East Boston is more than Logan International Airport. It is also home to over 40,000 Bostonians who are feeling the effects of having the fewest trees of any Boston neighborhood. This photo of East Boston from 1925 shows this isn’t a new problem.', //  Content
    'img1', // Image Path
    'Boston Public Library', // Source
    '', // Artist Credit
     0.42*wi // Sidebar Width
  ));
  slides.push(new Slide(
    14, 
    'Why is having a healthy tree population important?', 
    'Trees help keep the streets cool in the summer, clean the air, and provide a habitat for animals. This photo from 1938 shows a woman enjoying a tree’s shade in East Boston Park. What else do trees provide a city?', 
    'img2', 
    'Boston Public Library', 
    '', 
     0.42*wi
  ));
  slides.push(new Slide(
    14, 
    'The city of Boston\’s commitment', 
    'The city of Boston is invested in creating a tree-ful future. In 2023 they planted 1,230 trees and responded to almost 8,000 tree-related 311 requests!\n\nDid you know Bostonians can request a tree to be planted on the sidewalk in front of their home or business for free? Scan the QR code to learn more.', 
    'img3', 
    'Adobe', 
    'Photographer: Anna Jurkovska', 
     0.42*wi
  ));
  slides.push(new Slide(
    14, 
    'Tree Eastie and how you can help', 
    'Community forestry organizations like Tree Eastie are taking matters into their own hands. In this photo community volunteers are planting a tree. So far Tree Eastie has planted 170 trees and counting! Scan the QR code to learn how you can help.', 
    'img4', 
    'Tree Eastie', 
    '',
     0.42*wi
  ));
  return slides
}

function constructStory7() {
  let slides = [];
  slides.push(new Slide(
    7, 
    'An isolated piece of land is created', // Title
    'In the 1920s, a block of land owned by William and Alice Hennessey is divided up and sold. One piece of that land, highlighted in this map from 1933, is cut off from the street. \n\nAround that time, a black walnut tree is planted.', //  Content
    'img1', // Image Path
    'Boston Public Library', // Source
    '', // Artist Credit
     0.42*wi // Sidebar Width
  ));
  slides.push(new Slide(
    7, 
    'A forgotten piece of land', 
    'That same piece of land is seen vacant in this aerial image from 1955. It will remain that way for another 66 years. \n\nShadows from a few trees can be seen. Can you spot them?', 
    'img2', 
    'USGS', 
    '', 
     0.42*wi
  ));
  slides.push(new Slide(
    7, 
    'Finding purpose', 
    'After decades of sitting vacant, this piece of land finds its purpose. In 2021 a community organization, Boston Food Forest, turns it into a thriving urban garden helping to feed the Mattapan community. \n\nThe black walnut tree planted over 100 years ago provides shade to the little seedlings. Scan the QR code to learn more about Boston’s urban gardens.', 
    'img3', 
    'Boston Food Forest', 
    '', 
     0.42*wi
  ));
  return slides
}

function constructStory9() {
  let slides = [];
  slides.push(new Slide(
    9, 
    'Building the Subway', // Title
    'Boston\’s subway is an important method of transportation for many. Did you know that over 750,000 people take the MBTA every weekday? That’s greater than the population of 30 different countries! In early 1912, they built part of the subway to connect to Kenmore Square, right next to Fenway Park.', //  Content
    'img1', // Image Path
    '', // Source
    '', // Artist Credit
     0.42*wi // Sidebar Width
  ));
  slides.push(new Slide(
    9, 
    'Beautifying the Town', 
    'A few months later, the city decided to plant trees in the area. Did you know that spending time around trees lowers stress and improves mood? The trees planted back then are still here today, and have been making people happy for more than 110 years!', 
    'img2', 
    '', 
    '', 
     0.42*wi
  ));
  slides.push(new Slide(
    9, 
    'A New Station', 
    'In 1914, construction of the Kenmore subway incline and surface station in Kenmore Square was completed, with the existing trees lining the track. This station was in place until 1932.', 
    'img3', 
    '', 
    '', 
     0.42*wi
  ));
  slides.push(new Slide(
    9, 
    'Rise of Automobiles', 
    'By the 1950s, the city had built a new subway station one block over, which is the Kenmore T stop still uses today. Notice the dramatic increase in cars over time! How do you think the growing use of automobiles for transportation has impacted the way Boston is built?', 
    'img4', 
    '', 
    '', 
     0.42*wi
  ));
  slides.push(new Slide(
    9, 
    'Relaxing with History', 
    'Today, Kenmore Square is mainly a park and open green space, perfect for having a picnic with friends or relaxing with family! Do you see the arch in the back? That’s the top of the original subway surface station! What else in Boston reminds you of its history?', 
    'img5', 
    '', 
    '', 
     0.42*wi
  ));
  return slides
}

function constructStory6() {
  let slides = [];
  slides.push(new Slide(
    6, 
    'A gold standard', // Title
    'Residents of Jamaica Plains take pride in having the highest tree density of any of Boston’s neighborhoods. The area is home to many parks, a zoo, and Arnold Arboretum, a botanical garden dedicated to trees. Scan the QR code to learn more about the arboretum.', //  Content
    'img1', // Image Path
    'Ben Illot, Flickr', // Source
    '', // Artist Credit
     0.42*wi // Sidebar Width
  ));
  slides.push(new Slide(
     6, 
    'A growing neighborhood', 
    'When developers proposed a new 6-unit condominium in Jamaica Plains, city planners were excited. The project would bring housing to a growing neighborhood while keeping the large trees on the property in tact.', 
    'img2', 
    '', 
    'Artist: David Choi', 
     0.42*wi
  ));
  slides.push(new Slide(
    6, 
    'A false promise', 
    'As construction began, a neighbor noticed workers preparing to cut down the largest tree on the property, a 150 year old oak tree, seen in this photo. \n\nHe convinced the workers to wait but knew they’d be back soon.', 
    'img3', 
    '', 
    '', 
     0.42*wi
  ));
  slides.push(new Slide(
    6, 
    'An ongoing fight', 
    'As word got out, residents came together to protest on behalf of the tree which had served as a backdrop of the community for generations.\n\nThe city took notice and made the developer pause construction. The tree still stands but it’s fate is unknown. \n\nIs there a tree you would fight to protect?', 
    'img4', 
    '', 
    '', 
     0.42*wi
  ));
  return slides
}
