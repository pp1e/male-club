import { Navigate, Outlet } from "react-router-dom";
import authStore from "./store";
import { observer } from "mobx-react-lite";

interface IProps {}

const PrivateRoute = (props: IProps) => {
    if (authStore.isAuthInProgress) {
      return <div>Checking auth...</div>;
    }
    if (authStore.isAuth) {
      return <Outlet />
    } else {
      return <Navigate to="/notEnoughtRights" />;
    }
};
  
export default observer(PrivateRoute);