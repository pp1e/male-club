import { ReactElement, useState, useMemo, ReactNode, useRef, SetStateAction, Dispatch } from "react";
import { observer } from "mobx-react-lite";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { ADMIN_PANEL_IMAGE } from '../../resources/Images';
import Image from 'react-bootstrap/Image';
import { 
    getAdminChildrenList, 
    getConsolesOccupation as getOccupatedConsolesAmount 
} from '../../services/Services';

import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import "./styles/adminPanel.css";
import "../PersonalAccount/styles/personalAccount.css";

interface IUser {
    name: string;
    age: number;
    key: string;
}

interface IUserCard {
    user: IUser;
}

interface IProps {
    childrenList?: ReactNode;
    children?: IUser[];
    setChildrenList?: Dispatch<SetStateAction<IUser[]>>;
}

interface IDatePicker {
    setUserList: Dispatch<SetStateAction<IUser[]>>;
}

/**
 * Блок выбора даты и времени.
 */
const DateTimePicker = (props: IDatePicker ):ReactElement => {
    const [dateValue, setDateValue] = useState<string | null>("");
    const [timeValue, setTimeValue] = useState<string | null>("");

    const getChildrenList = async () => {
        const newDate = Object(dateValue);
        const newTime = Object(timeValue);
        const childrenList = await getAdminChildrenList({
            date: `${newDate.$y}-${newDate.$M}-${newDate.$D}`,
            time: String(newTime.$d).split(' ')?.[4]
        });
        //TODO: запихнуть результат выполнения метода в список детей;
        // props.setUserList(childrenList);
        return [{}]
    }

    return (
        <div className="mt-5 pt-5 d-flex flex-row justify-content-evenly align-items-center">
            <div className="d-flex flex-row">
                <label className="mx-3 py-3 text-truncate">Выберите дату</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        format="YYYY-MM-DD"
                        label='Выберите дату'
                        value={dateValue}
                        onChange={(newValue) => setDateValue(newValue)}
                    />
                </LocalizationProvider>
            </div>
            <div className="d-flex flex-row">
                <label className="mx-3 py-3 text-truncate">Выберите время</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker 
                        label='Выберите время'
                        value={timeValue} 
                        onChange={(newValue) => setTimeValue(newValue)}
                        ampm={false}
                    />
                </LocalizationProvider>
            </div>
            <button 
                className="btn btn btn-outline-warning" 
                onClick={getChildrenList} 
            >
                Получить список
            </button>
        </div>
    )
};

const getConsolesOccupation = (occupation: number): ReactElement => {
    let visibleCount = occupation;
    let emptyCirlesCount = 6 - visibleCount;
    const content = [];
    while (visibleCount > 0) {
        visibleCount--;
        content.push(<div className="account__circle me-2"></div>);
    }
    while (emptyCirlesCount > 0) {
        emptyCirlesCount--;
        content.push(<div className="account__circle account__circle__not-visite me-2"></div>)
    }
    return <>{content}</>;
}
const ReserveCard = (): ReactElement => {
    const [consolesOccupation, setConsolesOccupation] = useState(0);
    // getParentReservationList(1);
    getOccupatedConsolesAmount().then(res => console.log(res)).catch(err => console.log(err));
    return (
        <div 
            className="d-flex flex-column align-items-center reserve-card shadow-lg mx-5 p-3"
        >
            {/* TODO: Переписать задание высоты и ширины в относительные размеры */}
            <Image 
                src={ADMIN_PANEL_IMAGE}
                className="reserve-card_image"
                width="350"
                height="300"
            />
            <div className="mt-4 search-container_reserve-text">Занятость площадки</div>
            {/* <div>Сами ебитесь с этими кружочками</div>
             */}
            <div className="account__circle__container d-flex flex-row justify-content-center align-items-center">{getConsolesOccupation(6)}</div>
        </div>
    )
};

const User = (props: IUserCard): ReactElement => {
    return (
        <li className="list-group-item list-group-item-action align-items-center d-flex gap-4 py-3 px-1">
            <img className="rounded-circle flex-shrink-0" src={ADMIN_PANEL_IMAGE} width="50"/>
            <div className="
                border-bottom border-warning 
                d-flex justify-content-between 
                container-fluid w-100 
                py-3 px-0 
                align-items-center
            ">
                <span className="reserve-card_user-name text-truncate">{ props.user.name }</span>
                <span className="reserve-card_user-age text-truncate">Возраст { props.user.age }</span>
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" />
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Подтвердить бронь</a></li>
                    <li><a className="dropdown-item" href="#">Отменить бронь</a></li>
                </ul>
            </div>
        </li>
    )
};

/**
 * Блок списка детей.
 */
const ChildrenListCard = (props: IProps): ReactElement => {
    const [listForFilter, setListForFilter] = useState(props.children);
    const childrenList = useMemo(() => {
        return listForFilter?.map(user => (
            <User user={user} key={user.key} />
        ))
    }, [listForFilter]);
    const searchRef = useRef(null);

    const filterList = () => {
        setListForFilter(props.children?.filter(child => 
            (searchRef.current && searchRef.current['value'] !== '') 
                ? child.name === searchRef.current['value'] 
                : child
            ) || []
        );
    }

    return (
        <div 
            className="
                d-flex flex-column align-items-center 
                reserve-card_children-list-card 
                shadow-lg py-4 px-2
            "
        >
            <div className="container-fluid">
                <div className="d-flex">
                    <input 
                        ref={searchRef}
                        className="form-control me-2 border border-warning" 
                        type="search" 
                        placeholder="Поиск" 
                        aria-label="Поиск"
                    />
                    <button className="btn btn btn-outline-warning" type="submit" onClick={filterList}>
                        Поиск
                    </button>
                </div>
            </div>
            
            <div className="container-fluid mt-4">
                <ul className="list-group-flush reserve-card_children-list px-0">
                    {childrenList}
                </ul>
            </div>
        </div>
    )
}

const AdminPanel = observer((): ReactElement => {
    const [userList, setUserList] = useState([
        {
            name: "Никита",
            age: 14,
            key: '1'
        }, 
        {
            name: "Даня",
            age: 15,
            key: '2'
        }, 
    ]);

    return (
        <div className="container-xl py-4">
            <div className="mt-5 text-center">
                <h1 className="display-2">Личный кабинет администратора</h1>
            </div>
            <div className="container">
                {/* Выбор даты и времени */}
                <DateTimePicker 
                    setUserList={setUserList}
                />

                {/* Блок занятости */}
                <div className="container d-flex flex-row mt-5 justify-content-center">
                    <ReserveCard />
                    <ChildrenListCard children={userList} setChildrenList={setUserList} />
                </div>
            </div>
        </div>
    )
});

export default AdminPanel;