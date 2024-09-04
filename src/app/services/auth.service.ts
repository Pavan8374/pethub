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
import { jwtDecode } from "jwt-decode";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private document = inject(DOCUMENT);
    private http = inject(HttpClient);
    private readonly ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    
    getAuthToken(): string | undefined | null {
        try {
            const localStorage = this.document.defaultView?.localStorage;
            const encryptedData: any = localStorage?.getItem(APP_AUTH_CONST);
            let token: string | undefined;
            if (encryptedData) {
                const bytes = CryptoJS.AES.decrypt(encryptedData, SecretKey);
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                token = decryptedData;
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
        if (!this.isTokenExpired()) {
            return true;
        } else {
            return false;
        }
    }

    isAdmin(): boolean {
        const token = this.getAuthToken();
        if (token) {
            if (token && this.getRole() == 'Admin') {
                return true;
            }
            return false;
        }
        return false;
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

    decodeToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error('Failed to decode token', error);
            return null;
        }
    }

    // Method to check if the user has a specific role
    hasRole(token: string, role: string): boolean {
        const decodedToken = this.decodeToken(token);
        const roles = decodedToken?.[this.ROLE_CLAIM] || '';
        return roles === role;
    }

    isTokenExpired(): boolean {
        const token = this.getAuthToken();
        if(token == null || token == ""){
            return true;
        }
        if (token) {
            const decodedToken = this.decodeToken(token);
            if (!decodedToken) {
                console.log("Token couldn't be decoded");
                return true;
            }
            const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
            const currentTime = Date.now();
            // console.log("Current time:", new Date(currentTime).toISOString());
            // console.log("Expiration time:", new Date(expirationTime).toISOString());
            // console.log("Time until expiration:", (expirationTime - currentTime) / (1000 * 60 * 60 * 24), "days");
            return currentTime > expirationTime;
        }
        
        return false;
    }

    getRole(): string | null {
        const token = this.getAuthToken();
        if (token) {
            const decodedToken = this.decodeToken(token);
            if (!decodedToken) {
                return null;
            }

            return decodedToken[this.ROLE_CLAIM] || null;
        }
        return null;
    }


    clearAuthToken(): void {
        const localStorage = this.document.defaultView?.localStorage;
        if (localStorage) {
            localStorage.removeItem(APP_AUTH_CONST);
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
