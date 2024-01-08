import { ReactElement, useState, useEffect } from "react";
import AddButton from './_addComponents/AddButton';
import ChildCard from './_accountCardList/ChildCard';
import { getIChildCardList } from './Handlers';
import { getChildrenList } from '../../services/Services';
import './styles/personalAccount.css';

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

export interface IChildCard {
    user: IChild;
    isEdit: boolean;
}

interface IProps {}

/**
 * Список карточек детей в ЛК пользователя
 */
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
        }).catch(error=> console.log(error));
    }, [listChanged]);

    const [childCardList, setChildCardList] = useState<IChildCard[]>([ ...getIChildCardList(childrenList)]);
    const [editIndex, setEditIndex] = useState(-1);

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
        setChildCardList(newChildList);
    }, [childrenList, listChanged]);

    useEffect(() => {
        setResultAdditionalList(<>
            {
                childCardList.map(item => (
                    <ChildCard
                        childCardList={childCardList}
                        setChildCardList={setChildCardList}
                        listChanged={listChanged}
                        setListChanged={setListChanged}
                        setEditIndex={setEditIndex}                        
                        child={item.user}
                        isEdit={item.isEdit}
                    />
                ))
            }
        </>);
    }, [childCardList]);

    const [resultAdditionalList, setResultAdditionalList] = useState<JSX.Element>(<></>);

    return (
        <div className="container d-flex flex-column align-items-center font-weight-normal text-center">
            <span className="account-page__text-main">Личный аккаунт</span>
            <div className="d-flex flex-row justify-content-center flex-wrap account-page__container">
                {resultAdditionalList}
                <AddButton
                    childCardList={childCardList}
                    setChildCardList={setChildCardList}
                    listChanged={listChanged}
                    setListChanged={setListChanged}
                    setEditIndex={setEditIndex}
                    setResultAdditionalList={setResultAdditionalList}
                    childrenList={childrenList}
                />
            </div>
        </div>
    )
};

export default PersonalAccount;