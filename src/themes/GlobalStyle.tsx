import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  body {
    margin: 0;
    color: ${({ theme }) => theme.colors.font};
    font-family: ${({ theme }) => theme.fontFamily[0]};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${({ theme }) => theme.colors.font};
    text-decoration: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

export default GlobalStyle;
