import { ReactElement, useState, useMemo } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import NavBar from "../Navigation/NavBar";
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

interface IProps {
    test?: object;
}

const IMAGEDATA = "data:image/jpeg;base64,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"
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
                className="reserve-image"
                width="350"
                height="300"
            />
            <div className="mt-4 reserve-text">Занятость площадки</div>
            <div>Сами ебитесь с этими кружочками</div>
            <button type="button" className="btn btn-warning mt-4 btn-lg rounded-pill">Изменить</button>
        </div>
    )
}

const User = (props: IUserCard): ReactElement => {
    return (
        <li className="list-group-item list-group-item-action align-items-center d-flex gap-4 py-3 px-1">
            <img className="rounded-circle flex-shrink-0" src={IMAGEDATA} width="50"/>
            <div className="border-bottom border-warning d-flex justify-content-between container-fluid w-100 py-3 px-0 align-items-center">
                <span className="user-name text-truncate">{ props.user.name }</span>
                <span className="user-age text-truncate">Возраст { props.user.age }</span>
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
                className="d-flex flex-column align-items-center children-list-card shadow-lg py-4 px-2"
            >
                <div className="container-fluid">
                    <form className="d-flex">
                        <input className="form-control me-2 border border-warning" type="search" placeholder="Поиск" aria-label="Поиск" />
                        <button className="btn btn btn-outline-warning" type="submit">Поиск</button>
                    </form>
                </div>
                
                <div className="container-fluid mt-4">
                    <ul className="list-group-flush children-list px-0">
                        {childrenList}
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <>
            <NavBar />
            <div className="container-xl">
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