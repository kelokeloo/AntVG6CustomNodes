export const getBorderColor = (health) => {
  if (health === undefined) return "#AAAAAA";
  if (health >= 90) {
    return "#4A7904";
  } else if (health >= 80) {
    return "#F59A23";
  } else {
    return "#D9021B";
  }
};
// 水位颜色 level范围：0-1
export const getLevelColor = (level) => {
  if (level === undefined) return "#AAAAAA";
  if (level <= 0.5) {
    return "#4A7904";
  } else if (level <= 0.8) {
    return "#F59A23";
  } else {
    return "#D9021B";
  }
};

export const boxSize = {
  width: 215,
  height: 80
};

export const outBoxRadius = 5;

export const imageSize = {
  width: 32,
  height: 32
};
export const waveSize = {
  width: 32,
  height: 32
};
export const padding = 5;

export const labelClipLength = 25;

/**
 *
 * @param {裁切的文本} text
 * @param {裁切的长度} length
 */
export const textClip = (draftText, length) => {
  if (draftText.length > length) {
    draftText = draftText.slice(0, length);
    return draftText + "...";
  } else {
    return draftText;
  }
};
