import { LoginAction } from './login-action';


export class LoginUser implements LoginAction {
    user: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        role: string,
        newUser: boolean,
        hmac?: boolean,
        redirect?: string,
        createdAt: Date,
        updatedAt: Date,
    };
    token: string;
    expiresIn: number;

    constructor(user: {
        id: number, firstName: string; lastName: string; email: string;
        role: string, newUser: boolean, createdAt: Date, updatedAt: Date
    },
        token: string, expiresIn: number) {
        this.user = user;
        this.token = token;
        this.expiresIn = expiresIn;
    }
}

