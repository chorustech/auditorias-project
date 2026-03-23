"use client";

/* HOOKS */
import { useEffect } from "react";

/* ICONS */
import { CircleCheckBig, CircleOff } from "lucide-react";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* LIBS */
import { motion } from "framer-motion";

export function Announcement() {
  const { announcement, setAnnouncement } = useAnnouncement();

  useEffect(() => {
    if (announcement.isActivated) {
      const timer = setTimeout(() => {
        setAnnouncement({
          isActivated: false,
          isOk: announcement.isOk,
          message: announcement.message,
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [
    setAnnouncement,
    announcement.isActivated,
    announcement.isOk,
    announcement.message,
  ]);

  return (
    <motion.div
      className={`fixed bottom-0 left-0 z-80 flex items-center justify-center w-full p-4 h-fit rounded-t-2xl ${announcement.isOk ? "bg-green-500" : "bg-red-500"}`}
      initial={{ y: "100%" }} // Empieza oculto
      animate={{
        y: announcement.isActivated ? 0 : "100%", // Se mueve arriba o desaparece
        transition: {
          duration: 0.6,
          type: "spring",
          stiffness: 80, // Reduce la rigidez
          damping: 20,
        },
      }}
      exit={{
        y: "100%", // Se esconde con otro rebote
        transition: {
          duration: 0.6,
          type: "spring",
          stiffness: 80, // Reduce la rigidez
          damping: 20,
        },
      }}
    >
      <div className="flex gap-2 items-center">
        {announcement.isOk ? (
          <CircleCheckBig className="size-4 text-white" />
        ) : (
          <CircleOff className="size-4 text-white" />
        )}
        <p className="text-white">{announcement.message}</p>
      </div>
    </motion.div>
  );
}
