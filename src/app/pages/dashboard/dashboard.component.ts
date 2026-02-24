import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            <span>All systems operational</span>
          </div>
          <h1>
            <span class="gradient-text">₹2.4L</span> revenue this month
          </h1>
          <p class="hero-sub">23 active campaigns across Google, Meta, and Email</p>
        </div>
        <div class="hero-actions">
          <a routerLink="/ai-chat" class="btn-primary">
            <i class="ri-sparkling-line"></i>
            Start with AI
          </a>
          <a routerLink="/ads-creator" class="btn-secondary">
            Create Campaign
          </a>
        </div>
      </section>

      <!-- Stats Grid -->
      <section class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Total Revenue</span>
            <span class="stat-change positive">+12.5%</span>
          </div>
          <div class="stat-value">₹24,50,000</div>
          <div class="stat-chart">
            <svg viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M0,25 Q10,20 20,22 T40,15 T60,18 T80,8 T100,12" fill="none" stroke="url(#greenGrad)" stroke-width="2"/>
              <defs>
                <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#22c55e"/>
                  <stop offset="100%" stop-color="#4ade80"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Ad Spend</span>
            <span class="stat-change negative">-3.2%</span>
          </div>
          <div class="stat-value">₹4,80,000</div>
          <div class="stat-chart">
            <svg viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M0,15 Q15,12 25,18 T50,10 T75,20 T100,15" fill="none" stroke="url(#blueGrad)" stroke-width="2"/>
              <defs>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#6366f1"/>
                  <stop offset="100%" stop-color="#818cf8"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">ROAS</span>
            <span class="stat-change positive">+18.3%</span>
          </div>
          <div class="stat-value">5.1x</div>
          <div class="stat-bar">
            <div class="bar-fill" style="width: 85%"></div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Conversions</span>
            <span class="stat-change positive">+24.1%</span>
          </div>
          <div class="stat-value">1,847</div>
          <div class="stat-chart">
            <svg viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M0,28 Q20,25 30,20 T50,15 T70,10 T100,5" fill="none" stroke="url(#purpleGrad)" stroke-width="2"/>
              <defs>
                <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#a855f7"/>
                  <stop offset="100%" stop-color="#c084fc"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      <!-- Main Grid -->
      <section class="main-grid">
        <!-- Activity Feed -->
        <div class="activity-card">
          <div class="card-header">
            <h2>Activity</h2>
            <button class="header-btn">View all</button>
          </div>
          <div class="activity-list">
            @for (item of activities; track item.id) {
              <div class="activity-item">
                <div class="activity-icon" [style.background]="item.color">
                  <i [class]="item.icon"></i>
                </div>
                <div class="activity-content">
                  <p class="activity-text">{{ item.text }}</p>
                  <span class="activity-time">{{ item.time }}</span>
                </div>
                @if (item.value) {
                  <div class="activity-value" [class]="item.positive ? 'positive' : 'negative'">
                    {{ item.value }}
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <!-- Campaigns Table -->
        <div class="campaigns-card">
          <div class="card-header">
            <h2>Active Campaigns</h2>
            <a routerLink="/campaigns" class="header-btn">Manage</a>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Platform</th>
                  <th>Spend</th>
                  <th>ROAS</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                @for (campaign of campaigns; track campaign.name) {
                  <tr>
                    <td class="campaign-name">
                      <span class="name">{{ campaign.name }}</span>
                      <span class="type">{{ campaign.type }}</span>
                    </td>
                    <td>
                      <div class="platform-badge" [attr.data-platform]="campaign.platform">
                        {{ campaign.platform }}
                      </div>
                    </td>
                    <td class="spend">{{ campaign.spend }}</td>
                    <td class="roas" [class]="campaign.roas >= 3 ? 'good' : 'warn'">
                      {{ campaign.roas }}x
                    </td>
                    <td>
                      <div class="status-badge" [attr.data-status]="campaign.status">
                        {{ campaign.status }}
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          @for (action of quickActions; track action.title) {
            <a [routerLink]="action.route" class="action-card">
              <div class="action-icon">
                <i [class]="action.icon"></i>
              </div>
              <div class="action-content">
                <h3>{{ action.title }}</h3>
                <p>{{ action.desc }}</p>
              </div>
              <i class="ri-arrow-right-s-line action-arrow"></i>
            </a>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1400px;
      margin: 0 auto;
    }

    /* ════════════════════════════════════════════════════════════════════════
       HERO SECTION
    ════════════════════════════════════════════════════════════════════════ */
    .hero {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 48px 0;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      margin-bottom: 40px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.2);
      border-radius: 100px;
      font-size: 13px;
      color: #4ade80;
      margin-bottom: 20px;
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      background: #22c55e;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .hero h1 {
      font-size: 48px;
      font-weight: 700;
      color: #fff;
      line-height: 1.1;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }

    .gradient-text {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-sub {
      font-size: 16px;
      color: rgba(255,255,255,0.5);
    }

    .hero-actions {
      display: flex;
      gap: 12px;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      padding: 14px 28px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      color: #fff;
      font-size: 15px;
      font-weight: 500;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .btn-secondary:hover {
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.15);
    }

    /* ════════════════════════════════════════════════════════════════════════
       STATS GRID
    ════════════════════════════════════════════════════════════════════════ */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 24px;
      transition: all 0.3s;
    }

    .stat-card:hover {
      border-color: rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.03);
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .stat-label {
      font-size: 13px;
      color: rgba(255,255,255,0.5);
      font-weight: 500;
    }

    .stat-change {
      font-size: 12px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .stat-change.positive {
      color: #4ade80;
      background: rgba(34, 197, 94, 0.1);
    }

    .stat-change.negative {
      color: #f87171;
      background: rgba(239, 68, 68, 0.1);
    }

    .stat-value {
      font-size: 32px;
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.02em;
      margin-bottom: 16px;
    }

    .stat-chart {
      height: 30px;
    }

    .stat-chart svg {
      width: 100%;
      height: 100%;
    }

    .stat-bar {
      height: 6px;
      background: rgba(255,255,255,0.06);
      border-radius: 3px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #6366f1, #a855f7);
      border-radius: 3px;
    }

    /* ════════════════════════════════════════════════════════════════════════
       MAIN GRID
    ════════════════════════════════════════════════════════════════════════ */
    .main-grid {
      display: grid;
      grid-template-columns: 380px 1fr;
      gap: 24px;
      margin-bottom: 48px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .card-header h2 {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
    }

    .header-btn {
      font-size: 13px;
      color: rgba(255,255,255,0.5);
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: color 0.2s;
    }

    .header-btn:hover {
      color: #fff;
    }

    /* Activity Card */
    .activity-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 24px;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }

    .activity-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .activity-icon i {
      font-size: 16px;
      color: #fff;
    }

    .activity-content {
      flex: 1;
      min-width: 0;
    }

    .activity-text {
      font-size: 14px;
      color: rgba(255,255,255,0.85);
      line-height: 1.4;
      margin-bottom: 4px;
    }

    .activity-time {
      font-size: 12px;
      color: rgba(255,255,255,0.35);
    }

    .activity-value {
      font-size: 13px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 6px;
    }

    .activity-value.positive {
      color: #4ade80;
      background: rgba(34, 197, 94, 0.1);
    }

    .activity-value.negative {
      color: #f87171;
      background: rgba(239, 68, 68, 0.1);
    }

    /* Campaigns Card */
    .campaigns-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 24px;
    }

    .table-container {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      text-align: left;
      padding: 12px 16px;
      font-size: 12px;
      font-weight: 600;
      color: rgba(255,255,255,0.4);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }

    td {
      padding: 16px;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: rgba(255,255,255,0.02);
    }

    .campaign-name {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .campaign-name .name {
      font-size: 14px;
      font-weight: 500;
      color: #fff;
    }

    .campaign-name .type {
      font-size: 12px;
      color: rgba(255,255,255,0.4);
    }

    .platform-badge {
      display: inline-flex;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 500;
      border-radius: 6px;
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.7);
    }

    .platform-badge[data-platform="Google"] {
      background: rgba(234, 179, 8, 0.1);
      color: #fbbf24;
    }

    .platform-badge[data-platform="Meta"] {
      background: rgba(59, 130, 246, 0.1);
      color: #60a5fa;
    }

    .platform-badge[data-platform="Email"] {
      background: rgba(236, 72, 153, 0.1);
      color: #f472b6;
    }

    .spend {
      font-size: 14px;
      font-weight: 500;
      color: rgba(255,255,255,0.8);
    }

    .roas {
      font-size: 14px;
      font-weight: 600;
    }

    .roas.good { color: #4ade80; }
    .roas.warn { color: #fbbf24; }

    .status-badge {
      display: inline-flex;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 500;
      border-radius: 6px;
    }

    .status-badge[data-status="Active"] {
      background: rgba(34, 197, 94, 0.1);
      color: #4ade80;
    }

    .status-badge[data-status="Learning"] {
      background: rgba(234, 179, 8, 0.1);
      color: #fbbf24;
    }

    .status-badge[data-status="Paused"] {
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.5);
    }

    /* ════════════════════════════════════════════════════════════════════════
       QUICK ACTIONS
    ════════════════════════════════════════════════════════════════════════ */
    .quick-actions h2 {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 20px;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    .action-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 14px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .action-card:hover {
      background: rgba(255,255,255,0.04);
      border-color: rgba(99, 102, 241, 0.3);
      transform: translateX(4px);
    }

    .action-icon {
      width: 44px;
      height: 44px;
      background: rgba(99, 102, 241, 0.1);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .action-icon i {
      font-size: 20px;
      color: #818cf8;
    }

    .action-content {
      flex: 1;
      min-width: 0;
    }

    .action-content h3 {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 4px;
    }

    .action-content p {
      font-size: 12px;
      color: rgba(255,255,255,0.45);
    }

    .action-arrow {
      font-size: 18px;
      color: rgba(255,255,255,0.3);
      transition: all 0.2s;
    }

    .action-card:hover .action-arrow {
      color: #818cf8;
      transform: translateX(4px);
    }

    /* ════════════════════════════════════════════════════════════════════════
       RESPONSIVE
    ════════════════════════════════════════════════════════════════════════ */
    @media (max-width: 1200px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .main-grid {
        grid-template-columns: 1fr;
      }
      .actions-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .hero {
        flex-direction: column;
        gap: 32px;
        padding: 32px 0;
      }
      .hero h1 {
        font-size: 32px;
      }
      .stats-grid {
        grid-template-columns: 1fr;
      }
      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  activities = [
    { id: 1, icon: 'ri-check-line', color: 'rgba(34, 197, 94, 0.2)', text: 'Campaign "Summer Sale" reached 10K impressions', time: '2 min ago', value: '+₹12,400', positive: true },
    { id: 2, icon: 'ri-user-add-line', color: 'rgba(99, 102, 241, 0.2)', text: '47 new leads from Google Ads campaign', time: '15 min ago', value: '+47', positive: true },
    { id: 3, icon: 'ri-alert-line', color: 'rgba(234, 179, 8, 0.2)', text: 'Budget alert: Meta campaign at 85%', time: '1 hour ago', value: null, positive: false },
    { id: 4, icon: 'ri-line-chart-line', color: 'rgba(139, 92, 246, 0.2)', text: 'ROAS improved to 5.1x on Search ads', time: '2 hours ago', value: '+18%', positive: true },
    { id: 5, icon: 'ri-mail-check-line', color: 'rgba(236, 72, 153, 0.2)', text: 'Email sequence completed: 2,340 delivered', time: '3 hours ago', value: null, positive: true },
  ];

  campaigns = [
    { name: 'Summer Sale 2026', type: 'Search + Shopping', platform: 'Google', spend: '₹1,20,000', roas: 4.2, status: 'Active' },
    { name: 'Brand Awareness', type: 'Video + Display', platform: 'Meta', spend: '₹85,000', roas: 3.1, status: 'Active' },
    { name: 'Retargeting Flow', type: 'Dynamic Ads', platform: 'Meta', spend: '₹45,000', roas: 6.8, status: 'Active' },
    { name: 'Newsletter Promo', type: 'Automated Sequence', platform: 'Email', spend: '₹12,000', roas: 8.2, status: 'Learning' },
    { name: 'Product Launch', type: 'Performance Max', platform: 'Google', spend: '₹2,18,000', roas: 2.4, status: 'Paused' },
  ];

  quickActions = [
    { icon: 'ri-sparkling-line', title: 'AI Chat', desc: 'Get insights & create', route: '/ai-chat' },
    { icon: 'ri-add-circle-line', title: 'New Campaign', desc: 'Launch ads', route: '/ads-creator' },
    { icon: 'ri-bar-chart-box-line', title: 'Analytics', desc: 'View performance', route: '/analytics' },
    { icon: 'ri-tools-line', title: 'All Tools', desc: '209 AI tools', route: '/tools' },
  ];

  ngOnInit() {}
}
