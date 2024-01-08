import { ReactElement, useState, useEffect } from "react";
import { ADMIN_LOGO } from '../../../resources/Images';
import Image from 'react-bootstrap/Image';
import {
    getConsolesOccupation as getOccupatedConsolesAmount
} from '../../../services/Services';

const getConsolesOccupation = (occupation: number): ReactElement => {
    const row = [];
    const circle = (index: number) => (
        <div className={`
            account__circle me-2
            ${occupation > index ? '' : 'account__circle__not-visite'}
        `}>
        </div>
    );
    for (let i = 0; i < 6; i++) {
        row.push(circle(i));
    }
    return <>{row}</>
}
const ReserveCard = (): ReactElement => {
    const [consolesOccupation, setConsolesOccupation] = useState(0);
    // TODO: Продумать и реализовать получение заполненности консолей по времени.
    useEffect(() => {
        getOccupatedConsolesAmount()
            .then((res: any) => setConsolesOccupation(res.data))
            .catch(() => console.log("Ошибка с получением заполненности, попробуйте перезапустить приложение"));
    }, []);
    
    return (
        <div 
            className="d-flex flex-column align-items-center border-radius-10 shadow-lg mx-5 p-3"
        >
            <Image 
                src={ADMIN_LOGO}
                className="border-radius-10"
                width="350"
                height="300"
            />
            <div className="search-container_reserve-text">Занятость площадки</div>
            <div className="account__circle__container d-flex flex-row justify-content-center align-items-center mt-2">
                {getConsolesOccupation(consolesOccupation)}
            </div>
            <div className="account__circle__container d-flex flex-row justify-content-center align-items-center mt-2">
                {getConsolesOccupation(consolesOccupation - 6)}
            </div>
        </div>
    )
};

export default ReserveCard;