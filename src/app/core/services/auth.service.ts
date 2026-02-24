import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, timer } from 'rxjs';
import { map, tap, catchError, switchMap, filter } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { User, AuthTokens, LoginRequest, LoginResponse } from '../models/auth.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private storage = inject(StorageService);
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private refreshTokenTimeout?: number;

  constructor() {
    this.loadStoredUser();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.authUrl}/login`, credentials).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): Observable<AuthTokens> {
    const refreshToken = this.storage.get(environment.auth.refreshTokenKey);
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthTokens>(`${environment.authUrl}/refresh`, { refreshToken }).pipe(
      tap(tokens => this.storeTokens(tokens)),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.storage.get(environment.auth.tokenKey);
    if (!token) return false;

    try {
      const decoded = jwtDecode(token) as any;
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  hasPermission(permission: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.permissions?.includes(permission) || false;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.roles?.includes(role) || false;
  }

  private handleAuthResponse(response: LoginResponse): void {
    this.storeTokens(response);
    this.currentUserSubject.next(response.user);
    this.startRefreshTokenTimer();
  }

  private storeTokens(tokens: AuthTokens): void {
    this.storage.set(environment.auth.tokenKey, tokens.accessToken);
    this.storage.set(environment.auth.refreshTokenKey, tokens.refreshToken);
  }

  private loadStoredUser(): void {
    const token = this.storage.get(environment.auth.tokenKey);
    if (token && this.isAuthenticated()) {
      try {
        const decoded = jwtDecode(token) as any;
        this.currentUserSubject.next(decoded.user);
        this.startRefreshTokenTimer();
      } catch {
        this.clearAuthData();
      }
    }
  }

  private startRefreshTokenTimer(): void {
    const token = this.storage.get(environment.auth.tokenKey);
    if (!token) return;

    try {
      const decoded = jwtDecode(token) as any;
      const expires = new Date(decoded.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000); // Refresh 1 min before expiry

      if (this.refreshTokenTimeout) {
        clearTimeout(this.refreshTokenTimeout);
      }

      this.refreshTokenTimeout = window.setTimeout(() => {
        this.refreshToken().subscribe();
      }, timeout);
    } catch {
      this.clearAuthData();
    }
  }

  private clearAuthData(): void {
    this.storage.remove(environment.auth.tokenKey);
    this.storage.remove(environment.auth.refreshTokenKey);
    this.currentUserSubject.next(null);
    
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }
}
