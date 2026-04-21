let capture;
let pg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏預設的攝影機 HTML 標籤，只在畫布上顯示
}

function draw() {
  background('#e7c6ff');
  
  // 當攝影機準備好且 pg 尚未建立時，根據攝影機尺寸建立繪圖層
  if (!pg && capture.width > 0) {
    pg = createGraphics(capture.width, capture.height);
    
    // 在 pg 上畫一些內容作為示範 (例如：半透明標籤或圖案)
    pg.fill(255, 255, 0, 150); // 黃色半透明
    pg.noStroke();
    pg.rect(20, 20, 150, 50, 10);
    pg.fill(0);
    pg.textAlign(CENTER, CENTER);
    pg.text("LIVE CAMERA", 95, 45);
  }

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
  
  // 如果 pg 已建立，則將其繪製在視訊畫面的上方
  if (pg) {
    image(pg, -w / 2, -h / 2, w, h);
  }
  pop();
}
