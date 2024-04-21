"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ContactProvider } from "@/contexts/contact";
import { motion, AnimatePresence } from "framer-motion";

const Navigation: React.ComponentType<{
  open: (value: "navigation" | "contact" | undefined) => void;
}> = dynamic(() => import("@/components/nav/navigation"));
const Contact: React.ComponentType<{
  open: (value: "navigation" | "contact" | undefined) => void;
}> = dynamic(() => import("@/components/nav/contact"));

const Burger = () => {
  const [opened, setOpened] = useState<"navigation" | "contact" | undefined>(
    undefined,
  );

  return (
    <>
      <AnimatePresence mode={"popLayout"}>
        {opened && (
          <motion.div
            key={"burger"}
            initial={{
              backgroundColor: "rgba(255, 255, 255, 0)",
              backdropFilter: "blur(0)",
            }}
            animate={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(24px)",
            }}
            exit={{
              backgroundColor: "rgba(255, 255, 255, 0)",
              backdropFilter: "blur(0)",
            }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 w-screen h-screen`}
            onClick={() => setOpened(undefined)}
          >
            {(opened === "navigation" && (
              <Navigation key={"navigation"} open={setOpened} />
            )) ||
              (opened === "contact" && (
                <ContactProvider>
                  <Contact key={"contact"} open={setOpened} />
                </ContactProvider>
              )) ||
              null}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpened("navigation")}
        className={
          "center flex-col w-[2vw] gap-[0.5vh] hover:gap-[1vh] transition-[gap] duration-200 ease-in-out h-[2.75vh]"
        }
      >
        <div className={"burger-bar"} />
        <div className={"burger-bar"} />
        <div className={"burger-bar"} />
      </button>
    </>
  );
};

export default Burger;
