import { Suspense } from "react";
import SearchBar from "@/app/[locale]/components/common/search-bar/search-bar";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";
import BackRedirectHandler from "../components/common/Back-redirect-handler";
import TabLoader from "../tab-loader";
import dynamic from "next/dynamic";
import { fetchTrendingSports } from "@/lib/fetchers/trending-sports-data";
import {
  fetchAllBets,
  fetchHighRollers,
  fetchMyBets,
} from "@/lib/fetchers/casino-table-data";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
import CImage from "@/lib/CIdImage";

const TopCardSlider = dynamic(
  () => import("@/app/[locale]/components/sections/casino/top-card-slider"),
  { loading: () => <div className="h-48 bg-muted/20 rounded-lg" /> }
);

const tabs = [
  { value: "lobby", label: "Lobby" },
  { value: "my-bets", label: "My Bets" },
  { value: "favorites", label: "Favorites" },
  { value: "starting-soon", label: "Starting Soon" },
];

export const revalidate = 360;

// Streaming components
async function TopSportsCarousel() {
  const topSports = await fetchTrendingSports();
  const { default: GlobalCadCarousel } = await import(
    "@/app/[locale]/components/sections/home/games-and-sports/game-card-carousel"
  );
  return (
    <GlobalCadCarousel title="Top Sorts" items={topSports} type="sports" />
  );
}

async function BetsTable() {
  const [myBets, allBets, highRollers, raceBets] = await Promise.all([
    fetchMyBets(),
    fetchAllBets(),
    fetchHighRollers(),
    fetchRaceLeaderboardTableData(),
  ]);
  const { default: CasinoBetsTable } = await import(
    "@/app/[locale]/components/sections/casino/casino-bets-table"
  );
  return (
    <CasinoBetsTable
      betsData={{ myBets, allBets, highRollers, "race-leaderboard": raceBets }}
    />
  );
}

export default function SportsPage() {
  return (
    <div className="app-container">
      <BackRedirectHandler />
      <div className="py-6 flex flex-col gap-6">
        <TopCardSlider />
        <SearchBar tab={false} />

        <div className="flex flex-col">
          <GlobalTabs data={tabs} />
          <div className="w-full relative rounded overflow-hidden">
            <TabLoader />
            <Suspense fallback={<CarouselSkeleton />}>
              <TopSportsCarousel />
            </Suspense>
          </div>
        </div>

        <div className="relative w-full aspect-1200/810 overflow-hidden rounded-lg bg-sidebar">
          <CImage
            height={810}
            width={1200}
            publicId="sports-banner-02"
            alt="sports name"
            priority
            fetchPriority="high"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        <Suspense fallback={<TableSkeleton />}>
          <BetsTable />
        </Suspense>
      </div>
    </div>
  );
}

/* SKELETONS */
function CarouselSkeleton() {
  return (
  <div className="w-full h-auto animate-pulse">
      <div className="flex items-center justify-between mb-2.5">
        <div className="h-4 w-32 bg-muted rounded-sm" />
        <div className="flex gap-2">
          <div className="h-6 w-6 bg-muted rounded-sm" />
          <div className="h-6 w-6 bg-muted rounded-sm" />
        </div>
      </div>
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="min-w-35.75 h-40.75 bg-muted rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-12 bg-muted/20 rounded animate-pulse" />
      ))}
    </div>
  );
}
