import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import { ReactElement}  from 'react';
import AuthStore from "../../../store";

/**
 * Панель навигации для авторизованного пользователя.
 * @author Корюшкин Н.Е.
 */
const AuthorizedNavBar = observer((): ReactElement => {
    const navigate = useNavigate();
    const onLogoutClick = () => {
        AuthStore.logout();
        navigate('/');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a 
                    className="navbar-brand text-warning" 
                    onClick={() => navigate('/')}
                >
                    <h2>Ma Le Club</h2>
                </a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a 
                                className="nav-link active" 
                                aria-current="page" 
                                onClick={() => navigate('/')}
                            >
                                Главная
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className="nav-link active" 
                                aria-current="page" 
                                onClick={() => navigate('/prerecording')}
                            >
                                Записаться
                            </a>
                        </li>
                        {
                            AuthStore.isAdmin ?
                                <li className="nav-item">
                                    <a 
                                        className="nav-link active" 
                                        aria-current="page" 
                                        onClick={() => navigate('/admin')}
                                    >
                                        Панель Администратора
                                    </a>
                                </li>
                            : null
                        }
                    </ul>
                    <div className="d-flex gap-3">
                        <a 
                            className="nav-link dropdown-toggle dropstart" 
                            data-toggle="dropdown" 
                            href="#" 
                        />
                        <ul className="dropdown-menu dropdown-menu-right">
                            {
                                AuthStore.isAdmin ? null :
                                    <>
                                        <li>
                                            <a 
                                                className="dropdown-item" 
                                                onClick={() => navigate('/account')}
                                            >
                                                Личный кабинет
                                            </a>
                                        </li>
                                        <li>
                                            <a 
                                                className="dropdown-item"
                                                onClick={() => navigate('/upcoming-events')}
                                            >
                                                Предстоящие записи
                                            </a>
                                        </li>
                                    </>
                            }
                            <li>
                                <a 
                                    className="dropdown-item" 
                                    onClick={onLogoutClick} 
                                >
                                    Выйти
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
});

export default AuthorizedNavBar;