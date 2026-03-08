"use client";

/* COMPONENTS */
import { LoginUI } from "@/components/shared/loginUI/LoginUI";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";
import { DinamicBouncingButton } from "@/components/shared/form/dinamicBouncingButton/DinamicBouncingButton";

/* HOOKS */
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import { Rocket } from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* SERVER ACTIONS */
import { login } from "@/temp/Users/Infrastructure/usersController";

/* TYPES */
import { LoginForm } from "./types/LoginForm";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

export function LoginContent() {
  const router = useRouter();
  const { setAnnouncement } = useAnnouncement();
  const [saving, setSaving] = useState(false);

  const methods = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await login(formData);

      if (response.ok) {
        setAnnouncement({
          isActivated: true,
          isOk: true,
          message: response.message,
        });
        console.log(data);

        /* methods.reset(); */
        router.push("/home");
      } else {
        setAnnouncement({
          isActivated: true,
          isOk: false,
          message: response.message,
        });
      }

      setSaving(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <LoginUI
      body={
        <FormProvider {...methods}>
          {/* CORREO */}
          <DinamicInputText<LoginForm>
            name="email"
            label="Correo"
            placeholder="example@something.com"
            rules={{
              required: "El correo es necesario",
              minLength: {
                value: 2,
                message: "El correo debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El correo no puede tener más de 50 caracteres",
              },
            }}
          />

          {/* PASSWORD */}
          <DinamicInputText<LoginForm>
            name="password"
            label="Contraseña"
            type="password"
            placeholder="********"
            rules={{
              minLength: {
                value: 2,
                message: "La contraseña debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message: "La contraseña no puede tener más de 50 caracteres",
              },
            }}
          />

          {/* BOTÓN INGRESAR */}
          <DinamicBouncingButton
            action={methods.handleSubmit(onSubmit)}
            disabled={saving ? true : false}
            spin={saving ? true : false}
            text="Ingresar"
            Icon={Rocket}
          />
        </FormProvider>
      }
    />
  );
}
