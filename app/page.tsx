import { Navbar } from "@/components/navbar";
import { Temperature } from "@/components/temperature";
import { FiveDayForecast } from "@/components/five-day-forecast";

const Home = () => {
  return (
    <main className="mx-4 lg:mx-8 xl:mx-24 2xl:mx-64 m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col md:flex-row gap-4">
        <div className="w-full min-w-72 md:w-140 flex flex-col gap-4">
          <Temperature />
          <FiveDayForecast />
        </div>
      </div>
    </main>
  );
};

export default Home;
