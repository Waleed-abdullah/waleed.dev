import type { PropsWithClassName } from "@/core/types/common";

export const WaleedIcon = ({ className }: PropsWithClassName) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <circle cx="5.5" cy="8.5" r="1.5" fill="currentColor" />
      <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor" />
      <circle cx="7.5" cy="14.5" r="1.5" fill="currentColor" />
      <circle cx="8.5" cy="17.5" r="1.5" fill="currentColor" />
      <circle cx="11.5" cy="15.5" r="1.5" fill="currentColor" />
      <circle cx="13.5" cy="12.5" r="1.5" fill="currentColor" />
      <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" />
      <path
        d="M20 12.5C20 13.3284 19.3284 14 18.5 14C17.6716 14 17 13.3284 17 12.5C17 11 17 11 18.5 11C19.3284 11 20 11.6716 20 12.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
