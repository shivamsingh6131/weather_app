import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import nock from "nock";
import {
  currentWeatherDataAPIMock,
  weatherDataFor2Weeks,
} from "../../utils/mock/homePage";
import Homepage from "../../pages/Homepage";

nock("https://api.opencagedata.com")
  .get(
    "/geocode/v1/json?key=a47ec1100cf64526b3cf924711e95230&q=23.0438564%2C72.5086395&pretty=1"
  )
  .reply(200, currentWeatherDataAPIMock);

nock("https://api.open-meteo.com")
  .get(
    "/v1/forecast?latitude=23.0438564&longitude=72.5086395&hourly=temperature_2m&current_weather=true&&forecast_days=16"
  )
  .reply(200, weatherDataFor2Weeks);

beforeEach(() => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementation(() => {
      return {
        latitude: 23.0438564,
        longitude: 72.5086395,
        accuracy: 5,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      };
    }),
  };

  //@ts-ignore
  global.navigator.geolocation = mockGeolocation;
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("it should render HomePage without crashing", async () => {
  render(<Homepage />);
});
