import { ReactElement, useState, useRef } from "react";
import { useNavigate } from "react-router";
import authStore from "../../store";

import "./styles/loginPage.css";

/**
 * Авторизация пользователя.
 * @author Корюшкин Н.Е.
 */
const LoginPage = (): ReactElement => {
    const navigate = useNavigate();
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const saveLoginRef = useRef<HTMLInputElement>(null);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [errorPhoneMessage, setErrorPhoneMessage] = useState('');
    const [errorPasswordMessage, setErrorPasswordMessage] = useState('');

    const setValidityStates = (): void => {
        if (!phoneRef.current?.value) {
            setIsPhoneValid(false);
            setErrorPhoneMessage('Введите номер телефона!');
        } else {
            setIsPhoneValid(true);
        }
        if (!passwordRef.current?.value) {
            setIsPasswordValid(false);
            setErrorPasswordMessage('Введите пароль!');
        } else {
            setIsPasswordValid(true);
        }
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        setValidityStates();
        if (!phoneRef.current?.value || !passwordRef.current?.value) {
            return;
        }
        const resultStatus = 
            await authStore.login(phoneRef.current.value, passwordRef.current.value);
        if (resultStatus === 409) {
            setIsPasswordValid(false);
            setErrorPasswordMessage('Пароль введен неверно!');
        } else if (resultStatus === 406) {
            setIsPhoneValid(false);
            setErrorPhoneMessage('Номера телефона не существует!');
        } else if ((resultStatus || 400) >= 400) {
            setIsPhoneValid(false);
            setIsPasswordValid(false);
            setErrorPasswordMessage('Ошибка, повторите еще раз.');
        } else {
            navigate('/');
        }
    }

    return (
        <div className="container mt-5 py-5 d-flex flex-row justify-content-center">
            <div className="text-center login-page_container">
                <h1 className="px-5 mb-4">Добро пожаловать!</h1>
                <form method="GET" onSubmit={onSubmit}>
                    <div className="mb-4">
                        <input 
                            ref={phoneRef}
                            type="phone"
                            className={`
                                form-control py-3
                                text-start
                                ${isPhoneValid ? 'border-warning' : ''} 
                                ${!isPhoneValid ? 'is-invalid' : ''}
                            `}
                            placeholder="Телефон"
                        />
                        {
                            !isPhoneValid ?
                                <div className="invalid-feedback text-start">
                                    {errorPhoneMessage}
                                </div> 
                            : ""
                        }
                    </div>
                    <div className="mb-3">
                        <input
                            ref={passwordRef}
                            type="password" 
                            className={`
                                form-control py-3 
                                ${isPasswordValid ? 'border-warning' : ''} 
                                ${!isPasswordValid ? 'is-invalid' : ''}
                            `}
                            placeholder="Пароль"
                        />
                        {
                            !isPasswordValid ?
                                <div className="invalid-feedback text-start">
                                    { errorPasswordMessage }
                                </div> 
                            : ""
                        }
                    </div>
                    <div className="mb-3 d-flex flex-row justify-content-between">
                        <div className="d-flex flex-row login-page_save-login">
                            <input
                                ref={saveLoginRef}
                                type="checkbox" 
                                className="form-check-input form-check-input-warning"
                            />
                            <div className="form-check-label ml-2">Запомнить меня</div>
                        </div>
                        <a className="link-warning login-page_password-reminder">Не помню пароль</a>
                    </div>
                    <button type="submit" className="btn btn-warning px-5 py-3 border-0">Войти</button>
                </form>
            </div>
        </div> 
    )
};

export default LoginPage;