import { ReactElement, useState, useRef } from "react";
import { observer } from "mobx-react-lite";

import ReserveCard from "./_adminPanel/ReserveCard";
import DateTimePicker from './_adminPanel/DateTimePicker';
import ChildrenListCard from "./_adminPanel/ChildrenListCard";

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