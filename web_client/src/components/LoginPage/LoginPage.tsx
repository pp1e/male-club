import { ReactElement, useState, useRef } from "react";
import { useNavigate } from "react-router";
import NavBar from "../Navigation/NavBar";
import { loginUser } from "../../services/api.auth";
import authStore from "../../store";

import "./styles/loginPage.css";

interface IProps {}

const LoginPage = (props: IProps): ReactElement => {
    const navigate = useNavigate();
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const saveLoginRef = useRef<HTMLInputElement>(null);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [errorPhoneMessage, setErrorPhoneMessage] = useState('');
    const [errorPasswordMessage, setErrorPasswordMessage] = useState('');

    const setValidityStates = (): void => {
        // TODO: Сделать валидацию на ввод(через регулярки)
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
        const resultStatus = await authStore.login(phoneRef.current.value, passwordRef.current.value);
        if (resultStatus === 409) {
            setIsPasswordValid(false);
            setErrorPasswordMessage('Пароль введен неверно!');
        } else if (resultStatus === 406) {
            setIsPhoneValid(false);
            setErrorPhoneMessage('Номера телефона не существует!');
        } else {
            navigate("/")
        }
    }

    return (
        <>
            <NavBar />
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
                                        Пароль введен неверно!
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
        </>   
    )
};

export default LoginPage;