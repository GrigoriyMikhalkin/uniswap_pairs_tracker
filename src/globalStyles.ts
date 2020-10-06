import { createGlobalStyle } from "styled-components";
// 1. import the font
import seymourOne from "./fonts/seymourone.ttf";

export const theme = {
    primaryBlue: "#0794B4",
    secondaryBlue: "#043157",
    primaryWhite: "#fff"
};

// 2. interpolate it using tagged template literals
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: seymour;
    src: url(${seymourOne}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  html {
    font-size: 10px;
  }
`;

export default GlobalStyle;