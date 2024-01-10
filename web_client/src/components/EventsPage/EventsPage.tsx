import { ReactElement, useState, useEffect } from "react";
import AuthStore from '../../store';
import ChildCard from './_recordCards/ChildReservationCard';
import { getParentReservationList } from '../../services/Services';
import './styles/eventspage.css';

interface IProps {}

export interface IChild {
    childFirstname: string,
    consoleNumber: number,
    reservationId: number,
    reservationTime: string,
}

/**
 * Список предстоящих записей пользователя
 * @author Гусева П.Н.
 */
const EventsPage = (props: IProps): ReactElement => {
    const [listChanged, setListChanged] = useState(true);
    const [responseList, setResponseList] = useState<IChild[]>([]);
    const [prerecordsList, setPrerecordList] = useState<ReactElement>(<></>);

    useEffect(() => {
        getParentReservationList(AuthStore.getUserId!!).then((result) => {
            setResponseList(result.data);
        });
    }, [listChanged]);

    useEffect(() => {
        setPrerecordList(<>
            {
                responseList.length > 0
                ?
                    responseList.map((child:any) => (
                        <ChildCard child={child} listChanged={listChanged} setListChanged={setListChanged} />
                    ))
                :
                    <div className="d-flex justify-content-center align-items-center text-muted card__no-data card__text-second">Нет записей</div>
            }
        </>)
    }, [responseList, listChanged]);

    return (
        <div className="container d-flex flex-column align-items-center font-weight-normal text-center">
            <span className="events-page__text-main">Предстоящие записи</span>
            <div className="d-flex flex-row justify-content-center events-page__maxWidth">
                <div className="d-flex flex-row justify-content-start flex-wrap events-page__container">
                    {prerecordsList}
                </div>
            </div>
        </div> 
    )
};

export default EventsPage;
