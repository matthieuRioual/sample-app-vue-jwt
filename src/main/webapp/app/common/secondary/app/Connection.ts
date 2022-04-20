import { UserCredentialsDTO} from '@/common/domain/User';
import { AxiosHttp } from '@/http/AxiosHttp';
import {ConnectionService} from "@/common/domain/ConnectionService";
import {useLoggedInUserStore} from "@/common/domain/StoreService";

export default class Connection implements ConnectionService {
    private store: any;
    constructor(private axiosHttp: AxiosHttp) {
        this.store = useLoggedInUserStore();
    }

    async login(username: string,password:string,rememberMe?:boolean): Promise<void> {
        const userCredentials: UserCredentialsDTO= new UserCredentialsDTO(username,password);
        await this.axiosHttp.post('/api/authenticate', userCredentials)
            .then(result => {
            const bearerToken = result.headers.authorization;
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const jwt = bearerToken.slice(7, bearerToken.length);
                if (rememberMe) {
                    localStorage.setItem('jhi-authenticationToken', jwt);
                    sessionStorage.removeItem('jhi-authenticationToken');
                } else {
                    sessionStorage.setItem('jhi-authenticationToken', jwt);
                    localStorage.removeItem('jhi-authenticationToken');
                }
            }
        })
            .catch(()=>this.store.state.authenticateError=true);
    }

    /*async register(user: User): Promise<boolean> {
        const userDTO: UserDTO = toDataTransfertUser(user);
        await this.axiosHttp.post('/api/signin', userDTO).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('application-token', JSON.stringify(response.data));
            }
            return response.data;
        });
        return true;

    }*/



}