"use client";

import { Gauge } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/global-context";

import { getPressureDescription } from "@/lib/misc";

export const Pressure = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
    return <Skeleton className="h-48 w-full" />;
  }

  const { pressure } = forecast?.main;

  return (
    <Card className="h-48 justify-between">
      <CardHeader>
        <CardTitle>
          <h2 className="flex items-center gap-2 font-medium">
            <Gauge size={15} /> Pressure
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl">{pressure} hPa</p>
      </CardContent>
      <CardFooter className="text-sm px-3 justify-center">
        {getPressureDescription(pressure)}.
      </CardFooter>
    </Card>
  );
};
