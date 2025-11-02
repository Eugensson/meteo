"use client";

import { ThermometerSun } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/global-context";

import { airQulaityIndexText } from "@/lib/misc";

export const AirPollution = () => {
  const { airQuality } = useGlobalContext();

  const data = airQuality?.list?.[0];
  const aqi = data?.main?.aqi;

  if (!aqi) {
    return <Skeleton className="h-48 w-full col-span-2 md:col-span-full" />;
  }

  const airQualityIndex = aqi * 20;

  const filteredIndex = airQulaityIndexText.find(
    (item) => item.rating === airQualityIndex
  );

  return (
    <Card className="h-48 col-span-full sm:col-span-2 justify-between">
      <CardHeader>
        <CardTitle>
          <h2 className="flex items-center gap-2 font-medium">
            <ThermometerSun size={15} />
            Air Pollution
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={airQualityIndex} max={100} className="progress" />
      </CardContent>
      <CardFooter>
        Air quality is&nbsp;
        <span className="font-medium">
          {filteredIndex?.description ?? "unknown"}.
        </span>
      </CardFooter>
    </Card>
  );
};
