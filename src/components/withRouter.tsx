import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export interface RouteComponentProps<Params = Record<string, string>> {
  navigate: ReturnType<typeof useNavigate>;
  params: Params;
  location: ReturnType<typeof useLocation>;
}

export function withRouter<P extends RouteComponentProps<any>>(
  Component: React.ComponentType<P>
) {
  return function ComponentWithRouterProp(props: Omit<P, keyof RouteComponentProps<any>> & { children?: React.ReactNode }) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...(props as P)}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  };
}
