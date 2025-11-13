import { fetchHero } from "@/lib/fetchers/home-page-details";
import HeroSection from "./hero-section";

// This is an async Server Component
export async function SuspendedHeroSection(profile: any ) {
  // 1. Fetch the data *inside* the suspended component
  const hero = await fetchHero();

  // 2. Fetch profile data (if you want to keep the LCP fix)
  // Note: We need to re-add your 'checkAuth' logic here
  // For simplicity, let's just fetch the hero data for now.
  
  return <HeroSection types={hero} profile={profile} />;
}