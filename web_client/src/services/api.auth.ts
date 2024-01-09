import axios from 'axios';
import { CONSOLES_API_BASE_URL } from './Services';

/* Авторизация пользователя.
    Возвращает 
        406 - нет пользователя с таким телефоном
        409 - неправильный пароль
        200 - все ок
        201 - админ
*/
export function loginUser({ phone, password }: { phone: string, password: string }) {
    return axios.post('http://localhost:8080/api/v1/login', {
        phone: phone,
        password: password
    });
}

/* Регистрация пользователя.
    Возвращает 
        409 - уже зарегистрирован пользователь
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
            phone: encodeURI(phone),
            password: encodeURI(password)
        }
    );
}

/** Проверка валидности токена.
    Возвращает
        200 - все ок
        201 - админ
        408 - надо обновить токен
 */
export async function checkAuthToken() {
    return axios.get("http://localhost:8080/api/v1/check_access_token", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).catch(err => {
        throw new err;
    });
}

/**
 * Обновление токена.
 */
export function refreshToken() {
    return axios.post("http://localhost:8080/api/v1/refresh", null, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
        }
    });
}
    
/**
 * Выход из под пользователя.
 */
export function logout() {
    return axios.post("http://localhost:8080/api/v1/logout");
}