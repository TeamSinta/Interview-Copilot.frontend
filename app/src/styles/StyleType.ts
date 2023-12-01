const colors = {
  accentPurple: "#6462F1",
  palePurple: "#CECDEE",
  white: "#ffffff",
  lightPurple: "#F6F6FB",
  lightGrey: "#f5f5f5",
  black: "#121212",
  secondary: "#737984",
  red: "#fabbcf",
  yellow: "#fffabf",
  green: "#dbfddc",
  purpleGrey: "rgba(15, 13, 98, .2)",
  pastelPurple: "#CECDEE",
  whisperGrey: "#F6F6FB",
  strikePurple: "8D88F7",
};

const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const devices = {
  xs: `@media only screen and (max-width: ${breakpoints.xs})`,
  sm: `@media only screen and (max-width: ${breakpoints.sm})`,
  md: `@media only screen and (max-width: ${breakpoints.md})`,
  lg: `@media only screen and (max-width: ${breakpoints.lg})`,
  xl: `@media only screen and (max-width: ${breakpoints.xl})`,
};

export type ColorTypes = typeof colors;
export type DeviceTypes = typeof devices;

export const DefaultTheme = {
  colors,
  devices,
};
