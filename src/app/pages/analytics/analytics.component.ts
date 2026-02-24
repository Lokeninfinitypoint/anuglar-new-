import { Component } from '@angular/core';


@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="ri-bar-chart-2-line"></i> Analytics</h1>
        <p>Track performance across all your marketing channels</p>
      </div>
      <div class="metrics-grid">
        <div class="metric-card"><span class="metric-value">$12,450</span><span class="metric-label">Total Spend</span></div>
        <div class="metric-card"><span class="metric-value">3.2x</span><span class="metric-label">Avg. ROAS</span></div>
        <div class="metric-card"><span class="metric-value">2.4M</span><span class="metric-label">Impressions</span></div>
        <div class="metric-card"><span class="metric-value">48.2K</span><span class="metric-label">Clicks</span></div>
      </div>
      <div class="chart-placeholder">
        <svg viewBox="0 0 800 200" class="chart">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(139, 92, 246, 0.4)" />
              <stop offset="100%" stop-color="rgba(139, 92, 246, 0)" />
            </linearGradient>
          </defs>
          <path d="M0,150 C100,120 150,80 250,90 C350,100 400,40 500,60 C600,80 700,30 800,50 L800,200 L0,200 Z" fill="url(#chartGrad)" />
          <path d="M0,150 C100,120 150,80 250,90 C350,100 400,40 500,60 C600,80 700,30 800,50" fill="none" stroke="#8b5cf6" stroke-width="3" />
        </svg>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1400px; margin: 0 auto; }
    .page-header { margin-bottom: 32px; }
    .page-header h1 { display: flex; align-items: center; gap: 14px; font-size: 28px; font-weight: 700; color: rgba(255,255,255,0.95); margin-bottom: 8px; }
    .page-header h1 i { font-size: 32px; color: #3b82f6; }
    .page-header p { font-size: 15px; color: rgba(255,255,255,0.5); }
    .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
    .metric-card { padding: 24px; background: linear-gradient(180deg, rgba(20,20,32,0.8) 0%, rgba(12,12,20,0.9) 100%); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; text-align: center; }
    .metric-value { display: block; font-size: 32px; font-weight: 700; color: rgba(255,255,255,0.95); margin-bottom: 8px; }
    .metric-label { font-size: 14px; color: rgba(255,255,255,0.5); }
    .chart-placeholder { padding: 32px; background: linear-gradient(180deg, rgba(20,20,32,0.8) 0%, rgba(12,12,20,0.9) 100%); border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; }
    .chart { width: 100%; height: 200px; }
    @media (max-width: 768px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); } }
  `]
})
export class AnalyticsComponent {}
