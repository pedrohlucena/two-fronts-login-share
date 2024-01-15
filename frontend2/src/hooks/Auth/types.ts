import { ReactElement } from 'react';

export type Callback<T = unknown, Code = unknown> = (
  params?: T,
  error?: Code,
) => void;

export type AuthContextData = {
  handleSignIn({ user, password, callback }: SignIn): void;
};

export type SignIn = {
  user: string;
  password: string;
  callback?: Callback<SignInAPI>;
};

export type AuthProviderProps = {
  children: ReactElement;
};

export type SignInAPI = {
  access_token: string;
};