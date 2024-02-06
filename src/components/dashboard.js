import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

const Dashboard = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [, setReports] = useState([]);
  useEffect(() => {
    fetch("/fetchReport")
      .then((res) => res.json())
      .then((res) => {
        setReports(res.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const customerInterestedData = {
    labels: ["Yes", "No"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    // <Container component="main" maxWidth="xs" style={{ marginTop: "6rem" }}>
    <>
      <Typography variant="h4" align="center" gutterBottom pt={4}>
        {"DASHBOARD"}
      </Typography>

      <Box style={{ display: 'inline-block' }} p={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Customer interested in our company
            </Typography>
            <div style={{ width: "400px", height: "400px" }}>
              <Pie data={customerInterestedData} />
            </div>
          </CardContent>
        </Card>
      </Box>
    </>
    // </Container>
  );
};

export default Dashboard;
