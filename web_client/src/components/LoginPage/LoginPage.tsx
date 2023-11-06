import { ReactElement, useState, useMemo, useRef } from "react";
import NavBar from "../Navigation/NavBar";

import "./styles/loginPage.css";

interface IProps {}

const LoginPage = (props: IProps): ReactElement => {
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const saveLoginRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <NavBar />
            <div className="container mt-5 py-5 d-flex flex-row justify-content-center">
                <div className="text-center login-page_container">
                    <h1 className="px-5 mb-4">Добро пожаловать!</h1>
                    <form>
                        <div className="mb-4">
                            <input 
                                ref={phoneRef}
                                type="phone"
                                className="form-control py-3 border-warning"    
                                placeholder="Телефон"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                ref={passwordRef}
                                type="password" 
                                className="form-control py-3 border-warning" 
                                placeholder="Пароль"
                            />
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