import { computed, makeAutoObservable, observable } from "mobx";
import { loginUser, refreshToken, logout, checkAuthToken } from "./services/api.auth";

class AuthStore {   
    // TODO: небезопасно, придумать валидное решение
    // (это чтобы при обновлении страницы не вылетала авторизация, 
    // хотя если ничего не придумаем-забьем хуй)
    @observable isAuth = !!localStorage.getItem('token');
    @observable isAdmin = !!localStorage.getItem('isAdmin');
    @observable isAuthInProgress = false;
  
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    @computed
    get getIsAuth() {
        return this.isAuth;
    }

    async login(phone: string, password: string) {
        this.isAuthInProgress = true;
        try {
            const response = await loginUser({phone, password});
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("refresh_token", response.data.refreshToken);
            this.isAuth = true;
            if (response.status === 201) {
                localStorage.setItem("isAdmin", "true");
                this.isAdmin = true;
            }
            return response.status;
        } catch (error: any) {
            console.log(error);
            if (error.response.status === 409) {
                return 409;
            } else if (error.response.status === 406) {
                return 406;
            }
        } finally {
            this.isAuthInProgress = false;
        }
    }

    async checkAuth() {
        this.isAuthInProgress = true;
        try {
            const isTokenValid = await checkAuthToken();
            if (!isTokenValid.data) {
                const resp = await refreshToken();
                localStorage.setItem("token", resp.data.accessToken);
                localStorage.setItem("refresh_token", resp.data.refreshToken);
            } else {
                this.isAuth = true;
            }
        } catch (err) {

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
            localStorage.clear();
        } catch (err) {
            console.log("logout error");
        } finally {
            this.isAuthInProgress = false;
        }
    }
}

export default new AuthStore();