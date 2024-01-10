import { ReactElement, useState, useRef } from "react";
import { AxiosResponse } from "axios";
import Image from 'react-bootstrap/Image';
import { AUTHOR_IMAGE } from '../../../resources/Images';
import { IChild } from '../PersonalAccount';
import { getAge, checkAge } from '../Handlers';
import { addUserChild, updateUserChild } from '../../../services/Services';
import AuthStore from '../../../store';

interface IProps {
    listChanged: boolean,
    setListChanged: React.Dispatch<React.SetStateAction<boolean>>,
    setEditIndex: React.Dispatch<React.SetStateAction<number>>,
    child?: IChild,
    isEdit?: boolean 
}
/**
 * Карточка добавления/редактирования ребенка в ЛК пользователя.
 * @author Гусева П.Н.
 */
const AddChildCard = (props: IProps): ReactElement => {
    const nameRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const featuresRef = useRef<HTMLTextAreaElement>(null);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isDateValid, setIsDateValid] = useState(true);
    const dateRegExp: RegExp = /^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])$/;

    const onSubmit = async (event:any) => {
        event.preventDefault();
        setIsNameValid(!!nameRef.current?.value);
        setIsDateValid(!!dateRef.current?.value && checkAge(new Date(dateRef.current?.value!!)) && new RegExp(dateRegExp).test(dateRef.current?.value));
        const validationPassed = props.isEdit ? !!nameRef.current?.value : !!nameRef.current?.value && !!dateRef.current?.value && checkAge(new Date(dateRef.current?.value!!)) && new RegExp(dateRegExp).test(dateRef.current?.value);
        if (validationPassed) {
            if (props.isEdit) {
                await updateUserChild({
                        name: nameRef.current?.value!!,
                        features: featuresRef.current?.value!!,
                        child_id: props.child!!.id,
                    })
                    .then((result: AxiosResponse<any, any>) => {
                        if (result.status !== 200) {
                            console.log('Ошибка при обновлении ребёнка :с');
                        }
                        props.setListChanged(!props.listChanged);
                        props.setEditIndex(-1);
                    })
                    .catch(errorData => {
                        console.log('Ошибка при обновлении ребёнка :с');
                        console.log(errorData.message);
                    });
                    
                    props.setListChanged(!props.listChanged);
            } else {
                await addUserChild({
                        name: nameRef.current?.value!!,
                        date: new Date(dateRef.current?.value!!),
                        features: featuresRef.current?.value!!,
                        countVisites: 0,
                        user_id: AuthStore.getUserId!!
                    })
                    .then((result: AxiosResponse<any, any>) => {
                        if (result.status !== 200) {
                            console.log('Ошибка при сохранении ребёнка :с');
                        }
                        props.setListChanged(!props.listChanged);
                    })
                    .catch(errorData => {
                        console.log('Ошибка при сохранении ребёнка :с');
                        console.log(errorData.message);
                    });
            }
        };
    };

    return  <>
                <form method="POST" onSubmit={onSubmit} className="account-page__card__container d-flex flex-column justify-content-center align-items-center">
                    <div className=" account-page__card__containerv2  d-flex flex-column justify-content-center align-items-center">
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
                                    defaultValue={props.isEdit ? props.child?.name : undefined}
                                    className={`form-control border ${isNameValid ? 'border-warning' : 'is-invalid border-danger'}`}
                                    type="text" 
                                    placeholder="Введите имя" 
                                    aria-label="Введите имя" 
                                />
                            </div>
                            {
                                !props.isEdit
                                ?
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
                                            !isDateValid
                                            ?
                                                <div className="invalid-feedback text-start px-1">
                                                    Допустимый возраст: 2-16 лет.
                                                </div> 
                                            : ""
                                        }
                                    </div>
                                :
                                    <div className="d-flex flex-column justify-content-around mb-2">
                                        <span className="account-card__text-main">Возраст: {getAge(props.child!!.date)}</span>
                                </div>
                            }
                            <div className="card__input__width mb-2">
                                <textarea
                                    ref={featuresRef}
                                    name="features"
                                    defaultValue={props.isEdit ? props.child?.features : undefined}
                                    className="form-control border border-warning card__textarea__resize"
                                    placeholder="Введите особенности ребенка" 
                                    aria-label="Введите особенности ребенка"
                                />
                            </div>
                            <button type="submit" className="btn btn-warning p-3 my-2">{ props.isEdit ? 'Изменить' : 'Добавить ребенка'}</button>
                        </div>
                    </div>
                </form>
            </>
};

export default AddChildCard;
