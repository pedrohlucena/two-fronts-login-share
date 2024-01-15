import {
  createContext,
  useCallback,
  useContext,
  useMemo
} from 'react';

import { api } from '../../services';

import {
  AuthContextData,
  AuthProviderProps,
  SignIn,
  SignInAPI
} from './types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const handleSignIn = useCallback(
    async ({ user, password, callback }: SignIn) => {
      try {
        const data: SignInAPI = (await api.post('/login', {
          user,
          password
        })).data;

        callback?.(data);
      } catch (err) {
        callback?.({} as SignInAPI, true);
      }
    },
    [],
  );

  const AuthContextValues = useMemo(
    () => ({
      handleSignIn,
    }),
    [handleSignIn],
  );

  return (
    <AuthContext.Provider value={AuthContextValues}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };

