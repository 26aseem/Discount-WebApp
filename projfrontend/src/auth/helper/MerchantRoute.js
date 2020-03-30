import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./merchantIndex";

const MerchantRoute = ({ component: Component, ...rest }) =>  {
    return (
      <Route
        {...rest}
        render={props =>
         isAuthenticated() ? (
            <Component {...props} />
            ) : (
            <Redirect
              to={{
                pathname: "/merchantsignin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default MerchantRoute;