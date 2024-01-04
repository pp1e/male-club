import { ReactElement, useState, useMemo, useEffect } from "react";
import { AUTHOR_IMAGE } from '../../resources/Images';
import Image from 'react-bootstrap/Image';
import "./styles/eventspage.css";
import { getParentReservationList } from '../../services/Services';

interface IChild {
    childFirstname: string;
    reservationTime: string,
    consoleNumber: number;
}

interface IChildCard {
    user: IChild;
}

interface IProps {}

const ChildCard = (props: IChildCard): ReactElement => { 
    return <>
            <div className="events-page__card__container d-flex flex-column justify-content-center align-items-center">
                    <div className="events-page__card__image d-flex flex-column justify-content-center align-items-center">
                        <Image
                            src={AUTHOR_IMAGE}
                            className="account__no-photo"
                        />
                    </div>                    
                    <div className="d-flex flex-column events-page__text-container justify-content-around">
                        <span className="card__text-main">{props.user.childFirstname}</span>
                        <span className="card__text-second">Дата записи: {props.user.reservationTime}</span>
                        <span className="card__text-second">Номер консоли: {props.user.consoleNumber}</span>
                    </div>
                </div>
            </>
}

const EventsPage = (props: IProps): ReactElement => {
    const [userList, setUserList] = useState([
        {
            childFirstname: "Полина",
            reservationTime: "11.06.22",
            consoleNumber: 14001
        },
        {
            childFirstname: "Никина",
            reservationTime: "11.06.22",
            consoleNumber: 14010
        },
        {
            childFirstname: "Пуговка",
            reservationTime: "11.06.22",
            consoleNumber: 14002
        },
        {
            childFirstname: "Егор",
            reservationTime: "11.06.22",
            consoleNumber: 14003
        },
        {
            childFirstname: "Лиза",
            reservationTime: "11.06.22",
            consoleNumber: 14008
        },
        {
            childFirstname: "Денис",
            reservationTime: "11.06.22",
            consoleNumber: 14008
        },
    ]);

    // FIXME нужен parent_id
    // useEffect(() => {
    //     getParentReservationList(parent_id).then((result) => {
    //         setUserList(result.data);
    //     });
    // }, [parent_id]);
    
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
        <div className="container d-flex flex-column align-items-center font-weight-normal text-center">
            <span className="events-page__text-main">Предстоящие записи</span>
            <div className="d-flex flex-row justify-content-center flex-wrap events-page__container">
                {childrenList}
            </div>
        </div> 
    )
};

export default EventsPage;