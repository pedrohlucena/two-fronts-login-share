import { ReactElement } from 'react';
import { Callback } from '../../models';

export type UsersContextData = {
  handleGetUsers({ callback }: GetUsers): void;
};

export type GetUsers = {
  callback?: Callback<UsersAPI>;
};

export type UsersProviderProps = {
  children: ReactElement;
};

export type UsersAPI = {
  items: string[];
};