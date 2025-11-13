// import { fetchCasinoTableData } from "@/lib/fetchers/casino-table-data";
// import { fetchSportsTableData } from "@/lib/fetchers/sports-table-data";
// import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import BetsTable from "./bets-page"; // Your original client component

export async function SuspendedBetsTable() {
  // Fetch data in parallel *inside* the new component
  // const [casinoBets, sportsBets, raceBets] = await Promise.all([
  //   fetchCasinoTableData(),
  //   fetchSportsTableData(),
  //   fetchRaceLeaderboardTableData(),
  // ]);

  // const betsData = {
  //   casino: casinoBets,
  //   sports: sportsBets,
  //   "race-leaderboard": raceBets,
  // };

  return <BetsTable />;
}