import { Navigate, Outlet } from "react-router-dom";
import AuthStore from "./store";
import { observer } from "mobx-react-lite";

interface IProps {
  isAdminPanel?: boolean;
}

const PrivateRoute = (props: IProps) => {
    if (AuthStore.isAuthInProgress) {
        return <div>Checking auth...</div>;
    }
    if (AuthStore.getIsAuth) {
        if (props.isAdminPanel && !AuthStore.getIsAdmin) {
          return <Navigate to="/notEnoughtRightsAdmin" />;
        }
        return <Outlet />
    } else {
        return <Navigate to="/notEnoughtRights" />;
    }
};
  
export default observer(PrivateRoute);