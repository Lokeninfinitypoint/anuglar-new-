import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'ai-chat',
        loadComponent: () => import('./pages/ai-chat/ai-chat.component').then(m => m.AiChatComponent)
      },
      {
        path: 'ads-creator',
        loadComponent: () => import('./pages/ads-creator/ads-creator.component').then(m => m.AdsCreatorComponent)
      },
      {
        path: 'campaigns',
        loadComponent: () => import('./pages/campaigns/campaigns.component').then(m => m.CampaignsComponent)
      },
      {
        path: 'meta-audit',
        loadComponent: () => import('./pages/meta-audit/meta-audit.component').then(m => m.MetaAuditComponent)
      },
      {
        path: 'ad-library',
        loadComponent: () => import('./pages/ad-library/ad-library.component').then(m => m.AdLibraryComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'tools',
        loadComponent: () => import('./pages/tools/tools.component').then(m => m.ToolsComponent)
      },
      {
        path: 'tools/:slug',
        loadComponent: () => import('./pages/tool-detail/tool-detail.component').then(m => m.ToolDetailComponent)
      },
      {
        path: 'history',
        loadComponent: () => import('./pages/history/history.component').then(m => m.HistoryComponent)
      },
      {
        path: 'google-ads',
        loadComponent: () => import('./pages/tools/tools.component').then(m => m.ToolsComponent),
        data: { category: 'google' }
      },
      {
        path: 'meta-ads',
        loadComponent: () => import('./pages/tools/tools.component').then(m => m.ToolsComponent),
        data: { category: 'meta' }
      },
      {
        path: 'content-seo',
        loadComponent: () => import('./pages/tools/tools.component').then(m => m.ToolsComponent),
        data: { category: 'seo' }
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
