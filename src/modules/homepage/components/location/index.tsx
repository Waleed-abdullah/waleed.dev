import { MapPin } from 'lucide-react';

export const Location = () => {
  return (
    <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
      <MapPin aria-hidden="true" className="size-4" /> Islamabad, Pakistan
    </p>
  );
};
