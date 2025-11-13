// This imports the skeleton from your HeroSection file
import { ProfileSkeleton } from "./hero-section"; 

// This skeleton mimics the full HeroSection layout
export default function HeroSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 animate-pulse">
      {/* 1. User Info Skeleton */}
      <div className="w-full col-span-1 sm:col-span-2 lg:col-span-1 text-white place-content-center">
        <ProfileSkeleton /> 
      </div>
      
      {/* 2. Types Grid Skeleton */}
      <div className="grid grid-cols-2 sm:col-span-2 gap-4 lg:gap-8 xl:gap-12">
        <div className="w-full bg-secondary rounded-lg aspect-366/284" />
        <div className="w-full bg-secondary rounded-lg aspect-366/284" />
      </div>
    </div>
  );
}