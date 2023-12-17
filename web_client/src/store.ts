import { makeAutoObservable } from "mobx";
import { loginUser, refreshToken, logout } from "./services/api.auth";

class AuthStore {   
    isAuth = false;
    isAdmin = false;
    isAuthInProgress = false;
  
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async login(phone: string, password: string) {
        this.isAuthInProgress = true;
        try {
            const response = await loginUser({phone, password});
            localStorage.setItem("token", response.data.accessToken);
            this.isAuth = true;
            if (response.status === 201) {
                this.isAdmin = false;
            }
            return response.status;
        } catch (error: any) {
            if (error.message === 'Request failed with status code 409') {
                return 409;
                // setIsPasswordValid(false);
                // setErrorPasswordMessage('Пароль введен неверно!');
            } else if (error.message === 'Request failed with status code 406') {
                return 406
                // setIsPhoneValid(false);
                // setErrorPhoneMessage('Номера телефона не существует!');
            }
        } finally {
            this.isAuthInProgress = false;
        }
    }

    async checkAuth() {
        this.isAuthInProgress = true;
        try {
            const resp = await refreshToken();
            localStorage.setItem("token", resp.data.accessToken);
            this.isAuth = true;
        } catch (err) {
            console.log("login error");
        } finally {
            this.isAuthInProgress = false;
        } 
    }

    async logout() {
        this.isAuthInProgress = true;
        try {
            await logout();
            this.isAuth = false;
            this.isAdmin = false;
            localStorage.removeItem("token");
        } catch (err) {
            console.log("logout error");
        } finally {
            this.isAuthInProgress = false;
        } 
    }
}

export default new AuthStore();