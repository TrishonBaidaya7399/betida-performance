// import HeroSection from "@/app/[locale]/components/sections/home/hero-section";
import { PromotionSkeletonCarousel } from "../components/sections/home/promotions/promotion-cards-carousel";
import { fetchProfileData } from "@/lib/fetchers/home-page-details";
// import { fetchTrendingGames } from "@/lib/fetchers/trending-games-data";
// import { fetchTrendingSports } from "@/lib/fetchers/trending-sports-data";
// import { fetchCasinoTableData } from "@/lib/fetchers/casino-table-data";
// import { fetchSportsTableData } from "@/lib/fetchers/sports-table-data";
// import { fetchRaceLeaderboardTableData } from "@/lib/fetchers/race-leaderboard-table-data";
// import { fetchQuestions } from "@/lib/fetchers/questions";
import SearchBar from "../components/common/search-bar/search-bar";
// import RacesAndRafflesSection from "@/app/[locale]/components/sections/home/races-raffles/races-raffles";
// import { fetchRacesAndRaffles } from "@/lib/fetchers/races-raffles";
// import BetsTable from "@/app/[locale]/components/sections/home/bets/bets-page";
// import Question from "@/app/[locale]/components/sections/home/questions/question";
import { Suspense } from "react";
// import { SkeletonCarousel } from "../components/sections/home/games-and-sports/game-card-carousel";
// import GameAndSport from "../components/sections/home/games-and-sports/game-and-sport";
// import Promotions from "../components/sections/home/promotions/promotions";
import RacesSkeleton from "../components/sections/home/races-raffles/races-skeleton";
// import { SuspendedBetsTable } from "../components/sections/home/bets/suspended-bets-table";
// import { SuspendedQuestion } from "../components/sections/home/questions/suspended-question";
import BetsTableSkeleton from "../components/sections/home/bets/bets-table-skeleton";
// import { SuspendedGameAndSport } from "../components/sections/home/games-and-sports/suspended-game-and-sport";
// import { SuspendedRacesAndRaffles } from "../components/sections/home/races-raffles/suspended-races-raffles";
import GameAndSportSkeleton from "../components/sections/home/games-and-sports/game-and-sport-skeleton";
import { checkAuth } from "@/lib/auth";
// import { SuspendedHeroSection } from "../components/sections/home/suspended-hero-section";
// import HeroSection from "../components/sections/home/hero-section";
import HeroSkeleton from "../components/sections/home/hero-skeleton";
import { SuspendedHeroSection } from "../components/sections/home/suspended-hero-section";
import dynamic from "next/dynamic";

const SuspendedGameAndSport = dynamic(
  () => import('../components/sections/home/games-and-sports/suspended-game-and-sport')
    .then(mod => mod.SuspendedGameAndSport), // Assuming it's a named export
  { loading: () => <GameAndSportSkeleton /> }
);
const Promotions = dynamic(
  () => import('../components/sections/home/promotions/promotions'),
  {
    loading: () => <PromotionSkeletonCarousel />
  }
);
const SuspendedRacesAndRaffles = dynamic(
  () =>
    import(
      "../components/sections/home/races-raffles/suspended-races-raffles"
    ).then((mod) => mod.SuspendedRacesAndRaffles), // <-- Add this .then()
  { loading: () => <RacesSkeleton /> }
);
// We're re-importing these with 'dynamic'
const SuspendedBetsTable = dynamic(
  () => import('../components/sections/home/bets/suspended-bets-table')
    .then(mod => mod.SuspendedBetsTable), // Assuming it's a named export
  { loading: () => <BetsTableSkeleton /> }
);

const SuspendedQuestion = dynamic(
  () => import('../components/sections/home/questions/suspended-question')
    .then(mod => mod.SuspendedQuestion), // Assuming it's a named export
  { loading: () => <div className="h-40 w-full" /> }
);
type Metadata = {
  title: string;
  description: string;
  keywords?: string[];
  authors?: { name: string; url?: string }[];
  creator?: string;
  publisher?: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    locale: string;
    type: string;
  };
  twitter: {
    card: string;
    title?: string;
    description?: string;
    images?: string[];
    creator?: string;
    site?: string;
  };
  robots: {
    index: boolean;
    follow: boolean;
    googleBot: {
      index: boolean;
      follow: boolean;
      "max-video-preview": -1;
      "max-image-preview": "large";
      "max-snippet": -1;
    };
  };
  verification: {
    google?: string;
    yandex?: string;
    yahoo?: string;
  };
  viewport: string;
  themeColor?: Array<{ media: string; color: string }>;
  alternates: {
    canonical: string;
  };
  icons: {
    icon: string;
    shortcut: string;
    apple: string;
    other: {
      rel: string;
      url: string;
      sizes?: string;
    }[];
  };
};

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://betida.com";
  const title = "BETIDA - Home";
  const description = "Welcome to BETIDA - Your ultimate gaming destination!";
  // const bannerImage = "og-banner_etnrp1";
  const ogImageUrl = `${baseUrl}/detida.png`;
  const keywords = [
    "online casino",
    "sports betting",
    "trending games",
    "live sports",
    "promotions",
    "BETIDA casino",
  ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "BETIDA Team", url: "https://betida.com/" }],
    creator: "BETIDA",
    publisher: "BETIDA",
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: "BETIDA",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
      creator: "@BETIDAOfficial",
      site: "@BETIDAOfficial",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || "",
      yandex: process.env.YANDEX_SITE_VERIFICATION || "",
      yahoo: process.env.YAHOO_SITE_VERIFICATION || "",
    },
    viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
    alternates: {
      canonical: baseUrl,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
      other: [
        {
          rel: "apple-touch-icon",
          url: "/apple-touch-icon.png",
          sizes: "180x180",
        },
        {
          rel: "icon",
          url: "/favicon-32x32.png",
          sizes: "32x32",
        },
      ],
    },
  };
}

