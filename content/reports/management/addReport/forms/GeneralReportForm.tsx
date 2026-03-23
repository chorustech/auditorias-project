"use client";

import { UserPrimitive } from "@/src/users";
import { DinamicInput } from "@/components/shared/form/dinamicInput/DinamicInput";
import { FormProvider, useForm } from "react-hook-form";

export function GeneralReportForm({ user }: { user: UserPrimitive }) {
  const methods = useForm();

  // This is a placeholder for the actual form content
  return (
    <FormProvider {...methods}>
      <DinamicInput
        name="auditor"
        label="Auditor"
        placeholder="Auditor"
        value={user.nombre}
        disabled={true}
      />
      {/* Other form fields would go here */}
    </FormProvider>
  );
}
