import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../functions/auth.function";

export const UserRoute = ({children}) => {
  return isAuthenticated() ? <div>{children}</div> : <Navigate to="/signin" />;
}