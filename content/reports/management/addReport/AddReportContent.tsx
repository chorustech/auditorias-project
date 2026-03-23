"use client";

import { getSessionUser } from "@/src/shared/infrastructure/utils/get-session-user";
import { useEffect, useState } from "react";
import { UserPrimitive } from "@/src/users";
import { GeneralReportForm } from "./forms/GeneralReportForm";
import { EolaReportForm } from "./forms/EolaReportForm";
import { NcrReportForm } from "./forms/NcrReportForm";
import { RacReportForm } from "./forms/RacReportForm";

export function AddReportContent({ slug }: { slug: string }) {
  const [user, setUser] = useState<UserPrimitive | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const sessionUser = await getSessionUser();
      setUser(sessionUser);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const generalReportPaths = [
    "pizza-tray",
    "baldwin-state",
    "baldwin-reserve-supply",
    "display-area",
    "baldwin-reserve-stacking",
    "baldwin-reserve-packing",
    "baldwin-reserve-general",
  ];

  if (generalReportPaths.includes(slug)) {
    return <GeneralReportForm user={user} />;
  }

  switch (slug) {
    case "eola":
      return <EolaReportForm user={user} />;
    case "ncr":
      return <NcrReportForm user={user} />;
    case "rac":
      return <RacReportForm user={user} />;
    default:
      return <div>Invalid report type</div>;
  }
}
