// "use client";

// import { ThermometerSun } from "lucide-react";

// import { Progress } from "@/components/ui/progress";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useGlobalContext } from "@/context/global-context";

// import { airQulaityIndexText } from "@/lib/misc";

// export const AirPollution = () => {
//   const { airQuality } = useGlobalContext();

//   if (
//     !airQuality ||
//     !airQuality.list ||
//     !airQuality.list[0] ||
//     !airQuality.list[0].main
//   ) {
//     return <Skeleton className="h-48 w-full col-span-2 md:col-span-full" />;
//   }

//   const airQualityIndex = airQuality.list[0].main.aqi * 10;

//   const filteredIndex = airQulaityIndexText.find((item) => {
//     return item.rating === airQualityIndex;
//   });

//   return (
//     <div
//       className="air-pollution pt-6 px-4 h-48 border rounded-lg flex flex-col gap-8
//        dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
//     >
//       <h2 className="flex items-center gap-2 font-medium">
//         <ThermometerSun size={15} />
//         Air Pollusion
//       </h2>
//       <Progress value={airQualityIndex} max={100} className="progress" />
//       <p className="text-sm">Air quality is {filteredIndex?.description}. </p>
//     </div>
//   );
// };
"use client";

import { ThermometerSun } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/global-context";
import { airQulaityIndexText } from "@/lib/misc";

export const AirPollution = () => {
  const { airQuality } = useGlobalContext();

  const data = airQuality?.list?.[0];
  const aqi = data?.main?.aqi;

  if (!aqi) {
    return <Skeleton className="h-48 w-full col-span-2 md:col-span-full" />;
  }

  const airQualityIndex = aqi * 20;

  const filteredIndex = airQulaityIndexText.find(
    (item) => item.rating === airQualityIndex
  );

  return (
    <div
      className="air-pollution pt-6 px-4 h-48 border rounded-lg flex flex-col gap-8
      dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <h2 className="flex items-center gap-2 font-medium">
        <ThermometerSun size={15} />
        Air Pollution
      </h2>

      <Progress value={airQualityIndex} max={100} className="progress" />

      <p className="text-sm">
        Air quality is{" "}
        <span className="font-medium">
          {filteredIndex?.description ?? "unknown"}.
        </span>
      </p>
    </div>
  );
};
