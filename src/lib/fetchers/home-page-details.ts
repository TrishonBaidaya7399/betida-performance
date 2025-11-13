import { unstable_cache } from "next/cache";
import { client } from "../sanity";

export const fetchHero = unstable_cache(
  async () => {
    return client.fetch(
      `*[_type=="hero"]{title, imageSrc, imagePublicId, players, url}`
    );
  },
  ["hero-data"],
  { revalidate: 3600 }
);

export const fetchProfileData = unstable_cache(
  async () => {
    return client.fetch(` *[_type == "profile"][0]{
      username,
      vipProgress,
      level,
      nextLevel,
      showPopupItem
    }`);
  },
  ["profile-data"], // A unique cache key
  { revalidate: 3600 } // Cache for 1 hour
);
