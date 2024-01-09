import { observer } from 'mobx-react-lite';
import { ReactElement}  from 'react';
import AuthStore from "../../store";
import UnauthorizedNavBar from "./_navBar/UnauthorizedNavBar";
import AuthorizedNavBar from "./_navBar/AuthorizedNavBar";

import "./styles/navBar.css";

/**
 * Панель навигации.
 * @author Корюшкин Н.Е.
 */
const NavBar = observer((): ReactElement => {
    return AuthStore.isAuth
        ? <AuthorizedNavBar />
        : <UnauthorizedNavBar />
});

export default NavBar;