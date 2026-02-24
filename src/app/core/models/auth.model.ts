export interface User {
  $id: string; // Appwrite user ID
  email: string;
  name: string;
  tenantId: string;
  roles: string[];
  permissions: string[];
  prefs: Record<string, any>;
  registration: number;
  status: boolean;
  labels?: string[];
}

export interface AppwriteSession {
  $id: string;
  $createdAt: string;
  userId: string;
  expire: string;
  provider: string;
  providerUid: string;
  providerAccessToken: string;
  providerAccessTokenExpiry: string;
  providerRefreshToken: string;
  ip: string;
  osCode: string;
  osName: string;
  osVersion: string;
  clientType: string;
  clientCode: string;
  clientName: string;
  clientVersion: string;
  clientEngine: string;
  clientEngineVersion: string;
  deviceName: string;
  deviceBrand: string;
  deviceModel: string;
  countryCode: string;
  countryName: string;
  current: boolean;
}

export interface WindmillToken {
  jwt: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  tenantId?: string;
}

export interface LoginResponse {
  session: AppwriteSession;
  user: User;
  windmillToken: WindmillToken;
}

export interface TenantInfo {
  id: string;
  name: string;
  subdomain: string;
  plan: 'starter' | 'professional' | 'enterprise';
  features: string[];
  created_at: string;
  updated_at: string;
}
