
let particles = [];
const numParticles = 100;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-canvas');
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0, 50); // Semi-transparent background for a trailing effect
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
    particles[i].edges();
    
    for (let j = i + 1; j < particles.length; j++) {
      const d = dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      if (d < 120) {
        stroke(255, 255, 255, 100 - d * 0.5);
        line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.5, 2));
    this.size = random(2, 4);
    this.maxSpeed = 3;
    this.maxForce = 0.2;
  }

  update() {
    this.repel(createVector(mouseX, mouseY));
    this.pos.add(this.vel);
  }

  // A method to apply a repulsive force from a target
  repel(target) {
    let desired = p5.Vector.sub(this.pos, target);
    let d = desired.mag();
    if (d < 100) {
      // Calculate steering force
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      this.vel.add(steer);
    }
  }

  show() {
    noStroke();
    fill(255, 200);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }
}
