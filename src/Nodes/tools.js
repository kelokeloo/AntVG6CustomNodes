import {
  boxSize,
  outBoxRadius,
  padding,
  imageSize,
  textClip,
  labelClipLength,
  waveSize,
  getLevelColor
} from "../utils.js";
import * as d3 from "d3";

// 绘制盒子的边框
export const drawBox = (group, borderColor) => {
  const shape = group.addShape("rect", {
    attrs: {
      width: boxSize.width,
      height: boxSize.height,
      stroke: borderColor,
      radius: outBoxRadius
    },
    name: "server-outBox"
  });
  return shape;
};

// 绘制logo
export const drawImage = (group) => {
  group.addShape("rect", {
    attrs: {
      y: boxSize.height / 4 - imageSize.height / 2,
      x: padding,
      fill: "grey",
      ...imageSize
    },
    name: "server-icon"
  });
};

// 绘制label
export const drawLabel = (group, label) => {
  group.addShape("text", {
    attrs: {
      textBaseline: "middle",
      y: boxSize.height / 4,
      x: imageSize.width + padding * 2,
      fontSize: 12,
      fontWeight: "bold",
      lineHeight: 20,
      text: textClip(label, labelClipLength),
      fill: "#595959",
      textOverflow: "ellipsis"
    },
    // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
    name: "server-label"
  });
};

// 绘制中间横线
// 绘制label
export const drawMiddleLine = (group) => {
  group.addShape("path", {
    attrs: {
      path: [
        ["M", 0, boxSize.height / 2],
        ["L", boxSize.width, boxSize.height / 2]
      ],
      stroke: "#D7D7D7"
    },
    // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
    name: "server-middle-line"
  });
};

// 绘制水波图
// 绘制label
export const drawWave = (group, level = 0) => {
  const color = getLevelColor(level);

  // 波浪个数
  const waveCount = 3;
  const waveHeight = 1;
  const unit = waveSize.width / waveCount / 4;
  const xOffset = Math.PI;
  const startX = padding;
  const startY = (boxSize.height / 4) * 3 - waveSize.height / 2;

  let startPoint = {};
  let endPoint = {};

  // 绘制波浪点
  // 制作points
  const points = [];
  for (let x = 0; x <= waveSize.width; x += unit) {
    const y = waveHeight * Math.sin(((x / unit) * Math.PI) / 2 - xOffset);
    points.push({ x, y });
    if (x === 0) {
      startPoint = { x, y };
    }
    if (x === waveSize.width) {
      endPoint = { x, y };
    }
  }

  // 绘制底部盒子点点位
  // 制作points
  const waveboxPoints = [
    {
      x: endPoint.x + startX,
      y: endPoint.y + startY + waveSize.height * (1 - level)
    },
    { x: endPoint.x + startX, y: startY + waveSize.height },
    { x: startPoint.x + startX, y: startY + waveSize.height },
    {
      x: startPoint.x + startX,
      y: startPoint.y + startY + waveSize.height * (1 - level)
    }
  ];
  // 生成波浪路径
  const waveGenerator = d3
    .line()
    .x((d) => (d.type ? d.x : d.x + startX))
    .y((d) => (d.type ? d.y : d.y + startY + waveSize.height * (1 - level)))
    .curve(d3.curveCardinal);
  // 生成外层盒子路径
  const lineGenerator = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);
  group.addShape("path", {
    attrs: {
      path: waveGenerator(points) + lineGenerator(waveboxPoints), // 拼接的原因在于波浪需要折线但是边框是不需要的
      stroke: color,
      lineWidth: 1,
      fill: color
    },
    name: "server-icon"
  });

  // 最外层盒子
  const outerBoxPoints = [
    {
      x: startX,
      y: startY
    },
    { x: startX },
    { x: startY + waveSize.height },
    {
      x: startX + waveSize.width,
      y: startY
    }
  ];
  group.addShape("path", {
    attrs: {
      path: waveGenerator(points) + lineGenerator(outerBoxPoints), // 拼接的原因在于波浪需要折线但是边框是不需要的
      stroke: color,
      lineWidth: 1,
      fill: color
    },
    name: "server-icon"
  });

  group.addShape("path", {});
};
