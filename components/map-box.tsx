"use client";

import dynamic from "next/dynamic";
import { useGlobalContext } from "@/context/global-context";

const DynamicMap = dynamic(() => import("@/components/map-client"), {
  ssr: false,
});

export const Mapbox = () => {
  const { forecast } = useGlobalContext();

  if (!forecast?.coord) {
    return <h1>Loading...</h1>;
  }

  return <DynamicMap coord={forecast.coord} />;
};
