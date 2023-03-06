import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ loggedIn, children }) => {
  return (
    <>
      {/* loggedIn = boolean, children = route */}
      {loggedIn === true ? <>{children}</> : <Navigate to={'/login'} />}
    </>
  );
};
