import {Module, VuexModule, Action, Mutation} from 'vuex-module-decorators'
import {AxiosResponse} from 'axios'
import http from "@/common/http";
import UserModel from "@/models/User";


@Module({ name: 'user', namespaced: true })
export default class User extends VuexModule {
    user: UserModel = new UserModel()

    get getUser(): UserModel {
        return this.user
    }

    @Mutation
    setUser(user: UserModel): void {
        this.user = user
    }

    @Action
    async login (credentials: { email: string, password: string }): Promise<AxiosResponse<UserModel>> {
        let response

        try {
            response = await http.post<{ token: string }>('login', credentials)

            http.defaults.headers['Authorization'] = 'Bearer ' + response.data.token
        } catch (e) {
            return new Promise<AxiosResponse<UserModel>> ((resolve, reject) => {
                reject({ message: 'Не верный логин или пароль!'})
            })
        }

        return http.get<UserModel>('me').then(response => {
            this.setUser(response.data)

            return response
        })
    }
}
