import { Navigate, Outlet } from "react-router-dom";
import AuthStore from "./store";
import { observer } from "mobx-react-lite";

const PrivateRoute = () => {
    if (AuthStore.isAuthInProgress) {
      return <div>Checking auth...</div>;
    }
    if (AuthStore.getIsAuth) {
      return <Outlet />
    } else {
      return <Navigate to="/notEnoughtRights" />;
    }
};
  
export default observer(PrivateRoute);