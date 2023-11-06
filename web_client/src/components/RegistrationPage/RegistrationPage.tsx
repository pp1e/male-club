import { ReactElement, useState, useMemo, useRef } from "react";
import NavBar from "../Navigation/NavBar";

import "./styles/registrationPage.css";

interface IProps {}

const RegistrationPage = (props: IProps): ReactElement => {
    const nameRef = useRef<HTMLInputElement>(null);
    const surnameRef = useRef<HTMLInputElement>(null);
    const patronymicRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const saveLoginRef = useRef<HTMLInputElement>(null);
    const submitPasswordRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <NavBar />
            <div className="container mt-5 py-5 d-flex flex-row justify-content-center">
                <div className="text-center login-page_container">
                    <h1 className="px-5 mb-4">Добро пожаловать!</h1>
                    <form>
                        <div className="mb-4">
                            <input 
                                ref={nameRef}
                                type="text"
                                className="form-control py-3 border-warning"    
                                placeholder="Имя"
                            />
                        </div>
                        <div className="mb-4">
                            <input 
                                ref={surnameRef}
                                type="text"
                                className="form-control py-3 border-warning"    
                                placeholder="Фамилия"
                            />
                        </div>
                        <div className="mb-4">
                            <input 
                                ref={patronymicRef}
                                type="text"
                                className="form-control py-3 border-warning"    
                                placeholder="Отчество"
                            />
                        </div>
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
                        <div className="mb-4">
                            <input 
                                ref={submitPasswordRef}
                                type="password"
                                className="form-control py-3 border-warning"    
                                placeholder="Подтвердите пароль"
                            />
                        </div>
                        <div className="mb-3 d-flex flex-row registration-page_text-field">
                            <input
                                ref={saveLoginRef}
                                type="checkbox" 
                                className="form-check-input form-check-input-warning"
                            />
                            <div className="form-check-label ml-2">Я принимаю условия&nbsp; 
                                <a href="#" className="text-warning">пользовательского соглашения</a>&nbsp; 
                                и даю<br/>
                                <a href="#" className="text-warning">согласие</a>&nbsp; 
                                на обработку персональных данных</div>
                        </div>
                        <button type="submit" className="btn btn-warning px-5 py-4 border-0">Зарегистрироваться</button>
                    </form>
                </div>
            </div>
        </>   
    )
};

export default RegistrationPage;