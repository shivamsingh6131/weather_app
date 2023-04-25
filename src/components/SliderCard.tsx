import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CustomTypography from "./CustomTypography";
import { IdailyWeatherData } from "../utils/types";


function SliderCard(props: IdailyWeatherData) {
  return (
    <div style={{ textAlign: "center" }}>
      <Card sx={{ width: 250, backgroundColor: "#dae3fd", height: "10vh" }}>
        <CardContent>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={""}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <CustomTypography
                condition={Boolean(props?.temperature)}
                typegraphyData={props?.temperature}
                temperatureData={`º` || ""}
                typegraphystyles={{ fontSize: 36, marginBottom: 0 }}
                loaderHeightWidth={"50"}
                additionalProps={"marginB"}
              />
              <span>{props?.time?.split("T")?.[1]}</span>
            </Box>
            <Typography variant="body2">
              <WbSunnyIcon sx={{ height: 50, width: 50, color: "orange" }} />
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default SliderCard;
