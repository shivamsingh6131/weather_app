export interface ICustomTypographyProps {
  component?: React.Component;
  condition: boolean;
  temperatureData?: string;
  typegraphystyles?: any; //styles
  additionalProps?: any; //styles
  typegraphyData: string | number;
  loaderHeightWidth?: string;
}

export interface Icordinates {
  latitude: number;
  longitude: number;
}

export interface ICustomHeaderProps {
  propData: IPropData;
}
export interface IPropData {
  searchText: string;
  setSearchText: any;
}

export interface ICustomCardProps {
  setDailyWeatherData: any;
  dailyWeatherData: IdailyWeatherData[];
  isCustomised?: boolean;
  customisedData?: string;
}


export interface IdailyWeatherData {
  time: string;
  temperature: number;
}

export interface IMultipleSelectProps {
  setVariable: string;
  data: IdailyWeatherData[] | string[];
  inputCategory?: string;
  filteringCriteria?: string;
  haveCriteriaChanged?: boolean;
  selectTwo?:boolean;
  setHavecriteriaChanged?:any;
  setterFunction: any;
}
export interface ICityCardContainer {
  cityListData: ICityListData[];
  setCityListData: any;
}
export interface ICustomisedCardContainerProps {
  selectedCriteria: string;
  selectedCriteriaData: IdailyWeatherData[];
  selectedTime: string;
  customisedData: string | number;
  list: string[];
  setSelectedCriteria: any;
  setSelectedTime: any;
  setDailyWeatherData: any;
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
  temperature: number;
}
