"use client";

import Link from "next/link";
import { SectionContainer } from "../sectionContainer/SectionContainer";
import { AssaAbloyTitle } from "@/components/svg/AssaAbloyTitle";

export function LoginUI({ body }: { body: React.ReactNode }) {
  return (
    <SectionContainer>
      <div className="flex-1 h-dvh flex">
        <div className="h-full w-2/3 flex justify-center items-center">
          <div className="w-1/2">
            <AssaAbloyTitle fill="#00A0D0" />
            <h2 className="mt-2 text-neutral-600 text-2xl font-light">
              Módulos de Auditoría
            </h2>
          </div>
        </div>
        <div className="h-full w-1/3 flex items-center px-6 border-l border-neutral-200">
          <div className="w-full">
            <h1 className="font-semibold text-2xl mb-2">Bienvenido</h1>

            {body}

            <div className="w-40 m-auto mt-6 block lg:hidden">
              <AssaAbloyTitle />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
