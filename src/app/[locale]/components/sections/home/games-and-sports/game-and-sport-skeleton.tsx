// This imports the single carousel skeleton you already made
import { SkeletonCarousel } from "./game-card-carousel";

/**
 * This is the new, correct skeleton for the GameAndSport component.
 * It renders TWO SkeletonCarousels, matching the real component's layout.
 */
export default function GameAndSportSkeleton() {
  return (
    <div className="w-full">
      {/* Skeleton for "trending games" */}
      <SkeletonCarousel />
      
      {/* The exact same padding as the real component */}
      <div className="pt-9">
        {/* Skeleton for "trending sports" */}
        <SkeletonCarousel />
      </div>
    </div>
  );
}