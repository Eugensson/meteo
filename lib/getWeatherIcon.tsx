import {
  CloudDrizzle,
  CloudRain,
  CloudSun,
  Cloudy,
  Snowflake,
} from "lucide-react";
import { JSX } from "react";

export const getWeatherIcon = (
  weatherMain: string | undefined
): JSX.Element => {
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
