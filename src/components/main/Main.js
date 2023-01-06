import React from "react";
import "./Main.css";
import Navbar from "../navbar/Navbar";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { Outlet } from "react-router-dom";
const Main = () => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="main">
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={progress} sx={{background:"transparent",boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px;",height:"3px"}} color="success"/>
      </Box>
      <Navbar />
      <div className="all-components">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
