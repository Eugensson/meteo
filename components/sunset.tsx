"use client";

import { SunsetIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/global-context";

import { unixToTime } from "@/lib/misc";

export const Sunset = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
    return <Skeleton className="h-48 w-full" />;
  }

  const times = forecast?.sys?.sunset;
  const timezone = forecast?.timezone;

  const sunsetTime = unixToTime(times, timezone);
  const sunrise = unixToTime(forecast?.sys?.sunrise, timezone);

  return (
    <Card className="h-48 justify-between">
      <CardHeader>
        <CardTitle>
          <h2 className="flex items-center gap-2 font-medium">
            <SunsetIcon size={15} />
            Sunset
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl">{sunsetTime}</p>
      </CardContent>
      <CardFooter>
        Sunrise:&nbsp;<span className="font-medium">{sunrise}</span>
      </CardFooter>
    </Card>
  );
};
