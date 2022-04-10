const themes = {
  colors: {
    font: '#aeb3b7',
    background: '#282c34',
    white: '#ffffff',
  },
  fontFamily: [
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;"
  ],
  transition: '0.3s ease-in-out'
};

export type BaseTheme = typeof themes;
export default themes;