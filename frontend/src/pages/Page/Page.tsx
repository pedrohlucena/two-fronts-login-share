import { NavLink } from 'react-router-dom';
import * as S from './styles';

type PageProps = {
  isLogged: boolean;
}

export function Page({ isLogged }: PageProps) {
  return <S.PageContainer>
    {isLogged && <h1>You are successful login in the first front-end</h1>}
    {!isLogged && <h1>Please, <NavLink to='/login'>login</NavLink> to see this page</h1>}
  </S.PageContainer>
}
