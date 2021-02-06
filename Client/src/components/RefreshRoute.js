import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserAuthContext from "../context/UserAuthContext";
const RefreshRoute = ({ component: Component, ...rest }) => {

    const { state } = useContext(UserAuthContext);
    return (
        <Route
            {...rest}
            render={props =>
                state ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/"
                            }}
                        />
                    )
            }
        />
    )
};



export default (RefreshRoute);  