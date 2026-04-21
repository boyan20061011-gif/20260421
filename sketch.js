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
  
  push();
  // 將座標原點移至畫布中心
  translate(width / 2, height / 2);
  // 水平翻轉座標系 (x 軸乘以 -1)
  scale(-1, 1);
  // 在翻轉後的座標系中，將影像繪製在中心 (起點為 -w/2, -h/2)
  image(capture, -w / 2, -h / 2, w, h);
  pop();
}
