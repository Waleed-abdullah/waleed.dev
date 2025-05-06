import { ScrambledText } from "@/core/components/scrambled-text";
import { WaleedIcon } from "@/core/icons/waleed-icon";

export const Homepage = () => {
  return (
    <div className="flex size-full items-center justify-center gap-2">
      <WaleedIcon className="text-white size-12" />
      <ScrambledText
        text="Coming Soon"
        className="text-white w-[200px] text-2xl font-bold"
      />
    </div>
  );
};
