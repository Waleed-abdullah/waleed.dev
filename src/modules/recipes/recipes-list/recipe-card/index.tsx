import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

interface RecipeCardProps {
  title: string;
  href: string;
  imageUrl?: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
}

export const RecipeCard: FC<RecipeCardProps> = ({
  title,
  href,
  imageUrl,
  description,
  date,
  category,
  tags = [],
}) => {
  return (
    <Link
      href={href}
      className="bg-background border-border group w-[300px] cursor-pointer overflow-hidden rounded-xl border shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:shadow-white/5 dark:hover:shadow-white/10"
    >
      {imageUrl && (
        <div className="relative h-[200px] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {category && (
            <div className="bg-background/50 text-foreground absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-medium">
              {category}
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <h3 className="link-underline mb-2 line-clamp-2 w-fit text-xl font-semibold group-hover:after:w-full">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col gap-2">
          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">{date}</span>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground rounded-full px-2 py-1 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
