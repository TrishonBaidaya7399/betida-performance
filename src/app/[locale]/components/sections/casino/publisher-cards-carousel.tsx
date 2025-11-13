"use client";

import CImage from "@/lib/CIdImage";
import dynamic from "next/dynamic";
import { Skeleton } from "@/app/[locale]/components/ui/skeleton";

const GlobalCarousel = dynamic(
  () =>
    import(
      "@/app/[locale]/components/global-components/carousel/global-carousel"
    ),
  {
    loading: () => <PublisherCardsCarouselSkeleton />,
  }
);

const PlayerStatus = dynamic(
  () => import("@/app/[locale]/components/global-components/player-status"),
  { loading: () => <Skeleton className="h-4 w-16 mx-auto rounded" /> }
);

export default function PublisherCardsCarousel({
  publishersData,
}: {
  publishersData: any;
}) {
  const publishers = publishersData;

  const renderGameCard = (publisher: any, index: number) => (
    <div className="flex flex-col gap-2">
      <div className="h-15 w-full min-w-35 rounded-lg bg-sidebar overflow-hidden">
        <CImage
          publicId={publisher?.img}
          alt={publisher?.name}
          height={60}
          width={143}
          className="rounded-lg object-cover h-full w-full pointer-events-none"
          priority={index < 4}
          fetchPriority={index < 4 ? "high" : "low"}
          sizes="(max-width: 768px) 50vw, 143px"
        />
      </div>
      <PlayerStatus players={publisher?.players} />
    </div>
  );

  return (
    <GlobalCarousel
      title="Publishers"
      title_href="/casino/collection/provider"
      items={publishers}
      renderItem={renderGameCard}
    />
  );
}

export function PublisherCardsCarouselSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-48 rounded-full" />
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="shrink-0 space-y-2">
            <Skeleton className="h-15 w-35 rounded-lg bg-sidebar" />
            <Skeleton className="h-4 w-20 mx-auto rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
