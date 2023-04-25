import { Icordinates } from "./types";

//fetch city name on the basis of latitude and logitude.
export const getCityName = async (
  latitude: number,
  longitude: number,
  cityName: any,
  setCityName: any
) => {
  try {
    // const response = await fetch(
    //   `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    // );
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=a47ec1100cf64526b3cf924711e95230&q=${latitude}%2C${longitude}&pretty=1`
    );
    const data = await response.json();
    console.log("🚀 ~ file: helper.ts:18 ~ data:", data);
    setCityName({ ...cityName, ...data });
  } catch (error) {
    console.log(error);
  }
};

//fetch temperature on the basis of latitude and logitude.
export const fetchWeatherData = async (
  cordinates: Icordinates,
  setCurrentWeather: any,
  currentWeather: any,
  setDailyWeatherData?: any
) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${cordinates?.latitude}&longitude=${cordinates?.longitude}&hourly=temperature_2m&current_weather=true&&forecast_days=3`
    );
    const data = await response.json();
    console.log("🚀 ~ file: helper.ts:36 ~ data:", data)
    setCurrentWeather({ ...currentWeather, ...data });
    console.log("🚀 ~ file: helper.ts:39 ~ data:", data)
    if(setDailyWeatherData){
        const reformatedData = reformatTimeWiseWeather(data);
        setDailyWeatherData([...reformatedData])
    }
  } catch (error) {
    console.log(error);
  }
};

//get users current location cordinates (latitude & longiture)
export const getCurrentLocation = (
  cityName: any,
  setCityName: any,
  cordinates: any,
  setCordinates: any
) => {
  navigator.geolocation.getCurrentPosition((position) => {
    setCordinates({
      ...cordinates,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    getCityName(
      position.coords.latitude,
      position.coords.longitude,
      cityName,
      setCityName
    );
  });
};

//reformat data
export const reformatTimeWiseWeather = (weather: any) => {
  console.log("🚀 ~ file: helper.ts:68 ~ reformatTimeWiseWeather ~ weather:", weather)
  let counterIndex: number = 0;
  return weather?.hourly?.temperature_2m?.reduce(
    (last: number[], cur: number) => {
      counterIndex++;
      return [
        ...last,
        { time: weather?.hourly?.time[counterIndex], temperature: cur },
      ];
    },
    []
  );
};
