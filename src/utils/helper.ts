import { Icordinates } from "./type/types";

//fetch city name on the basis of latitude and logitude.
export const getCityName = async (
  latitude: number,
  longitude: number,
  cityName: any,
  setCityName: any
) => {
  console.log("this here", latitude, longitude, cityName);
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
      `https://api.open-meteo.com/v1/forecast?latitude=${cordinates?.latitude}&longitude=${cordinates?.longitude}&hourly=temperature_2m&current_weather=true&&forecast_days=16`
    );
    const data = await response.json();
    setCurrentWeather({ ...currentWeather, ...data });
    if (setDailyWeatherData) {
      const reformatedData = reformatTimeWiseWeather(data);
      setDailyWeatherData([...reformatedData]);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchWeatherDataForCity = async (
  cityData: [],
  cityListData: any,
  setCityListData: any
) => {
  try {
    const currentCity = cityData[cityData.length - 1];
    console.log("🚀 ~ file: helper.ts:54 ~ currentCity:", currentCity);

    const cityCordinates = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=a47ec1100cf64526b3cf924711e95230&q=${currentCity}`
    );
    const cityCordinatesData = await cityCordinates.json();
    const latitude = cityCordinatesData?.results?.[0]?.geometry?.lat;
    const longitude = cityCordinatesData?.results?.[0]?.geometry?.lng;
    const Country = cityCordinatesData?.results?.[0]?.components?.country;
    const stateDistrict =
      cityCordinatesData?.results?.[0]?.components?.state_district;

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true&&forecast_days=1`
    );
    const weatherResponsData = await weatherResponse.json();
    console.log(
      "🚀 ~ file: helper.ts:70 ~ weatherResponsData:",
      weatherResponsData
    );

    //if error in api response
    if (weatherResponsData?.error) return setCityListData([...cityListData]);
    const temperature = weatherResponsData?.current_weather?.temperature;

    const prepareCityData = {
      Country,
      stateDistrict,
      temperature,
      longitude,
      latitude,
      currentCity,
    };
    //to fix multiple same city card.
    const removeSameObjects = cityListData?.reduce((last: any, curr: any) => {
      if (curr?.currentCity === currentCity) {
        return [...last];
      }
      return [...last, curr];
    }, []);

    console.log("prepareCityData", prepareCityData);

    setCityListData([...removeSameObjects, prepareCityData]);
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
