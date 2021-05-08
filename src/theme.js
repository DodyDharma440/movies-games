import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#202020",
      light: "#4c4c4c",
      dark: "#161616",
    },
    secondary: {
      main: "#411e8f",
      light: "#674ba5",
      dark: "#2d1564",
    },
    light: {
      main: "#ffffff",
      dark: "#b2b2b2",
    },
    background: {
      default: "#242424",
    },
    text: {
      allVariants: {
        color: "#fff",
      },
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    htmlFontSize: 18,
    allVariants: {
      color: "#fff",
    },
  },
});

export default theme;
