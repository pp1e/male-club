import { computed, makeAutoObservable, observable } from "mobx";
import { loginUser, refreshToken, logout, checkAuthToken } from "./services/api.auth";

class AuthStore {   
    // TODO: небезопасно, придумать валидное решение
    // (это чтобы при обновлении страницы не вылетала авторизация, 
    // хотя если ничего не придумаем-забьем хуй)
    @observable isAuth = !!localStorage.getItem('token');
    @observable isAdmin = !!localStorage.getItem('isAdmin');
    @observable isAuthInProgress = false;
    @observable userId = "";
    @observable userPhone = "";
    @observable userInitials = "";
  
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    @computed
    get getIsAuth() {
        return this.isAuth;
    }

    @computed
    get getIsAdmin() {
        return this.isAdmin;
    }

    @computed
    get getUserId() {
        return this.userId;
    }

    @computed
    get getUserPhone() {
        return this.userPhone;
    }

    @computed
    get getUserInitials() {
        return this.userInitials;
    }

    async login(phone: string, password: string) {
        this.isAuthInProgress = true;
        try {
            const response = await loginUser({phone, password});
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("refresh_token", response.data.refreshToken);
            this.userId = response.data.id;
            this.userPhone = response.data.phone;
            this.userInitials = response.data.initials;
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
            isTokenValid.data && (this.isAuth = true);
        } catch (err: any) {
            if (err.response?.status === 408) {
                try {
                    const resp = await refreshToken();
                    localStorage.setItem("token", resp.data.accessToken);
                    localStorage.setItem("refresh_token", resp.data.refreshToken);
                    this.isAuth = true;
                } catch (error) {
                    this.clearUserData();
                    console.log("Нужно авторизоваться!");
                }    
            }
        } finally {
            this.isAuthInProgress = false;
        } 
    }

    async logout() {
        this.isAuthInProgress = true;
        try {
            await logout();
            this.clearUserData();
        } catch (err) {
            console.log("Ошибка с выходом");
        } finally {
            this.isAuthInProgress = false;
        }
    }

    clearUserData() {
        this.isAuth = false;
        this.isAdmin = false;
        this.userId = "";
        this.userPhone = "";
        this.userInitials = "";
        localStorage.clear();
    }
}

export default new AuthStore();