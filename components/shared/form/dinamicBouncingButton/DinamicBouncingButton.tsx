"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

/* ICONS */
import { Loader, LucideIcon } from "lucide-react";

export function DinamicBouncingButton({
  action,
  disabled,
  spin,
  text,
  Icon,
}: {
  action: () => void;
  disabled: boolean;
  spin: boolean;
  text: string;
  Icon: LucideIcon;
}) {
  return (
    <BouncingButton
      action={spin ? () => {} : action}
      backgroundColorHover="#ffffff"
      backgroundColor="#00A0D0"
      textColor="#ffffff"
      textColorHover="#00A0D0"
      border="2px solid #ffffff"
      borderHover="2px solid #00A0D0"
      twClassName="w-full h-fit px-4 py-2 rounded-2xl"
      disabled={disabled}
    >
      {spin ? (
        <>
          <span className="text-transparent">E</span>
          <Loader className="size-4 animate-spin" />
          <span className="text-transparent">E</span>
        </>
      ) : (
        <>
          <Icon className="size-4" />
          <span>{text}</span>
        </>
      )}
    </BouncingButton>
  );
}
