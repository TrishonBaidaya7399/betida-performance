// app/[locale]/components/sections/home/hero-section.tsx
import dynamic from "next/dynamic";
import CImage from "@/lib/CIdImage";
import { Link } from "@/i18n/navigation";
import { Suspense } from "react";
import { getSystemLanguage, getLocalizedString } from "@/lib/helpers/localized-content";
import { getTranslations } from "next-intl/server"; // <-- Use the SERVER version
const ProfileInfo = dynamic(
  () => import("@/app/[locale]/components/common/profile-info/profile-info"),
  { loading: () => <ProfileSkeleton /> }
);

const PlayerStatus = dynamic(
  () => import("@/app/[locale]/components/global-components/player-status"),
  {
    loading: () => (
      <div className="h-5 w-12 bg-gray-700 rounded animate-pulse" />
    ),
  }
);

interface IType {
  title: string;
  url: string;
  imagePublicId: string;
  players: number;
}

// Preload the **first hero image** (LCP candidate)
// const HeroImagePreload = ({ publicId }: { publicId: string }) => (
//   <>
//     <link
//       rel="preload"
//       as="image"
//       href={`https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_auto,q_auto/${publicId}`}
//       fetchPriority="high"
//     />
//     <link
//       rel="preload"
//       as="image"
//       href={`https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_avif,q_auto/${publicId}`}
//       type="image/avif"
//     />
//     <link
//       rel="preload"
//       as="image"
//       href={`https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_webp,q_auto/${publicId}`}
//       type="image/webp"
//     />
//   </>
// );

export default async function HeroSection({ types, profile }: { types: IType[], profile: any }) {
  // const lcpImage = types[0]?.imagePublicId;
  const t = await getTranslations("profile");
  const langCode = getSystemLanguage();
  const localizedLevel = getLocalizedString(
    [{ _key: "level", value: profile?.level }],
    langCode,
    "en"
  );
  const localizedNextLevel = getLocalizedString(
    [{ _key: "nextLevel", value: profile?.nextLevel }],
    langCode,
    "en"
  );
  const profileTitle = t("title");
  return (
    <>
      {/* Preload LCP image in <head> */}
      {/* {lcpImage && <HeroImagePreload publicId={lcpImage} />} */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
        {/* User Info */}
        <div className="w-full col-span-1 sm:col-span-2 lg:col-span-1 text-white place-content-center">
          <Suspense fallback={<ProfileSkeleton />}>
            <ProfileInfo
              profile={profile}
              localizedLevel={localizedLevel}
              localizedNextLevel={localizedNextLevel}
              profileTitle={profileTitle}
            />
          </Suspense>
        </div>

        {/* Types Grid */}
        <div className="grid grid-cols-2 sm:col-span-2 gap-4 lg:gap-8 xl:gap-12">
          {types.map((type: IType, index: number) => {
            // Determine if this is the LCP image (the first one)
            const isLCP = index === 0;
            const isSecondImageATF = index === 1;
            return (
              <div
                key={index}
                className="w-full transition-all duration-300 hover:-translate-y-1"
              >
                <Link
                  href={type.url}
                  aria-label={type?.title}
                  className="relative w-full h-full space-y-2 block"
                >
                  <span
                    className={`w-full bg-secondary rounded-lg overflow-hidden border border-transparent inline-block
                      aspect-366/284 hover:border-chart-${type.title === "Casino" ? "1" : "2"} duration-300`}
                  >
                    <CImage
                      publicId={type.imagePublicId}
                      alt={`${type.title} type`}
                      width={648}
                      height={356}
                      // sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover"
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      priority={isLCP}

                      // Also make fetchPriority conditional
                      fetchPriority={isLCP ? "high" : "auto"}
                      loading={isSecondImageATF ? "eager" : undefined}
                    // Bonus: You can slightly lower quality on non-priority images
                    // quality={isLCP ? 70 : 65}
                    />
                  </span>

                  <span className="text-white w-full inline-flex items-center justify-between">
                    <span className="text-sm font-semibold">{type.title}</span>
                    <Suspense
                      fallback={
                        <div className="h-5 w-12 bg-gray-700 rounded animate-pulse" />
                      }
                    >
                      <PlayerStatus players={type.players} />
                    </Suspense>
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// Skeleton to prevent CLS
// export const ProfileSkeleton = () => (
//   <div className="space-y-3 animate-pulse">
//     <div className="h-8 w-32 bg-gray-700 rounded" />
//     <div className="h-5 w-24 bg-gray-700 rounded" />
//     <div className="h-10 w-full bg-gray-700 rounded-lg" />
//   </div>
// );

export function ProfileSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="w-full space-y-4">
        {/* Title skeleton */}
        <div className="h-9 w-3/4 mx-auto lg:mx-0 bg-foreground/700 rounded" />
        {/* Button skeleton */}
        <div className="text-center lg:text-left">
          <div className="h-10 w-32 mx-auto lg:mx-0 bg-foreground/700 rounded" />
        </div>
        {/* Text and social icons skeleton */}
        <div className="text-sm font-semibold">
          <div className="w-full text-center lg:text-left">
            <div className="h-4 w-5/6 mx-auto lg:mx-0 bg-foreground/700 rounded" />
          </div>
          <div className="flex items-center justify-center lg:justify-start mt-2 gap-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="size-8 rounded-lg bg-foreground/700"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}