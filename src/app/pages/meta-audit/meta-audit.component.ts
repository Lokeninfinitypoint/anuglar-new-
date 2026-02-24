import { Component } from '@angular/core';


@Component({
  selector: 'app-meta-audit',
  standalone: true,
  imports: [],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="ri-compass-3-line"></i> 360 Meta Audit</h1>
        <p>Comprehensive analysis of your Meta advertising account</p>
      </div>
      <div class="audit-grid">
        <div class="audit-card">
          <div class="audit-icon" style="background: linear-gradient(135deg, #10b981, #059669)"><i class="ri-checkbox-circle-line"></i></div>
          <h3>Account Health</h3>
          <div class="score">92<span>/100</span></div>
          <p>Your account is performing well</p>
        </div>
        <div class="audit-card">
          <div class="audit-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706)"><i class="ri-target-line"></i></div>
          <h3>Audience Optimization</h3>
          <div class="score">78<span>/100</span></div>
          <p>Room for improvement</p>
        </div>
        <div class="audit-card">
          <div class="audit-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed)"><i class="ri-image-line"></i></div>
          <h3>Creative Quality</h3>
          <div class="score">85<span>/100</span></div>
          <p>Good creative variety</p>
        </div>
        <div class="audit-card">
          <div class="audit-icon" style="background: linear-gradient(135deg, #06b6d4, #0891b2)"><i class="ri-money-dollar-circle-line"></i></div>
          <h3>Budget Efficiency</h3>
          <div class="score">88<span>/100</span></div>
          <p>Spending effectively</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1400px; margin: 0 auto; }
    .page-header { margin-bottom: 40px; }
    .page-header h1 { display: flex; align-items: center; gap: 14px; font-size: 28px; font-weight: 700; color: rgba(255,255,255,0.95); margin-bottom: 8px; }
    .page-header h1 i { font-size: 32px; color: #8b5cf6; }
    .page-header p { font-size: 15px; color: rgba(255,255,255,0.5); }
    .audit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
    .audit-card { padding: 28px; background: linear-gradient(180deg, rgba(20,20,32,0.8) 0%, rgba(12,12,20,0.9) 100%); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; }
    .audit-icon { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
    .audit-icon i { font-size: 24px; color: white; }
    .audit-card h3 { font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.9); margin-bottom: 12px; }
    .score { font-size: 48px; font-weight: 700; color: rgba(255,255,255,0.95); margin-bottom: 8px; }
    .score span { font-size: 20px; color: rgba(255,255,255,0.4); }
    .audit-card p { font-size: 14px; color: rgba(255,255,255,0.5); }
  `]
})
export class MetaAuditComponent {}
