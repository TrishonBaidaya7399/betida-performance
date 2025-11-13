// app/[locale]/components/sections/home/games-and-sports/suspended-game-and-sport.tsx
import { fetchTrendingGames } from "@/lib/fetchers/trending-games-data";
import { fetchTrendingSports } from "@/lib/fetchers/trending-sports-data";
import GameAndSport from "./game-and-sport";

export async function SuspendedGameAndSport() {
  // Fetch data *inside* the component
  const [trendingGames, trendingSports] = await Promise.all([
    fetchTrendingGames(),
    fetchTrendingSports(),
  ]);

  return (
    <GameAndSport
    trendingSports={trendingSports}
    trendingGames={trendingGames}
    priority
    />
  );
}