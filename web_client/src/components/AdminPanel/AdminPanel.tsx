import { ReactElement, useState, useMemo, ReactNode, useRef, SetStateAction, Dispatch, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { USER_IMAGE, ADMIN_LOGO } from '../../resources/Images';
import Image from 'react-bootstrap/Image';
import { 
    getAdminChildrenList, 
    getConsolesOccupation as getOccupatedConsolesAmount ,
    confirmReservation,
    deleteReservation
} from '../../services/Services';

import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import "./styles/adminPanel.css";
import "../PersonalAccount/styles/personalAccount.css";

interface IUserReservation {
    name: string;
    age: number;
    key: string;
    recordID?: number;
}

interface IProps {
    childrenList?: ReactNode;
    children?: IUserReservation[];
    setChildrenList?: Dispatch<SetStateAction<IUserReservation[]>>;
    searchChildrenListButton?: React.RefObject<HTMLButtonElement>;
}

interface IUserCardProps extends IProps {
    user: IUserReservation;
}

interface IDatePickerProps extends IProps {
    setUserList: Dispatch<SetStateAction<IUserReservation[]>>;
}

const prepareChildrenList = (res: any) => (res.data || []).map((child: any) => ({
    name: child.childFirstname,
    age: child.childAge,
    key: child.childId,
    recordID: child.reservationId 
}));

/**
 * Блок выбора даты и времени.
 */
const DateTimePicker = (props: IDatePickerProps):ReactElement => {
    const [dateValue, setDateValue] = useState<string | null>(null);
    const [timeValue, setTimeValue] = useState<string | null>(null);
    const newDate = Object(dateValue);
    const newTime = Object(timeValue);
    const yearValue = newDate.$y > 9 ? newDate.$y : `0${newDate.$y}`;
    const monthValue = newDate.$M + 1 > 9 ? newDate.$M + 1 : `0${newDate.$M + 1}`;
    const dayValue = newDate.$D > 9 ? newDate.$D : `0${newDate.$D}`;
    const getChildrenList = () => {
        if (!dateValue) {
            setDateValue("");
            return;
        }
        getAdminChildrenList({
            date: `${yearValue}-${monthValue}-${dayValue}`,
            time: String(newTime?.$d || "").split(' ')?.[4]
        })
            .then(res => {
                const childrenList = prepareChildrenList(res);
                props.setUserList(childrenList);
            })
            .catch(() => console.log("Ошибка получения списка детей."));
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
                ref={props.searchChildrenListButton}
                className="btn btn btn-outline-warning" 
                onClick={getChildrenList} 
            >
                Получить список
            </button>
        </div>
    )
};

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
            .then(res => setConsolesOccupation(res.data))
            .catch(() => console.log("Ошибка с получением заполненности, попробуйте перезапустить приложение"));
    }, []);
    
    return (
        <div 
            className="d-flex flex-column align-items-center reserve-card shadow-lg mx-5 p-3"
        >
            <Image 
                src={ADMIN_LOGO}
                className="reserve-card_image "
                width="350"
                height="300"
            />
            <div className="mt-4 search-container_reserve-text">Занятость площадки</div>
            <div className="account__circle__container d-flex flex-row justify-content-center align-items-center">
                {getConsolesOccupation(consolesOccupation)}
            </div>
            <div className="account__circle__container d-flex flex-row justify-content-center align-items-center mt-2">
                {getConsolesOccupation(consolesOccupation - 6)}
            </div>
        </div>
    )
};

const User = (props: IUserCardProps): ReactElement => {
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
                <span className="reserve-card_user-name text-truncate">{ props.user.name }</span>
                <span className="reserve-card_user-age text-truncate">Возраст { props.user.age }</span>
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

/**
 * Блок списка детей.
 */
const ChildrenListCard = (props: IProps): ReactElement => {
    const searchRef = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const childrenListComponent = useMemo(() => {
        const filteredChildrenList = props.children?.filter(child => 
            child.name.includes(searchValue)
        ) || [];
        return filteredChildrenList?.map(user => {
            return (
                <User 
                    searchChildrenListButton={props.searchChildrenListButton}
                    user={user} 
                    key={user.recordID} 
                />
            )
        })
    }, [searchValue, props.children]);

    const filterList = () => setSearchValue(searchRef.current?.['value'] || '');

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
                    <button 
                        className="btn btn btn-outline-warning" 
                        type="submit" 
                        onClick={filterList}
                    >
                        Поиск
                    </button>
                </div>
            </div>
            
            <div className="container-fluid mt-4">
                <ul className="list-group-flush reserve-card_children-list px-0">
                    {childrenListComponent}
                </ul>
            </div>
        </div>
    )
}

const AdminPanel = observer((): ReactElement => {
    const [userList, setUserList] = useState<IUserReservation[]>([]);
    const searchChildrenListButton = useRef(null);

    return (
        <div className="container-xl py-4">
            <div className="mt-5 text-center">
                <h1 className="display-2">Личный кабинет администратора</h1>
            </div>
            <div className="container">
                {/* Выбор даты и времени */}
                <DateTimePicker 
                    searchChildrenListButton={searchChildrenListButton}
                    setUserList={setUserList}
                />

                {/* Блок занятости */}
                <div className="container d-flex flex-row mt-5 justify-content-center">
                    <ReserveCard />
                    <ChildrenListCard 
                        children={userList} 
                        setChildrenList={setUserList}
                        searchChildrenListButton={searchChildrenListButton}
                    />
                </div>
            </div>
        </div>
    )
});

export default AdminPanel;