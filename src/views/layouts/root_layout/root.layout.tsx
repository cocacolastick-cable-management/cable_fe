import "./index.css"
import {Outlet} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
   // shadows: Array(25).fill("none") as Shadows,
})

function RootLayout()
{
   return (
      <ThemeProvider theme={theme}>
         <Outlet/>
      </ThemeProvider>
   )
}

export default RootLayout