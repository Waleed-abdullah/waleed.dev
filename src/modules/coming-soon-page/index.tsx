import { ScrambledText } from '@/core/components/scrambled-text';
import { WaleedIcon } from '@/core/icons/waleed-icon';

export const ComingSoonPage = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2">
      <WaleedIcon className="size-12" />
      <ScrambledText
        text="Coming Soon"
        className="min-h-7 text-2xl font-bold"
      />
    </div>
  );
};
