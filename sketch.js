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
    pg.clear();
    capture.loadPixels();
    let stepSize = 20;

    // 遍歷攝影機影像的每個 20x20 單位
    for (let y = 0; y < capture.height; y += stepSize) {
      for (let x = 0; x < capture.width; x += stepSize) {
        // 取得該單位起始像素的索引位置
        let i = (y * capture.width + x) * 4;
        let r = capture.pixels[i];
        let g = capture.pixels[i + 1];
        let b = capture.pixels[i + 2];

        // 計算黑白平均值 (R+G+B)/3
        let avg = (r + g + b) / 3;

        pg.noStroke();
        pg.fill(avg); // 使用計算出的黑白顏色值
        pg.rect(x, y, stepSize, stepSize); // 在該單位位置繪製矩形
      }
    }
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
