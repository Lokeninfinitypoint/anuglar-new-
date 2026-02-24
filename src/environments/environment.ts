export const environment = {
  production: false,
  appwriteUrl: 'http://31.220.107.19/v1', // Appwrite on VPS 1
  appwriteProjectId: 'marketing-platform',
  windmillApiUrl: 'http://localhost:8000/api', // Windmill local
  supabaseUrl: 'http://localhost:8100', // Supabase API local
  tenantId: 'dev-tenant',
  features: {
    analytics: true,
    campaigns: true,
    automation: true,
    reporting: true,
    aiAssistant: false
  },
  auth: {
    sessionKey: 'appwrite_session',
    jwtKey: 'windmill_jwt',
    tokenExpiry: 900, // 15 minutes
    refreshExpiry: 604800 // 7 days
  },
  storage: {
    prefix: 'mkt_'
  }
};
