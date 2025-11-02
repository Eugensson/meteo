"use client";

import { SunDim } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { UvProgress } from "@/components/ui/uv-progress";
import { useGlobalContext } from "@/context/global-context";

import { uvIndexCategory } from "@/lib/misc";

export const UvIndex = () => {
  const { uvIndex } = useGlobalContext();

  console.log("uvIndex", uvIndex);

  if (!uvIndex || !uvIndex.daily) {
    return <Skeleton className="h-48 w-full" />;
  }

  const { daily } = uvIndex;
  const { uv_index_max } = daily;

  const uvIndexMax = uv_index_max[0].toFixed(0);

  const marginLeftPercentage = (Number(uvIndexMax) / 14) * 100;

  return (
    <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          <SunDim size={15} /> Uv Index
        </h2>
        <div className="pt-4 flex flex-col gap-1">
          <p className="text-2xl">
            {uvIndexMax}&nbsp;
            <span className="text-sm">
              ({uvIndexCategory(Number(uvIndexMax)).text})
            </span>
          </p>

          <UvProgress
            value={marginLeftPercentage}
            max={14}
            className="progress"
          />
        </div>
      </div>

      <p className="text-sm">
        {uvIndexCategory(Number(uvIndexMax)).protection}
      </p>
    </div>
  );
};
