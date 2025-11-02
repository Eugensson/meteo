"use client";

import Image from "next/image";
import { WindIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/global-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Wind = () => {
  const { forecast } = useGlobalContext();

  const windSpeed = forecast?.wind?.speed;
  const windDir = forecast?.wind?.deg;

  if (!windSpeed || !windDir) {
    return <Skeleton className="h-48 w-full" />;
  }

  return (
    <Card className="h-48">
      <CardHeader>
        <CardTitle>
          <h2 className="flex items-center gap-2 font-medium">
            <WindIcon size={15} /> Wind
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="compass relative flex items-center justify-center">
          <div className="image relative">
            <Image
              src="/compass_body.svg"
              alt="compass"
              width={110}
              height={110}
            />
            <Image
              src="/compass_arrow.svg"
              alt="compass arrow"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-in-out dark:invert"
              style={{
                transform: `rotate(${windDir}deg)`,
                transformOrigin: "center center",
              }}
              width={10}
              height={10}
            />
          </div>
          <p
            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-xs
            dark:text-white font-medium"
          >
            {Math.round(windSpeed)} m/s
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
