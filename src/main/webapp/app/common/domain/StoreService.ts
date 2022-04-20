import { defineStore } from 'pinia';
import {User} from "@/common/domain/User";

// @ts-ignore
export const useLoggedInUserStore = defineStore({
    id: 'userStore',
    state: () => ({
        user: new User(),
        authenticateError: false
    }),

    getters: {
        isAuth(state) {
            return state.user.token != null;
        },
        getError(state) {
            return state.authenticateError;
        }
    },
    actions: {
        setUser(user: User) {
            this.user = user;
        },
        setError(boolean: boolean) {
            this.authenticateError = boolean;
        }
    }
});