"use client";

import { CalendarDays } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/global-context";

import { DailyForecast } from "@/types";
import { kelvinToCelsius, unixToDay } from "@/lib/misc";

export const FiveDayForecast = () => {
  const { fiveDayForecast } = useGlobalContext();

  if (!fiveDayForecast?.city || !fiveDayForecast?.list) {
    return <Skeleton className="h-48 w-full" />;
  }

  const { city, list } = fiveDayForecast;

  const processData = (
    dailyData: {
      main: { temp_min: number; temp_max: number };
      dt: number;
    }[]
  ): DailyForecast => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData.forEach((day) => {
      if (day.main.temp_min < minTemp) minTemp = day.main.temp_min;
      if (day.main.temp_max > maxTemp) maxTemp = day.main.temp_max;
    });

    return {
      day: unixToDay(dailyData[0].dt),
      minTemp: kelvinToCelsius(minTemp),
      maxTemp: kelvinToCelsius(maxTemp),
    };
  };

  const dailyForecasts: DailyForecast[] = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = list.slice(i, i + 8);
    dailyForecasts.push(processData(dailyData));
  }

  return (
    <div
      className="pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <h2 className="flex items-center gap-2 font-medium">
        <CalendarDays size={15} /> 5-Day Forecast for {city.name}
      </h2>

      <ul className="forecast-list pt-3 backdrop-blur-2xl">
        {dailyForecasts.map((day, i) => (
          <li
            key={i}
            className="daily-forevast py-4 flex flex-col justify-evenly border-b-2 last-of-type:border-none"
          >
            <p className="text-xl min-w-14">{day.day}</p>
            <p className="text-sm flex justify-between">
              <span>(low)</span>
              <span>(high)</span>
            </p>

            <div className="flex-1 flex items-center justify-between gap-4">
              <p className="font-bold">{day.minTemp}°C</p>
              <div className="temperature flex-1 w-full h-2 rounded-lg" />
              <p className="font-bold">{day.maxTemp}°C</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
