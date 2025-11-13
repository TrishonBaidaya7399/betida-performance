import ProfileInfo from "@/app/[locale]/components/common/profile-info/profile-info";
import CImage from "@/lib/CIdImage";
import { getLocalizedString, getSystemLanguage } from "@/lib/helpers/localized-content";
import { getTranslations } from "next-intl/server";

export default async function HeroSection(profile: any) {
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
    <div className="max-w-5xl w-full mx-auto">
      <div
        className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-24
        items-center justify-center"
      >
        {/* User Info */}
        <div className="max-w-md sm:max-w-xs w-full">
          <ProfileInfo
            profile={profile}
            localizedLevel={localizedLevel}
            localizedNextLevel={localizedNextLevel}
            profileTitle={profileTitle}
          />
        </div>

        {/* types */}
        <div className="max-w-md w-full">
          <CImage
            publicId="rank-img_cn1mof"
            alt="rank-img"
            width={450}
            height={402}
            className="w-full h-full object-cover"
            priority
            fetchPriority="high"
          />
        </div>
      </div>
    </div>
  );
}
