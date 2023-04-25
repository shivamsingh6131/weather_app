import React, { useEffect, useState } from "react";
import CustomCard from "./components/CustomCard";
import Header from "./components/Header";
import HorizontalScroller from "./components/HorizontalScroller";
import CustomSelect from "./components/CustomSelect";
import { IdailyWeatherData } from "./utils/types";

const App = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [dailyWeatherData, setDailyWeatherData] = useState([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customisedData , setCustomisedData] = useState<number>(0)
  const [selectedCriteria , setSelectedCriteria] = useState<string>('')

  useEffect(() => {
    const filterdData : IdailyWeatherData[] = dailyWeatherData?.slice(0,23)?.filter((item : IdailyWeatherData) => item?.time?.includes(selectedTime) )
    setCustomisedData(filterdData?.[0]?.temperature)
  } , [selectedTime])

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

  const list = [
    "Hourly",
    "Today",
    "Tomorrow",
    "Daily",
    "Weekly",
  ]

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
        <CustomSelect data={list} setVariable={selectedCriteria} setterFunction={setSelectedCriteria} inputCategory="Select Category"  />
        <CustomSelect data={dailyWeatherData} setVariable={selectedTime} setterFunction={setSelectedTime} inputCategory="Hourly" />
      </div>
      <CustomCard
        setDailyWeatherData={setDailyWeatherData}
        dailyWeatherData={dailyWeatherData}
        isCustomised={Boolean(customisedData)}
        customisedData={customisedData}
      />

      {/* <div style={{ paddingTop: "5vh" }}>
        <HorizontalScroller dailyWeatherData={dailyWeatherData} />
      </div> */}
    </div>
  );
};

export default App;
