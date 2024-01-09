import { ReactElement } from "react";
import { AUTHOR_IMAGE, THREE_POINTS } from '../../../resources/Images';
import { AxiosResponse } from "axios";
import { IChild } from '../EventsPage';
import Image from 'react-bootstrap/Image';
import '../styles/eventspage.css';
import {deleteReservation} from '../../../services/Services';

interface IProps {
    child: IChild,
    listChanged: boolean,
    setListChanged:  React.Dispatch<React.SetStateAction<boolean>>
}

function getCurrentReservationDateTime(datetime: string) {
    // убираем в строке со временем миллисекунды
    return new Date(datetime).toLocaleString().slice(0,-3);
}

/**
 * Карточка предстоящей записи
 */
const ChildCard = (props: IProps): ReactElement => {
    const cancelReservationOnClick = (e: React.MouseEvent<HTMLButtonElement> ) => {
        deleteReservation(props.child.reservationId).then((result: AxiosResponse<any, any>) => {
            if (result.status !== 200) {
                console.log('Ошибка при отмене брони');
            }
            props.setListChanged(!props.listChanged);
        })
        .catch(errorData => {
            console.log('Ошибка при отмене брони');
            console.log(errorData.message);
        });
    };

    return <>
                <div key={props.child.reservationId} className="events-page__card__container d-flex flex-column justify-content-around align-items-center">
                    <div className="dropdown align-self-end">
                        <button className="btn data-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown">
                            <Image
                                src={THREE_POINTS}
                                className="events-account__dropdown"
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
                        <span className="card__text-main">{props.child.childFirstname}</span>
                        <span className="card__text-second">Дата записи: {getCurrentReservationDateTime(props.child.reservationTime)}</span>
                        <span className="card__text-second">{props.child.consoleNumber ? `Номер консоли: ${props.child.consoleNumber}` : 'Без консоли'}</span>
                    </div>
                </div>
            </>
}

export default ChildCard;
