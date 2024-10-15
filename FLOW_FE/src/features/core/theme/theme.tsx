import { createTheme } from "@mui/material";
import { orange, teal } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: teal[400],
        },
        secondary: {
            main: orange[800],
        },
    },
});

export default theme;
