"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

/* ICONS */
import { ArrowLeft } from "lucide-react";

export function DinamicInsertUpdateUIHeader({
  backAction,
  rightContent,
}: {
  backAction: () => void;
  rightContent: React.ReactNode;
}) {
  return (
    <div className="w-full flex items-center justify-between h-fit">
      {/* BOTÓN IR HACIA ATRÁS */}
      <BouncingButton
        action={backAction}
        backgroundColorHover="#ffffff"
        backgroundColor="#22c55e"
        textColor="#ffffff"
        textColorHover="#22c55e"
        border="2px solid #ffffff"
        borderHover="2px solid #22c55e"
        twClassName="w-fit h-fit p-4 rounded-2xl"
        disabled={false}
      >
        <ArrowLeft className="size-5" />
      </BouncingButton>

      {rightContent}
    </div>
  );
}
