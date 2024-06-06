import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
  });

export const withAuthRedirect = (Component) => {
  let RedirectComponent = (props) => {
    if (!props.isAuth) return <Navigate to={"/login"} />;
    return <Component {...props} />;
  };

  
  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
};

