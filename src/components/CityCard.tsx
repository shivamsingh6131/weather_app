import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CustomTypography from "./CustomTypography";
import {
  ICustomCardProps,
  ICustomProps,
  Icordinates,
} from "../utils/type/types";
import {
  fetchWeatherData,
  getCurrentLocation,
  reformatTimeWiseWeather,
} from "../utils/helper";

function CityCard(props: any) {


  console.log("props?.customisedData", props);

  return (
    <div style={{ textAlign: "center" }}>
        here
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
                  condition={true}
                  typegraphyData={props?.city?.currentCity}
                  typegraphystyles={{ fontSize: 26 }}
                  loaderHeightWidth={"35"}
                />
                <CustomTypography
                  condition={true}
                  typegraphyData={props?.city?.temperature}
                  temperatureData={
                    props?.city?.temperature || ""
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
                condition={true}
                typegraphyData={`latitude ${Number(props?.city?.latitude)?.toFixed(2)}`}
                typegraphystyles={{ mb: 0.5 }}
                loaderHeightWidth={"40"}
              />
              <CustomTypography
                condition={true}
                typegraphyData={`longitude ${Number(props?.city?.longitude)?.toFixed(2)}`}
                typegraphystyles={{ mb: 0.5 }}
                loaderHeightWidth={"40"}
              />
              <CustomTypography
                condition={true}
                typegraphyData={props?.city?.Country}
                typegraphystyles={{ fontSize: 36, mt: 1.5, mb: 0 }}
                loaderHeightWidth={"50"}
              />
              <CustomTypography
                condition={true}
                typegraphyData={props?.city?.stateDistrict}
                typegraphystyles={{ mb: 1.5, fontSize: 16 }}
                loaderHeightWidth={"50"}
              />
            </CardContent>
          </Card>
 
    </div>
  );
}

export default CityCard;
