export declare class DDPLogin {
    private plaintextToDigest(pass:String);
    private isEmail(addr:String);
    private attemptLogin(ddp, user, pass, options, cb);
    loginWithUsername(dpp, username: String, password: String, cb: Function): any;
    loginWithEmail(dpp, email: String, password: String, cb: Function): any;
    loginWithAccount(dpp, emailOrUsername: String, password: String, cb: Function): any;
    loginWithToken(ddp: any, token: String, cb: Function): any;
}
