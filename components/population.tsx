"use client";

import { UsersRound } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/global-context";

import { formatNumber } from "@/lib/misc";

export const Population = () => {
  const { fiveDayForecast } = useGlobalContext();

  if (!fiveDayForecast || !fiveDayForecast.city) {
    return <Skeleton className="h-48 w-full" />;
  }

  const { population, name } = fiveDayForecast.city;

  return (
    <Card className="h-48 justify-between">
      <CardHeader>
        <CardTitle>
          <h2 className="flex items-center gap-2 font-medium">
            <UsersRound size={15} /> Population
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl">{formatNumber(population)}</p>
      </CardContent>
      <CardFooter className="text-sm px-3 justify-center">
        Latest UN population data for {name}.
      </CardFooter>
    </Card>
  );
};
