import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService, WindmillResponse } from './api.service';

// Supabase table interfaces
export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  plan: 'starter' | 'professional' | 'enterprise';
  features: string[];
  created_at: string;
  updated_at: string;
}

export interface AdAccount {
  id: string;
  tenant_id: string;
  platform: 'facebook' | 'google' | 'linkedin' | 'twitter';
  account_id: string;
  account_name: string;
  status: 'active' | 'paused' | 'disabled';
  created_at: string;
  updated_at: string;
}

export interface CampaignMetric {
  id: string;
  campaign_id: string;
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  created_at: string;
}

export interface DailySummary {
  id: string;
  tenant_id: string;
  date: string;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  total_spend: number;
  total_revenue: number;
  active_campaigns: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseDataService {
  private api = inject(ApiService);

  // Tenant operations
  getTenant(tenantId: string): Observable<Tenant> {
    return this.api.executeScript<Tenant>('tenants/get', { tenantId }).pipe(
      map(response => response.result)
    );
  }

  updateTenant(tenantId: string, updates: Partial<Tenant>): Observable<Tenant> {
    return this.api.executeScript<Tenant>('tenants/update', { tenantId, updates }).pipe(
      map(response => response.result)
    );
  }

  // Ad Account operations
  getAdAccounts(tenantId: string): Observable<AdAccount[]> {
    return this.api.executeScript<AdAccount[]>('ad-accounts/list', { tenantId }).pipe(
      map(response => response.result)
    );
  }

  createAdAccount(account: Omit<AdAccount, 'id' | 'created_at' | 'updated_at'>): Observable<AdAccount> {
    return this.api.executeScript<AdAccount>('ad-accounts/create', { account }).pipe(
      map(response => response.result)
    );
  }

  // Campaign Metrics operations
  getCampaignMetrics(campaignId: string, dateRange?: { start: string; end: string }): Observable<CampaignMetric[]> {
    return this.api.executeScript<CampaignMetric[]>('metrics/campaign', { 
      campaignId, 
      dateRange 
    }).pipe(
      map(response => response.result)
    );
  }

  // Daily Summary operations
  getDailySummaries(tenantId: string, dateRange?: { start: string; end: string }): Observable<DailySummary[]> {
    return this.api.executeScript<DailySummary[]>('summaries/daily', { 
      tenantId, 
      dateRange 
    }).pipe(
      map(response => response.result)
    );
  }

  // Sync operations
  triggerDataSync(tenantId: string, platform: string): Observable<{ jobId: string }> {
    return this.api.executeFlow<{ jobId: string }>('sync/trigger', { 
      tenantId, 
      platform 
    }).pipe(
      map(response => response.result)
    );
  }

  getSyncStatus(jobId: string): Observable<{ status: string; progress: number }> {
    return this.api.executeScript<{ status: string; progress: number }>('sync/status', { 
      jobId 
    }).pipe(
      map(response => response.result)
    );
  }
}
