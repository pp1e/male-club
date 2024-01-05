import axios from 'axios';
import { IReservation } from '../components/PrerecordingPage/PrerecordingPage';
export const CONSOLES_API_BASE_URL = (entity: string, action: string) => `http://localhost:8080/api/v1/${entity}/${action}`;

export function getChildrenList() {    
    return axios.get(CONSOLES_API_BASE_URL('child', 'list'), {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export function getParentReservationList({parent_id}: {parent_id: number}) {
    return axios.get(CONSOLES_API_BASE_URL('reservation', 'events'), {
        params: {
            parent_id: parent_id
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

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
        }
    );
}

export function updateUserChild(
    { name, date, features, countVisites, user_id, child_id }: {
        name: string,
        date: Date,
        features: string | null,
        countVisites: number,
        user_id: number,
        child_id: number
    }
) {
    return axios.put(CONSOLES_API_BASE_URL('child', `update/${child_id}`),
        {
            firstname: name,
            peculiarities: features,
            user_id: user_id,
        }
    );
}

export function deleteUserChild(child_id:number) {
    return axios.delete(CONSOLES_API_BASE_URL('child', `delete/${child_id}`));
}

export function getAdminChildrenList({date, time}: { date: string, time: string }) {
    return axios.get(CONSOLES_API_BASE_URL('console', 'admin_info'), {
        params: {
            date: date,
            time: time
        }
    });
}

export function addReservation({reservation}: {reservation: IReservation}) {    
    return axios.post(CONSOLES_API_BASE_URL('reservation', 'add'), {
            reservation: reservation
        });
}
export function getConsolesStatusList(datetime: Date) {    
    return axios.get(CONSOLES_API_BASE_URL('reservation', 'reservation_info'), {
        params: {
            datetime: datetime.toISOString()
        }
    });
}