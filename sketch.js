let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏預設的攝影機 HTML 標籤，只在畫布上顯示
}

function draw() {
  background('#e7c6ff');
  
  // 計算影像寬高為畫布的 60%
  let w = width * 0.6;
  let h = height * 0.6;
  
  // 將影像繪製在畫布中間
  image(capture, (width - w) / 2, (height - h) / 2, w, h);
}
