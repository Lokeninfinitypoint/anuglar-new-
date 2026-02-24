export const environment = {
  production: true,
  apiUrl: 'https://api.marketingplatform.com/v1',
  authUrl: 'https://auth.marketingplatform.com',
  wsUrl: 'wss://ws.marketingplatform.com',
  tenantId: '${TENANT_ID}',
  features: {
    analytics: true,
    campaigns: true,
    automation: true,
    reporting: true,
    aiAssistant: true
  },
  auth: {
    tokenKey: 'mkt_access_token',
    refreshTokenKey: 'mkt_refresh_token',
    tokenExpiry: 900,
    refreshExpiry: 604800
  },
  storage: {
    prefix: 'mkt_'
  }
};
