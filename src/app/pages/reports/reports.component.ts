import { Component } from '@angular/core';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="ri-file-list-3-line"></i> Reports</h1>
        <p>Generate and download comprehensive marketing reports</p>
      </div>
      <div class="reports-list">
        <div class="report-card">
          <div class="report-icon" style="background: linear-gradient(135deg, #6366f1, #8b5cf6)"><i class="ri-file-chart-line"></i></div>
          <div class="report-info"><h3>Weekly Performance</h3><p>Last generated: 2 days ago</p></div>
          <button class="btn-ghost">Download</button>
        </div>
        <div class="report-card">
          <div class="report-icon" style="background: linear-gradient(135deg, #10b981, #059669)"><i class="ri-pie-chart-line"></i></div>
          <div class="report-info"><h3>Monthly Summary</h3><p>Last generated: 1 week ago</p></div>
          <button class="btn-ghost">Download</button>
        </div>
        <div class="report-card">
          <div class="report-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706)"><i class="ri-bar-chart-box-line"></i></div>
          <div class="report-info"><h3>Campaign ROI Analysis</h3><p>Last generated: 3 days ago</p></div>
          <button class="btn-ghost">Download</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1400px; margin: 0 auto; }
    .page-header { margin-bottom: 32px; }
    .page-header h1 { display: flex; align-items: center; gap: 14px; font-size: 28px; font-weight: 700; color: rgba(255,255,255,0.95); margin-bottom: 8px; }
    .page-header h1 i { font-size: 32px; color: #14b8a6; }
    .page-header p { font-size: 15px; color: rgba(255,255,255,0.5); }
    .reports-list { display: flex; flex-direction: column; gap: 16px; }
    .report-card { display: flex; align-items: center; gap: 20px; padding: 24px; background: linear-gradient(180deg, rgba(20,20,32,0.8) 0%, rgba(12,12,20,0.9) 100%); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; }
    .report-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .report-icon i { font-size: 26px; color: white; }
    .report-info { flex: 1; }
    .report-info h3 { font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.95); margin-bottom: 4px; }
    .report-info p { font-size: 13px; color: rgba(255,255,255,0.5); }
    .btn-ghost { padding: 12px 24px; background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.7); cursor: pointer; transition: all 0.2s; }
    .btn-ghost:hover { background: rgba(255,255,255,0.05); color: white; }
  `]
})
export class ReportsComponent {}
