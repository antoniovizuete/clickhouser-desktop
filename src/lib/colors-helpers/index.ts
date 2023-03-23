type ColorProperties = {
  hex: string;
  r: number;
  g: number;
  b: number;
  luminance: number;
};
const LUMINANCE_THRESHOLD = 140;

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const isWhiteFriendly = (luminance: number) => {
  return luminance < LUMINANCE_THRESHOLD;
};

export const getColorProperties = (
  hex: string
): ColorProperties | undefined => {
  const rgb = hexToRgb(hex);
  if (!rgb) return;
  const { r, g, b } = rgb;
  return {
    hex,
    r,
    g,
    b,
    luminance: 0.2126 * r + 0.7152 * g + 0.0722 * b,
  };
};

export const getInverseBW = (hex: string) => {
  const colorProps = getColorProperties(hex);
  if (!colorProps) return;
  const { luminance } = colorProps;
  return isWhiteFriendly(luminance) ? "#ffffff" : "#000000";
};

export const getForegroundColor = (hex: string) => {
  const colorProps = getColorProperties(hex);
  if (!colorProps) return;
  const { luminance } = colorProps;

  const percent = isWhiteFriendly(luminance) ? 0.8 : 1.2;

  return shadeColor(colorProps, percent);
};

const applyVariation = (color: number, percent: number) => {
  return ~~((color * (100 + percent)) / 100) & 0xff;
};

const shadeColor = (color: ColorProperties, percent: number) => {
  const { r, g, b } = color;

  const newColor = [
    applyVariation(r, percent),
    applyVariation(g, percent),
    applyVariation(b, percent),
  ];

  return "#" + newColor.map((c) => c.toString(16).padStart(2, "0")).join("");
};
