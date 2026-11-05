function setup() {
  createCanvas(600, 400, WEBGL);
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

function draw() {
  background(0);
  ambientLight(0, 0, 60);
  directionalLight(10, 0, 90, -1, -1, -1);

  let hue = map(mouseX, 0, width, 0, 360);
  let saturation = map(mouseY, 0, height, 100, 0);

  rotateX(-0.35);
  rotateY(0.75);

  push();
  translate(-200, 0, 0);
  fill(hue, saturation, 100);
  box(160, 260, 70);
  pop();

  push();
  translate(0, 0, 0);
  fill(hue, saturation, 70);
  box(160, 260, 70);
  pop();

  push();
  translate(200, 0, 0);
  fill(hue, saturation, 40);
  box(160, 260, 70);
  pop();
}
