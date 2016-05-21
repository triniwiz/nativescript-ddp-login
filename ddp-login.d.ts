export declare class DDPLogin {
    private plaintextToDigest(pass);
    private isEmail(addr);
    private attemptLogin(ddp, user, pass, options, cb);
    loginWithUsername(ddp: any, username: any, password: any, options: any, cb: any): any;
    loginWithEmail(ddp: any, email: any, password: any, options: any, cb: any): any;
    loginWithAccount(ddp: any, account: any, password: any, options: any, cb: any): any;
    loginWithToken(ddp: any, token: any, cb: any): any;
}
