import { ReactElement, useState, useRef, useEffect, useCallback } from "react";
import Image from 'react-bootstrap/Image';
import { AUTHOR_IMAGE } from '../../resources/Images';
import { IChild } from './PersonalAccount';
import { getAge } from './Handlers';

const AddChildCard = ({userList, setUserList, userIndex, isEdit, setEditIndex}: {userList: IChild[], setUserList: React.Dispatch<React.SetStateAction<IChild[]>>, userIndex?: number, isEdit?: boolean, setEditIndex?: React.Dispatch<React.SetStateAction<number>>}): ReactElement => {
    const nameRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const featuresRef = useRef<HTMLTextAreaElement>(null);
    const phoneRef= useRef<HTMLInputElement>(null);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isDateValid, setIsDateValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);

    const onSubmit = (event:any) => {
        event.preventDefault();
        setIsNameValid(!!nameRef.current?.value);
        setIsDateValid(!!dateRef.current?.value); //проверка возраста
        setIsPhoneValid(!!phoneRef.current?.value && new RegExp(/^(\8\d{10})$/).test(phoneRef.current!!.value));
        const validationPassed = isEdit ? !!nameRef.current?.value && new RegExp(/^(\8\d{10})$/).test(phoneRef.current!!.value) : !!nameRef.current?.value && !!dateRef.current?.value && !!phoneRef.current?.value && new RegExp(/^(\8\d{10})$/).test(phoneRef.current!!.value)
        if (validationPassed) {
            if (isEdit) {
                userList.at(userIndex!!)!!.name = String(nameRef.current?.value);
                userList.at(userIndex!!)!!.features = String(featuresRef.current?.value);
                userList.at(userIndex!!)!!.phone = String(phoneRef.current?.value);
                setUserList([...userList]);
                setEditIndex!!(-1);
            }
            else {
            //FIXME сохранить ребенка в базу
            setUserList([
                ...userList,
                {
                    id: userList.length,
                    name: String(nameRef.current?.value),
                    date: new Date(String(dateRef.current?.value)),
                    features: String(featuresRef.current?.value),
                    countVisites: 0,
                    phone: String(phoneRef.current?.value)
                }
            ])}
        };
    };

    // useEffect(() => {
    //     setIsNameValid(!!nameRef.current?.value);
    //     setIsDateValid(!!dateRef.current?.value); //проверка возраста
    //     setIsPhoneValid(!!phoneRef.current?.value && new RegExp(/^(\8\d{10})$/).test(phoneRef.current!!.value));
    // }, [onsubmit]);

    return  <>
                <form method="POST" onSubmit={onSubmit} className=" account-page__card__container d-flex flex-column justify-content-center align-items-center">
                        <div className="account-page__card__image d-flex flex-column justify-content-center align-items-center">
                            <Image
                                src={AUTHOR_IMAGE}
                                className="account__no-photo"
                            />
                        </div>                    
                        <div className="d-flex flex-column justify-content-center align-items-center pt-3 account-page__container">
                            <div className="card__input__width mb-2">
                                <input
                                    ref={nameRef}
                                    name="name"
                                    defaultValue={isEdit ? userList[userIndex!!].name : undefined}
                                    className={`form-control border ${isNameValid ? 'border-warning' : 'is-invalid border-danger'}`}
                                    type="text" 
                                    placeholder="Введите имя" 
                                    aria-label="Введите имя" 
                                />
                            </div>
                            {
                                !isEdit  ?
                                            <div className="card__input__width mb-2">
                                                <input
                                                    ref={dateRef}
                                                    name="date"
                                                    className={`form-control border ${isDateValid ? 'border-warning' : 'is-invalid border-danger'}`}
                                                    type="date"
                                                    placeholder="дд.мм.гггг" 
                                                    aria-label="дд.мм.гггг" 
                                                />
                                            </div>
                                        :
                                            <div className="d-flex flex-column account-page__text-container justify-content-around">
                                                <span className="card__text-main">Возраст: {getAge(userList[userIndex!!].date)}</span>
                                            </div>

                            }
                            
                            <div className="card__input__width mb-2">
                                <textarea
                                    ref={featuresRef}
                                    name="features"
                                    defaultValue={isEdit ? userList[userIndex!!].features : undefined}
                                    className="form-control border border-warning card__textarea__resize"
                                    placeholder="Введите особенности ребенка" 
                                    aria-label="Введите особенности ребенка"
                                />
                            </div>
                            <div className="card__input__width mb-2">
                                <input
                                    ref={phoneRef}
                                    name="phone"
                                    defaultValue={isEdit ? userList[userIndex!!].phone : undefined}
                                    className={`form-control border ${isPhoneValid ? 'border-warning' : 'is-invalid border-danger'}`}
                                    type="phone" 
                                    placeholder="Контактный телефон" 
                                    aria-label="Контактный телефон" 
                                />                                
                                {
                                    !isPhoneValid ?
                                        <div className="invalid-feedback text-start px-3">
                                            Формат: 11 цифр, начиная с 8.
                                        </div> 
                                    : ""
                                }
                            </div>
                            <button type="submit" className="btn-warning no-page__button my-2">{ isEdit ? 'Изменить' : 'Добавить ребенка'}</button>
                        </div>
                </form>
            </>
};

export default AddChildCard;