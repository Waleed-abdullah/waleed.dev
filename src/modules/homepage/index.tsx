import { ScrambledText } from "@/core/components/scrambled-text";
import { WaleedIcon } from "@/core/icons/waleed-icon";

export const Homepage = () => {
  return (
    <div className="flex flex-col size-full items-center justify-center gap-2">
      <WaleedIcon className=" size-12" />
      <ScrambledText
        text="Coming Soon"
        className=" min-h-7 text-2xl font-bold"
      />
    </div>
  );
};
