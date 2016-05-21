export declare class DDPLogin {
    private static plaintextToDigest(pass);
    private static isEmail(addr);
    private static attemptLogin(ddp, user, pass, options, cb);
    static loginWithUsername(ddp: any, username: any, password: any, options: any, cb: any): any;
    static loginWithEmail(ddp: any, email: any, password: any, options: any, cb: any): any;
    static loginWithAccount(ddp: any, account: any, password: any, options: any, cb: any): any;
    static loginWithToken: (ddp: any, token: any, cb: any) => any;
}
