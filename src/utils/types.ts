export interface ICustomTypographyProps {
  component?: React.Component;
  condition: boolean;
  typegraphyData: any;
  temperatureData?: string;
  typegraphystyles?: any;
  additionalProps?: any;
  loaderHeightWidth?: string;
}

export interface Icordinates {
  latitude: number;
  longitude: number;
}

export interface ICustomProps {
  propData: IPropData;
}
export interface IPropData {
  searchText: string;
  setSearchText: any;
}

export interface ICustomCardProps {
  setDailyWeatherData: any;
  dailyWeatherData: any;
  isCustomised?: boolean;
  customisedData?: any;
}
export interface IHorizontalScroller {
  dailyWeatherData: any;
}

export interface IdailyWeatherData {
  time : string;
  temperature : number
}

export interface IMultipleSelectProps {
  selectedTime : string,
  setSelectedTime : any,
  dailyWeatherData : IdailyWeatherData[]
}