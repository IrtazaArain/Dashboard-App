import React, { useEffect, useState } from "react";
import {
  fetchTotalCrimes,
  fetchMonthlyCrimes,
  fetchOverallCrimeRate,
} from "../services/api";
import Predictions from "./maps/CrimeMap";

import { Grid } from "@mui/material";

import CrimeCard from "./Card";

const Dashboard = () => {
  const [crimeRate, setCrimeRate] = useState(0);
  const [totalCrimes, setTotalCrimes] = useState(0);
  const [monthlyCrimes, setMonthlyCrimes] = useState(0);

  useEffect(() => {
    const loadCrimeData = async () => {
      const totalCrimesData = await fetchTotalCrimes();
      setTotalCrimes(totalCrimesData.total);

      const monthlyCrimesData = await fetchMonthlyCrimes();
      setMonthlyCrimes(monthlyCrimesData.total);

      const overallCrimeRateData = await fetchOverallCrimeRate();
      setCrimeRate(overallCrimeRateData.crime_rate);
    };
    loadCrimeData();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <CrimeCard
            title="Total Crimes"
            count={totalCrimes}
            change="+5.2% from last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CrimeCard
            title="Crime Rate"
            count={crimeRate}
            change="-0.3% from last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CrimeCard
            title="This Month's Crime Incidents"
            count={monthlyCrimes}
            change="+2.1% from last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CrimeCard
            title="Unsolved Cases"
            count="4,111"
            change="-1.5% from last month"
          />
        </Grid>
        {/* Add more CrimeCard components as needed */}
      </Grid>
      <div style={{ paddingTop: 20 }}>
        <Predictions />
      </div>
    </div>
  );
};

export default Dashboard;
