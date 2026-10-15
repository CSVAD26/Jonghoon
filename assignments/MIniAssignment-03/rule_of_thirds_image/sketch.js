let img;
let cols = 3, rows = 3;
let cellColors = [];
let input;
let x = 0, y = 0, w = 0, h = 0;
let lines = [];
let start = null;
let spiral = true;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100, 1);
  textAlign(CENTER, CENTER);
  textSize(14);

  createP("Upload an image:");
  input = createFileInput(handleFile);
  createP("Click: highlight cell, Shift + drag: draw line, G: spiral | C: clear");
  resetcolors();
}

function draw() {
  background(0, 0, 95);

  if (img) {
    image(img, x, y, w, h);
    drawGrid();
    drawlines();

    if (spiral) {
      drawspiral();
    }
  } else {
    fill(0);
    noStroke();
    text("Upload an image to begin", width / 2, height / 2);
  }
}

function handleFile(file) {
  if (file.type == 'image') {
    img = loadImage(file.data, () => {
      let scale = min(width / img.width, height / img.height);
      w = img.width * scale;
      h = img.height * scale;
      x = (width - w) / 2;
      y = (height - h) / 2;
      clearall();
    });
  } else {
    img = null;
  }
}

function resetcolors() {
  for (let i = 0; i < cols * rows; i++) {
    cellColors[i] = color(0, 0, 95, 0.2);
  }
}

function clearall() {
  lines = [];
  start = null;
  resetcolors();
}

function drawGrid() {
  noStroke();

  let cellW = w / cols;
  let cellH = h / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = j * cols + i;
      fill(cellColors[index]);
      rect(x + i * cellW, y + j * cellH, cellW, cellH);
    }
  }

  stroke(0);
  strokeWeight(2);
  noFill();
  rect(x, y, w, h);

  for (let i = 1; i < cols; i++) {
    line(x + i * cellW, y, x + i * cellW, y + h);
  }

  for (let j = 1; j < rows; j++) {
    line(x, y + j * cellH, x + w, y + j * cellH);
  }

  noStroke();
  fill(0);
}

function mousePressed() {
  if (!img) return;
  if (mouseX < x || mouseX >= x + w || mouseY < y || mouseY >= y + h) return;

  if (keyIsDown(SHIFT)) {
    start = { x: mouseX, y: mouseY };
    return;
  }

  let cellW = w / cols;
  let cellH = h / rows;
  let i = floor((mouseX - x) / cellW);
  let j = floor((mouseY - y) / cellH);
  let index = j * cols + i;

  let current = cellColors[index];
  let blue = color(210, 80, 80, 0.4);
  let gray = color(0, 0, 95, 0.2);

  if (hue(current) == hue(blue)) {
    cellColors[index] = gray;
  } else {
    cellColors[index] = blue;
  }
}

function mouseReleased() {
  if (!start) return;

  let endx = constrain(mouseX, x, x + w);
  let endy = constrain(mouseY, y, y + h);

  if (dist(start.x, start.y, endx, endy) > 3) {
    lines.push({
      x1: start.x,
      y1: start.y,
      x2: endx,
      y2: endy
    });
  }

  start = null;
}

function drawlines() {
  stroke(160, 100, 100);
  strokeWeight(4);

  for (let guide of lines) {
    line(guide.x1, guide.y1, guide.x2, guide.y2);
  }

  if (start) {
    line(
      start.x,
      start.y,
      constrain(mouseX, x, x + w),
      constrain(mouseY, y, y + h)
    );
  }
}

function keyPressed() {
  if (key == 'g' || key == 'G') {
    spiral = !spiral;
  }

  if (key == 'c' || key == 'C') {
    clearall();
  }
}

// I used AI to help write the spiral
function drawspiral() {
  let phi = (1 + sqrt(5)) / 2;
  let maxangle = TWO_PI * 3;
  let points = [];

  let minx = Infinity, maxx = -Infinity;
  let miny = Infinity, maxy = -Infinity;

  for (let i = 0; i <= 500; i++) {
    let angle = maxangle * i / 500;
    let radius = pow(phi, (angle - maxangle) / HALF_PI);
    let px = radius * cos(angle);
    let py = radius * sin(angle);

    points.push({ x: px, y: py });
    minx = min(minx, px);
    maxx = max(maxx, px);
    miny = min(miny, py);
    maxy = max(maxy, py);
  }

  let scale = min(
    w * 0.94 / (maxx - minx),
    h * 0.94 / (maxy - miny)
  );

  let offsetx = x + (w - (maxx - minx) * scale) / 2 - minx * scale;
  let offsety = y + (h - (maxy - miny) * scale) / 2 - miny * scale;

  push();
  noFill();
  stroke(42, 100, 100);
  strokeWeight(3);

  beginShape();
  for (let point of points) {
    vertex(
      offsetx + point.x * scale,
      offsety + point.y * scale
    );
  }
  endShape();

  pop();
}