import { createGlobalStyle } from 'styled-components';
import InterSemi from '../font/Inter-SemiBold.otf';
import InterMedium from '../font/Inter-Medium.otf';
import Inter from '../font/Inter-Regular.otf';

export default createGlobalStyle`
    @font-face {
        font-family: "InterSemi";
        src: local("Inter-Semibold"), url(${InterSemi}) format('opentype');
    }

    @font-face {
        font-family: "Inter";
        src: local("Inter-Regular"), url(${Inter}) format('opentype');
    }
    @font-face {
        font-family: "InterMedium";
        src: local("Inter-Medium"), url(${InterMedium}) format('opentype');
    }

`;
