import { Button, Typography } from "@mui/material";
import React from "react";
import CustomCard from "./CustomCard";
import { ICustomisedCardContainerProps } from "../utils/type/types";
import CustomSelect from "./CustomSelect";

const CustomisedCardContainer = (props: ICustomisedCardContainerProps) => {
  const {
    list,
    selectedCriteria,
    setSelectedCriteria,
    selectedCriteriaData,
    selectedTime,
    setSelectedTime,
    setDailyWeatherData,
    customisedData,
  } = props;

  return (
    <div>
      <Typography
        color="text.secondary"
        style={{ textAlign: "center", paddingTop: "15px" }}
        variant="h4"
      >
        Get Customised Data
      </Typography>
      <div style={{ textAlign: "center" }}>
        <CustomSelect
          data={list}
          setVariable={selectedCriteria}
          setterFunction={setSelectedCriteria}
          inputCategory="Criteria"
          filteringCriteria="Criteria"
        />
        {selectedCriteria && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ paddingRight: "30px", height: "56px" }}
              variant="outlined"
              onClick={() => {
                setSelectedCriteria("");
              }}
            >
              Remove Card
            </Button>
            <CustomSelect
              data={selectedCriteriaData}
              setVariable={selectedTime}
              setterFunction={setSelectedTime}
              filteringCriteria={selectedCriteriaData?.[0]?.time}
            />
          </div>
        )}
      </div>
      {selectedCriteria && (
        <CustomCard
          setDailyWeatherData={setDailyWeatherData}
          dailyWeatherData={selectedCriteriaData}
          isCustomised={Boolean(customisedData)}
          customisedData={customisedData}
        />
      )}
    </div>
  );
};

export default CustomisedCardContainer;
