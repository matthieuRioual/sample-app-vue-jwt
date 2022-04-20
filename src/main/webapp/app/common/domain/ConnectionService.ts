export interface ConnectionService {
    login(username: string,password:string,rememberMe?:boolean): Promise<void>;
}
