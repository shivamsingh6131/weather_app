import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CustomTypography from "./CustomTypography";
import { ICustomCardProps, ICustomProps, Icordinates } from "../utils/types";
import {
  fetchWeatherData,
  getCurrentLocation,
  reformatTimeWiseWeather,
} from "../utils/helper";

function CustomCard(props: ICustomCardProps) {
  const [cordinates, setCordinates] = useState<Icordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [currentWeather, setCurrentWeather] = useState<any>({});
  const [cityName, setCityName] = useState<any>({});

  useEffect(() => {
    getCurrentLocation(cityName, setCityName, cordinates, setCordinates);
  }, []);

  useEffect(() => {
    cordinates.latitude !== 0 &&
      fetchWeatherData(
        cordinates,
        setCurrentWeather,
        currentWeather,
        props.setDailyWeatherData
      );
  }, [cordinates]);

  console.log("props?.customisedData", props?.customisedData);

  return (
    <div style={{ textAlign: "center" }}>
      <Grid container spacing={2} style={{ margin: "auto" }}>
        <Grid
          item
          xs={1}
          sm={2}
          md={3.5}
          lg={4}
          xl={4.5}
          style={{ height: "40vh" }}
        ></Grid>
        <Grid
          item
          xs={10}
          sm={8}
          md={5}
          lg={4}
          xl={3}
          style={{ height: "40vh", paddingLeft: "0px" }}
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
                <CustomTypography
                  condition={cityName?.results?.[0]?.components?.suburb}
                  typegraphyData={cityName?.results?.[0]?.components?.suburb}
                  typegraphystyles={{ fontSize: 26 }}
                  loaderHeightWidth={"35"}
                />
                <CustomTypography
                  condition={currentWeather?.current_weather?.temperature}
                  typegraphyData={
                    props?.isCustomised
                      ? props?.customisedData
                      : currentWeather?.current_weather?.temperature
                  }
                  temperatureData={
                    currentWeather?.hourly_units?.temperature_2m || ""
                  }
                  additionalProps={"gutterBottom"}
                  typegraphystyles={{ fontSize: 36 }}
                  loaderHeightWidth={"50"}
                />
              </Box>
              <Typography variant="body2" sx={{ mb: 4 }}>
                <WbSunnyIcon sx={{ height: 75, width: 75, color: "orange" }} />
              </Typography>
              <CustomTypography
                condition={Boolean(Number(currentWeather?.latitude))}
                typegraphyData={`latitude ${Number(
                  currentWeather?.latitude
                )?.toFixed(2)}`}
                typegraphystyles={{ mb: 0.5 }}
                loaderHeightWidth={"40"}
              />
              <CustomTypography
                condition={Boolean(Number(currentWeather?.longitude))}
                typegraphyData={`longitude ${Number(
                  currentWeather?.longitude
                )?.toFixed(2)}`}
                typegraphystyles={{ mb: 0.5 }}
                loaderHeightWidth={"40"}
              />
              <CustomTypography
                condition={Boolean(cityName?.results?.[0]?.components?.country)}
                typegraphyData={cityName?.results?.[0]?.components?.country}
                typegraphystyles={{ fontSize: 36, mt: 1.5, mb: 0 }}
                loaderHeightWidth={"50"}
              />
              <CustomTypography
                condition={Boolean(
                  cityName?.results?.[0]?.components?.state_district
                )}
                typegraphyData={
                  cityName?.results?.[0]?.components?.state_district
                }
                typegraphystyles={{ mb: 1.5, fontSize: 16 }}
                loaderHeightWidth={"50"}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid
          xs={1}
          sm={2}
          md={3.5}
          lg={4}
          xl={4.5}
          style={{ height: "40vh" }}
        ></Grid>
      </Grid>
    </div>
  );
}

export default CustomCard;