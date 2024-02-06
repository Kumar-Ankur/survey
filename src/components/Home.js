import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Header from "./Header";
import SurveyCard from "./Surveycard";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Header />
      <div style={{ padding: isMobile ? "0" : "4rem" }}>
        <SurveyCard />
      </div>
    </>
  );
};

export default Home;
