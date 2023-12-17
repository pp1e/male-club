import axios from 'axios';
import { instance } from "../api.config";
import { CONSOLES_API_BASE_URL } from './Services';

/* Возвращает 
    406 - нет пользователя с таким телефоном
    409 - неправильный пароль
    200 - все ок
    201 - админ
*/
export function loginUser({ phone, password }: { phone: string, password: string }) {
    return axios.get(CONSOLES_API_BASE_URL('user', 'check_success_login'), {
        params: {
            phone: encodeURI(phone),
            password: encodeURI(password)
        }
    });
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
    
export function refreshToken() {
    return instance.get("/api/refresh");
}
    
export function logout() {
    return instance.post("/user/logout");
}