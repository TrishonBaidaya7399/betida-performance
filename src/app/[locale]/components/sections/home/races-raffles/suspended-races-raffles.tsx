// app/[locale]/components/sections/home/races-raffles/suspended-races-raffles.tsx
import { fetchRacesAndRaffles } from "@/lib/fetchers/races-raffles";
import RacesAndRafflesSection from "./races-raffles";

export async function SuspendedRacesAndRaffles() {
  const racesRaffles = await fetchRacesAndRaffles();
  return <RacesAndRafflesSection data={racesRaffles} />;
}