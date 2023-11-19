import { ReactElement, useState, useMemo } from "react";
import NavBar from "../Navigation/NavBar";
import { AUTHOR_IMAGE } from './Images';
import Image from 'react-bootstrap/Image';
import "./styles/eventspage.css";

interface IChild {
    name: string;
    date: string,
    numPs: number;
}

interface IChildCard {
    user: IChild;
}

interface IProps {}

const ChildCard = (props: IChildCard): ReactElement => { 
    return <>
            <div className="events-page__card__container d-flex flex-column justify-content-center align-items-center mx-4 mb-5">
                    <div className="events-page__card__image mb-4  d-flex flex-column justify-content-center align-items-center">
                        <Image
                            src={AUTHOR_IMAGE}
                            className=""
                            width="120"
                            height="135"
                        />
                    </div>
                    
                    <div className="d-flex flex-column events-page__text-container justify-content-between card__text-second">
                        <span className="card__text-main">{props.user.name}</span>
                        <span>{props.user.date}</span>
                        <span>{props.user.numPs}</span>
                    </div>
                </div>
            </>
}

const EventsPage = (props: IProps): ReactElement => {
    const [userList, setUserList] = useState([
        {
            name: "Полина",
            date: "11.06.22",
            numPs: 14001
        },
        {
            name: "Никина",
            date: "11.06.22",
            numPs: 14010
        },
        {
            name: "Пуговка",
            date: "11.06.22",
            numPs: 14002
        },
        {
            name: "Егор",
            date: "11.06.22",
            numPs: 14003
        },
        {
            name: "Лиза",
            date: "11.06.22",
            numPs: 14008
        },
        {
            name: "Денис",
            date: "11.06.22",
            numPs: 14008
        },
    ]);
    const childrenList = useMemo(() => {
        if (userList.length > 0) {
            return userList.map(user => (
                <ChildCard user={user} />
            ))
        } else {
            return <>
            <div className="d-flex justify-content-center align-items-center card__no-data card__text-second">Нет записей</div>
            </>
        }
    }, [userList]);

    return (
        <>
            <NavBar />
            <div className="container py-2 d-flex flex-column align-items-center font-weight-normal text-center">
                <span className="events-page__text-main">Предстоящие записи</span>
                <div className="d-flex flex-row justify-content-start flex-wrap events-page__container">
                    {childrenList}
                </div>
            </div>
        </>   
    )
};

export default EventsPage;