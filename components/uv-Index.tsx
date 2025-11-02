"use client";

import { SunDim } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UvProgress } from "@/components/ui/uv-progress";
import { useGlobalContext } from "@/context/global-context";

import { uvIndexCategory } from "@/lib/misc";

export const UvIndex = () => {
  const { uvIndex } = useGlobalContext();

  if (!uvIndex || !uvIndex.daily) {
    return <Skeleton className="h-48 w-full" />;
  }

  const { uv_index_max } = uvIndex.daily;
  const uvIndexMax = uv_index_max[0].toFixed(0);

  const marginLeftPercentage = (Number(uvIndexMax) / 14) * 100;

  return (
    <Card className="h-48 justify-between">
      <CardHeader>
        <CardTitle>
          <h2 className="flex items-center gap-2 font-medium">
            <SunDim size={15} /> Uv Index
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-2xl">
          {uvIndexMax}&nbsp;
          <span className="text-sm">
            ({uvIndexCategory(Number(uvIndexMax)).text})
          </span>
        </p>

        <UvProgress
          value={marginLeftPercentage}
          max={14}
          className="h-1.5 progress"
        />
      </CardContent>
      <CardFooter className="text-sm px-2 justify-center">
        {uvIndexCategory(Number(uvIndexMax)).protection}
      </CardFooter>
    </Card>
  );
};
