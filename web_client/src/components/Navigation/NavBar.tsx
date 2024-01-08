import { observer } from 'mobx-react-lite';
import { ReactElement}  from 'react';
import AuthStore from "../../store";
import UnauthorizedNavBar from "./_navBars/UnauthorizedNavBar";
import AuthorizedNavBar from "./_navBars/AuthorizedNavBar";

import "./styles/navBar.css";

const NavBar = observer((): ReactElement => {
    return AuthStore.isAuth
        ? <AuthorizedNavBar />
        : <UnauthorizedNavBar />
});

export default NavBar;