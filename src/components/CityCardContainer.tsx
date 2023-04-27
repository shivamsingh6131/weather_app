import React from "react";
import { ICityCardContainer } from "../utils/type/types";
import { Button, Grid, Typography } from "@mui/material";
import CityCard from "./CityCard";

const CityCardContainer = (props : ICityCardContainer) => {
  return (

      <div>
        {props?.cityListData?.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              paddingBottom: "30px",
            }}
          >
            <Typography color="text.secondary" variant="h4">
              Searched Result
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                props?.setCityListData([]);
                localStorage.removeItem("cityListData");
              }}
            >
              Clear
            </Button>
          </div>
        )}
        {props?.cityListData?.length > 0 && (
          <Grid
            container
            spacing={3}
            style={{
              margin: "auto",
              display: "flex",
              justifyContent: "space-around",
              backgroundColor: "#FEF2F4",
              padding: "30px 0px",
              // border: "1px solid gray",
              // boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            {props?.cityListData?.map((city: string) => {
              return (
                <Grid
                  item
                  xs={10}
                  sm={8}
                  md={5}
                  lg={5}
                  xl={3.5}
                  style={{
                    height: "38vh",
                    paddingLeft: "0px",
                    paddingTop: "0px",
                    backgroundColor: "#EEEEEE",
                    marginBottom: "30px",
                  }}
                >
                  <CityCard city={city} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
  
  );
};

export default CityCardContainer;