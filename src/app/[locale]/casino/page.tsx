import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import SearchBar from "../components/common/search-bar/search-bar";
import BackRedirectHandler from "../components/common/Back-redirect-handler";
import { GlobalTabs } from "../components/global-components/GlobalTabs";
import { PromotionSkeletonCarousel } from "../components/sections/casino/top-card-carousel";
import { PublisherCardsCarouselSkeleton } from "@/app/[locale]/components/sections/casino/publisher-cards-carousel";
import { SkeletonCarousel } from "../components/sections/home/games-and-sports/game-card-carousel";
import { fetchTrendingGames } from "@/lib/fetchers/trending-games-data";
import { fetchTrendingSports } from "@/lib/fetchers/trending-sports-data";
import BranchAndSlots from "../components/sections/casino/brad-and-slots";
import { fetchPublishers } from "@/lib/fetchers/fetch-publishers";
import {
  fetchAllBets,
  fetchHighRollers,
  fetchMyBets,
} from "@/lib/fetchers/casino-table-data";
import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";

const TopCardSlider = dynamic(
  () => import("@/app/[locale]/components/sections/casino/top-card-slider"),
  { loading: () => <PromotionSkeletonCarousel /> }
);

const PublisherCardsCarousel = dynamic(
  () =>
    import(
      "@/app/[locale]/components/sections/casino/publisher-cards-carousel"
    ),
  { loading: () => <PublisherCardsCarouselSkeleton /> }
);

const LiveCasino = dynamic(
  () => import("@/app/[locale]/components/sections/casino/live-casino"),
  { loading: () => <SkeletonCarousel /> }
);

const CasinoBetsTable = dynamic(
  () => import("@/app/[locale]/components/sections/casino/casino-bets-table"),
  { loading: () => <TableSkeleton /> }
);

const tabs = [
  { value: "lobby", label: "Lobby" },
  { value: "new-release", label: "New Release" },
  { value: "BETIDA-originals", label: "BETIDA Originals" },
  { value: "slot", label: "Slot" },
  { value: "live-casino", label: "Live Casino" },
  { value: "BETIDA-exclusive", label: "BETIDA Exclusive" },
  { value: "BETIDA-engine", label: "BETIDA Engine" },
];

export const revalidate = 360;

export default function CasinoPage() {
  return (
    <div className="app-container">
      <BackRedirectHandler />
      <div className="pt-6">
        <Suspense fallback={<PromotionSkeletonCarousel />}>
          <TopCardSlider />
        </Suspense>
        <div className="py-6">
          <SearchBar tab={false} />
        </div>
        <div className="pb-2.5">
          <GlobalTabs data={tabs} />
        </div>
        <div className="pb-2.5 min-h-96">
          <Suspense fallback={<BranchAndSlotsSkeleton />}>
            <BranchAndSlotsSection />
          </Suspense>
        </div>
        <div className="py-9">
          <Suspense fallback={<PublisherCardsCarouselSkeleton />}>
            <PublisherSection />
          </Suspense>
        </div>
        <div className="pb-9">
          <Suspense fallback={<LiveCasinoSkeleton />}>
            <LiveCasinoSection />
          </Suspense>
        </div>
        <div className="pb-9">
          <Suspense fallback={<TableSkeleton />}>
            <BetsTableSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// Streaming Sections
async function BranchAndSlotsSection() {
  const trendingGames = await fetchTrendingGames();
  const trendingSports = await fetchTrendingSports();
  return (
    <BranchAndSlots
      trendingGames={trendingGames}
      trendingSports={trendingSports}
    />
  );
}

async function PublisherSection() {
  const publishersData = await fetchPublishers();
  return <PublisherCardsCarousel publishersData={publishersData} />;
}

async function LiveCasinoSection() {
  const trendingSports = await fetchTrendingSports();
  return <LiveCasino trendingSports={trendingSports} />;
}

async function BetsTableSection() {
  const myBets = await fetchMyBets();
  const allBets = await fetchAllBets();
  const highRollers = await fetchHighRollers();
  const raceBets = await fetchRaceLeaderboardTableData();
  const betsData = {
    myBets,
    allBets,
    highRollers,
    "race-leaderboard": raceBets,
  };
  return <CasinoBetsTable betsData={betsData} />;
}

// Skeletons for CLS 0
function BranchAndSlotsSkeleton() {
  return (
    <div className="grid gap-9">
      <SkeletonCarousel />
      <SkeletonCarousel />
    </div>
  );
}

function LiveCasinoSkeleton() {
  return <SkeletonCarousel />;
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
