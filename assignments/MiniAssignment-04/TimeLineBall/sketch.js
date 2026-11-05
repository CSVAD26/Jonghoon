// this is my reference https://openprocessing.org/@neill/2775931


let data;
let nodes = [];
let day = -1;
let spin = true;
let yaw = 0;
let cursor = 0;
let hud;

const ink = {
  visit: '#eda126',
  walking: '#41b797',
  vehicle: '#ed555d',
  link: '#7b5770'
};

function preload() {
  data = loadJSON('movement.json');
}

// i used google gemini search
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  hud = createGraphics(windowWidth, windowHeight);
  hud.textFont('Arial');
  build();
}

// i used google gemini search for how to make loop one
function build() {
  nodes = [];
  let rows = data.records;
  let count = data.days.length;
  for (let i = 0; i < rows.length; i++) {
    let r = rows[i];
    let angle = TWO_PI * r.minute / 1440;
    let height = (r.day - (count - 1) / 2) * 35;
    let intensity = r.kind === 'visit'
      ? log(1 + r.duration) / log(1 + 1440)
      : log(1 + r.distance) / log(1 + 25000);
    let rad = 145 + 65 * constrain(intensity, 0, 1);
    let x = rad * cos(angle);
    let y = height;
    let z = rad * sin(angle);
    nodes.push({ pos: createVector(x, y, z), row: r, index: i });
  }
}

function draw() {
  background(250, 249, 245);
  ambientLight(190);
  directionalLight(255, 255, 255, -0.4, -0.7, -1);
  orbitControl(1, 1, 0.8);
  if (spin) {
    yaw += deltaTime * 0.00012;
    cursor = (cursor + deltaTime * 0.00032) % shown().length;
  }

  push();
  rotateY(yaw);
  let size = min(width, height);
  scale(constrain(size / 830, 0.48, 1.3));
  drawframe();
  drawrecords();
  drawmarker();
  pop();
  overlay();
}

function drawframe() {
  for (let d = 0; d < data.days.length; d++) {
    let y = (d - (data.days.length - 1) / 2) * 35;
    stroke(day < 0 || day === d ? 160 : 224);
    strokeWeight(0.9);
    noFill();
    beginShape();
    for (let side = 0; side <= 12; side++) {
      let a = TWO_PI * side / 12;
      vertex(145 * cos(a), y, 145 * sin(a));
    }
    endShape();
  }
}

function drawrecords() {
  for (let i = 0; i < nodes.length; i++) {
    let n = nodes[i];
    let r = n.row;
    let active = day < 0 || day === r.day;
    let col = active ? ink[r.kind] : '#e1dfda';
    let angle = TWO_PI * r.minute / 1440;
    let rim = createVector(145 * cos(angle), n.pos.y, 145 * sin(angle));
    let thick = constrain(map(log(1 + r.duration), 0, log(1441), 2.5, 9), 2.5, 9);
    bar(rim, n.pos, max(2, thick * 0.65), col);
    if (i > 0) {
      let prior = nodes[i - 1];
      let same = prior.row.day === r.day;
      bar(prior.pos, n.pos, same ? thick : 2, same ? col : '#8a7e8b');
    }
    push();
    translate(n.pos.x, n.pos.y, n.pos.z);
    noStroke();
    fill(col);
    sphere(3.5, 6, 4);
    pop();
  }
}

// i used ai here and i'm trying to understant what's nodes role
function drawmarker() {
  let ids = shown();
  if (!ids.length) return;
  let i = floor(cursor) % ids.length;
  let a = nodes[ids[i]].pos;
  let b = nodes[ids[(i + 1) % ids.length]].pos;
  let p = p5.Vector.lerp(a, b, cursor - i);
  push();
  translate(p.x, p.y, p.z);
  stroke(35);
  strokeWeight(1.3);
  fill(255);
  sphere(11, 12, 8);
  pop();
}

// i used ai here
function shown() {
  return nodes.map((_, i) => i).filter(i => day < 0 || nodes[i].row.day === day);
}

function bar(a, b, thick, col) {
  let mid = p5.Vector.add(a, b).mult(0.5);
  let dir = p5.Vector.sub(b, a);
  let len = dir.mag();
  if (len < 0.01) return;
  push();
  translate(mid.x, mid.y, mid.z);
  rotateY(atan2(dir.x, dir.z));
  rotateX(acos(constrain(dir.y / len, -1, 1)));
  stroke(37, 34, 39);
  strokeWeight(1.1);
  fill(col);
  box(thick, len, thick);
  pop();
}

//i used ai for here, but i modified them myself.
function overlay() {
  let g = hud;
  g.clear();
  g.noStroke();
  g.fill(32);
  g.textAlign(LEFT, TOP);
  g.textSize(22);
  g.text('DAYS IN MOTION', 24, 20);
  g.textSize(12);
  g.fill(75);
  g.text('time → angle     date → layer     duration / distance → radius', 25, 53);
  g.fill(ink.visit); g.circle(31, 88, 9);
  g.fill(ink.walking); g.circle(113, 88, 9);
  g.fill(ink.vehicle); g.circle(203, 88, 9);
  g.fill(55);
  g.text('visit', 40, 81);
  g.text('walking', 122, 81);
  g.text('vehicle', 212, 81);

  let ids = shown();
  if (ids.length) {
    let r = nodes[ids[floor(cursor) % ids.length]].row;
    let clock = nf(floor(r.minute / 60), 2) + ':' + nf(r.minute % 60, 2);
    let action = r.kind === 'visit' ? 'VISIT' : r.kind === 'walking' ? 'WALKING' : 'IN VEHICLE';
    let detail = r.kind === 'visit'
      ? r.duration + ' min at a place'
      : r.duration + ' min · ' + (r.distance / 1000).toFixed(1) + ' km';
    g.stroke(48);
    g.strokeWeight(1);
    g.fill(255, 250);
    g.rect(24, height - 144, 276, 91, 4);
    g.noStroke();
    g.fill(ink[r.kind]);
    g.rect(24, height - 144, 7, 91);
    g.fill(35);
    g.textSize(13);
    g.text(data.days[r.day] + '    ' + clock, 43, height - 130);
    g.textSize(18);
    g.text(action, 43, height - 109);
    g.textSize(12);
    g.fill(95);
    g.text(detail, 43, height - 82);
  }
  g.fill(70);
  g.textSize(12);
  let label = day < 0 ? 'ALL DAYS' : data.days[day];
  g.text(label + '     ← → date    SPACE pause    drag orbit    S image', 25, height - 34);

  push();
  let gl = drawingContext;
  gl.disable(gl.DEPTH_TEST);
  resetMatrix();
  image(g, -width / 2, -height / 2);
  gl.enable(gl.DEPTH_TEST);
  pop();
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) { day = day < 0 ? 0 : (day + 1) % data.days.length; cursor = 0; return false; }
  if (keyCode === LEFT_ARROW) { day = day <= 0 ? -1 : day - 1; cursor = 0; return false; }
  if (key === ' ') { spin = !spin; return false; }
  if (key === 's' || key === 'S') saveCanvas('days-in-motion', 'png');
}
