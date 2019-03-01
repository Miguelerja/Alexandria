import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => {
  // console.log({ component: Component, user, ...rest }) 
  return (
    <Route 
      {...rest}
      render={props => {
        if (isLogged) {
          return <Component {...props} />
        } else {
          return null
        }
      }}
    />
  )
}

export default withAuth(PrivateRoute);
