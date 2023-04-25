import React, { useEffect, useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, colors } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Dna } from "react-loader-spinner";
import CustomTypography from "./components/CustomTypography";


interface Icordinates {
  latitude: number;
  longitude: number;
}

//apis

//state name from lat & long
// https://nominatim.openstreetmap.org/reverse?lat=23.0438564&lon=72.5086395

function App() {
  const [cordinates, setCordinates] = useState<Icordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [currentWeather, setCurrentWeather] = useState<any>({});
  const [cityName, setCityName] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  //get city name
  const getCityName = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      setCityName({ ...cityName, ...data });
    } catch (error) {
      console.log("error asdfasdf", error);
    }
  };

  //fetch temperature on the basis of latitude and logitude.
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${cordinates?.latitude}&longitude=${cordinates?.longitude}&hourly=temperature_2m&current_weather=true&&forecast_days=3`
      );
      const data = await response.json();
      setCurrentWeather({ ...currentWeather, ...data });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCordinates({
        ...cordinates,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      getCityName(position.coords.latitude, position.coords.longitude);
    });
  };

  console.log("currentWeather ", currentWeather);
  console.log("cityName ", cityName);
  console.log("cordinates ", cordinates);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    cordinates.latitude !== 0 && fetchData();
  }, [cordinates]);

  return (
    <div className="App">
      <Grid container spacing={2} style={{ margin: "auto" }}>
        <Grid item xs={1} sm={2} md={4.5} lg={4} xl={5}></Grid>
        <Grid
          item
          xs={10}
          sm={8}
          md={3}
          lg={2}
          xl={2}
          style={{ height: "30vh", paddingLeft: "0px" }}
          sx={{ pl: 0 }}
        >
          <Card
            sx={{ minWidth: 275, backgroundColor: "#dae3fd", height: "38vh" }}
          >
            <CardContent>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                {/* <Typography
                  sx={{ fontSize: 26 }}
                  color="text.secondary"
                  gutterBottom
                  style={{ display: "inline" }}
                >
                  {cityName?.address?.suburb}
                </Typography> */}
                <CustomTypography
                  condition={cityName?.address?.suburb}
                  typegraphyData={cityName?.address?.suburb}
            
                  typegraphystyles={{ fontSize: 26 }}
                />
                <CustomTypography
                  condition={currentWeather?.current_weather?.temperature}
                  typegraphyData={currentWeather?.current_weather?.temperature}
                  temperatureData={
                    currentWeather?.hourly_units?.temperature_2m || ""
                  }
                  additionalProps={'gutterBottom'}
                  typegraphystyles={{ fontSize: 36 }}
                />
              </Box>
              <Typography variant="body2" sx={{ mb: 4 }}>
                <WbSunnyIcon sx={{ height: 75, width: 75, color: "orange" }} />
              </Typography>
              <Typography sx={{ mb: 0.5 }} color="text.secondary">
                {/* isNaN */}
                latitude {Number(currentWeather?.latitude)?.toFixed(2)}
              </Typography>
              <Typography sx={{ mb: 0.5 }} color="text.secondary">
                longitude {Number(currentWeather?.longitude)?.toFixed(2)}
              </Typography>

              <Typography sx={{ fontSize: 36, mt: 1.5 }} color="text.secondary">
                {cityName?.address?.country}
              </Typography>
              <Typography sx={{ mb: 1.5, fontSize: 16 }} color="text.secondary">
                {cityName?.address?.state_district}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={1} sm={2} md={4.5} lg={4} xl={5}></Grid>
      </Grid>
    </div>
  );
}

export default App;
