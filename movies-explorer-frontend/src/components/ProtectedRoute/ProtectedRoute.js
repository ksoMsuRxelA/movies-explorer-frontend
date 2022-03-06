import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props}) => {
  return (props.loggedIn &&
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="./" />
      }
    </Route>
  );
};

export default ProtectedRoute;
