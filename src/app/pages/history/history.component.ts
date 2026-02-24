import { Component } from '@angular/core';


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="ri-history-line"></i> History</h1>
        <p>View your past AI generations and outputs</p>
      </div>
      <div class="history-list">
        <div class="history-item">
          <div class="history-icon" style="background: linear-gradient(135deg, #6366f1, #8b5cf6)"><i class="ri-quill-pen-line"></i></div>
          <div class="history-info"><h3>Facebook Ad Copy</h3><p>Generated 2 hours ago</p></div>
          <button class="btn-ghost">View</button>
        </div>
        <div class="history-item">
          <div class="history-icon" style="background: linear-gradient(135deg, #10b981, #059669)"><i class="ri-mail-line"></i></div>
          <div class="history-info"><h3>Email Campaign</h3><p>Generated yesterday</p></div>
          <button class="btn-ghost">View</button>
        </div>
        <div class="history-item">
          <div class="history-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706)"><i class="ri-article-line"></i></div>
          <div class="history-info"><h3>Blog Post Outline</h3><p>Generated 3 days ago</p></div>
          <button class="btn-ghost">View</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1400px; margin: 0 auto; }
    .page-header { margin-bottom: 32px; }
    .page-header h1 { display: flex; align-items: center; gap: 14px; font-size: 28px; font-weight: 700; color: rgba(255,255,255,0.95); margin-bottom: 8px; }
    .page-header h1 i { font-size: 32px; color: #64748b; }
    .page-header p { font-size: 15px; color: rgba(255,255,255,0.5); }
    .history-list { display: flex; flex-direction: column; gap: 12px; }
    .history-item { display: flex; align-items: center; gap: 16px; padding: 20px; background: linear-gradient(180deg, rgba(20,20,32,0.8) 0%, rgba(12,12,20,0.9) 100%); border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; }
    .history-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .history-icon i { font-size: 22px; color: white; }
    .history-info { flex: 1; }
    .history-info h3 { font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.95); margin-bottom: 4px; }
    .history-info p { font-size: 13px; color: rgba(255,255,255,0.5); }
    .btn-ghost { padding: 10px 20px; background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.7); cursor: pointer; }
    .btn-ghost:hover { background: rgba(255,255,255,0.05); }
  `]
})
export class HistoryComponent {}
