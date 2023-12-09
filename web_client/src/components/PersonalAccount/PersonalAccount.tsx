import { ReactElement, useState, useEffect } from "react";
import NavBar from "../Navigation/NavBar";
import { AUTHOR_IMAGE, ADD_BUTTON_IMAGE, THREE_POINTS } from '../../resources/Images';
import AddChildCard from './AddChildCard';
import Image from 'react-bootstrap/Image';
import "./styles/personalAccount.css";
import { getAge, checkAge, getVisitsCircles } from './Handlers';
import { getUserChildrenList } from '../../services/Services'

export interface IChild {    
    id: number;
    name: string;
    date: Date;
    features: string;
    countVisites: number;
    phone: string;
}

interface IChildCard {
    user: IChild;
    isEdit: boolean;
}

interface IProps {}

const childListTest: IChild[] = [{
    id: 0,
    name: "Полина",
    date: new Date("11.06.22"),
    features: 'насморк',
    countVisites: 6,
    phone: '+7(910)829-28-27'

},
{
    id: 1,
    name: "Никина",
    date: new Date("11.06.20"),
    features: 'насморк',
    countVisites: 7,
    phone: '+7(910)829-28-27'
},
{
    id: 2,
    name: "Пуговка",
    date: new Date("11.06.12"),
    features: 'насморк',
    countVisites: 1,
    phone: '+7(910)829-28-27'
},
{
    id: 3,
    name: "Егор",
    date: new Date("11.06.18"),
    features: 'насморк',
    countVisites: 4,
    phone: '+7(910)829-28-27'
},
{
    id: 4,
    name: "Лиза",
    date: new Date("11.06.19"),
    features: 'насморк',
    countVisites: 2,
    phone: '+7(910)829-28-27'
},
{
    id: 5,
    name: "Денис",
    date: new Date("11.06.16"),
    features: 'насморк',
    countVisites: 5,
    phone: '+7(910)829-28-27'
},]


