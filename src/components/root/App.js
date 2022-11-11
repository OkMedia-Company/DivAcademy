import Main from "../main/Main";
import Sidebar from "../sidebar/Sidebar";
import "./App.css"
import { ThemeProvider, createTheme } from '@mui/material/styles';  
import Login from "../Login/Login";
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Futura',
      textTransform: 'none',
      fontSize: 12,
    },
  },
});

function App() {
  return (
    <div className="flexMain">
    <ThemeProvider theme={theme}>
        <Sidebar/>
        <Main/>
    </ThemeProvider>
    </div>
  );
}

export default App;
