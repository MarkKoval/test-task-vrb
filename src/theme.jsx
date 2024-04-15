import { createTheme } from "@mui/material/styles";

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
    background: {
      default: "#111",
    },
  },
  typography: {
    fontFamily: "Netflix Sans, sans-serif",
  },
  breakpoints,
});

export default theme;
