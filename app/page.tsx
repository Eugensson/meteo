"use client";

import { Wind } from "@/components/wind";
import { Navbar } from "@/components/navbar";
import { Sunset } from "@/components/sunset";
import { Mapbox } from "@/components/map-box";
import { UvIndex } from "@/components/uv-Index";
import { Humidity } from "@/components/humidity";
import { Pressure } from "@/components/pressure";
import { FeelsLike } from "@/components/feels-like";
import { Population } from "@/components/population";
import { Visibility } from "@/components/visibility";
import { Temperature } from "@/components/temperature";
import { AirPollution } from "@/components/air-pollution";
import { DailyForecast } from "@/components/daily-forecast";
import { FiveDayForecast } from "@/components/five-day-forecast";
import { useGlobalContextUpdate } from "@/context/global-context";

import { citiesData } from "@/lib/data";

const Home = () => {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="mx-4 lg:mx-8 xl:mx-24 2xl:mx-64 m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col md:flex-row gap-4">
        <div className="w-full min-w-72 md:w-140 flex flex-col gap-4">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox />
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                Top Large Cities
              </h2>
              <ul className="flex flex-col gap-4">
                {citiesData.map(({ name, lat, lon }, index) => {
                  return (
                    <li
                      key={index}
                      className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                      onClick={() => {
                        getClickedCityCords(lat, lon);
                      }}
                    >
                      <p className="px-6 py-4">{name}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
