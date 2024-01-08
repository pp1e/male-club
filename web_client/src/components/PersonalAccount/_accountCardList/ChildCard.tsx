import { ReactElement } from "react";
import { AUTHOR_IMAGE, THREE_POINTS } from '../../../resources/Images';
import AddChildCard from '../_addComponents/AddChildCard';
import { IChildCard, IChild } from '../PersonalAccount';
import Image from 'react-bootstrap/Image';
import { getAge, checkAge, getVisitsCircles } from '../Handlers';
import { deleteUserChild } from '../../../services/Services';
import '../styles/personalAccount.css';

export interface IProps {
    childCardList:  IChildCard[],
    setChildCardList: React.Dispatch<React.SetStateAction< IChildCard[]>>, 
    listChanged: boolean,
    setListChanged: React.Dispatch<React.SetStateAction<boolean>>,
    setEditIndex: React.Dispatch<React.SetStateAction<number>>,    
    child?: IChild,
    isEdit?: boolean
}

/**
* Карточка ребенка в ЛК пользователя
*/
const ChildCard = (props: IProps): ReactElement => {

    // удаление карточки ребенка
    const deleteCardButtonClick = async (e: React.MouseEvent<HTMLButtonElement> ) => {
        await deleteUserChild(props.child!!.id);
        props.setListChanged(!props.listChanged);
    };

    // редактирование карточки ребенка
    const editCardButtonClick = (e: React.MouseEvent<HTMLButtonElement> ) => {
        const newList: IChildCard[] = []
        props.childCardList.forEach(item => {
            newList.push(
                item.user.id !== props.child!!.id
                ? item
                : {
                    user: item.user,
                    isEdit: true,
                }
            )
        })
        props.setChildCardList(newList);
        props.setEditIndex(props.child!!.id);
        props.setListChanged(!props.listChanged);
    };
    return <>
                {
                    !props.isEdit
                    ?
                        <div key={props.child!!.id} className="account-page__card__container d-flex flex-column justify-content-center align-items-center">
                            <div className="dropdown align-self-end account__dropdown__container">
                                <button className="btn data-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown">
                                    <Image
                                        src={THREE_POINTS}
                                        className="account__dropdown"
                                    />
                                </button>
                                <ul className="dropdown-menu" >
                                {
                                    checkAge(props.child!!.date)
                                    ?
                                        <li><button id={`${props.child!!.id}`} onClick={editCardButtonClick} className="dropdown-item">Изменить данные</button></li>
                                    :
                                        <></>
                                }
                                    <li><button id={`${props.child!!.id}`} onClick={deleteCardButtonClick} className="dropdown-item">Удалить ребенка</button></li>
                                </ul>
                            </div>
                            <div className="aaa d-flex flex-column justify-content-center align-items-center">
                                <div className="account-page__card__image d-flex flex-column justify-content-center align-items-center">
                                    <Image
                                        src={AUTHOR_IMAGE}
                                        className="account__no-photo"
                                    />
                                </div>
                                <div className="account-page__text-container d-flex flex-column justify-content-around">
                                    <div className="d-flex flex-column justify-content-between">
                                        <span className={`card__text-main ${!checkAge(props.child!!.date) ? 'text-black-50': ''}`}>{props.child!!.name}</span>
                                        <span className={`card__text-main ${!checkAge(props.child!!.date) ? 'text-danger': ''}`}>Возраст: {getAge(props.child!!.date)}</span>
                                    </div>
                                    <div className="d-flex flex-column justify-content-around">
                                        <span className={`card__text-main ${!checkAge(props.child!!.date) ? 'text-black-50': ''}`}>Особенности:</span>
                                        <span className={`card__text-second card__text__line-height ${!checkAge(props.child!!.date) ? 'text-black-50': ''}`}>{props.child!!.features}</span>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center pt-1">
                                        <span className={`card__text-second ${!checkAge(props.child!!.date) ? 'text-black-50': ''}`}>Количество посещений:</span>
                                        <div className="account__circle__container d-flex flex-row justify-content-center align-items-center">{getVisitsCircles(props.child!!.countVisites)}</div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    :
                        <AddChildCard listChanged={props.listChanged} setListChanged={props.setListChanged} setEditIndex={props.setEditIndex} child={props.child} isEdit={props.isEdit} />
                }
            </>
}

export default ChildCard;