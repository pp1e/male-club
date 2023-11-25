import axios from 'axios';

const CONSOLES_API_BASE_URL = (entity: string, action: string) => `http://localhost:8080/api/v1/${entity}/${action}`;

export function getChildrenList() {
    return axios.get(CONSOLES_API_BASE_URL('child', 'list'));
}