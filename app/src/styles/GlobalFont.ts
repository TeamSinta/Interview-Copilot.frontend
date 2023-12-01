import { createGlobalStyle } from "styled-components";
import ChillaxSemi from "../font/Chillax-Semibold.otf";
import Chillax from "../font/Chillax-Medium.otf";

export default createGlobalStyle`
    @font-face {
        font-family: "ChillaxSemi";
        src: local("Chillax-Semibold"), url(${ChillaxSemi}) format('opentype'); 
    }
    @font-face {
        font-family: "Chillax";
        src: local("Chillax-Medium"), url(${Chillax}) format('opentype'); 
    }
`;
