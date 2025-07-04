import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginPayload, AuthResponse } from './auth.type';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    /**
     * Setter & getter for authenticated flag
     */
    set authenticated(value: boolean) {
        this._authenticated = value;
    }

    get authenticated(): boolean {
        return this._authenticated;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post(`${environment.apiUrl}/auth/forgot-password`, email);
    }

    /**
     * Reset password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post(`${environment.apiUrl}/auth/reset-password`, password);
    }

    /**
     * Sign in
     * ส่ง payload { username, password } ไป backend
     */
    signIn(credentials: LoginPayload): Observable<AuthResponse> {
        // ปรับให้ส่ง username (ไม่ใช่ email)
        const payload = {
            username: credentials.username,
            password: credentials.password,
        };
        return this._httpClient.post<AuthResponse>(`${environment.apiUrl}/auth/signin`, payload).pipe(
            switchMap((response: AuthResponse) => {
                if (response && response.accessToken) {
                    this.accessToken = response.accessToken;
                    this._authenticated = true;
                    const decodedToken = AuthUtils.decodeToken(response.accessToken);
                    this._userService.user = {
                        ...this._userService.user,
                        ...decodedToken,
                    };
                } else {
                    this._authenticated = false;
                }
                return of(response);
            }),
            catchError((error) => {
                this._authenticated = false;
                return throwError(() => error);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        return this._httpClient
            .post(`${environment.apiUrl}/auth/sign-in-with-token`, {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() => of(false)),
                switchMap((response: any) => {
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }
                    this._authenticated = true;
                    const decodedToken = AuthUtils.decodeToken(response.accessToken);
                    this._userService.user = {
                        ...this._userService.user,
                        ...decodedToken,
                    };
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        localStorage.removeItem('accessToken');
        this._authenticated = false;
        return of(true);
    }

    /**
     * Sign up
     */
    signUp(user: {
        fullName: string;
        email: string;
        username?: string;
        password: string;
        companyName?: string;
        companyRegisterNo?: string;
        agreements?: boolean;
    }): Observable<any> {
        // ถ้าไม่มี username ให้ใช้ email เป็น username
        if (!user.username) {
            user.username = user.email;
        }
        return this._httpClient.post(`${environment.apiUrl}/auth/signup`, user).pipe(
            switchMap((response: any) => {
                if (response && response.accessToken) {
                    this.accessToken = response.accessToken;
                    this._authenticated = true;
                    const decodedToken = AuthUtils.decodeToken(response.accessToken);
                    this._userService.user = {
                        ...this._userService.user,
                        ...decodedToken,
                    };
                }
                return of(response);
            })
        );
    }

    /**
     * Unlock session
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post(`${environment.apiUrl}/auth/unlock-session`, credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        if (this._authenticated) {
            return of(true);
        }
        if (!this.accessToken) {
            return of(false);
        }
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }
        return this.signInUsingToken();
    }
}
