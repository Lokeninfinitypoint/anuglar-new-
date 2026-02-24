import { Component } from '@angular/core';


@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="ri-send-plane-line"></i> Campaigns</h1>
        <p>Manage and monitor all your active campaigns</p>
      </div>
      <div class="empty-state">
        <div class="empty-icon"><i class="ri-inbox-line"></i></div>
        <h2>No Campaigns Yet</h2>
        <p>Create your first campaign to get started</p>
        <button class="btn-primary"><i class="ri-add-line"></i> Create Campaign</button>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1400px; margin: 0 auto; }
    .page-header { margin-bottom: 40px; }
    .page-header h1 { display: flex; align-items: center; gap: 14px; font-size: 28px; font-weight: 700; color: rgba(255,255,255,0.95); margin-bottom: 8px; }
    .page-header h1 i { font-size: 32px; color: #06b6d4; }
    .page-header p { font-size: 15px; color: rgba(255,255,255,0.5); }
    .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 40px; background: linear-gradient(180deg, rgba(20,20,32,0.8) 0%, rgba(12,12,20,0.9) 100%); border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; text-align: center; }
    .empty-icon { width: 80px; height: 80px; border-radius: 24px; background: rgba(99,102,241,0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
    .empty-icon i { font-size: 36px; color: #6366f1; }
    .empty-state h2 { font-size: 20px; font-weight: 600; color: rgba(255,255,255,0.9); margin-bottom: 8px; }
    .empty-state p { font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 24px; }
    .btn-primary { display: flex; align-items: center; gap: 8px; padding: 14px 28px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-weight: 600; font-size: 14px; border: none; border-radius: 14px; cursor: pointer; box-shadow: 0 4px 20px rgba(99,102,241,0.4); }
  `]
})
export class CampaignsComponent {}
