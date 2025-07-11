import Link from 'next/link';

import { Button } from '@/core/components/ui/button';
import { ABSOLUTE_ROUTES } from '@/core/constants/routes';

export default function NotFound() {
  return (
    <main className="bg-background grid size-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-foreground text-base font-semibold">404</p>
        <h1 className="text-foreground mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          Page not found
        </h1>
        <p className="text-secondary-foreground mt-6 text-lg font-medium text-pretty sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild variant="outline">
            <Link href={ABSOLUTE_ROUTES.ROOT}>Go back home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
