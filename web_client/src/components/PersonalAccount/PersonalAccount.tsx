import { ReactElement, useState, useEffect } from "react";
import { AUTHOR_IMAGE, ADD_BUTTON_IMAGE, THREE_POINTS } from '../../resources/Images';
import AddChildCard from './AddChildCard';
import Image from 'react-bootstrap/Image';
import "./styles/personalAccount.css";
import { getAge, checkAge, getVisitsCircles } from './Handlers';
import { getChildrenList, deleteUserChild } from '../../services/Services';
import { error } from "console";

export interface IChild {
    id: number;
    name: string;
    date: Date;
    features: string;
    countVisites: number;
}

interface IChildBackend {
    firstname: string;
    birthdate: string;
    id: number;
    countVisit: number;
    peculiarities: string;
}

interface IChildCard {
    user: IChild;
    isEdit: boolean;
}

interface IProps {}

const PersonalAccount = (props: IProps): ReactElement => {
    const [childrenList, setChildrenList] = useState<IChild[]>([]);
    const [listChanged, setListChanged] = useState(true);

    useEffect(() => {
        getChildrenList().then((result) => {
            const resList: IChild[] = [];
            const responseList: IChildBackend[] = [...result.data];
            responseList.forEach(item => {
                const curChild: IChild = {
                    id: item.id,
                    name: item.firstname,
                    date: new Date(item.birthdate),
                    features: item.peculiarities,
                    countVisites: item.countVisit
                };
                resList.push(curChild);
            });
            setChildrenList(resList);
            // console.log('heeeeeeeeere');
        }).catch(error=> console.log(error));
    }, [listChanged]);

    function getList(): IChildCard[] {
        return childrenList.map(item => (
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
                                            </div>
                                        :
                                            <AddChildCard listChanged={listChanged} setListChanged={setListChanged} setEditIndex={setEditIndex} child={props.user} isEdit={props.isEdit} />
                    }
                </>
    }

    const deleteCardButtonClick = async (e: React.MouseEvent<HTMLButtonElement> ) => {
        await deleteUserChild(+e.currentTarget.id);
        setListChanged(!listChanged);
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
        setEditIndex(+e.currentTarget.id);
        setListChanged(!listChanged);
    };

    function startEdit(key: number): boolean {
        return key === editIndex;
    }

    useEffect(() => {
        const newChildList: IChildCard[] = [];
        Promise.all(childrenList.map(user => (
            newChildList.push(
                {
                    user,
                    isEdit: startEdit(user.id)
                }
            )
        )));
        setUserCardList(newChildList);
    }, [childrenList, listChanged]);

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
                                    <AddChildCard listChanged={listChanged} setListChanged={setListChanged} setEditIndex={setEditIndex} />
                                </>)
    };

    const AddButton = (props: IProps): ReactElement => {
        return  <div className="account-page__card__container d-flex flex-column justify-content-center align-items-center account__button__container">
                    <button type="button" className="account__button d-flex card__button__add flex-column justify-content-center align-items-center" onClick={addChildButtonClick}>
                        <Image
                            src={ADD_BUTTON_IMAGE}
                            className="card__button__add"
                        />
                    </button>
                </div>
    }
    
    return (
        <div className="container d-flex flex-column align-items-center font-weight-normal text-center">
            <span className="account-page__text-main">Личный аккаунт</span>
            <div className="d-flex flex-row justify-content-center flex-wrap account-page__container">
                {resultAdditionalList}
                <AddButton/>
            </div>
        </div>
    )
};

export default PersonalAccount;