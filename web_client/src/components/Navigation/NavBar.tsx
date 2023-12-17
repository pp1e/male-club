import { ReactElement}  from 'react';
import authStore from "../../store";

import "./styles/navBar.css";


interface IProps {
}

const UnauthorizedNavBar = (): ReactElement => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand text-warning" href="/"><h2>Ma Le Club</h2></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Главная</a>
                    </li>
                </ul>
                <div className="d-flex gap-3">
                    <a type="submit" 
                        href="/login"
                        className="btn btn-warning border-0 nav-bar_link-button"
                    >
                        Войти
                    </a>
                    <a type="submit" 
                        href="/registration"
                        className="btn btn-warning border-0 nav-bar_link-button"
                    >
                        Регистрация
                    </a>
                </div>
                </div>
            </div>
        </nav>
    )
};

const AuthorizedNavBar = (): ReactElement => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand text-warning" href="/"><h2>Ma Le Club</h2></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Главная</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/upcoming-events">Записаться</a>
                        </li>
                    </ul>
                    <div className="d-flex gap-3">
                        <a className="nav-link dropdown-toggle dropstart" data-toggle="dropdown" href="#" />
                        <ul className="dropdown-menu dropdown-menu-right">
                            <li><a className="dropdown-item" href="/account">Личный кабинет</a></li>
                            <li><a className="dropdown-item" href="/upcoming-events">Предстоящие мероприятия</a></li>
                            <li><a className="dropdown-item" onClick={authStore.logout} href="/login">Выйти</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

const NavBar = (): ReactElement => {
    return authStore.isAuth 
        ? <AuthorizedNavBar />
        : <UnauthorizedNavBar />
}

export default NavBar;