import { Link } from '@tanstack/react-router';

import { RECIPE_PREVIEWS } from '@/posts/recipes/components/previews';

interface RecipeCardProps {
  slug: string;
  title: string;
  description: string;
  /** ISO date from the post metadata */
  date: string;
  formattedDate: string;
  imageUrl?: string;
}

export const RecipeCard = ({
  slug,
  title,
  description,
  date,
  formattedDate,
  imageUrl,
}: RecipeCardProps) => {
  const Preview = RECIPE_PREVIEWS[slug];

  return (
    <Link
      to="/recipes/$slug"
      params={{ slug }}
      className="group border-border bg-background hover:border-muted-foreground/50 focus-visible:ring-ring flex h-full flex-col overflow-hidden rounded-xl border transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <span
        aria-hidden="true"
        className="bg-muted/50 border-border relative flex h-40 items-center justify-center overflow-hidden border-b sm:h-44"
      >
        {Preview ? (
          <Preview />
        ) : (
          imageUrl && (
            <img
              src={imageUrl}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          )
        )}
      </span>
      <span className="flex flex-1 flex-col gap-1.5 p-5">
        <span className="text-lg font-semibold">
          <span className="link-underline link-underline-group">{title}</span>
        </span>
        <span className="text-muted-foreground text-[15px] leading-relaxed">
          {description}
        </span>
        <time
          dateTime={date}
          className="text-muted-foreground mt-auto pt-2 font-mono text-[13px]"
        >
          {formattedDate}
        </time>
      </span>
    </Link>
  );
};
