import { Icordinates } from "./types";

//fetch city name on the basis of latitude and logitude.
export const getCityName = async (
  latitude: number,
  longitude: number,
  cityName: any,
  setCityName: any
) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();
    setCityName({ ...cityName, ...data });
  } catch (error) {
    console.log(error);
  }
};

//fetch temperature on the basis of latitude and logitude.
export const fetchWeatherData = async (
  cordinates: Icordinates,
  setCurrentWeather: any,
  currentWeather: any
) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${cordinates?.latitude}&longitude=${cordinates?.longitude}&hourly=temperature_2m&current_weather=true&&forecast_days=3`
    );
    const data = await response.json();
    setCurrentWeather({ ...currentWeather, ...data });
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
