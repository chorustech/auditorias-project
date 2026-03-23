"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

/* HOOKS */
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import { Loader, Trash2 } from "lucide-react";

/* SERVER ACTIONS */

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { useModal } from "@/stores/modal/modalStore";
import { useReportsFilter } from "@/stores/filter/reports/filterReportsStore";
import { deleteReporteAction } from "@/src/reporte-auditoria/infrastructure/actions/delete";
import { usePathname } from "next/navigation";

export function DeleteReportContent({ report_id }: { report_id: number }) {
  const [deleting, setDeleting] = useState(false);
  const { setAnnouncement } = useAnnouncement();
  const { modal, setModal } = useModal();
  const { filter, setFilter } = useReportsFilter();
  const pathname = usePathname();
  const slug = pathname.split("/").at(-1) ?? "";

  const methods = useForm<{ id: number }>();

  const onSubmit = async () => {
    try {
      setDeleting(true);

      const response = await deleteReporteAction(report_id, slug);

      if (response.ok) {
        if (!filter) return;

        setFilter({
          ...filter,
          page: 0,
        });
        setAnnouncement({
          isActivated: true,
          isOk: true,
          message: response.message,
        });
        setModal({
          isActivated: false,
          title: modal.title ?? "",
          body: modal.body,
        });
      } else {
        setAnnouncement({
          isActivated: true,
          isOk: false,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <p>
          Al dar clic en{" "}
          <span className="text-red-500 font-semibold">Eliminar</span>, el
          reporte con ID <span className="font-semibold">{report_id}</span> será
          eliminado
        </p>
      </div>
      <div className="">
        {/* BOTÓN GUARDAR */}
        <div className="w-full sticky bottom-0 pt-4">
          <FormProvider {...methods}>
            <div className="flex gap-4">
              <BouncingButton
                action={
                  deleting
                    ? () => {}
                    : () => {
                        setModal({
                          isActivated: false,
                          title: modal.title ?? "",
                          body: modal.body,
                        });
                      }
                }
                backgroundColorHover="#00A0D0"
                backgroundColor="#ffffff"
                textColor="#00A0D0"
                textColorHover="#ffffff"
                border="2px solid #00A0D0"
                borderHover="2px solid #00A0D0"
                twClassName="w-full h-fit px-4 py-2 rounded-2xl"
                disabled={deleting ? true : false}
              >
                <span>Cancelar</span>
              </BouncingButton>
              <BouncingButton
                action={deleting ? () => {} : methods.handleSubmit(onSubmit)}
                backgroundColorHover="#ef4444"
                backgroundColor="#ef4444"
                textColor="#ffffff"
                textColorHover="#ffffff"
                border="2px solid #ef4444"
                borderHover="2px solid #ef4444"
                twClassName="w-full h-fit px-4 py-2 rounded-2xl"
                disabled={deleting ? true : false}
              >
                {deleting ? (
                  <>
                    <span className="text-transparent">E</span>
                    <Loader className="size-4 animate-spin" />
                    <span className="text-transparent">E</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    <span>Eliminar</span>
                  </>
                )}
              </BouncingButton>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
