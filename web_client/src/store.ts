import { computed, makeAutoObservable, observable, runInAction } from "mobx";
import { loginUser, refreshToken, logout, checkAuthToken } from "./services/api.auth";
import { getUserData } from "./services/Services";

class AuthStore {
    @observable isAuth = false;
    @observable isAdmin = false;
    @observable isAuthInProgress = false;
    @observable userId: null | number = null;
    @observable userPhone = "";
    @observable userInitials = "";
  
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.fillUserData();
    }

    @computed
    get getIsAuth() {
        return this.isAuth;
    }

    @computed
    get getIsAuthInProgress() {
        return this.isAuthInProgress;
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

    setAuthInProgress = (status: boolean) => {
        this.isAuthInProgress = status;
    }

    setIsAuth = (isAuth: boolean) => {
        this.isAuth = isAuth;
    }

    setIsAdmin = (isAdmin: boolean) => {
        this.isAdmin = isAdmin;
    }

    setUserID = (userID: number) => {
        this.userId = userID;
    }

    setUserInitials = (userInitials: string) => {
        this.userInitials = userInitials;
    }

    setUserPhone = (userPhone: string) => {
        this.userPhone = userPhone;
    }

    async fillUserData () {
        this.setAuthInProgress(true);
        try {
            const authTokenRes = await checkAuthToken();
            const getUserDataRes = await getUserData();
            runInAction(() => {
                this.isAuth = authTokenRes.data;
                this.isAdmin = authTokenRes.status === 201;
                this.userId = getUserDataRes.data.id;
                this.userInitials = getUserDataRes.data.initials;
                this.userPhone = getUserDataRes.data.phone;
            });
        } catch (err: any) {
            this.refreshToken();
        } finally {
            this.setAuthInProgress(false);
        } 
    }

    async login(phone: string, password: string) {
        try {
            const response = await loginUser({phone, password});
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("refresh_token", response.data.refreshToken);
            runInAction(() => {
                this.userId = response.data.id;
                this.userPhone = response.data.phone;
                this.userInitials = response.data.initials;
                this.isAuth = true;
            });
            if (response.status === 201) {
                localStorage.setItem("isAdmin", "true");
                this.setIsAdmin(true);
            }
            return response.status;
        } catch (error: any) {
            if (error.response.status === 409) {
                return 409;
            } else if (error.response.status === 406) {
                return 406;
            }
        }
    }

    async refreshToken() {
        try {
            const resp = await refreshToken();
            console.log(resp.data, resp.status);
            localStorage.setItem("token", resp.data.accessToken);
            localStorage.setItem("refresh_token", resp.data.refreshToken);
            this.setIsAuth(true);
            this.setIsAdmin(resp.status === 201);
        } catch (error) {
            logout();
        }
    }

    async logout() {
        try {
            this.clearUserData();
            await logout();
        } catch (err) {
            console.log("Ошибка с выходом");
        }
    }

    clearUserData() {
        runInAction(() => {
            this.isAuth = false;
            this.isAdmin = false;
            this.userId = null;
            this.userPhone = "";
            this.userInitials = "";
        });
        localStorage.clear();
    }
}

export default new AuthStore();