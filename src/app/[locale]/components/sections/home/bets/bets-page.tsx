"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import type { BetData } from "@/types/bets-table-types";
import { BetsTableTabs } from "./bets-table-tabs";
import dayjs from "dayjs";
import type { ColumnType } from "@/types/global-table-types";
// import TabLoader from "@/app/[locale]/tab-loader";
import PointerSVG from "../../../common/svg_icons/pointer-svg";
// import CryptoIcon from "../../../common/svg_icons/crypto-coins/crypto-icon";
import dynamic from "next/dynamic";
// import { GlobalTable3 } from "../../../global-components/global-table/global-table-3";
const TabLoader = dynamic(() => import("@/app/[locale]/tab-loader"), { ssr: false });
// const BetsTableTabs = dynamic(() => import("./bets-table-tabs"), { ssr: false });
const CryptoIcon = dynamic(() => import("../../../common/svg_icons/crypto-coins/crypto-icon"), { ssr: false });
import { Button } from "@/app/[locale]/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchPaginatedBets } from "@/lib/actions/fetch-bets-action";

export interface BetsTableProps {
  betsData: {
    casino: BetData[];
    sports: BetData[];
    "race-leaderboard": BetData[];
  };
}

const renderPayout = (row: BetData) => {
  const payoutValue = parseFloat(row.payout.replace(/[$,]/g, ""));
  const isPositive = payoutValue >= 0;
  return (
    <span
      className={`inline-flex items-end gap-1 ${isPositive ? "text-success" : "text-destructive"
        } font-semibold`}
    >
      {row.payout}
      <CryptoIcon type={(row.type as any) || "default"} />
    </span>
  );
};

const renderBetAmount = (row: BetData) => {
  const betValue = parseFloat(row.betAmount.replace(/[$,]/g, ""));
  const isPositive = betValue >= 0;
  return (
    <span
      className={`inline-flex items-end md:items-center gap-1 ${isPositive ? "text-success" : "text-destructive"
        } font-semibold"`}
    >
      {row.betAmount}
      <CryptoIcon type={(row.type as any) || "default"} />
    </span>
  );
};

const renderMultiplier = (row: BetData) => (
  <span className="text-foreground font-medium">{row.multiplier}</span>
);

export default function BetsTable() {
  const t = useTranslations("betsTableColumns");
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") as "casino" | "sports" | "race-leaderboard") || "casino";
  // const [data, setData] = useState<BetData[]>(betsData[tab] || []);

  // --- 5. SET UP CLIENT-SIDE STATE ---
  const [isPending, startTransition] = useTransition();
  const [paginatedData, setPaginatedData] = useState<BetData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 20;

  // --- 6. FETCH DATA ON THE CLIENT ---
  useEffect(() => {
    startTransition(async () => {
      const { data, totalPages: fetchedTotalPages } = await fetchPaginatedBets(tab, currentPage, rowsPerPage);
      setPaginatedData(data);
      setTotalPages(fetchedTotalPages);
    });
  }, [tab, currentPage]);

  // --- 7. HANDLE PAGE CHANGES ---
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const desktopColumns: ColumnType<BetData>[] = [
    {
      key: "game",
      label: t("game"),
      render: (row: any) => (
        <span className="font-medium inline-flex items-center gap-1">
          <PointerSVG />
          {row.game}
        </span>
      ),
    },
    {
      key: "user",
      label: t("user"),
      render: (row: any) => (
        <span className="font-medium inline-flex items-center gap-1">
          <PointerSVG />
          {row.user}
        </span>
      ),
    },
    {
      key: "time",
      label: t("time"),
      render: (row: any) => (
        <span className="font-medium">{dayjs(row.time).format("hh:mm A")}</span>
      ),
    },
    {
      key: "betAmount",
      label: t("betAmount"),
      render: renderBetAmount,
    },
    {
      key: "multiplier",
      label: t("multiplier"),
      render: renderMultiplier,
    },
    {
      key: "payout",
      label: t("payout"),
      align: "right",
      render: renderPayout,
    },
  ];
  const mobileColumns: ColumnType<BetData>[] = [
    {
      key: "game",
      label: t("game"),
      render: (row: any) => (
        <span className="font-medium inline-flex items-center gap-1">
          <PointerSVG />
          {row.game}
        </span>
      ),
    },

    {
      key: "payout",
      label: t("payout"),
      align: "right",
      render: renderPayout,
    },
  ];


  return (
    <div className="w-full">
      <BetsTableTabs />
      <div className="w-full overflow-hidden rounded-lg relative">
        <TabLoader />
        <div className="hidden md:block">
          <GlobalTable<BetData>
            columns={desktopColumns}
            data={paginatedData}
            loading={isPending}
            emptyMessage={`No ${tab.replace("-", " ")} bets found.`}
            maxHeight={440}
          />
        </div>
        <div className="block md:hidden">
          <GlobalTable<BetData>
            columns={mobileColumns}
            data={paginatedData}
            loading={isPending}
            emptyMessage={`No ${tab.replace("-", " ")} bets found.`}
            maxHeight={440}
          />
        </div>
      </div>
      {/* --- 6. ADD PAGINATION CONTROLS HERE --- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1 || isPending}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-foreground-muted">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || isPending}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
