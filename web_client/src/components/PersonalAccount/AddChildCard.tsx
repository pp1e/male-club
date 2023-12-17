import { ReactElement, useState, useRef } from "react";
import { AxiosResponse } from "axios";
import Image from 'react-bootstrap/Image';
import { AUTHOR_IMAGE } from '../../resources/Images';
import { IChild } from './PersonalAccount';
import { getAge, checkAge } from './Handlers';
import { addUserChild } from '../../services/Services'

const AddChildCard = ({userList, setUserList, userIndex, isEdit, setEditIndex}: {userList: IChild[], setUserList: React.Dispatch<React.SetStateAction<IChild[]>>, userIndex?: number, isEdit?: boolean, setEditIndex?: React.Dispatch<React.SetStateAction<number>>}): ReactElement => {
    const nameRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const featuresRef = useRef<HTMLTextAreaElement>(null);
    // const phoneRef= useRef<HTMLInputElement>(null);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isDateValid, setIsDateValid] = useState(true);
    // const [isPhoneValid, setIsPhoneValid] = useState(true);
    const dateRegExp: RegExp = /^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])$/;
    // const phoneRegExp: RegExp = /^((\+7)[\- ]?)(\(\d{3}\)|\d{3})[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})[\- ]?\d{1})$/;

    const onSubmit = async (event:any) => {
        event.preventDefault();
        setIsNameValid(!!nameRef.current?.value);
        setIsDateValid(!!dateRef.current?.value && checkAge(new Date(dateRef.current?.value!!)) && new RegExp(dateRegExp).test(dateRef.current?.value));
        // setIsPhoneValid(!!phoneRef.current?.value && new RegExp(phoneRegExp).test(phoneRef.current!!.value));
        // const validationPassed = isEdit ? !!nameRef.current?.value && new RegExp(phoneRegExp).test(phoneRef.current!!.value) : !!nameRef.current?.value && !!dateRef.current?.value && !!phoneRef.current?.value && new RegExp(phoneRegExp).test(phoneRef.current!!.value)
        const validationPassed = isEdit ? !!nameRef.current?.value : !!nameRef.current?.value && !!dateRef.current?.value;
        if (validationPassed) {
            if (isEdit) {
                userList.at(userIndex!!)!!.name = nameRef.current?.value!!;
                userList.at(userIndex!!)!!.features = featuresRef.current?.value!!;
                // userList.at(userIndex!!)!!.phone = phoneRef.current?.value!!;
                setUserList([...userList]);
                setEditIndex!!(-1);
            }
            else {
            // FIXME привязать пользователя, пока вообще всё настроено с телефоном, поэтому нифига не сохранит...
                // await addUserChild({
                //     name: nameRef.current?.value!!,
                //     date: new Date(dateRef.current?.value!!),
                //     features: featuresRef.current?.value!!,
                //     countVisites: 0,
                //     user_id: 1,
                //     // phone: phoneRef.current?.value!!
                // })
                //     .then((result: AxiosResponse<any, any>) => {
                //         if (result.status !== 200) {
                //             console.log('Ошибка при сохранении ребёнка :с');
                //         }
                //     })
                //     .catch(errorData => {
                //         console.log('Ошибка при сохранении ребёнка :с');
                //         console.log(errorData.message);
                //     });
            setUserList([
                ...userList,
                {
                    id: userList.length,
                    name: nameRef.current?.value!!,
                    date: new Date(dateRef.current?.value!!),
                    features: featuresRef.current?.value!!,
                    countVisites: 0,
                    // phone: 'phoneRef.current?.value!!'
                }
            ])
            }
        };
    };

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
                                                {
                                                    !isDateValid ?
                                                        <div className="invalid-feedback text-start px-1">
                                                            Допустимый возраст: 2-16 лет.
                                                        </div> 
                                                    : ""
                                                }
                                            </div>
                                        :
                                            <div className="d-flex flex-column justify-content-around py-1">
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
                            {/* <div className="card__input__width mb-2">
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
                                        <div className="invalid-feedback text-start px-1">
                                            Номер должен начинаться с +7.
                                        </div> 
                                    : ""
                                }
                            </div> */}
                            <button type="submit" className="btn btn-warning p-3 my-2">{ isEdit ? 'Изменить' : 'Добавить ребенка'}</button>
                        </div>
                </form>
            </>
};

export default AddChildCard;