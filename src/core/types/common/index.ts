export type PropsWithChildren<T = unknown> = T & {
  children: React.ReactNode;
};


export type PropsWithClassName<T = unknown> = T & {
  className?: string;
};
