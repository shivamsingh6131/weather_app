import React, { useEffect, useState } from "react";
import CustomCard from "./components/CustomCard";
import Header from "./components/Header";
import HorizontalScroller from "./components/HorizontalScroller";
import CustomSelect from "./components/CustomSelect";
import { IdailyWeatherData } from "./utils/types";

enum ISelectedCriteria {
  // Hourly = "Hourly",
  Today = "Today",
  Tomorrow = "Tomorrow",
  Daily = "Daily",
  Weekly = "Weekly",
}

const App = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [dailyWeatherData, setDailyWeatherData] = useState([]);
  console.log(
    "🚀 ~ file: App.tsx:19 ~ App ~ dailyWeatherData:",
    dailyWeatherData
  );
  const [selectedTime, setSelectedTime] = useState<string>("");
  //for second card
  const [customisedData, setCustomisedData] = useState<number>(0);
  //for the dorpdown
  const [selectedCriteria, setSelectedCriteria] = useState<string>("");
  const [selectedCriteriaData, setSelectedCriteriaData] = useState<any>([]);
  console.log(
    "🚀 ~ file: App.tsx:27 ~ App ~ selectedCriteriaData:",
    selectedCriteria
  );

  const weekly = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    console.log("this triggered");
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
            console.log("🚀 ~ file: App.tsx:55 ~ ?.reduce ~ last:", last);
            console.log("curr here", curr);
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
        // ?.map((item, index) => weekly[index] + ":  " + item + "°C");
        console.log("dailyData here", dailyData);

        // const dataHere = weekly?.map((item, index) => {
        //   return { time: item, temperature: dailyData[index] };
        // });

        setSelectedCriteriaData([
          ...weekly?.map((item, index) => {
            return { time: item, temperature: dailyData[index] };
          }),
        ]);
        break;

      default:
        break;
    }
  }, [selectedCriteria]);

  useEffect(() => {
    console.log("selectedCriteriaData asdf", selectedCriteriaData);

    const filterdData: IdailyWeatherData[] = selectedCriteriaData
      ?.slice(0, 24)
      ?.filter((item: IdailyWeatherData) => item?.time?.includes(selectedTime));

    console.log("filterdData", filterdData);
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

  const list = ["Today", "Tomorrow", "Daily", "Weekly"];

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
            inputCategory={selectedCriteria?.[0] === "Daily" ? "Daily" :"Hourly"}
          />
        )}
      </div>
      <CustomCard
        setDailyWeatherData={setDailyWeatherData}
        dailyWeatherData={selectedCriteriaData}
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
