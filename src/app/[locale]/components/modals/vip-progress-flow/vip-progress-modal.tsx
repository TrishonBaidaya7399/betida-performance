import { fetchVipClub } from "@/lib/fetchers/vip-club";
import VipProgressModalClient from "./vip-progress-modal-client";
import { getTranslations } from "next-intl/server";
import {
  getLocalizedString,
  getSystemLanguage,
} from "@/lib/helpers/localized-content";
import { fetchProfileData } from "@/lib/fetchers/home-page-details";

export default async function VipProgressModal() {
  const vipData = await fetchVipClub();
  const profile = await fetchProfileData();
  const modalData = vipData?.modalData;
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

  if (!modalData) {
    return <div>Error loading VIP modal data.</div>;
  }
  console.log("profile in modal:", profile);
  return (
    <VipProgressModalClient
      data={modalData}
      profile={profile}
      localizedLevel={localizedLevel}
      localizedNextLevel={localizedNextLevel}
      profileTitle={profileTitle}
    />
  );
}
