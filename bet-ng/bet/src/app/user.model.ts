export class User{
    isloggedIn: boolean=false;
    username: string;
    password: string;
    roles: string[];
    state: string="";
    betsHistory: any=[];

    constructor(username, password){
        this.username=username;
        this.password=password;
    }
}