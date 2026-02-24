import { Component } from '@angular/core';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="ri-settings-3-line"></i> Settings</h1>
        <p>Manage your account and preferences</p>
      </div>
      <div class="settings-grid">
        <div class="settings-card">
          <h3>Profile</h3>
          <div class="form-group"><label>Name</label><input type="text" value="User" /></div>
          <div class="form-group"><label>Email</label><input type="email" value="user@example.com" /></div>
          <button class="btn-primary">Save Changes</button>
        </div>
        <div class="settings-card">
          <h3>Subscription</h3>
          <div class="plan-badge">Free Trial</div>
          <p>100 credits remaining</p>
          <button class="btn-upgrade">Upgrade to Pro</button>
        </div>
        <div class="settings-card">
          <h3>Integrations</h3>
          <div class="integration"><i class="ri-google-fill" style="color: #4285F4"></i><span>Google Ads</span><button class="btn-ghost">Connect</button></div>
          <div class="integration"><i class="ri-facebook-fill" style="color: #1877F2"></i><span>Meta Ads</span><button class="btn-ghost">Connect</button></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1200px; margin: 0 auto; }
    .page-header { margin-bottom: 32px; }
    .page-header h1 { display: flex; align-items: center; gap: 14px; font-size: 28px; font-weight: 700; color: rgba(255,255,255,0.95); margin-bottom: 8px; }
    .page-header h1 i { font-size: 32px; color: #6366f1; }
    .page-header p { font-size: 15px; color: rgba(255,255,255,0.5); }
    .settings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; }
    .settings-card { padding: 28px; background: linear-gradient(180deg, rgba(20,20,32,0.8) 0%, rgba(12,12,20,0.9) 100%); border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; }
    .settings-card h3 { font-size: 18px; font-weight: 600; color: rgba(255,255,255,0.95); margin-bottom: 20px; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.6); margin-bottom: 8px; }
    .form-group input { width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; font-size: 14px; color: rgba(255,255,255,0.9); }
    .btn-primary { padding: 12px 24px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-weight: 600; font-size: 14px; border: none; border-radius: 12px; cursor: pointer; }
    .plan-badge { display: inline-block; padding: 6px 14px; background: rgba(139,92,246,0.15); color: #a5b4fc; border-radius: 8px; font-size: 13px; font-weight: 600; margin-bottom: 12px; }
    .settings-card > p { font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 20px; }
    .btn-upgrade { width: 100%; padding: 14px; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; font-weight: 600; font-size: 14px; border: none; border-radius: 12px; cursor: pointer; }
    .integration { display: flex; align-items: center; gap: 12px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .integration:last-child { border-bottom: none; }
    .integration i { font-size: 24px; }
    .integration span { flex: 1; font-size: 14px; color: rgba(255,255,255,0.8); }
    .btn-ghost { padding: 8px 16px; background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.6); cursor: pointer; }
  `]
})
export class SettingsComponent {}
