let myShader;

function preload() {
  myShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

let mCam = 0.5;
let pCam = [0.0, 0.0];

function draw() {
  // управление камерой
  if(keyIsDown(87))
    pCam[1] += 0.01 * mCam;
  if(keyIsDown(83))
    pCam[1] -= 0.01 * mCam;
  if(keyIsDown(65))
    pCam[0] -= 0.01 * mCam;
  if(keyIsDown(68))
    pCam[0] += 0.01 * mCam;

  if(keyIsDown(81))
    mCam *= 1.01;
  if(keyIsDown(69))
    mCam /= 1.01;

  // запуск шейдера
  shader(myShader);

  myShader.setUniform('mnPos', [-width / height * mCam + pCam[0], -mCam + pCam[1]]);
  myShader.setUniform('mxPos', [width / height * mCam + pCam[0], mCam + pCam[1]]);
  rect(0, 0, width, height);
}