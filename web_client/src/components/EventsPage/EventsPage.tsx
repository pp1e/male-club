import { ReactElement, useState, useMemo, useEffect } from "react";
import { AUTHOR_IMAGE, THREE_POINTS } from '../../resources/Images';
import Image from 'react-bootstrap/Image';
import AuthStore from './../../store';
import "./styles/eventspage.css";
import { getParentReservationList, cancelReservation } from '../../services/Services';

interface IChild {
    childFirstname: string;
    reservationTime: string,
    consoleNumber: number;
}

interface IChildCard {
    id: number;
    user: IChild;
}

interface IProps {}

function getCurrentReservationDateTime(datetime: string) {
    return new Date(datetime).toLocaleString().slice(0,-3);
}
const ChildCard = (props: IChildCard): ReactElement => {  

    const cancelReservationOnClick = (e: React.MouseEvent<HTMLButtonElement> ) => {
        cancelReservation(+e.currentTarget.id);        
        setListChanged(!listChanged);
        console.log(+e.currentTarget.id);
        setListChanged(!listChanged);
    };
    return <>
            <div className="events-page__card__container d-flex flex-column justify-content-center align-items-center">
                <div className="dropdown align-self-end account__dropdown__container">
                    <button className="btn data-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown">
                        <Image
                            src={THREE_POINTS}
                            className="account__dropdown"
                        />
                    </button>
                    <ul className="dropdown-menu" >
                        <li><button onClick={cancelReservationOnClick} className="dropdown-item">Отменить бронь</button></li>
                    </ul>
                </div>
                    <div className="events-page__card__image d-flex flex-column justify-content-center align-items-center">
                        <Image
                            src={AUTHOR_IMAGE}
                            className="account__no-photo"
                        />
                    </div>                    
                    <div className="d-flex flex-column events-page__text-container justify-content-around">
                        <span className="card__text-main">{props.user.childFirstname}</span>
                        <span className="card__text-second">Дата записи: {getCurrentReservationDateTime(props.user.reservationTime)}</span>
                        <span className="card__text-second">Номер консоли: {props.user.consoleNumber}</span>
                    </div>
                </div>
            </>
}

const EventsPage = (props: IProps): ReactElement => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getParentReservationList(AuthStore.getUserId!!).then((result) => {
            setUserList(result.data);
        });
    }, [listChanged]);
    
    const childrenList = useMemo(() => {
        if (userList.length > 0) {
            return userList.map((user:any) => (
                <ChildCard id={user.id} user={user} />
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