export default async function HomePage() {
  // const [hero, trendingGames, trendingSports, racesRaffles] = await Promise.all(
  //   [
  //     fetchHero(),
  //     fetchTrendingGames(),
  //     fetchTrendingSports(),
  //     fetchRacesAndRaffles(),
  //   ]
  // );

  // const [hero, isAuthenticated] = await Promise.all([
  //   fetchHero(),
  //   checkAuth()
  // ]);
  const isAuthenticated = await checkAuth();
  // const casinoBets = await fetchCasinoTableData();
  // const sportsBets = await fetchSportsTableData();
  // const raceBets = await fetchRaceLeaderboardTableData();
  // const questions = await fetchQuestions();
  // const betsData = {
  //   casino: casinoBets,
  //   sports: sportsBets,
  //   "race-leaderboard": raceBets,
  // };
  let profile = null;
  if (isAuthenticated) {
    // This is the fetch function you provided
    profile = await fetchProfileData();
  }
  // const lcpImage = hero?.[0]?.imagePublicId;
  // const lcpImage2 = hero?.[1]?.imagePublicId;
  return (
    <>
      {/* Preload the first image */}
      {/* {lcpImage && (
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href={`https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_auto,q_auto/${lcpImage}`}
          imageSizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
        />
      )} */}
      {/* Preload the second image */}
      {/* {lcpImage2 && (
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href={`https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_auto,q_auto/${lcpImage2}`}
          imageSizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
        />
      )} */}
      <div className="app-container pb-9">
        {/* <div className="w-full pt-8">
          <HeroSection types={hero} profile={profile} />
        </div> */}
        <div className="w-full pt-8">
          <Suspense fallback={<HeroSkeleton />}>
            <SuspendedHeroSection profile={profile} />
          </Suspense>
        </div>
        {/* top search panel */}
        <div className="w-full pt-9">
          <SearchBar />
        </div>
        {/* Game & Sport */}
        {/* <div className="w-full pt-6">
        <Suspense fallback={<SkeletonCarousel />}>
          <GameAndSport
            priority={false}
            trendingSports={trendingSports}
            trendingGames={trendingGames}
          />
        </Suspense>
      </div> */}
        <div className="w-full pt-6">
          <Suspense fallback={<GameAndSportSkeleton />}>
            <SuspendedGameAndSport />
          </Suspense>
        </div>

        {/* Promotions */}
        <div className="w-full pt-9">
          <Suspense
            fallback={
              <div className="min-h-[224px]">
                <PromotionSkeletonCarousel />
              </div>
            }
          >
            <Promotions priority={false} />
          </Suspense>
        </div>

        {/* Races & Raffles */}
        {/* <div className="w-full">
        <Suspense fallback={<RacesSkeleton />}>
          <RacesAndRafflesSection data={racesRaffles} />
        </Suspense>
      </div> */}
        {/* --- NEW SUSPENDED Races & Raffles --- */}
        {isAuthenticated && (
          <div className="w-full">
            <Suspense fallback={<RacesSkeleton />}>
              <SuspendedRacesAndRaffles />
            </Suspense>
          </div>
        )}
        {/* bets table section */}
        {/* <div className="w-full pt-9">
        <BetsTable betsData={betsData} />
      </div> */}
        {/* --- NEW SUSPENDED BETS TABLE --- */}
        <div className="w-full pt-9">
          <Suspense fallback={<BetsTableSkeleton />}>
            <SuspendedBetsTable />
          </Suspense>
        </div>
        {/* bets table section */}
        {/* {questions.length > 0 && (
        <div className="w-full pt-9">
          <Question questions={questions} />
        </div>
      )} */}

        {/* --- NEW SUSPENDED QUESTIONS --- */}
        <div className="w-full pt-9">
          <Suspense fallback={<div className="h-40 w-full" /> /* Simple skeleton */}>
            <SuspendedQuestion />
          </Suspense>
        </div>
      </div>
    </>
  );
}
