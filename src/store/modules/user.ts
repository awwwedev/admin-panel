import {Module, VuexModule, Action, Mutation} from 'vuex-module-decorators'
import {AxiosResponse} from 'axios'
import http from "@/common/http";
import UserModel from "@/models/User";


@Module({ name: 'user', namespaced: true })
export default class User extends VuexModule {
    user: UserModel = new UserModel()
    isLogged = false
    inInitState = false

    get getUser(): UserModel {
        return this.user
    }
    get getIsLogged(): boolean {
        return this.isLogged
    }
    get getInInitState(): boolean {
        return this.inInitState
    }

    @Mutation
    setUser(user: UserModel): void {
        this.user = user
    }
    @Mutation
    setIsLogged(isLogged: boolean): void {
        this.isLogged = isLogged
    }
    @Mutation
    setInInitState(inLoginState: boolean): void {
        this.inInitState = inLoginState
    }

    @Action
    login (credentials: { email: string, password: string }): Promise<AxiosResponse<{ token: string }>> {
        return http.post<{ token: string }>('login', credentials)
    }
    @Action
    async initUser (): Promise<AxiosResponse<UserModel>> {
        this.setInInitState(true)

        return http.get<UserModel>('user/byToken').then(response => {
            this.setUser(response.data)
            this.setIsLogged(true)
            this.setInInitState(false)

            return response
        })
    }
}