const PersonalAccount = (props: IProps): ReactElement => {
    const [userList, setUserList] = useState(childListTest);
    function getList(): IChildCard[] {
        return userList.map(item => (
            {
                user: item,
                isEdit: false,
            }
        ));
    }
    const [userCardList, setUserCardList] = useState<IChildCard[]>([ ...getList()]);
    const [editIndex, setEditIndex] = useState(-1);

    const ChildCard = (props: IChildCard): JSX.Element => { 
        return <>
                    {
                        !props.isEdit   ?
                                            <div className="account-page__card__container d-flex flex-column justify-content-center align-items-center">
                                                <div className="dropdown align-self-end account__dropdown__container">
                                                    <button className="btn data-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown">
                                                        <Image
                                                            src={THREE_POINTS}
                                                            className="account__dropdown"
                                                        />
                                                    </button>
                                                    <ul className="dropdown-menu" >
                                                        {/* FIXME по клику сделать изменение и удаление */}
                                                        {
                                                            checkAge(props.user.date)
                                                            ? <li><button id={`${props.user.id}`} onClick={editCardButtonClick} className="dropdown-item">Изменить данные</button></li>
                                                            : <></>
                                                        }
                                                        <li><button id={`${props.user.id}`} onClick={deleteCardButtonClick} className="dropdown-item">Удалить ребенка</button></li>
                                                    </ul>
                                                </div>
                                                <div className="account-page__card__image d-flex flex-column justify-content-center align-items-center">
                                                    <Image
                                                        src={AUTHOR_IMAGE}
                                                        className="account__no-photo"
                                                    />
                                                </div>                    
                                                <div className="d-flex flex-column account-page__text-container justify-content-around">
                                                    <span className={`card__text-main ${!checkAge(props.user.date) ? 'card__text__not-allowed': ''}`}>{props.user.name}</span>
                                                    <span className={`card__text-main ${!checkAge(props.user.date) ? 'card__text__not-allowed-reason': ''}`}>Возраст: {getAge(props.user.date)}</span>
                                                </div>
                                                <div className="d-flex flex-column justify-content-around">
                                                    <span className={`card__text-main ${!checkAge(props.user.date) ? 'card__text__not-allowed': ''}`}>Особенности:</span>
                                                    <span className={`card__text-second card__text__line-height ${!checkAge(props.user.date) ? 'card__text__not-allowed': ''}`}>{props.user.features}</span>
                                                </div>
                                                <div className="d-flex flex-column  justify-content-center pt-3">
                                                    <span className={`card__text-second ${!checkAge(props.user.date) ? 'card__text__not-allowed': ''}`}>Количество посещений:</span>
                                                    <div className="account__circle__container d-flex flex-row justify-content-center align-items-center">{getVisitsCircles(props.user.countVisites)}</div>
                                                </div>
                                                <div className="d-flex flex-column  justify-content-center">
                                                    <span className={`card__text-second ${!checkAge(props.user.date) ? 'card__text__not-allowed': ''}`}>Контактный телефон:</span>
                                                    <span className={`card__text-second card__text__line-height ${!checkAge(props.user.date) ? 'card__text__not-allowed': ''}`}>{props.user.phone}</span>
                                                </div>                   
                                            </div>
                                        :
                                            <AddChildCard userList={userList} setUserList={setUserList} userIndex={props.user.id} isEdit={props.isEdit} setEditIndex={setEditIndex}/>
                    }
                </>
    }

    const deleteCardButtonClick = (e: React.MouseEvent<HTMLButtonElement> ) => {
        // delete userList[+e.currentTarget.id];
        userList.splice( +e.currentTarget.id,1);
        setUserList([...userList]);
    };

    const editCardButtonClick = (e: React.MouseEvent<HTMLButtonElement> ) => {
        const newList: IChildCard[] = []
        userCardList.forEach(item => {
            newList.push(
            item.user.id !== +e.currentTarget.id
            ? item
            : {
                user: item.user,
                isEdit: true,
            }
            )
        })
        setUserCardList(newList);
        // userCardList.at(+e.currentTarget.id)!!.isEdit = true;
        setEditIndex(+e.currentTarget.id);
        const newList1: IChild[] = [...userList];
        setUserList(newList1);
    };

    function startEdit(key: number): boolean {
        return key === editIndex;
    }

    useEffect(() => {
        const newChildList: IChildCard[] = [];
        Promise.all(userList.map(user => (
            newChildList.push(
                {
                    user,
                    isEdit: startEdit(user.id)
                }
            )
        )));
        setUserCardList(newChildList);
    }, [userList]);

    useEffect(() => {
        setResultAdditionalList(<>
            {
                userCardList.map(item => (
                    <ChildCard user={item.user} key={item.user.id} isEdit={item.isEdit}/>
                ))
            }
        </>);
    }, [userCardList]);

    const [resultAdditionalList, setResultAdditionalList] = useState<JSX.Element>(<></>);

    const addChildButtonClick = (e: React.MouseEvent<HTMLButtonElement> ) => {
        setResultAdditionalList(<>
                                    {
                                        getList().map(item => (
                                            <ChildCard user={item.user} key={item.user.id} isEdit={item.isEdit}/>
                                        ))
                                    }
                                    <AddChildCard userList={childListTest} setUserList={setUserList}/>
                                </>)
    };

    const AddButton = (props: IProps): ReactElement => {
        return  <div className="account-page__card__container d-flex flex-column justify-content-center align-items-center account__button__container">
                    <button type="button" className="account__button rgba-red-light d-flex flex-column justify-content-center align-items-center" onClick={addChildButtonClick}>
                        <Image
                            src={ADD_BUTTON_IMAGE}
                            className="rgba-red-light"
                            height="min(2vh, 204px)"
                            width="min(2vh, 204px)"
                        />
                    </button>
                </div>
    }
    return (
        <>
            <NavBar />
            <div className="container d-flex flex-column align-items-center font-weight-normal text-center">
                <span className="account-page__text-main">Личный аккаунт</span>
                <div className="d-flex flex-row justify-content-center flex-wrap account-page__container">
                    {resultAdditionalList}
                    <AddButton/>
                </div>
            </div>
        </>   
    )
};

export default PersonalAccount;