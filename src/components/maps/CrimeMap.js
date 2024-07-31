import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Helper functions
const getInfoWindow = (crimeScore) => {
  if (crimeScore <= 1) {
    return "Low Risk";
  } else if (crimeScore <= 4) {
    return "Medium Risk";
  } else {
    return "High Risk";
  }
};

const getCircleColor = (crimeScore) => {
  if (crimeScore <= 1) {
    return "green";
  } else if (crimeScore <= 4) {
    return "yellow";
  } else {
    return "red";
  }
};

const PredictionsMap = () => {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/predict`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPredictions(data.predictions);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPredictions();
  }, []);

  return (
    <div>
      <h1>Crime Predictions Map</h1>
      {error && <p>Error fetching predictions: {error}</p>}
      <MapContainer
        center={[24.8607, 67.0011]}
        zoom={12}
        style={{ height: "300px", width: "95%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {predictions.map((prediction, index) => (
          <CircleMarker
            key={index}
            center={[prediction[1], prediction[2]]}
            radius={10}
            weight={0}
            fillColor={getCircleColor(prediction[0])}
            fillOpacity={0.5}
          >
            <Popup>
              <div>
                <p>Risk Level: {getInfoWindow(prediction[0])}</p>
                <p>Crime Score: {prediction[0]}</p>
                <p>Longitude: {prediction[1]}</p>
                <p>Latitude: {prediction[2]}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PredictionsMap;
