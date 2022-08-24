// This is a HOC withRouter TypeScript version with generic Params
// https://stackoverflow.com/questions/69967745/react-router-v6-access-a-url-parameter
import React, { ComponentType } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { WithRouterProps } from './with-router.model';

export const withRouter = <P extends object>(Component: ComponentType<P>) => {
  return (props: Omit<P, keyof WithRouterProps>) => {
    const location = useLocation();
    const match = { params: useParams() };
    const navigate = useNavigate();

    const history = {
      back: () => navigate(-1),
      goBack: () => navigate(-1),
      location,
      push: (url: string, state?: any) => navigate(url, { state }),
      replace: (url: string, state?: any) =>
        navigate(url, {
          replace: true,
          state,
        }),
    };

    return (
      <Component
        history={history}
        location={location}
        match={match}
        navigate={navigate}
        {...(props as P)}
      />
    );
  };
};
