export type Callback<T = unknown, Code = unknown> = (
  params?: T,
  error?: Code,
) => void;