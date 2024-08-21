import { DOCUMENT } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { APP_AUTH_CONST } from "../consts/message";
import { authentication, SecretKey } from "../consts/const";
import { SignUp } from "../models/Auth/SignUp";
import { HttpClient } from "@angular/common/http";
import { Global } from "../shared/global";
import { Observable, tap } from "rxjs";
import * as CryptoJS from 'crypto-js';
import { LogIn } from "../models/Auth/LogIn";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private document = inject(DOCUMENT);
    private http = inject(HttpClient);

    getAuthToken(): string | undefined | null {
        try {
            const localStorage = this.document.defaultView?.localStorage;
            const encryptedData: any = localStorage?.getItem(APP_AUTH_CONST);
            let token: string | undefined;
            if (encryptedData) {
                const bytes = CryptoJS.AES.decrypt(encryptedData, SecretKey);
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                token = decryptedData.token;
            }
            return token;
        } catch {
            return null;
        }
    }

    signUp(signUp: SignUp): Observable<any> {
        return this.http
            .post<any>(`${Global.WebUrl}${authentication.userSignUp}`, signUp)
            .pipe(
                tap((res: any) => {
                    return res;
                })
            );
    }

    logIn(logIn: LogIn): Observable<any> {
        return this.http
            .post<any>(`${Global.WebUrl}${authentication.userlogin}`, logIn)
            .pipe(
                tap((res: any) => {
                    return res;
                })
            );
    }

    userIsLogin(): boolean {
        const localStorage = this.document.defaultView?.localStorage;
        if (localStorage?.getItem(APP_AUTH_CONST)) {
            return true;
        } else {
            return false;
        }
    }
    getAuthUser(): string | undefined | null {
        const localStorage = this.document.defaultView?.localStorage;
        return localStorage?.getItem(APP_AUTH_CONST);
      }

    getValueFromStorage(storageKey: string): any {
        try {
            const localStorage = this.document.defaultView?.localStorage;
            const value = localStorage?.getItem(storageKey);
            return value ? this.decryptValue(value) : null;
        } catch (error) {
            return null;
        }
    }
    setValueInStorage(stroageKey: string, value: any): boolean {
        try {
            const localStorage = this.document.defaultView?.localStorage!;
            if (localStorage) {
                localStorage.setItem(stroageKey, this.encryptValue(value));
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    private decryptValue(value: string): any {
        const bytes = CryptoJS.AES.decrypt(value, SecretKey);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    private encryptValue(value: any): string {
        return CryptoJS.AES.encrypt(JSON.stringify(value), SecretKey).toString();
    }

}
