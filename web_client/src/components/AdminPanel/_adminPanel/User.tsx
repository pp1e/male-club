import { ReactElement } from "react";
import { USER_IMAGE } from '../../../resources/Images';
import {
    confirmReservation,
    deleteReservation
} from '../../../services/Services';

interface IUserReservation {
    name: string;
    age: number;
    key: string;
    recordID?: number;
}

interface IUserCardProps {
    searchChildrenListButton?: React.RefObject<HTMLButtonElement>;
    user: IUserReservation;
}

/**
 * Запись пользователя в списке всех записей.
 * @author Корюшкин Н.Е.
 */
const Reservation = (props: IUserCardProps): ReactElement => {
    const onConfirmReservation = () => {
        confirmReservation(props.user.recordID || 0)
            .then(() => {
                if (props.searchChildrenListButton?.current) {
                    props.searchChildrenListButton.current.click();
                }
            })
            .catch(() => console.log("Ошибка при подтверждении записи."));
    }

    const onDeleteReservation = () => {
        deleteReservation(props.user.recordID || 0)
            .then(() => {
                if (props.searchChildrenListButton?.current) {
                    props.searchChildrenListButton.current.click();
                }
            })
            .catch(() => console.log("Ошибка при удалении записи."));
    }
    return (
        <li className="list-group-item list-group-item-action align-items-center d-flex gap-4 py-2 px-1">
            <img className="rounded-circle flex-shrink-0 border border-warning p-1" src={USER_IMAGE} width="50"/>
            <div className="
                border-bottom border-warning 
                d-flex justify-content-between 
                container-fluid w-100 
                py-3 px-0 
                align-items-center
            ">
                <span className="reserve-card_user-data text-truncate text-muted">
                    { props.user.name }
                </span>
                <span className="reserve-card_user-data text-truncate text-muted">
                    Возраст { props.user.age }
                </span>
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" />
                <ul className="dropdown-menu">
                    <li>
                        <div 
                            className="dropdown-item" 
                            onClick={onConfirmReservation}
                        >
                            Подтвердить бронь
                        </div>
                    </li>
                    <li>
                        <div 
                            className="dropdown-item" 
                            onClick={onDeleteReservation}
                        >
                            Отменить бронь
                        </div>
                    </li>
                </ul>
            </div>
        </li>
    )
};

export default Reservation;