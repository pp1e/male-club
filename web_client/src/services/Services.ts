import axios from 'axios';

const CONSOLES_API_BASE_URL = (entity: string, action: string) => `http://localhost:8080/api/v1/${entity}/${action}`;

export function getChildrenList() {
    return axios.get(CONSOLES_API_BASE_URL('child', 'list'));
}


/* Возвращает 
    406 - нет пользователя с таким телефоном
    409 - неправильный пароль
    200 - все ок
    201 - админ
*/
export function loginUser() {
    return axios.get(CONSOLES_API_BASE_URL('user', 'check_success_login'), {
        params: {
            phone: encodeURI(''),// TODO: передать телефон с + начинать
            password: ''// TODO: передать пароль
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

export function getUserReservationList() {
    return axios.get(CONSOLES_API_BASE_URL('user', 'list'));
}

export function getUserChildrenList() {
    return axios.get(CONSOLES_API_BASE_URL('child', 'list'));
}