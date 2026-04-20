export type PageSearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

export type PageParams<T> = Promise<T>;
