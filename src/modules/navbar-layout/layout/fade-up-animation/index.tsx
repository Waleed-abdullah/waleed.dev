"use client";

import { motion } from "motion/react";

import { type PropsWithChildren } from "@/core/types/common";

export const FadeUpAnimation = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="size-full flex flex-1"
    >
      {children}
    </motion.div>
  );
};
