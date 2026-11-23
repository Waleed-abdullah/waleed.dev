export const Header = () => {
  return (
    <div className="flex flex-col gap-2.5">
      <h1 className="flex gap-2.5 text-[1.625rem] leading-[1.15] font-bold tracking-tight sm:text-[2.25rem]">
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
