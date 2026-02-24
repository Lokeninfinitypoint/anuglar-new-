import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar" [class.collapsed]="collapsed()">
      <!-- Logo -->
      <div class="sidebar-header">
        <button class="logo-btn" routerLink="/dashboard">
          <img class="logo-img" src="/logo.jpeg" alt="MarketingTool" />
        </button>
        @if (!collapsed()) {
          <button class="collapse-btn" (click)="toggle.emit()">
            <i class="ri-menu-fold-line"></i>
          </button>
        }
      </div>

      <!-- Search -->
      @if (!collapsed()) {
        <div class="sidebar-search">
          <i class="ri-search-line"></i>
          <input type="text" placeholder="Search..." />
          <kbd>⌘K</kbd>
        </div>
      }

      <!-- Navigation -->
      <nav class="sidebar-nav">
        @for (section of navigation; track section.title) {
          <div class="nav-section">
            @if (!collapsed()) {
              <div class="nav-title">{{ section.title }}</div>
            }
            @for (item of section.items; track item.label) {
              <a
                class="nav-item"
                [routerLink]="item.route"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: item.route === '/dashboard' }"
                [title]="collapsed() ? item.label : ''"
              >
                @if (item.icon3d) {
                  <img class="nav-icon-3d" [src]="'/icons/3d/' + item.icon3d" [alt]="item.label" />
                } @else {
                  <i [class]="item.icon"></i>
                }
                @if (!collapsed()) {
                  <span class="nav-label">{{ item.label }}</span>
                  @if (item.badge) {
                    <span class="nav-badge">{{ item.badge }}</span>
                  }
                }
              </a>
            }
          </div>
        }
      </nav>

      <!-- Footer -->
      <div class="sidebar-footer">
        @if (!collapsed()) {
          <div class="credits-card">
            <img class="credits-icon-3d" src="/icons/3d/16. On-Chain.png" alt="Credits" />
            <div class="credits-info">
              <span class="credits-value">1,500</span>
              <span class="credits-label">Credits</span>
            </div>
          </div>
        }
        <a class="user-btn" routerLink="/settings" [title]="collapsed() ? 'Settings' : ''">
          <div class="user-avatar">U</div>
          @if (!collapsed()) {
            <div class="user-info">
              <span class="user-name">User</span>
              <span class="user-plan">Free Trial</span>
            </div>
            <i class="ri-settings-3-line"></i>
          }
        </a>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: 260px;
      display: flex;
      flex-direction: column;
      background: rgba(12, 12, 18, 0.98);
      border-right: 1px solid rgba(255, 255, 255, 0.06);
      z-index: 100;
      transition: width 0.3s ease;
    }

    .sidebar.collapsed {
      width: 72px;
    }

    /* Header */
    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .logo-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .logo-img {
      width: 44px;
      height: 44px;
      object-fit: contain;
      border-radius: 10px;
    }

    .collapse-btn {
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.04);
      border: none;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.5);
      transition: all 0.2s;
    }

    .collapse-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    /* Search */
    .sidebar-search {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 12px 16px;
      padding: 10px 14px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
    }

    .sidebar-search i {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.4);
    }

    .sidebar-search input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font-size: 13px;
      color: #fff;
    }

    .sidebar-search input::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    .sidebar-search kbd {
      padding: 3px 6px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 4px;
      font-size: 10px;
      color: rgba(255, 255, 255, 0.4);
    }

    /* Navigation */
    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
    }

    .nav-section {
      margin-bottom: 16px;
    }

    .nav-title {
      padding: 8px 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: rgba(255, 255, 255, 0.35);
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      margin-bottom: 2px;
      border-radius: 10px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .sidebar.collapsed .nav-item {
      justify-content: center;
      padding: 10px;
    }

    .nav-item:hover {
      background: rgba(255, 255, 255, 0.04);
    }

    .nav-item.active {
      background: rgba(99, 102, 241, 0.1);
    }

    .nav-item i {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.5);
      width: 24px;
      text-align: center;
    }

    .nav-item.active i,
    .nav-item:hover i {
      color: #fff;
    }

    /* 3D Icons */
    .nav-icon-3d {
      width: 24px;
      height: 24px;
      object-fit: contain;
      flex-shrink: 0;
    }

    .sidebar.collapsed .nav-icon-3d {
      width: 28px;
      height: 28px;
    }

    .nav-label {
      flex: 1;
      font-size: 13px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
    }

    .nav-item.active .nav-label,
    .nav-item:hover .nav-label {
      color: #fff;
    }

    .nav-badge {
      padding: 2px 8px;
      font-size: 10px;
      font-weight: 600;
      background: rgba(99, 102, 241, 0.15);
      color: #818cf8;
      border-radius: 4px;
    }

    /* Footer */
    .sidebar-footer {
      padding: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .credits-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      margin-bottom: 12px;
    }

    .credits-icon-3d {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    .credits-info {
      display: flex;
      flex-direction: column;
    }

    .credits-value {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
    }

    .credits-label {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.5);
    }

    .user-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 10px;
      text-decoration: none;
      transition: background 0.2s;
    }

    .sidebar.collapsed .user-btn {
      justify-content: center;
      padding: 12px;
    }

    .user-btn:hover {
      background: rgba(255, 255, 255, 0.04);
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
    }

    .user-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-size: 13px;
      font-weight: 500;
      color: #fff;
    }

    .user-plan {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.5);
    }

    .user-btn > i {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.4);
    }
  `]
})
export class SidebarComponent {
  collapsed = signal(false);
  @Output() toggle = new EventEmitter<void>();

  @Input() set isCollapsed(value: boolean) {
    this.collapsed.set(value);
  }

  navigation = [
    {
      title: 'Manage',
      items: [
        { label: 'Dashboard', icon: '', icon3d: '1 - Data Analytic.png', route: '/dashboard' },
        { label: 'AI Chat', icon: '', icon3d: '10. Digital Artist Female.png', route: '/ai-chat' },
        { label: 'Campaigns', icon: '', icon3d: '15 - Content Marketing.png', route: '/campaigns' },
        { label: 'Analytics', icon: '', icon3d: '11 Analytics.png', route: '/analytics' },
        { label: 'Reports', icon: '', icon3d: '18 - Market Analysis.png', route: '/reports' },
        { label: 'Settings', icon: 'ri-settings-3-line', icon3d: '', route: '/settings' },
      ]
    },
    {
      title: 'Tools',
      items: [
        { label: 'All Tools', icon: '', icon3d: '1 SEO.png', route: '/tools', badge: '209' },
        { label: 'Ads Creator', icon: '', icon3d: '13 - Social Media Engagement.png', route: '/ads-creator' },
        { label: 'Ad Library', icon: '', icon3d: '12 - Internet Search.png', route: '/ad-library' },
        { label: 'History', icon: 'ri-history-line', icon3d: '', route: '/history' },
      ]
    },
    {
      title: 'Platforms',
      items: [
        { label: 'Google Ads', icon: 'ri-google-line', icon3d: '', route: '/google-ads' },
        { label: 'Meta Ads', icon: 'ri-facebook-line', icon3d: '', route: '/meta-ads' },
        { label: 'Meta Audit', icon: '', icon3d: '10 - SEO Filter.png', route: '/meta-audit' },
      ]
    }
  ];
}
