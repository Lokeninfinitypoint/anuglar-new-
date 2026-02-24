import { Component, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="app-layout">
      <app-sidebar
        [isCollapsed]="sidebarCollapsed()"
        (toggle)="toggleSidebar()"
      />

      <main
        class="main-content"
        [class.sidebar-collapsed]="sidebarCollapsed()"
      >
        <!-- Top Header Bar -->
        <header class="top-header">
          <div class="header-left">
            <button class="header-btn mobile-menu" (click)="toggleSidebar()">
              <i class="ri-menu-line"></i>
            </button>
            <div class="search-box">
              <i class="ri-search-line"></i>
              <input
                type="text"
                placeholder="Search tools, campaigns, insights..."
                class="search-input"
              />
              <kbd class="search-shortcut">⌘K</kbd>
            </div>
          </div>

          <div class="header-right">
            <button class="header-btn">
              <i class="ri-notification-3-line"></i>
              <span class="notification-dot"></span>
            </button>
            <button class="header-btn">
              <i class="ri-question-line"></i>
            </button>
            <div class="credits-badge">
              <i class="ri-coin-line"></i>
              <span>100 Credits</span>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <div class="page-wrapper">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      margin-left: 280px;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      transition: margin-left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .main-content.sidebar-collapsed {
      margin-left: 80px;
    }

    /* Header */
    .top-header {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 16px 32px;
      background: rgba(8, 8, 15, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      z-index: 50;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
      flex: 1;
      max-width: 600px;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .header-btn {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
      cursor: pointer;
      position: relative;
      transition: all 0.2s;
    }

    .header-btn i {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.6);
    }

    .header-btn:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .header-btn:hover i {
      color: rgba(255, 255, 255, 0.9);
    }

    .mobile-menu {
      display: none;
    }

    .notification-dot {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 8px;
      height: 8px;
      background: #f43f5e;
      border-radius: 50%;
      border: 2px solid rgba(8, 8, 15, 0.9);
    }

    /* Search */
    .search-box {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 18px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      transition: all 0.3s;
    }

    .search-box:focus-within {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(139, 92, 246, 0.3);
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
    }

    .search-box i {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.4);
    }

    .search-input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
      font-family: inherit;
    }

    .search-input::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    .search-shortcut {
      padding: 4px 8px;
      font-size: 11px;
      font-family: inherit;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.4);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
    }

    /* Credits Badge */
    .credits-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%);
      border: 1px solid rgba(139, 92, 246, 0.2);
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .credits-badge i {
      font-size: 18px;
      color: #a5b4fc;
    }

    .credits-badge span {
      font-size: 13px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
    }

    .credits-badge:hover {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%);
      border-color: rgba(139, 92, 246, 0.3);
    }

    /* Page Wrapper */
    .page-wrapper {
      flex: 1;
      padding: 32px;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .main-content {
        margin-left: 0;
      }

      .main-content.sidebar-collapsed {
        margin-left: 0;
      }

      .mobile-menu {
        display: flex;
      }

      .search-shortcut {
        display: none;
      }
    }

    @media (max-width: 640px) {
      .top-header {
        padding: 12px 16px;
      }

      .page-wrapper {
        padding: 20px 16px;
      }

      .credits-badge span {
        display: none;
      }
    }
  `]
})
export class MainLayoutComponent {
  sidebarCollapsed = signal(false);

  toggleSidebar() {
    this.sidebarCollapsed.update(v => !v);
  }
}
