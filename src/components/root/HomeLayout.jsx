import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "../sidebar/Sidebar";
import Main from "../main/Main";
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Futura",
      textTransform: "none",
      fontSize: 12,
    },
  },
});
function HomeLayout() {
  return (
    <div>
      <div className="flexMain">
        <ThemeProvider theme={theme}>
          <Sidebar />
          <Main />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default HomeLayout;
