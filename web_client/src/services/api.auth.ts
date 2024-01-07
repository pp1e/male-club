import axios from 'axios';
import { CONSOLES_API_BASE_URL } from './Services';

/* Возвращает 
    406 - нет пользователя с таким телефоном
    409 - неправильный пароль
    200 - все ок
    201 - админ
*/
export function loginUser({ phone, password }: { phone: string, password: string }) {
    return axios.post(`http://localhost:8080/api/v1/login?phone=${phone}&password=${password}`);
}

/* Возвращает 
    409 - уже зареган пользователь
    200 - все ок
*/
export function registryUser(
    { firstName, lastName, patronymic, phone, password }: {
        firstName: string,
        lastName: string,
        patronymic?: string,
        phone: string,
        password: string
    }
) {
    return axios.post(CONSOLES_API_BASE_URL('user', 'add'),
        {
            firstname: firstName,
            lastname: lastName,
            patronymic: patronymic, 
            phone: phone,
            password: password
        }
    );
}

export async function checkAuthToken() {
    return axios.get("http://localhost:8080/api/v1/check_access_token", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).catch(err => {
        throw new err;
    });
}

export function refreshToken() {
    return axios.post("http://localhost:8080/api/v1/refresh", null, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
        }
    });
}
    
export function logout() {
    return axios.post("http://localhost:8080/api/v1/logout");
}