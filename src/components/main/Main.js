import React from "react";
import "./Main.css";
import Navbar from "../navbar/Navbar";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Outlet } from "react-router-dom";
import axios from "axios";
const Main = () => {
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.quotable.io/random");
        setProgress(100);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="main">
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            color="success"
            sx={{
              background: "transparent",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
              height: "3px",
            }}
          />
        </Box>
      )}

      <Navbar />
      <div className="all-components">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
