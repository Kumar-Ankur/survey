import { useMediaQuery, useTheme } from "@mui/material";
import Header from "./components/Header";
import SurveyCard from "./components/Surveycard";

function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Header />
      <div style={{padding: isMobile ? '0': '4rem'}}>
        <SurveyCard/>
      </div>
      
    </>
  );
}

export default App;
