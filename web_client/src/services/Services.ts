import axios from 'axios';
import { IReservation } from '../components/PrerecordingPage/PrerecordingPage';
export const CONSOLES_API_BASE_URL = (entity: string, action: string) => `http://localhost:8080/api/v1/${entity}/${action}`;

/** Получение списка детей */
export function getChildrenList(ageFilter?: boolean) {    
    return axios.get(CONSOLES_API_BASE_URL('child', 'list'), {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {
            age_filter: ageFilter
        }
    });
}

/** Получение занятости консолей. */
export function getConsolesOccupation() {
    return axios.get(CONSOLES_API_BASE_URL('reservation', 'occupancy'), {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export function getParentReservationList(parent_id: number) {
    return axios.get(`http://localhost:8080/api/v1/reservation/events?user_id=${parent_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

/** Добавление ребенка. */
export function addUserChild(
    { name, date, features, countVisites, user_id }: {
        name: string,
        date: Date,
        features: string | null,
        countVisites: number,
        user_id: number
    }
) {
    return axios.post(CONSOLES_API_BASE_URL('child', 'add'),
        {
            firstname: name,
            peculiarities: features,
            count_visit: countVisites, 
            user_id: user_id,
            birthdate: date
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
}

/** Обновление ребенка. */
export function updateUserChild(
    { name, features, child_id }: {
        name: string,
        features: string,
        child_id: number
    }
) {
    return axios.put(CONSOLES_API_BASE_URL('child', `update/${child_id}`),{ 
        id: child_id},
    
    {
            params: {
                firstname: name,
                peculiarities: features
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
}

/** Удаление ребенка. */
export function deleteUserChild(child_id:number) {
    return axios.delete(CONSOLES_API_BASE_URL('child', `delete/${child_id}`),
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

/** Получение списка детей админом. */
export function getAdminChildrenList({date, time}: { date: string, time: string }) {
    return axios.get(CONSOLES_API_BASE_URL('console', 'admin_info'), {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {
            date: date,
            time: time
        }
    });
}

/** Получение информации о пользователе. */
export async function getUserData() {
    return axios.get(CONSOLES_API_BASE_URL('user', 'info'), {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).catch(err => {
        throw new err;
    });
}

/** Добавление записи. */
export function addReservation({reservation}: {reservation: IReservation}) {    
    return axios.post(CONSOLES_API_BASE_URL('reservation', 'add'), {
            timeAndDate: reservation.timeAndDate,
            childId: reservation.childId,
            consoleId: reservation.consoleId,
            phone: reservation.phone
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
}

/** Получение статуса консолей. */
export function getConsolesStatusList(datetime: string) {    
    return axios.get(CONSOLES_API_BASE_URL('console', 'reservation_info'), {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {
            datetime: datetime
        }
    });
}

/** Подтверждение записи. */
export function confirmReservation(id: number) {
    return axios.put(CONSOLES_API_BASE_URL('reservation', `confirm/${id}`), { id: id }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

/** Удаление записи. */
export function deleteReservation(id: number) {
    return axios.delete(CONSOLES_API_BASE_URL('reservation', `delete/${id}`), {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}