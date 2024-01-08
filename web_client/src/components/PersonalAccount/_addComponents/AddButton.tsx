import { ReactElement } from "react";
import {  ADD_BUTTON_IMAGE } from '../../../resources/Images';
import Image from 'react-bootstrap/Image';
import ChildCard, { IProps } from '../_accountCardList/ChildCard';
import AddChildCard from '../_addComponents/AddChildCard';
import { IChild } from '../_accountCardList/PersonalAccount';
import { getIChildCardList } from '../Handlers';
import '../styles/personalAccount.css';


interface ICurrentProps extends IProps {
    setResultAdditionalList: React.Dispatch<React.SetStateAction<ReactElement>>
    childrenList: IChild[]
};

/**
 * Кнопка добавления карточки ребенка в ЛК пользователя
 */
const AddButton = (props: ICurrentProps): ReactElement => {

    const addChildButtonClick = (e: React.MouseEvent<HTMLButtonElement> ) => {
        props.setResultAdditionalList(<>
                                    {
                                        getIChildCardList(props.childrenList).map(item => (
                                            <ChildCard
                                                childCardList={props.childCardList}
                                                setChildCardList={props.setChildCardList}
                                                listChanged={props.listChanged}
                                                setListChanged={props.setListChanged}
                                                setEditIndex={props.setEditIndex}
                                                child={item.user}
                                                isEdit={item.isEdit}
                                            />
                                        ))
                                    }
                                    <AddChildCard listChanged={props.listChanged} setListChanged={props.setListChanged} setEditIndex={props.setEditIndex} />
                                </>)
    };
    return  <div className="account-page__card__container d-flex flex-column justify-content-center align-items-center account__button__container">
                <button type="button" className="account__button d-flex card__button__add flex-column justify-content-center align-items-center" onClick={addChildButtonClick}>
                    <Image
                        src={ADD_BUTTON_IMAGE}
                        className="card__button__add"
                    />
                </button>
            </div>
}

export default AddButton;