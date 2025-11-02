"use client";

import moment from "moment";
import { Navigation } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/global-context";

import { kelvinToCelsius } from "@/lib/misc";
import { getWeatherIcon } from "@/lib/getWeatherIcon";

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
    return <Skeleton className="h-112 w-full" />;
  }

  const { main, name, weather } = forecast;

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);
  const { main: weatherMain, description } = weather[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{currentDay}</CardTitle>
        <CardDescription className="flex items-center gap-2 font-bold text-lg text-primary">
          <span>{name}</span>
          <Navigation size={15} />
        </CardDescription>
        <CardAction className="font-medium">{localTime}</CardAction>
      </CardHeader>
      <CardContent>
        <p className="py-10 text-9xl font-bold text-center">{temp}°</p>
        <span>{getWeatherIcon(weatherMain)}</span>
        <p className="pt-2 capitalize text-lg font-medium">{description}</p>
      </CardContent>
      <CardFooter className="space-x-4">
        <span>Low: {minTemp}°</span>
        <span>High: {maxTemp}°</span>
      </CardFooter>
    </Card>
  );
};
