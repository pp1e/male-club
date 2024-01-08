import { AxiosResponse } from "axios";
import { ReactElement, useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { getChildrenList, addReservation, getConsolesStatusList } from '../../services/Services'
import "./styles/prerecordingPage.css";

export interface IReservation {
    timeAndDate: Date,
    childId: number,
    consoleId: number,
    phone: string
}

export interface IConsole {
    console_id: number,
    name: string
}

interface IChild {
    id: number,
    name: string
}

interface IProps {}

const PrerecordingPage = (props: IProps): ReactElement => {
    const navigate = useNavigate();
    const minDate = new Date().toISOString().split('T')[0];
    const maxDate = new Date(+(new Date()) + 24 * 31 * 3600000).toISOString().split('T')[0];
    const childRef = useRef<HTMLSelectElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const [consoleList, setConsoleList] = useState<IConsole[]>([]);    
    const [childrenList, setChildrenList] = useState<IChild[]>([]);
    const phoneRef = useRef<HTMLInputElement>(null);    
    const timeRef = useRef<HTMLInputElement>(null);
    const consoleRef = useRef<HTMLSelectElement>(null);
    const [isChildSelected, setChildSelected] = useState(true);
    const [isDateSelected, setDateSelected] = useState(true);
    const [isTimeSelected, setTimeSelected] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);    
    const phoneRegExp: RegExp = /^((\+7)[\- ]?)(\(\d{3}\)|\d{3})[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})[\- ]?\d{1})$/;

    const [errorMessage, setErrorMessage] = useState('');

    const getChildValue = () => childRef.current?.value;
    const getDateValue = () => dateRef.current?.value;
    const getTimeValue = () => timeRef.current?.value;
    const getPhoneValue = () => phoneRef.current?.value;    
    const getConsoleValue = () => consoleRef.current?.value;
    const timeValueValidation = () => {
        if (timeRef.current?.value) {
            const curTimeArray = timeRef.current?.value.split(":");
            const curTime = new Date().setHours(+curTimeArray[0],+curTimeArray[1],0);
            const startTime = new Date().setHours(10,0,0);
            const endTime = new Date().setHours(21,30,0);
            return curTime >= startTime && curTime <= endTime;
        } else {
            return false;
        }
    };

    async function getAvailableConsoles(enteredDateTime: string) {
        const consoleList: IConsole[] = [];
        await getConsolesStatusList(enteredDateTime).then(result => {
            [...result.data].forEach((console: any) => {
                if (!console.is_reserved) {
                    consoleList.push({
                        console_id: console.id,
                        name: console.name
                    });
                }
            });
        });        
        return consoleList;
    }

    const onConsoleFocus = (event: any) => {
        if (!!getDateValue() && !!getTimeValue()){            
            const curDateTime = (new Date(+(new Date(`${getDateValue()!!} ${getTimeValue()!!}`)) + 3*3600000)).toISOString().slice(0, -1);
            getAvailableConsoles(curDateTime).then(result => 
                setConsoleList(result)
            );
        }
        else setConsoleList([]);
    };
    const consoleOptionsList = useMemo(() => {
        return consoleList?.map(console => (
            <option value={console.console_id} key={console.console_id}>{console.name}</option>
        ))
    }, [consoleList]);

    useEffect(() => {
        getChildrenList().then((result) => {
            const responseList = [...result.data];
            const curChildList: IChild[] = [];
            responseList.forEach(item => {
                curChildList.push({
                    id: item.id,
                    name: item.firstname
                })
            });
            setChildrenList(curChildList);
        });
    }, []);

    const childrenOptionsList = useMemo(() => {
        return childrenList?.map(child => (
            <option value={child.id} key={child.id}>{child.name}</option>
        ))
    }, [childrenList]);

    const setValidationStatuses = () => {
        setChildSelected(!!getChildValue());
        setDateSelected(!!getDateValue());
        setTimeSelected(timeValueValidation());
        setIsPhoneValid(!!getPhoneValue() && new RegExp(phoneRegExp).test(getPhoneValue()!!));
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        setValidationStatuses();
        if (!getChildValue() || !getDateValue() || !getTimeValue() || !getPhoneValue ) {
            return;
        } else {
            const curDateTime = new Date(+(new Date(`${getDateValue()!!} ${getTimeValue()!!}`)) + 3*3600000);
            const curReservation: IReservation = {
                timeAndDate: curDateTime,
                childId: +getChildValue()!!,
                consoleId: +getConsoleValue()!!,
                phone: getPhoneValue()!!
            };
            await addReservation({reservation:curReservation})
                .then((result: AxiosResponse<any, any>) => {
                    if (result.status === 200) {
                        setTimeout(() => navigate('/upcoming-events'), 2000);
                    }
                })
                .catch(errorData => {
                    if (errorData.message === "Request failed with status code 409") {
                        setErrorMessage("Не удалось произвести запись");
                    }
                });
        } 
    }

    return (
        <>
            <div className="container mt-5 py-5 d-flex flex-row justify-content-center">
                <div className="text-center login-page_container">
                    <h1 className="px-5 mb-4">Предварительная запись</h1>
                    <form method="POST" onSubmit={onSubmit}>
                        <div className="mb-4 prerecording-page__light-text">
                            <select
                                className={`form-select py-3 text-start ${isChildSelected ? 'border-warning' : 'is-invalid' } ${getChildValue() ? 'prerecording-page__dark-text' : 'prerecording-page__light-text'}`}
                                ref={childRef}
                            >
                                <option value="">Выберите ребенка</option>
                                {childrenOptionsList}
                            </select>
                            {
                                !isChildSelected ?
                                    <div className="invalid-feedback text-start px-2">
                                        * Выберите ребенка
                                    </div> 
                                : ""
                            }
                        </div>
                        <div className="mb-4">
                            <input
                                ref={dateRef}
                                name="date"
                                className={`form-control py-3 text-start border ${isDateSelected ? 'border-warning' : 'is-invalid border-danger prerecording-page__light-text'} ${getDateValue() ? 'prerecording-page__dark-text' : 'prerecording-page__light-text'}`}
                                type="date"
                                min={minDate}
                                max={maxDate}
                            />                                                
                            {
                                !isDateSelected ?
                                    <div className="invalid-feedback text-start px-2">
                                        * Выберите дату записи
                                    </div> 
                                : ""
                            }
                        </div>
                        <div className="mb-4">
                            <input
                                ref={timeRef}
                                name="time"
                                type="time"                                
                                step="300"
                                min="10:00"                                
                                max="21:30"
                                className={`form-control py-3 text-start border ${isTimeSelected ? 'border-warning' : 'is-invalid border-danger'} ${getTimeValue() ? 'prerecording-page__dark-text' : 'prerecording-page__light-text'}`} 
                            />
                            {
                                !isTimeSelected ?
                                    <div className="invalid-feedback px-2 text-start">
                                        * Выберите время в интервале 10:00-21:30
                                    </div> 
                                : ""
                            }
                        </div>
                        <div className="mb-3">
                            <input 
                                ref={phoneRef}
                                type="phone"
                                className={`form-control py-3 text-start border ${isPhoneValid ? 'border-warning' : 'is-invalid border-danger'} ${getPhoneValue() ? 'prerecording-page__dark-text' : 'prerecording-page__light-text'}`} 
                                placeholder="Введите контактный телефон"
                            />
                            {
                                !isPhoneValid ?
                                    <div className="invalid-feedback px-2 text-start">
                                        * Введите контактный телефон, начиная с +7
                                    </div> 
                                : ""
                            }
                        </div>
                        <div className="mb-5">
                            <select
                                className={`form-select py-3 text-start border-warning ${getConsoleValue() ? 'prerecording-page__dark-text' : 'prerecording-page__light-text'}`}
                                ref={consoleRef}
                                onFocus={onConsoleFocus}
                            >
                                <option value="">Выберите приставку</option>
                                {consoleOptionsList}
                            </select>
                            {
                                !consoleList.length && timeRef.current?.value && dateRef.current?.value ?
                                    <div className="prerecording-page__light-text px-2 text-start">
                                        * В выбранное время свободных приставок нет
                                    </div> 
                                : ""
                            }
                        </div>
                        <div className="text-danger mb-1">{errorMessage}</div>
                        <div>
                            <button 
                                type="submit" 
                                className="btn btn-warning px-5 py-4 border-0"
                            >
                                Забронировать
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>   
    )
};

export default PrerecordingPage;