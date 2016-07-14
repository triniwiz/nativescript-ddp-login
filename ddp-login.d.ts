export declare class DDPLogin {
    loginWithUsername(dpp, username: String, password: String, cb: Function): any;
    loginWithEmail(dpp, email: String, password: String, cb: Function): any;
    loginWithAccount(dpp, emailOrUsername: String, password: String, cb: Function): any;
    loginWithToken(ddp: any, token: String, cb: Function): any;
}
