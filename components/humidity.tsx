"use client";

import { Droplets } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/global-context";

import { getHumidityText } from "@/lib/misc";

export const Humidity = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
    return <Skeleton className="h-48 w-full" />;
  }

  const { humidity } = forecast?.main;

  return (
    <Card className="h-48 justify-between">
      <CardHeader>
        <CardTitle>
          <h2 className="flex items-center gap-2 font-medium">
            <Droplets size={15} /> Humidity
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl">{humidity}%</p>
      </CardContent>
      <CardFooter className="text-sm px-3 justify-center">
        {getHumidityText(humidity)}.
      </CardFooter>
    </Card>
  );
};
