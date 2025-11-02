"use client";

import { Gauge } from "lucide-react";

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
    <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          <Gauge size={15} /> Pressure
        </h2>
        <p className="pt-4 text-2xl">{pressure} hPa</p>
      </div>
      <p className="text-sm">{getPressureDescription(pressure)}.</p>
    </div>
  );
};
