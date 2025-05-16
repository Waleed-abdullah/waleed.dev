import { MapPin } from "lucide-react";

import { AnimatedLinkUnderline } from "@/core/components/animated-link-underline";
import { ScrambledText } from "@/core/components/scrambled-text";

const DATA_INTENSIVE_BOOK_URL =
  "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/";

export const Homepage = () => {
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto  py-10 px-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl sm:text-4xl font-bold flex gap-1">
          <span className="text-muted-foreground">*</span>{" "}
          <ScrambledText speed={1} text="Muhammad Waleed Abdullah" />
        </h1>
        <p className="text-muted-foreground flex items-center gap-1">
          <MapPin className="size-4" /> Islamabad, Pakistan
        </p>
        <p className="text-secondary-foreground text-sm sm:text-base">
          Hi there, I am a 22 year old Software Engineer, who loves Computer
          Science, Currently I would say I am pretty good at Frontend
          Development, however I really love Backend and ML as well. Currently,
          Learning about System design and handling Data-intensive applications
          (Yes, I am reading
          <AnimatedLinkUnderline href={DATA_INTENSIVE_BOOK_URL}>
            Designing Data-Intensive Applications
          </AnimatedLinkUnderline>
          ). Other than that, I love going to the gym.
        </p>
        <p className="text-secondary-foreground">
          I know there is a lot of empty space here for now, but will add stuff
          here later.
        </p>
      </div>
    </div>
  );
};
