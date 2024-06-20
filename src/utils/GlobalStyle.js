import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    button {
        cursor: pointer;
    }
`;
