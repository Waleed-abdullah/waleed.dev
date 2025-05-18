"use client";

import { useEffect } from "react";
import TagManager from "react-gtm-module";

export const GtmScriptInitializer = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: "G-6PXZLVDQCX" });
  }, []);

  return null;
};
