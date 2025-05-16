import Link from "next/link";

import { cn } from "@/core/lib/cn";

export const AnimatedLinkUnderline = ({
  className,
  ...props
}: React.ComponentProps<typeof Link>) => {
  return (
    <Link
      target="_blank"
      className={cn(
        "ml-1 text-muted-foreground relative after:absolute after:bg-primary after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:transition-[width] after:duration-200",
        className
      )}
      {...props}
    />
  );
};
