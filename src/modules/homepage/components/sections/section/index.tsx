import Link from "next/link";

import { type HomepageSectionProps } from "./types";

export const HomepageSection = ({ title, items }: HomepageSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg sm:text-xl font-bold">
        <span className="text-muted-foreground">*</span> {title}
      </h2>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Link
                href={item.link}
                target="_blank"
                className="link-underline w-fit"
              >
                <h3 className="text-sm sm:text-lg font-bold">{item.title}</h3>
              </Link>
              {item.subtitle && (
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {item.subtitle}
                </p>
              )}
            </div>
            {item.description && (
              <p className="text-sm sm:text-base text-secondary-foreground">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
