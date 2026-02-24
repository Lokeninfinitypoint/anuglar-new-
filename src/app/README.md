# Marketing Automation Platform - Architecture

## Infrastructure Overview

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│   Angular Frontend  │────▶│   Windmill API      │────▶│   Supabase DB       │
│   (localhost:5174)  │     │   (localhost:8000)  │     │   (localhost:8100)  │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
           │                            │
           │                            │
           ▼                            │
┌─────────────────────┐                 │
│   Appwrite Auth     │◀────────────────┘
│   (31.220.107.19)   │
└─────────────────────┘
```

### Service Locations

| Service | Purpose | Location |
|---------|---------|----------|
| **Appwrite** | Authentication only | VPS 1 (31.220.107.19) |
| **Windmill** | Business logic & API | Local Docker + VPS 1 (wm.marketingtool.pro) |
| **Supabase** | PostgreSQL with RLS | Local Docker (API: 8100, Studio: 3000) |
| **Angular** | Frontend application | Local development (localhost:5174) |

## Folder Structure

```
src/
├── app/
│   ├── core/                    # Core functionality (singleton services, guards, interceptors)
│   │   ├── guards/             # Route guards
│   │   ├── interceptors/       # HTTP interceptors
│   │   ├── models/             # Core data models
│   │   ├── services/           # Singleton services
│   │   └── store/              # Global state management
│   │
│   ├── features/               # Feature modules (lazy loaded)
│   │   ├── auth/              # Authentication feature
│   │   ├── dashboard/         # Dashboard feature
│   │   ├── campaigns/         # Campaign management
│   │   ├── contacts/          # Contact management
│   │   ├── automation/        # Marketing automation
│   │   ├── analytics/         # Analytics & reporting
│   │   └── settings/          # User & tenant settings
│   │
│   ├── shared/                # Shared resources
│   │   ├── components/        # Reusable components
│   │   ├── directives/        # Custom directives
│   │   ├── pipes/             # Custom pipes
│   │   ├── services/          # Shared services
│   │   └── utils/             # Utility functions
│   │
│   └── layouts/               # Layout components
│       ├── auth-layout/       # Layout for auth pages
│       └── main-layout/       # Layout for main app
│
├── assets/                    # Static assets
├── environments/              # Environment configurations
└── styles/                    # Global styles
```

## Key Architectural Decisions

### 1. Authentication Strategy
- **Appwrite** handles user authentication
- Session-based auth with Appwrite
- Windmill JWT for API authorization
- Session exchange flow: Appwrite Session → Windmill JWT
- Multi-tenant support via tenant ID in headers

### 2. API Layer Architecture
- **Frontend NEVER queries Supabase directly**
- All data operations go through Windmill
- Windmill validates JWT and enforces business rules
- Windmill queries Supabase with service role
- Typed responses with error handling

### 3. Data Flow
```
1. User authenticates with Appwrite
2. Frontend exchanges Appwrite session for Windmill JWT
3. Frontend calls Windmill API with JWT
4. Windmill validates JWT
5. Windmill queries Supabase with proper tenant isolation
6. Windmill returns formatted response
```

### 4. State Management
- NgRx for global state (auth, user preferences)
- Feature-level state for domain data
- Entity adapter for normalized data
- Router state synchronization

### 5. Security Measures
- No direct database access from frontend
- JWT validation at Windmill layer
- Row Level Security (RLS) in Supabase
- Tenant isolation enforced at API level
- CORS configuration for API access

### 6. Supabase Tables
- `tenants` - Multi-tenant organizations
- `users` - User profiles linked to Appwrite
- `ad_accounts` - Connected advertising accounts
- `campaign_metrics` - Campaign performance data
- `daily_summary` - Aggregated daily metrics
- `insights` - AI-generated insights
- `sync_logs` - Data synchronization history
- `automation_logs` - Automation execution logs

### 7. Performance Optimization
- Lazy loading for feature modules
- Windmill script caching
- Supabase connection pooling
- Optimized RLS policies
- Batch operations where possible

### 8. Multi-tenancy
- Tenant ID required in all API calls
- Windmill enforces tenant isolation
- Supabase RLS as additional security layer
- Tenant-specific data segregation
- No cross-tenant data access

### 9. Development Workflow
1. Develop Windmill scripts/flows for business logic
2. Test scripts against local Supabase
3. Frontend calls Windmill endpoints
4. Deploy scripts to production Windmill
5. No database migrations needed in frontend

### 10. Error Handling
- Windmill wraps all Supabase errors
- Consistent error format from API
- Frontend shows user-friendly messages
- Detailed logs kept in Windmill
