import React, { useEffect, useState } from "react";
import CustomCard from "./components/CustomCard";
import Header from "./components/Header";
import CustomSelect from "./components/CustomSelect";
import { IdailyWeatherData } from "./utils/type/types";
import { ISelectedCriteria } from "./utils/type/enum";
import CityCard from "./components/CityCard";
import { Button, Grid, Typography } from "@mui/material";
import { fetchWeatherDataForCity } from "./utils/helper";
import CustomPopup from "./components/CustomPopup";

const App = () => {
  //header component data
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText, setDebouncedSearchText] = useState<any>([]);
  //handle all the data for weather
  const [dailyWeatherData, setDailyWeatherData] = useState([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  //for second card
  const [customisedData, setCustomisedData] = useState<number>(0);
  //for the dorpdown
  const [selectedCriteria, setSelectedCriteria] = useState<string>("");
  const [selectedCriteriaData, setSelectedCriteriaData] = useState<any>([]);
  //city wise data
  const [cityListData, setCityListData] = useState<any>([
    ...(JSON.parse(localStorage.getItem("cityListData") as string) ?? []),
  ]);
  //loader
  const [loader, setLoader] = useState<boolean>(false);
  console.log("🚀 ~ file: App.tsx:29 ~ App ~ loader:", loader);

  //Debouncing
  useEffect(() => {
    searchText?.length > 0 && setLoader(true);
    const getData = setTimeout(() => {
      if (
        searchText &&
        searchText !== debouncedSearchText[debouncedSearchText?.length - 1]
      ) {
        setDebouncedSearchText([...debouncedSearchText, searchText]);
      }
     
    }, 2000);

    return () => clearTimeout(getData);
  }, [searchText]);

  //featch weather for city
  useEffect(() => {
    searchText !== "" &&
      debouncedSearchText?.includes(searchText) &&
      fetchWeatherDataForCity(
        debouncedSearchText,
        cityListData,
        setCityListData,
        setLoader
      );
      // setLoader(false);
  }, [debouncedSearchText]);

  // update localstorage
  useEffect(() => {
    localStorage.setItem("cityListData", JSON.stringify([...cityListData]));
  }, [cityListData]);

  //for dropdown list
  const list = ["Today", "Tomorrow", "Daily", "Weekly"];
  const weekly = ["Week 1", "Week 2"];

  //to create and udpate the second customSelect data.
  useEffect(() => {
    switch (selectedCriteria[0]) {
      case ISelectedCriteria.Today:
        setSelectedCriteriaData(
          [...dailyWeatherData?.slice(0, 24)]?.map((item: any) => {
            return {
              time: item?.time?.split("T")?.[1],
              temperature: item?.temperature,
            };
          })
        );
        break;
      case ISelectedCriteria.Tomorrow:
        const data = [...dailyWeatherData?.slice(24, 48)]?.map((item: any) => {
          return {
            time: item?.time?.split("T")?.[1],
            temperature: item?.temperature,
          };
        });
        console.log("🚀 ~ file: App.tsx:76 ~ useEffect ~ data:", data);
        setSelectedCriteriaData([...data]);
        break;
      case ISelectedCriteria.Daily:
        let index: number = 0;
        let count: number = 0;
        let date: string[] = [];

        let dailyData = dailyWeatherData
          ?.slice(0, 360)
          ?.reduce((last: any, curr: any) => {
            count += curr?.temperature;
            index++;
            if (index === 23) {
              date.push(curr?.time?.split("T")?.[0]);
              index = 0;
              const returnData = [...last, (count / 24)?.toFixed(2)];
              count = 0;
              return returnData;
            }
            return [...last];
          }, []);
        setSelectedCriteriaData([
          ...date?.map((item, index) => {
            return { time: item, temperature: dailyData[index] };
          }),
        ]);
        break;

      case ISelectedCriteria.Weekly:
        let weeklyIndex: number = 0;
        let weeklyCount: number = 0;

        let weeklyData = dailyWeatherData
          ?.slice(0, 384)
          ?.reduce((last: any, curr: any) => {
            weeklyCount += curr?.temperature;
            weeklyIndex++;
            if (weeklyIndex === 168) {
              weeklyIndex = 0;
              const returnData = [...last, (weeklyCount / 168)?.toFixed(2)];
              weeklyCount = 0;
              return returnData;
            }
            return [...last];
          }, []);

        setSelectedCriteriaData([
          ...weekly?.map((item, index) => {
            return { time: item, temperature: weeklyData[index] };
          }),
        ]);
        break;

      default:
        break;
    }
  }, [selectedCriteria]);

  useEffect(() => {
    const filterdData: IdailyWeatherData[] = selectedCriteriaData
      ?.slice(0, 24)
      ?.filter((item: IdailyWeatherData) => item?.time?.includes(selectedTime));

    setCustomisedData(filterdData?.[0]?.temperature);
  }, [selectedTime, selectedCriteriaData]);

  //creating props
  const createSearchAppBarProps = () => {
    return {
      searchText,
      setSearchText,
      
    };
  };
  const propData = createSearchAppBarProps();

  console.log("selectedCriteria", selectedCriteria);
  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={{ paddingBottom: "50px" }}>
        <Header propData={propData} />
        <Typography
          color="text.secondary"
          style={{ textAlign: "center", paddingTop: "15px" }}
          variant="h4"
        >
          Searched Result
        </Typography>
        <CustomCard
          setDailyWeatherData={setDailyWeatherData}
          dailyWeatherData={dailyWeatherData}
        />
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
                Remove
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

      {loader ? (
        <CustomPopup />
      ) : (
        <div>
          {cityListData?.length > 0 && (
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
                  setCityListData([]);
                  localStorage.removeItem("cityListData");
                }}
              >
                Clear
              </Button>
            </div>
          )}
          {cityListData?.length > 0 && (
            <Grid
              container
              spacing={3}
              style={{
                margin: "auto",
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: "#FCC8D1",
                padding: "30px 0px",
                // border: "1px solid gray",
                // boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)",
              }}
            >
              {cityListData?.map((city: string) => {
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
      )}
    </div>
  );
};

export default App;
