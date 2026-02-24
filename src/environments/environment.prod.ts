export const environment = {
  production: true,
  appwriteUrl: 'https://31.220.107.19/v1', // Appwrite on VPS 1
  appwriteProjectId: 'marketing-platform',
  windmillApiUrl: 'https://wm.marketingtool.pro/api', // Windmill on VPS 1
  supabaseUrl: '${SUPABASE_URL}', // Will be configured in deployment
  tenantId: '${TENANT_ID}',
  features: {
    analytics: true,
    campaigns: true,
    automation: true,
    reporting: true,
    aiAssistant: true
  },
  auth: {
    sessionKey: 'appwrite_session',
    jwtKey: 'windmill_jwt',
    tokenExpiry: 900,
    refreshExpiry: 604800
  },
  storage: {
    prefix: 'mkt_'
  }
};
