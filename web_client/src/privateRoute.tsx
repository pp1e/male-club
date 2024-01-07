import { Navigate, Outlet } from "react-router-dom";
import AuthStore from "./store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

interface IProps {
  isAdminPanel?: boolean;
  isAuthorisationPage?: boolean;
}

const PrivateRoute = (props: IProps) => {
    if (AuthStore.isAuthInProgress) {
        return <div>Checking auth...</div>;
    }
    if (!AuthStore.isAuth && localStorage.getItem('token')) {
        return <></>;
    }
    if (AuthStore.isAuth) {
        if (props.isAuthorisationPage) {
            return <Navigate to="/alreadyAuth" />;
        }
        if (props.isAdminPanel && !AuthStore.getIsAdmin) {
            return <Navigate to="/notEnoughtRightsAdmin" />;
        }
        return <Outlet />
    } else {
        if (props.isAuthorisationPage) {
            return <Outlet />
        }
        return <Navigate to="/notEnoughtRights" />;
    }
};
  
export default observer(PrivateRoute);