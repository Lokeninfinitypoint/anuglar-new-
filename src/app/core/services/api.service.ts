import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface WindmillResponse<T> {
  result: T;
  error?: string;
  success: boolean;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private windmillUrl = environment.windmillApiUrl;

  // Windmill API endpoints - these will execute scripts that query Supabase
  get<T>(endpoint: string, params?: QueryParams): Observable<WindmillResponse<T>> {
    const httpParams = this.buildParams(params);
    return this.http.get<WindmillResponse<T>>(`${this.windmillUrl}/w/marketing/${endpoint}`, { params: httpParams });
  }

  post<T>(endpoint: string, data: any): Observable<WindmillResponse<T>> {
    return this.http.post<WindmillResponse<T>>(`${this.windmillUrl}/w/marketing/${endpoint}`, data);
  }

  put<T>(endpoint: string, data: any): Observable<WindmillResponse<T>> {
    return this.http.put<WindmillResponse<T>>(`${this.windmillUrl}/w/marketing/${endpoint}`, data);
  }

  patch<T>(endpoint: string, data: any): Observable<WindmillResponse<T>> {
    return this.http.patch<WindmillResponse<T>>(`${this.windmillUrl}/w/marketing/${endpoint}`, data);
  }

  delete<T>(endpoint: string): Observable<WindmillResponse<T>> {
    return this.http.delete<WindmillResponse<T>>(`${this.windmillUrl}/w/marketing/${endpoint}`);
  }

  // Execute a Windmill script directly
  executeScript<T>(scriptPath: string, args: Record<string, any>): Observable<WindmillResponse<T>> {
    return this.http.post<WindmillResponse<T>>(
      `${this.windmillUrl}/w/marketing/jobs/run/p/${scriptPath}`,
      args
    );
  }

  // Execute a Windmill flow
  executeFlow<T>(flowPath: string, args: Record<string, any>): Observable<WindmillResponse<T>> {
    return this.http.post<WindmillResponse<T>>(
      `${this.windmillUrl}/w/marketing/jobs/run/f/${flowPath}`,
      args
    );
  }

  upload<T>(endpoint: string, file: File, additionalData?: any): Observable<WindmillResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    return this.http.post<WindmillResponse<T>>(`${this.windmillUrl}/w/marketing/${endpoint}`, formData);
  }

  private buildParams(params?: QueryParams): HttpParams {
    let httpParams = new HttpParams();

    if (!params) return httpParams;

    if (params.page !== undefined) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params.limit !== undefined) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    if (params.sort) {
      httpParams = httpParams.set('sort', params.sort);
    }
    if (params.order) {
      httpParams = httpParams.set('order', params.order);
    }
    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }
    if (params.filters) {
      Object.keys(params.filters).forEach(key => {
        httpParams = httpParams.set(key, params.filters![key]);
      });
    }

    return httpParams;
  }
}
