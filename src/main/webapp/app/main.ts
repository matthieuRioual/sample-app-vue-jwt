import { createApp } from 'vue';
import App from './common/primary/app/App.vue';
import router from './router/router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import {useLoggedInUserStore} from "@/common/domain/StoreService";
// jhipster-needle-main-ts-import

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
router.beforeEach(async (to) => {
    const user = useLoggedInUserStore();
    const isAuth = user.isAuth;

    console.log(user) // user is defined

    if (!isAuth && to.name !== 'Login') //avoid Login loop
        return {name: 'Login'};
});
app.use(router);
// jhipster-needle-main-ts-provider
app.mount('#app');
