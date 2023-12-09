import { ReactElement}  from 'react';

import "./styles/navBar.css";


interface IProps {
}

// TODO: Реализовать шапку для авторизованного пользователя
const NavBar = (props: IProps): ReactElement => {
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
                <div className="d-flex gap-3 mx-5 px-5">
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

export default NavBar;