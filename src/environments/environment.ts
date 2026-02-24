export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
  authUrl: 'http://localhost:3000/auth',
  wsUrl: 'ws://localhost:3000',
  tenantId: 'dev-tenant',
  features: {
    analytics: true,
    campaigns: true,
    automation: true,
    reporting: true,
    aiAssistant: false
  },
  auth: {
    tokenKey: 'mkt_access_token',
    refreshTokenKey: 'mkt_refresh_token',
    tokenExpiry: 900, // 15 minutes
    refreshExpiry: 604800 // 7 days
  },
  storage: {
    prefix: 'mkt_'
  }
};
