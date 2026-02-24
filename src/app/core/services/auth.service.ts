import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, from } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, AppwriteSession, WindmillToken, LoginRequest, LoginResponse } from '../models/auth.model';
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
  
  private sessionRefreshTimeout?: number;

  constructor() {
    this.loadStoredUser();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Step 1: Authenticate with Appwrite
    const appwriteHeaders = new HttpHeaders({
      'X-Appwrite-Project': environment.appwriteProjectId,
      'Content-Type': 'application/json'
    });

    return this.http.post<AppwriteSession>(
      `${environment.appwriteUrl}/account/sessions/email`,
      {
        email: credentials.email,
        password: credentials.password
      },
      { headers: appwriteHeaders }
    ).pipe(
      switchMap(session => {
        // Step 2: Get user details from Appwrite
        return this.http.get<User>(
          `${environment.appwriteUrl}/account`,
          { 
            headers: appwriteHeaders.set('X-Appwrite-Session', session.$id)
          }
        ).pipe(
          switchMap(user => {
            // Step 3: Exchange Appwrite session for Windmill JWT
            return this.exchangeSessionForJWT(session, user, credentials.tenantId);
          })
        );
      }),
      tap(response => this.handleAuthResponse(response)),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    const sessionId = this.storage.get<string>(environment.auth.sessionKey);
    
    if (sessionId) {
      // Delete Appwrite session
      const headers = new HttpHeaders({
        'X-Appwrite-Project': environment.appwriteProjectId,
        'X-Appwrite-Session': sessionId
      });
      
      this.http.delete(`${environment.appwriteUrl}/account/sessions/${sessionId}`, { headers })
        .subscribe({
          error: (err) => console.error('Error deleting session:', err)
        });
    }
    
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }

  refreshSession(): Observable<WindmillToken> {
    const sessionId = this.storage.get<string>(environment.auth.sessionKey);
    if (!sessionId) {
      return throwError(() => new Error('No session available'));
    }

    // Get current session from Appwrite
    const headers = new HttpHeaders({
      'X-Appwrite-Project': environment.appwriteProjectId,
      'X-Appwrite-Session': sessionId
    });

    return this.http.get<AppwriteSession>(
      `${environment.appwriteUrl}/account/sessions/current`,
      { headers }
    ).pipe(
      switchMap(session => {
        return this.http.get<User>(
          `${environment.appwriteUrl}/account`,
          { headers }
        ).pipe(
          switchMap(user => {
            // Exchange for new Windmill JWT
            return this.exchangeSessionForJWT(session, user);
          })
        );
      }),
      map(response => response.windmillToken),
      tap(token => this.storeWindmillToken(token)),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  isAuthenticated(): boolean {
    const sessionId = this.storage.get<string>(environment.auth.sessionKey);
    const jwt = this.storage.get<string>(environment.auth.jwtKey);
    
    return !!(sessionId && jwt);
  }

  hasPermission(permission: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.permissions?.includes(permission) || false;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.roles?.includes(role) || false;
  }

  getWindmillToken(): string | null {
    return this.storage.get<string>(environment.auth.jwtKey);
  }

  private exchangeSessionForJWT(
    session: AppwriteSession, 
    user: User, 
    tenantId?: string
  ): Observable<LoginResponse> {
    // Call Windmill API to validate Appwrite session and get JWT
    return this.http.post<WindmillToken>(
      `${environment.windmillApiUrl}/auth/exchange`,
      {
        appwriteSessionId: session.$id,
        appwriteUserId: user.$id,
        tenantId: tenantId || user.tenantId || environment.tenantId
      }
    ).pipe(
      map(windmillToken => ({
        session,
        user,
        windmillToken
      }))
    );
  }

  private handleAuthResponse(response: LoginResponse): void {
    this.storage.set(environment.auth.sessionKey, response.session.$id);
    this.storeWindmillToken(response.windmillToken);
    this.currentUserSubject.next(response.user);
    this.startSessionRefreshTimer(response.windmillToken.expiresIn);
  }

  private storeWindmillToken(token: WindmillToken): void {
    this.storage.set(environment.auth.jwtKey, token.jwt);
  }

  private loadStoredUser(): void {
    const sessionId = this.storage.get<string>(environment.auth.sessionKey);
    const jwt = this.storage.get<string>(environment.auth.jwtKey);
    
    if (sessionId && jwt) {
      // Verify session is still valid
      const headers = new HttpHeaders({
        'X-Appwrite-Project': environment.appwriteProjectId,
        'X-Appwrite-Session': sessionId
      });
      
      this.http.get<User>(`${environment.appwriteUrl}/account`, { headers })
        .subscribe({
          next: (user) => {
            this.currentUserSubject.next(user);
            // Refresh JWT
            this.refreshSession().subscribe();
          },
          error: () => {
            this.clearAuthData();
          }
        });
    }
  }

  private startSessionRefreshTimer(expiresIn: number): void {
    // Refresh 5 minutes before expiry
    const timeout = (expiresIn - 300) * 1000;
    
    if (this.sessionRefreshTimeout) {
      clearTimeout(this.sessionRefreshTimeout);
    }

    this.sessionRefreshTimeout = window.setTimeout(() => {
      this.refreshSession().subscribe();
    }, timeout);
  }

  private clearAuthData(): void {
    this.storage.remove(environment.auth.sessionKey);
    this.storage.remove(environment.auth.jwtKey);
    this.currentUserSubject.next(null);
    
    if (this.sessionRefreshTimeout) {
      clearTimeout(this.sessionRefreshTimeout);
    }
  }
}
