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

export interface IdailyWeatherData {
  time: string;
  temperature: number;
}

export interface IMultipleSelectProps {
  setVariable: string;
  setterFunction: any;
  data: unknown[];
  inputCategory?: string;
  filteringCriteria?: string;
}
export interface ICityCardContainer {
  cityListData: ICityListData[];
  setCityListData: any;
}
export interface ICustomisedCardContainerProps {
  selectedCriteria: any;
  setSelectedCriteria: any;
  selectedCriteriaData: any;
  selectedTime: any;
  setSelectedTime: any;
  setDailyWeatherData: any;
  customisedData: any;
  list: any;
}

export interface ICityCardProps {
  city: ICity;
}

export interface ICity {
  currentCity?: string;
  temperature?: number;
  latitude?: number;
  longitude?: number;
  stateDistrict?: string;
  Country?: string;
}

export interface ICityListData {
  Country: string;
  currentCity: string;
  latitude: number;
  longitude: number;
  stateDistrict: string | any;
  temperature: 34.2;
}
