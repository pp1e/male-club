import { AxiosResponse } from "axios";
import { ReactElement, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { registryUser } from "../../services/Services";
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
    const submitButtonRef = useRef<HTMLDivElement>(null);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isSurnameValid, setIsSurenameValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [arePasswordsValid, setArePasswordsValid] = useState(true);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const getNameValue = () => nameRef.current?.value;
    const getSurnameValue = () => surnameRef.current?.value;
    const getPhoneValue = () => phoneRef.current?.value;
    const checkPasswordsValidity = () => passwordRef.current?.value 
                && submitPasswordRef.current?.value 
                && passwordRef.current?.value === submitPasswordRef.current?.value;

    const setValidationStatuses = () => {
        setIsNameValid(!!getNameValue());
        setIsSurenameValid(!!getSurnameValue());
        setIsPhoneValid(!!getPhoneValue());
        setArePasswordsValid(!!checkPasswordsValidity());
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        setValidationStatuses();
        if (!getNameValue() || !getSurnameValue() || !getPhoneValue() || !arePasswordsValid ) {
            return;
        } else {
            await registryUser({
                firstName: getNameValue() || '',
                lastName: getSurnameValue() || '',
                patronymic: patronymicRef.current?.value,
                phone: getPhoneValue() || '',
                password: passwordRef.current?.value || ''
            })
                .then((result: AxiosResponse<any, any>) => {
                    if (result.status === 200) {
                        submitButtonRef.current && 
                        (submitButtonRef.current.innerHTML = 
                            `
                                <button class="btn btn-success px-5 py-4 border-0" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Регистрация прошла успешно!
                                </button>
                            `
                        )
                        setErrorMessage("");
                        setTimeout(() => navigate('/login'), 2000);
                    }
                })
                .catch(errorData => {
                    if (errorData.message === "Request failed with status code 409") {
                        setIsPhoneValid(false);
                        setErrorMessage("Пользователь уже зарегистрирован!");
                    }
                });
        } 
    }

    return (
        <>
            <NavBar />
            <div className="container mt-5 py-5 d-flex flex-row justify-content-center">
                <div className="text-center login-page_container">
                    <h1 className="px-5 mb-4">Добро пожаловать!</h1>
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <input 
                                ref={nameRef}
                                type="text"
                                className={`
                                    form-control py-3 
                                    ${isNameValid ? 'border-warning' : ''} 
                                    ${!isNameValid ? 'is-invalid' : ''}
                                `} 
                                placeholder="Имя"
                            />
                            {
                                !isNameValid ?
                                    <div className="invalid-feedback text-start">
                                        Введите имя!
                                    </div> 
                                : ""
                            }
                        </div>
                        <div className="mb-4">
                            <input 
                                ref={surnameRef}
                                type="text"
                                className={`
                                    form-control py-3 
                                    ${isSurnameValid ? 'border-warning' : ''} 
                                    ${!isSurnameValid ? 'is-invalid' : ''}
                                `} 
                                placeholder="Фамилия"
                            />
                            {
                                !isSurnameValid ?
                                    <div className="invalid-feedback text-start">
                                        Введите фамилию!
                                    </div> 
                                : ""
                            }
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
                                className={`
                                    form-control py-3 
                                    ${isPhoneValid ? 'border-warning' : ''} 
                                    ${!isPhoneValid ? 'is-invalid' : ''}
                                `}
                                placeholder="Телефон"
                            />
                            {
                                !isPhoneValid ?
                                    <div className="invalid-feedback text-start">
                                        Введите телефон!
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
                                    ${arePasswordsValid ? 'border-warning' : ''} 
                                    ${!arePasswordsValid ? 'is-invalid' : ''}
                                `}
                                placeholder="Пароль"
                            />
                        </div>
                        <div className="mb-2">
                            <input 
                                ref={submitPasswordRef}
                                type="password"
                                className={`
                                    form-control py-3 
                                    ${arePasswordsValid ? 'border-warning' : ''} 
                                    ${!arePasswordsValid ? 'is-invalid' : ''}
                                `}    
                                placeholder="Подтвердите пароль"
                            />
                            {
                                !arePasswordsValid ?
                                    <div className="invalid-feedback text-start">
                                        Пароли введены неправильно!
                                    </div> 
                                : ""
                            }
                        </div>
                        <div className="text-danger mb-1">{errorMessage}</div>
                        <div className="mb-3 d-flex flex-row registration-page_text-field">
                            <input
                                ref={saveLoginRef}
                                type="checkbox" 
                                className="form-check-input form-check-input-warning"
                                required
                            />
                            <div className="form-check-label ml-2">Я принимаю условия&nbsp; 
                                <a href="#" className="text-warning">пользовательского соглашения</a>&nbsp; 
                                и даю<br/>
                                <a href="#" className="text-warning">согласие</a>&nbsp; 
                                на обработку персональных данных
                            </div>
                        </div>
                        <div ref={submitButtonRef}>
                            <button 
                                type="submit" 
                                className="btn btn-warning px-5 py-4 border-0"
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>   
    )
};

export default RegistrationPage;