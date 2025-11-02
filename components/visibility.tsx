"use client";

import { Eye } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/global-context";

import { getVisibilityDescription } from "@/lib/misc";

export const Visibility = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.visibility) {
    return <Skeleton className="h-48 w-full" />;
  }

  const { visibility } = forecast;

  return (
    <Card className="h-48 justify-between">
      <CardHeader>
        <CardTitle>
          <h2 className="flex items-center gap-2 font-medium">
            <Eye size={15} /> Visibility
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl">{Math.round(visibility / 1000)} km</p>
      </CardContent>
      <CardFooter className="text-sm px-3 justify-center">
        {getVisibilityDescription(visibility)}.
      </CardFooter>
    </Card>
  );
};
