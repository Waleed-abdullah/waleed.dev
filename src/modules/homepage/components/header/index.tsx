export const Header = () => {
  return (
    <div className="flex flex-col gap-2.5">
      {/* On phones the size follows the screen width so the name stays on
          one line (down to 320px), capped at the usual 26px */}
      <h1 className="flex gap-2.5 text-[clamp(1.125rem,calc(7.2vw_-_4px),1.625rem)] leading-[1.15] font-bold tracking-tight sm:text-[2.25rem]">
        <span aria-hidden="true" className="text-muted-foreground">
          *
        </span>
        <span>Muhammad Waleed Abdullah</span>
      </h1>
      <p className="text-muted-foreground text-[17px] leading-snug sm:text-xl">
        Software Engineer
      </p>
    </div>
  );
};
