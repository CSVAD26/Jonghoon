let img;
let cols = 3, rows = 3;
let cellColors = [];
let x = 0, y = 0;
let w = 0, h = 0;
let lines = [];
let cnt = null;
let showSpiral = true;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  textAlign(CENTER, CENTER);
  textSize(14);

  createP("Upload an image:");
  createFileInput(handleFile);
  createP("Click: highlight cell | Shift + drag: draw line | G: spiral | C: clear");

  resetCellColors();

  window.addEventListener("keydown", (event) => {
    if (event.repeat) return;

    if (event.key.toLowerCase() === "g") {
      showSpiral = !showSpiral;
    }

    if (event.key.toLowerCase() === "c") {
      clearAnnotations();
    }
  }, true);
}

function draw() {
  background(0, 0, 95);

  if (img) {
    image(img, x, y, w, h);
    drawGrid();
    drawLines();

    if (showSpiral) {
      drawGoldenSpiral();
    }
  } else {
    fill(0);
    noStroke();
    text("Upload an image to begin", width / 2, height / 2);
  }
}

function handleFile(file) {
  if (file.type === "image") {
    img = loadImage(file.data, () => {
      let scale = min(width / img.width, height / img.height);
      w = img.width * scale;
      h = img.height * scale;
      x = (width - w) / 2;
      y = (height - h) / 2;
      clearAnnotations();
    });
  } else {
    img = null;
  }
}

function resetCellColors() {
  for (let i = 0; i < cols * rows; i++) {
    cellColors[i] = color(0, 0, 95, 0.2);
  }
}

function clearAnnotations() {
  lines = [];
  cnt = null;
  resetCellColors();
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
}

function mousePressed(event) {
  if (!img) return;
  if (mouseX < x || mouseX >= x + w || mouseY < y || mouseY >= y + h) return;

  if (event.shiftKey) {
    cnt = { x: mouseX, y: mouseY };
    return;
  }

  let i = floor((mouseX - x) / (w / cols));
  let j = floor((mouseY - y) / (h / rows));
  let index = j * cols + i;

  let blue = color(210, 80, 80, 0.4);
  let gray = color(0, 0, 95, 0.2);

  cellColors[index] =
    hue(cellColors[index]) === hue(blue) ? gray : blue;
}

function mouseReleased() {
  if (!cnt) return;

  let endX = constrain(mouseX, x, x + w);
  let endY = constrain(mouseY, y, y + h);

  if (dist(cnt.x, cnt.y, endX, endY) > 3) {
    lines.push({
      x1: cnt.x,
      y1: cnt.y,
      x2: endX,
      y2: endY
    });
  }

  cnt = null;
}

function drawLines() {
  stroke(160, 100, 100);
  strokeWeight(4);

  for (let guide of lines) {
    line(guide.x1, guide.y1, guide.x2, guide.y2);
  }

  if (cnt) {
    line(
      cnt.x,
      cnt.y,
      constrain(mouseX, x, x + w),
      constrain(mouseY, y, y + h)
    );
  }
}

// AI helped me find the golden spiral formula.
function drawGoldenSpiral() {
  const phi = (1 + sqrt(5)) / 2;
  const maxAngle = TWO_PI * 3;
  const points = [];

  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  for (let i = 0; i <= 500; i++) {
    let angle = maxAngle * i / 500;
    let radius = pow(phi, (angle - maxAngle) / HALF_PI);
    let px = radius * cos(angle);
    let py = radius * sin(angle);

    points.push({ x: px, y: py });
    minX = min(minX, px);
    maxX = max(maxX, px);
    minY = min(minY, py);
    maxY = max(maxY, py);
  }

  let scale = min(
    w * 0.94 / (maxX - minX),
    h * 0.94 / (maxY - minY)
  );

  let offsetX = x + (w - (maxX - minX) * scale) / 2 - minX * scale;
  let offsetY = y + (h - (maxY - minY) * scale) / 2 - minY * scale;

  push();
  noFill();
  stroke(42, 100, 100);
  strokeWeight(3);

  beginShape();
  for (let point of points) {
    vertex(
      offsetX + point.x * scale,
      offsetY + point.y * scale
    );
  }
  endShape();

  pop();
}