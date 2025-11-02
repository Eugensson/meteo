"use client";

import moment from "moment";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useGlobalContext } from "@/context/global-context";

import { kelvinToCelsius } from "@/lib/misc";
import { getWeatherIcon } from "@/lib/getWeatherIcon";

export const DailyForecast = () => {
  const { forecast, fiveDayForecast } = useGlobalContext();

  if (!forecast || !fiveDayForecast) {
    return <Skeleton className="h-48 w-full" />;
  }

  const { weather } = forecast;
  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className="h-48 w-full" />;
  }

  if (!forecast || !weather) {
    return <Skeleton className="h-48 w-full" />;
  }

  const todayString = moment().format("YYYY-MM-DD");

  const todaysForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) =>
      forecast.dt_txt.startsWith(todayString)
  );

  const { main: weatherMain } = weather[0];

  if (todaysForecast.length < 1) {
    return (
      <Skeleton className="h-48 w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2" />
    );
  }

  return (
    <Card className="h-48 col-span-full sm:col-span-2">
      <CardContent className="h-full flex gap-10 overflow-hidden">
        {todaysForecast.length < 1 ? (
          <div className="flex justify-center items-center">
            <h1 className="text-5xl line-through text-rose-500">
              No Data Available
            </h1>
          </div>
        ) : (
          <Carousel>
            <CarouselContent>
              {todaysForecast.map(
                (forecast: { dt_txt: string; main: { temp: number } }) => {
                  return (
                    <CarouselItem
                      key={forecast.dt_txt}
                      className="flex flex-col gap-4 basis-34 cursor-grab"
                    >
                      <p className="text-muted-foreground font-medium">
                        {moment(forecast.dt_txt).format("HH:mm")}
                      </p>
                      <p>{getWeatherIcon(weatherMain)}</p>
                      <p className="mt-4">
                        {kelvinToCelsius(forecast.main.temp)}°C
                      </p>
                    </CarouselItem>
                  );
                }
              )}
            </CarouselContent>
          </Carousel>
        )}
      </CardContent>
    </Card>
  );
};
