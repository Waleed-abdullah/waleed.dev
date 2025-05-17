import Link from "next/link";

import { BlogsList } from "./blogs-list";

const FEYNMAN_INFO_LINK =
  "https://www.todoist.com/inspiration/feynman-technique";

export const Blogs = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl sm:text-2xl  font-bold flex gap-1">
          <span className="text-muted-foreground">*</span> <p>Blogs</p>
        </h1>
        <p className="text-muted-foreground">
          I write about what i learn and do, (trynna embody the{" "}
          <Link className="underline" href={FEYNMAN_INFO_LINK} target="_blank">
            Feynman technique
          </Link>
          ) maybe sometime I will write blogs on random stuff
        </p>
      </div>
      <BlogsList />
    </div>
  );
};
