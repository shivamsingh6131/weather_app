import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import SliderCard from "./SliderCard";
import { IHorizontalScroller, IdailyWeatherData } from "../utils/types";

const HorizontalScroller = (props: IHorizontalScroller) => {
  console.log(
    "🚀 ~ file: App.tsx:9 ~ App ~ dailyWeatherData:",
    props.dailyWeatherData
  );
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Hourly Weather Updates</h2>
      <Swiper
        spaceBetween={25}
        slidesPerView={4}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
      >
        {props?.dailyWeatherData?.map((hourly: IdailyWeatherData) => {
          return (
            <SwiperSlide key={hourly?.time}>
              <SliderCard
                time={hourly?.time}
                temperature={hourly?.temperature}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default HorizontalScroller;
