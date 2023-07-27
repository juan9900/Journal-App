import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#262254",
    },
    secondary: {
      main: "#543884",
    },
    tertiary: {
      main: "#c1ced4",
    },
    error: {
      main: red.A400,
      darker: "#de1b3f",
    },

    text: {
      main: "#141414",
    },
  },
});
