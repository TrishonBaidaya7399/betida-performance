import { BetsTableTabs } from "./bets-table-tabs";

/**
 * Skeleton loader for the BetsTable.
 * It's crucial to match the static parts (like tabs) and the overall
 * container height (440px) from the original component to prevent CLS.
 */
export default function BetsTableSkeleton() {
  return (
    <div className="w-full">
      {/* 1. Render the static Tabs component. This is not part of the suspended data. */}
      <BetsTableTabs />

      {/* 2. Render the table container with the exact same styling. */}
      <div className="w-full overflow-hidden rounded-lg relative">
        {/* 3. Create a fixed-height (440px) box to hold the skeleton. */}
        {/* This matches the 'maxHeight' prop and prevents the page from jumping. */}
        <div className="h-[440px] w-full overflow-hidden">
          {/* --- Desktop Skeleton --- */}
          <div className="hidden md:block">
            <SkeletonHeaderDesktop />
            <SkeletonBody />
          </div>
          
          {/* --- Mobile Skeleton --- */}
          <div className="block md:hidden">
            <SkeletonHeaderMobile />
            <SkeletonBody />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Skeleton Parts ---

// Skeletons for the two different headers
const SkeletonHeaderDesktop = () => (
  <div className="flex justify-between items-center px-4 py-3 bg-gray-800 rounded-t-lg">
    <div className="h-4 w-20 bg-gray-700 rounded" />
    <div className="h-4 w-20 bg-gray-700 rounded" />
    <div className="h-4 w-16 bg-gray-700 rounded" />
    <div className="h-4 w-24 bg-gray-700 rounded" />
    <div className="h-4 w-16 bg-gray-700 rounded" />
    <div className="h-4 w-24 bg-gray-700 rounded" />
  </div>
);

const SkeletonHeaderMobile = () => (
  <div className="flex justify-between items-center px-4 py-3 bg-gray-800 rounded-t-lg">
    <div className="h-4 w-28 bg-gray-700 rounded" />
    <div className="h-4 w-24 bg-gray-700 rounded" />
  </div>
);

// A single body component that shows different rows based on screen size
const SkeletonBody = () => (
  <div className="p-4 space-y-4 bg-gray-800/50">
    {[...Array(8)].map((_, i) => (
      <div key={i}>
        {/* Desktop Row */}
        <div className="hidden md:flex justify-between items-center animate-pulse">
          <div className="h-5 w-24 bg-gray-700 rounded" />
          <div className="h-5 w-24 bg-gray-700 rounded" />
          <div className="h-5 w-16 bg-gray-700 rounded" />
          <div className="h-5 w-20 bg-gray-700 rounded" />
          <div className="h-5 w-12 bg-gray-700 rounded" />
          <div className="h-5 w-20 bg-gray-700 rounded" />
        </div>
        {/* Mobile Row */}
        <div className="flex md:hidden justify-between items-center animate-pulse">
          <div className="h-5 w-32 bg-gray-700 rounded" />
          <div className="h-5 w-24 bg-gray-700 rounded" />
        </div>
      </div>
    ))}
  </div>
);