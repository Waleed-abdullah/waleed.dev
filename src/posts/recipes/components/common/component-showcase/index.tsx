import { type PropsWithChildren } from '@/core/types/common';

export const ComponentShowcase = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-background border-border mx-auto my-4 flex size-full h-full max-h-[300px] max-w-[400px] items-center justify-center rounded-lg border p-6 shadow-lg dark:shadow-white/5">
      {children}
    </div>
  );
};
