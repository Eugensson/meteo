"use client";

import { Thermometer } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/global-context";

import { feelsLikeText, kelvinToCelsius } from "@/lib/misc";

export const FeelsLike = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
    return <Skeleton className="h-48 w-full" />;
  }

  const { feels_like, temp_min, temp_max } = forecast?.main;

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <Card className="h-48 justify-between">
      <CardHeader>
        <CardTitle>
          <h2 className="flex items-center gap-2 font-medium">
            <Thermometer size={15} /> Feels Like
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl">{kelvinToCelsius(feels_like)}°</p>
      </CardContent>
      <CardFooter className="text-sm px-3 justify-center">
        {feelsLikeDescription}
      </CardFooter>
    </Card>
  );
};
