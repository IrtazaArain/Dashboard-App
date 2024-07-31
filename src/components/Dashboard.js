import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import CrimeBarChart from "./charts/CrimeBarChart";
import CrimeLineChart from "./charts/CrimeLineChart";
import CrimeDoughnutChart from "./charts/CrimeDoughnutChart";
import {
  fetchCrimeDataByDistrict,
  fetchCrimeDataByAgeGroup,
  fetchTotalCrimes,
  fetchMonthlyCrimes,
  fetchCrimeDataByType,
  fetchCrimeDataByTransport,
  fetchOverallCrimeRate,
} from "../services/api";
import styles from "../App.module.css";
import Predictions from "./maps/CrimeMap";

import { Grid } from "@mui/material";

import CrimeCard from "./Card";
import CrimeMap from "./maps/CrimeMap";

const Dashboard = () => {
  const [districtChartData, setDistrictChartData] = useState({
    labels: [],
    values: [],
  });
  const [ageGroupChartData, setAgeGroupChartData] = useState({
    labels: [],
    values: [],
  });
  const [typeChartData, setTypeChartData] = useState({
    labels: [],
    values: [],
  });
  const [transportChartData, setTransportChartData] = useState({
    labels: [],
    values: [],
  });
  const [crimeRate, setCrimeRate] = useState(0);
  const [totalCrimes, setTotalCrimes] = useState(0);
  const [monthlyCrimes, setMonthlyCrimes] = useState(0);

  useEffect(() => {
    const loadCrimeData = async () => {
      const districtData = await fetchCrimeDataByDistrict();
      setDistrictChartData(districtData.chartData);

      const ageGroupData = await fetchCrimeDataByAgeGroup();
      setAgeGroupChartData(ageGroupData.chartData);

      const totalCrimesData = await fetchTotalCrimes();
      setTotalCrimes(totalCrimesData.total);

      const monthlyCrimesData = await fetchMonthlyCrimes();
      setMonthlyCrimes(monthlyCrimesData.total);

      const typeData = await fetchCrimeDataByType();
      setTypeChartData(typeData.chartData);

      const transportData = await fetchCrimeDataByTransport();
      setTransportChartData(transportData.chartData);

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
