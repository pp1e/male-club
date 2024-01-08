import { Navigate, Outlet } from "react-router-dom";
import AuthStore from "./store";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";

interface IProps {
  isAdminPanel?: boolean;
  isAuthorisationPage?: boolean;
  isAccount?: boolean;
}

const PrivateRoute = (props: IProps) => {
    const renderTemplate = useMemo(() => {
        if (AuthStore.isAuthInProgress) {
            return <div>Checking auth...</div>;
        }
        if (!AuthStore.isAuth && localStorage.getItem('token')) {
            localStorage.clear();
            return <></>;
        }
        if (AuthStore.isAuth) {
            if (props.isAuthorisationPage) {
                return <Navigate to="/alreadyAuth" />;
            }
            if (props.isAdminPanel && !AuthStore.getIsAdmin) {
                return <Navigate to="/notEnoughtRightsAdmin" />;
            }
            if (props.isAccount && AuthStore.getIsAdmin) {
                return <Navigate to="/" />;
            }
            return <Outlet />
        } else {
            if (props.isAuthorisationPage) {
                return <Outlet />
            }
            return <Navigate to="/notEnoughtRights" />;
        }
    }, [AuthStore.getIsAuth, AuthStore.getIsAuthInProgress, AuthStore.getIsAdmin]);
    return renderTemplate;
};
  
export default observer(PrivateRoute);