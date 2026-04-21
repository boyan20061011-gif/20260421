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
  }

  if (pg) {
    // 在 pg 上繪製一些範例內容 (例如：黃色外框與文字)
    pg.clear(); // 保持背景透明
    pg.stroke(255, 255, 0);
    pg.strokeWeight(20);
    pg.noFill();
    pg.rect(0, 0, pg.width, pg.height); // 繪製與視訊同寬高的邊框
  }

  // 計算影像寬高為畫布的 60%
  let w = width * 0.6;
  let h = height * 0.6;
  
  push();
  // 將座標原點移至畫布中心
  translate(width / 2, height / 2);
  // 水平翻轉座標系 (x 軸乘以 -1)，達成鏡像效果
  scale(-1, 1);
  
  // 使用中心對齊模式繪製影像，座標設為 (0, 0) 即可完美置中
  imageMode(CENTER);
  image(capture, 0, 0, w, h);

  // 如果 pg 已建立，則將其繪製在視訊畫面的正上方
  if (pg) {
    image(pg, 0, 0, w, h);
  }
  pop();
}

// 當視窗大小改變時，自動調整畫布尺寸
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
