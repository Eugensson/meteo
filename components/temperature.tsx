"use client";

import {
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudSun,
  Cloudy,
  Navigation,
} from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

import { useGlobalContext } from "@/context/global-context";

import { kelvinToCelsius } from "@/lib/misc";

export const Temperature = () => {
  const { forecast } = useGlobalContext();
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    if (!forecast) return;

    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(forecast.timezone / 60);
      const formatedTime = localMoment.format("HH:mm:ss");
      const day = localMoment.format("dddd");

      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);

    return () => clearInterval(interval);
  }, [forecast]);

  if (!forecast || !forecast?.weather) {
    return <div>Loading...</div>;
  }

  const { main, name, weather } = forecast;

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);
  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return <CloudDrizzle size={25} />;
      case "Rain":
        return <CloudRain size={30} />;
      case "Snow":
        return <Snowflake size={30} />;
      case "Clear":
        return <CloudSun size={30} />;
      case "Clouds":
        return <Cloudy size={30} />;
      default:
        return <CloudSun size={30} />;
    }
  };

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none backdrop-blur-2xl"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <Navigation size={15} />
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
};
