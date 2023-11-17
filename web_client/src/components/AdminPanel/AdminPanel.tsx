import { ReactElement, useState, useMemo } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import NavBar from "../Navigation/NavBar";
import { IMAGEDATA } from './Images';
import Image from 'react-bootstrap/Image';

import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import "./styles/adminPanel.css";

interface IUser {
    name: string;
    age: number;
}

interface IUserCard {
    user: IUser;
}

interface IProps {}

/**
 * Блок выбора даты и времени.
 */
const DateTimePicker = (props: IProps):ReactElement => {
    return (
        <div className="mt-5 pt-5 d-flex flex-row justify-content-evenly align-items-center">
            <div className="d-flex flex-row">
                <label className="mx-3 py-3 text-truncate">Выберите дату</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label='Выберите дату'/>
                </LocalizationProvider>
            </div>
            <div className="d-flex flex-row">
                <label className="mx-3 py-3 text-truncate">Выберите время</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label='Выберите время' />
                </LocalizationProvider>
            </div>
        </div>
    )
}

const ReserveCard = (props: IProps): ReactElement => {
    return (
        <div 
            className="d-flex flex-column align-items-center reserve-card shadow-lg mx-5 p-3"
        >
            {/* TODO: Переписать задание высоты и ширины в относительные размеры */}
            <Image 
                src={IMAGEDATA}
                className="reserve-card_image"
                width="350"
                height="300"
            />
            <div className="mt-4 search-container_reserve-text">Занятость площадки</div>
            <div>Сами ебитесь с этими кружочками</div>
            <button type="button" className="btn btn-warning mt-4 btn-lg rounded-pill">Изменить</button>
        </div>
    )
}

const User = (props: IUserCard): ReactElement => {
    return (
        <li className="list-group-item list-group-item-action align-items-center d-flex gap-4 py-3 px-1">
            <img className="rounded-circle flex-shrink-0" src={IMAGEDATA} width="50"/>
            <div className="
                border-bottom border-warning 
                d-flex justify-content-between 
                container-fluid w-100 
                py-3 px-0 
                align-items-center
            ">
                <span className="reserve-card_user-name text-truncate">{ props.user.name }</span>
                <span className="reserve-card_user-age text-truncate">Возраст { props.user.age }</span>
                <button type="button" className="btn btn-outline-warning btn-sm">Перейти к ребенку</button>
            </div>
        </li>
    )
}

const AdminPanel = (props: IProps): ReactElement => {
    const [userList, setUserList] = useState([
        {
            name: "Никита",
            age: 14
        }, 
        {
            name: "Даня",
            age: 15
        }, 
    ]);
    const childrenList = useMemo(() => {
        return userList.map(user => (
            <User user={user} />
        ))
    }, [userList]);

    /**
     * Блок списка детей.
     */
    const ChildrenListCard = (props: IProps): ReactElement => {
        return (
            <div 
                className="
                    d-flex flex-column align-items-center 
                    reserve-card_children-list-card 
                    shadow-lg py-4 px-2
                "
            >
                <div className="container-fluid">
                    <form className="d-flex">
                        <input 
                            className="form-control me-2 border border-warning" 
                            type="search" 
                            placeholder="Поиск" 
                            aria-label="Поиск" 
                        />
                        <button className="btn btn btn-outline-warning" type="submit">Поиск</button>
                    </form>
                </div>
                
                <div className="container-fluid mt-4">
                    <ul className="list-group-flush reserve-card_children-list px-0">
                        {childrenList}
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <>
            <NavBar />
            <div className="container-xl py-4">
                <div className="mt-5 text-center">
                    <h1 className="display-2">Личный кабинет администратора</h1>
                </div>
                <div className="container">
                    {/* Выбор даты и времени */}
                    <DateTimePicker />

                    {/* Блок занятости */}
                    <div className="container d-flex flex-row mt-5 justify-content-center">
                        <ReserveCard />
                        <ChildrenListCard />
                    </div>
                </div>
            </div>
        </>
        
    )
};

export default AdminPanel;