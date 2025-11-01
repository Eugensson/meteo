"use client";

import { useState } from "react";
import { CommandIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/context/global-context";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";

export const SearchDialog = () => {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-muted-foreground cursor-pointer"
        >
          Search Here...
          <CommandIcon className="ml-10" />
          <span className="text-xs">F</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0">
        <DialogTitle className="sr-only" />
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            value={inputValue}
            onChangeCapture={handleInput}
            placeholder="Type a command or search..."
          />
          <div className="px-3 pb-2">
            <p className="p-2 text-sm text-muted-foreground">Suggestions</p>
            {geoCodedList?.length === 0 || (!geoCodedList && <p>No Results</p>)}
            <ul>
              {geoCodedList &&
                geoCodedList.map(
                  (
                    item: {
                      name: string;
                      country: string;
                      state: string;
                      lat: number;
                      lon: number;
                    },
                    index: number
                  ) => {
                    const { country, state, name } = item;
                    return (
                      <li
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={`py-3 px-2 text-sm  rounded-sm cursor-default
                        ${hoveredIndex === index ? "bg-accent" : ""}
                      `}
                        onClick={() => {
                          getClickedCoords(item.lat, item.lon);
                        }}
                      >
                        <p className=" text">
                          {name}, {state && state + ","} {country}
                        </p>
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
};
