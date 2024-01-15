import {
  createContext,
  useCallback,
  useContext,
  useMemo
} from 'react';

import { api } from '../../services';

import {
  GetUsers,
  UsersAPI,
  UsersContextData,
  UsersProviderProps
} from './types';

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

function UsersProvider({ children }: UsersProviderProps) {
  const handleGetUsers = useCallback(
    async ({ callback }: GetUsers) => {
      try {
        const data: UsersAPI = (await api.get('/users')).data

        callback?.(data);
      } catch (err) {
        callback?.({} as UsersAPI, true);
      }
    },
    [],
  );

  const UsersContextValues = useMemo(
    () => ({
      handleGetUsers,
    }),
    [handleGetUsers],
  );

  return (
    <UsersContext.Provider value={UsersContextValues}>
      {children}
    </UsersContext.Provider>
  );
}

function useUsers(): UsersContextData {
  return useContext(UsersContext);
}

export { UsersProvider, useUsers };

