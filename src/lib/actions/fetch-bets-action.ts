"use server";

import { fetchCasinoTableData } from "@/lib/fetchers/casino-table-data";
import { fetchSportsTableData } from "@/lib/fetchers/sports-table-data";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";

type TabKey = "casino" | "sports" | "race-leaderboard";

// We create one function that gets the data based on the tab
async function getFullData(tab: TabKey) {
  if (tab === "casino") {
    return await fetchCasinoTableData();
  }
  if (tab === "sports") {
    return await fetchSportsTableData();
  }
  if (tab === "race-leaderboard") {
    return await fetchRaceLeaderboardTableData();
  }
  return [];
}

// This is the Server Action your table will call
export async function fetchPaginatedBets(tab: TabKey, page: number, limit: number) {
  try {
    // We get ALL data on the server
    const fullData = await getFullData(tab);

    // We slice it and send ONLY the 20 rows for the current page
    const paginatedData = fullData.slice(
      (page - 1) * limit,
      page * limit
    );
    
    return { 
      data: paginatedData, 
      totalPages: Math.ceil(fullData.length / limit) 
    };
  } catch (_error) {
    return { data: [], totalPages: 0, error: "Failed to fetch data" };
  }
}