import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import CrimeBarChart from "./charts/CrimeBarChart";
import CrimeLineChart from "./charts/CrimeLineChart";
import CrimeDoughnutChart from "./charts/CrimeDoughnutChart";
import {
  fetchCrimeDataByDistrict,
  fetchCrimeDataByAgeGroup,
  fetchMonthlyCrimes,
  fetchCrimeDataByType,
  fetchCrimeDataByTransport,
} from "../services/api";
import styles from "../App.module.css";

const Analytics = () => {
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
  const [monthlyCrimes, setMonthlyCrimes] = useState(0);

  useEffect(() => {
    const loadCrimeData = async () => {
      const districtData = await fetchCrimeDataByDistrict();
      setDistrictChartData(districtData.chartData);

      const ageGroupData = await fetchCrimeDataByAgeGroup();
      setAgeGroupChartData(ageGroupData.chartData);

      const monthlyCrimesData = await fetchMonthlyCrimes();
      setMonthlyCrimes(monthlyCrimesData.total);

      const typeData = await fetchCrimeDataByType();
      setTypeChartData(typeData.chartData);

      const transportData = await fetchCrimeDataByTransport();
      setTransportChartData(transportData.chartData);
    };
    loadCrimeData();
  }, []);

  return (
    <Box className={styles.dashboard} p={2}>
      <Typography variant="h4" gutterBottom>
        Crime Dashboard
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        <Box flexBasis="30%" mb={2}>
          <Card s>
            <CardContent>
              <CrimeDoughnutChart
                data={districtChartData}
                title="Crime Distribution by District"
              />
            </CardContent>
          </Card>
        </Box>
        <Box flexBasis="30%" mb={2}>
          <Card>
            <CardContent>
              <CrimeDoughnutChart
                data={ageGroupChartData}
                title="Crime Distribution by Age Group"
              />
            </CardContent>
          </Card>
        </Box>
        <Box flexBasis="30%" mb={2}>
          <Card>
            <CardContent>
              <CrimeDoughnutChart
                data={typeChartData}
                title="Crime Distribution by Type"
              />
            </CardContent>
          </Card>
        </Box>
        <Box flexBasis="30%" mb={2}>
          <Card>
            <CardContent>
              <CrimeDoughnutChart
                data={transportChartData}
                title="Crime Distribution by Transport Mode"
              />
            </CardContent>
          </Card>
        </Box>
        <Box flexBasis="30%" mb={2}>
          <Card>
            <CardContent>
              <CrimeBarChart
                data={districtChartData}
                title="Crimes by District"
              />
            </CardContent>
          </Card>
        </Box>
        <Box flexBasis="30%" mb={2}>
          <Card>
            <CardContent>
              <CrimeLineChart
                data={monthlyCrimes}
                title="Monthly Crime Trends"
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;
