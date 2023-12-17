import axios from 'axios';

export const CONSOLES_API_BASE_URL = (entity: string, action: string) => `http://localhost:8080/api/v1/${entity}/${action}`;

export function getChildrenList() {
    return axios.get(CONSOLES_API_BASE_URL('child', 'list'));
}

export function getParentReservationList(parent_id: number) {
    return axios.get(`http://localhost:8080/api/v1/reservation/events?parent_id=${parent_id}`);
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

export function getAdminChildrenList({date, time}: { date: string, time: string }) {
    return axios.get(CONSOLES_API_BASE_URL('console', 'admin_info'), {
        params: {
            date: date,
            time: time
        }
    });
}