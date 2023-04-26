import React, { useEffect, useState } from "react";
import CustomCard from "./components/CustomCard";
import Header from "./components/Header";
import HorizontalScroller from "./components/HorizontalScroller";
import CustomSelect from "./components/CustomSelect";
import { IdailyWeatherData } from "./utils/type/types";
import { ISelectedCriteria } from "./utils/type/enum";
import CityCard from "./components/CityCard";
import { Grid } from "@mui/material";
import { fetchWeatherDataForCity } from "./utils/helper";

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
  const [cityListData, setCityListData] = useState([]);
  console.log("🚀 ~ file: App.tsx:26 ~ App ~ cityListData:", cityListData);

  //Debouncing
  useEffect(() => {
    const getData = setTimeout(() => {
      searchText &&
        searchText !== debouncedSearchText[debouncedSearchText?.length - 1] &&
        setDebouncedSearchText([...debouncedSearchText, searchText]);
    }, 2000);

    return () => clearTimeout(getData);
  }, [searchText]);

  //featch weather for city
  useEffect(() => {
    console.log(
      "debouncedSearchText[debouncedSearchText-1] !== searchText",
      searchText !== "" &&
        debouncedSearchText[debouncedSearchText - 1] !== searchText
    );
    console.log("🚀 ~ file: App.tsx:42 ~ useEffect ~ searchText:", searchText);
    console.log(
      "🚀 ~ file: App.tsx:42 ~ useEffect ~ debouncedSearchText[debouncedSearchText-1]:",
      debouncedSearchText[debouncedSearchText - 1]
    );
    searchText !== "" &&
      debouncedSearchText[debouncedSearchText - 1] !== searchText &&
      fetchWeatherDataForCity(
        debouncedSearchText,
        cityListData,
        setCityListData
      );
  }, [debouncedSearchText]);

  const daily = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const list = ["Today", "Tomorrow", "Daily", "Weekly"];
  const weekly = ["Week 1", "Week 2"];

  useEffect(() => {
    switch (selectedCriteria[0]) {
      case ISelectedCriteria.Today:
        setSelectedCriteriaData([...dailyWeatherData?.slice(0, 24)]);
        break;
      case ISelectedCriteria.Tomorrow:
        const data = [...dailyWeatherData?.slice(24, 48)];
        setSelectedCriteriaData([...data]);
        break;
      case ISelectedCriteria.Daily:
        let index: number = 0;
        let count: number = 0;

        let dailyData = dailyWeatherData
          ?.slice(0, 168)
          ?.reduce((last: any, curr: any) => {
            count += curr?.temperature;
            index++;
            if (index === 23) {
              index = 0;
              const returnData = [...last, (count / 24)?.toFixed(2)];
              count = 0;
              return returnData;
            }
            return [...last];
          }, []);
        setSelectedCriteriaData([
          ...daily?.map((item, index) => {
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

  const createSearchAppBarProps = () => {
    return {
      searchText,
      setSearchText,
    };
  };

  const fetchByCityName = async (city: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search/?city=${searchText}&format=json&addressdetails=1&limit=1&polygon_svg=1`
      );
      const data = await response.json();
      console.log("🚀 ~ file: App.tsx:21 ~ fetchByCityName ~ data:", data);
      // setCurrentWeather({ ...currentWeather, ...data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchText?.length > 0 && fetchByCityName(searchText);
  }, [searchText]);

  const propData = createSearchAppBarProps();

  return (
    <div style={{ paddingBottom: "50px" }}>
      <Header propData={propData} />
      <h3 style={{ textAlign: "center" }}>Live Data</h3>
      <CustomCard
        setDailyWeatherData={setDailyWeatherData}
        dailyWeatherData={dailyWeatherData}
      />
      <h3 style={{ textAlign: "center" }}>Data On Request</h3>
      <div style={{ textAlign: "center" }}>
        <CustomSelect
          data={list}
          setVariable={selectedCriteria}
          setterFunction={setSelectedCriteria}
          inputCategory="Select Category"
        />
        {selectedCriteria && (
          <CustomSelect
            data={selectedCriteriaData}
            setVariable={selectedTime}
            setterFunction={setSelectedTime}
            inputCategory={
              selectedCriteria?.[0] === "Daily"
                ? "Daily"
                : selectedCriteria?.[0] === "Weekly"
                ? "Weekly"
                : "Hourly"
            }
          />
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

      {/* <div style={{ paddingTop: "5vh" }}>
        <HorizontalScroller dailyWeatherData={dailyWeatherData} />
      </div> */}
      <Grid container spacing={2} style={{ margin: "auto" }}>
        {cityListData?.map((city: string) => {
          return (
            <Grid
              item
              xs={10}
              sm={8}
              md={5}
              lg={4}
              xl={3}
              style={{ height: "40vh", paddingLeft: "0px" }}
              sx={{ pl: "20px", pr: "20px" }}
            >
              <CityCard city={city} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default App;
