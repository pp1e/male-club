import axios from 'axios';

const CONSOLES_API_BASE_URL = "http://localhost:8080/api/v1/consoles";

class ConsolesService {

    getConsoles(){
        return axios.get(CONSOLES_API_BASE_URL);
    }
}

export default new ConsolesService()