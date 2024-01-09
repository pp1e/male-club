import { ReactElement, useState, SetStateAction, Dispatch } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { 
    getAdminChildrenList
} from '../../../services/Services';


interface IUserReservation {
    name: string;
    age: number;
    key: string;
    recordID?: number;
}

interface IDatePickerProps {
    setUserList: Dispatch<SetStateAction<IUserReservation[]>>;
    searchChildrenListButton?: React.RefObject<HTMLButtonElement>;
}

const prepareChildrenList = (res: any) => (res.data || []).map((child: any) => ({
    name: child.childFirstname,
    age: child.childAge,
    key: child.childId,
    recordID: child.reservationId 
}));

/**
 * Блок выбора даты и времени.
 * @author Корюшкин Н.Е.
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

export default DateTimePicker;