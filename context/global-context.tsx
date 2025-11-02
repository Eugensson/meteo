"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  startTransition,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { debounce } from "lodash";

import {
  AirQualityData,
  FiveDayForecast,
  Forecast,
  UvIndexData,
} from "@/types";
import { logError } from "@/lib/utils";
import { citiesData } from "@/lib/data";

interface GlobalContextType {
  forecast: Forecast | null;
  airQuality: AirQualityData | null;
  fiveDayForecast: FiveDayForecast | null;
  uvIndex: UvIndexData | null;
  geoCodedList: typeof citiesData;
  inputValue: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setActiveCityCoords: React.Dispatch<React.SetStateAction<[number, number]>>;
}

interface GlobalContextUpdateType {
  setActiveCityCoords: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const GlobalContext = createContext<GlobalContextType | null>(null);
const GlobalContextUpdate = createContext<GlobalContextUpdateType | null>(null);

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [uvIndex, setUvIndex] = useState<UvIndexData | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [fiveDayForecast, setFiveDayForecast] =
    useState<FiveDayForecast | null>(null);
  const [geoCodedList, setGeoCodedList] = useState(citiesData);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [activeCityCoords, setActiveCityCoords] = useState<[number, number]>([
    51.752021, -1.257726,
  ]);

  const fetchAllWeatherData = useCallback(async (lat: number, lon: number) => {
    try {
      const [forecastRes, airQualityRes, fiveDayRes, uvRes] = await Promise.all(
        [
          axios.get(`/api/weather?lat=${lat}&lon=${lon}`),
          axios.get(`/api/pollution?lat=${lat}&lon=${lon}`),
          axios.get(`/api/fiveday?lat=${lat}&lon=${lon}`),
          axios.get(`/api/uv?lat=${lat}&lon=${lon}`),
        ]
      );

      startTransition(() => {
        setForecast(forecastRes.data);
        setAirQuality(airQualityRes.data);
        setFiveDayForecast(fiveDayRes.data);
        setUvIndex(uvRes.data);
      });
    } catch (error: unknown) {
      logError(error, "fetchAllWeatherData");
    }
  }, []);

  const fetchGeoCodedList = useCallback(async (search: string) => {
    if (!search.trim()) return setGeoCodedList(citiesData);
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);
      setGeoCodedList(res.data);
    } catch (error: unknown) {
      logError(error, "fetchAllWeatherData");
    }
  }, []);

  const debouncedFetch = useMemo(
    () => debounce(fetchGeoCodedList, 500),
    [fetchGeoCodedList]
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFetch(value);
  };

  useEffect(() => {
    const [lat, lon] = activeCityCoords;
    fetchAllWeatherData(lat, lon);
  }, [activeCityCoords, fetchAllWeatherData]);

  useEffect(() => {
    return () => debouncedFetch.cancel();
  }, [debouncedFetch]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }

  return context;
};

export const useGlobalContextUpdate = () => {
  const context = useContext(GlobalContextUpdate);
  if (!context) {
    throw new Error(
      "useGlobalContextUpdate must be used within a GlobalContextProvider"
    );
  }
  return context;
};
