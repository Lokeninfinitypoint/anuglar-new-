import { Component, signal } from '@angular/core';


interface Workflow {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  category: 'launch' | 'optimize' | 'scale';
}

@Component({
  selector: 'app-ads-creator',
  standalone: true,
  imports: [],
  template: `
    <div class="ads-creator">
      <!-- Header -->
      <div class="page-header">
        <div class="header-icon">
          <i class="ri-megaphone-line"></i>
        </div>
        <div class="header-content">
          <h1>Ads Command Centre</h1>
          <p>AI-powered workflows to launch, optimize, and scale your ad campaigns</p>
        </div>
      </div>

      <!-- Workflow Categories -->
      @for (category of workflowCategories; track category.id) {
        <section class="workflow-section">
          <div class="section-header">
            <div class="section-icon" [style.background]="category.gradient">
              <i [class]="category.icon"></i>
            </div>
            <div>
              <h2>{{ category.title }}</h2>
              <p>{{ category.description }}</p>
            </div>
          </div>

          <div class="workflows-grid">
            @for (workflow of getWorkflows(category.id); track workflow.id) {
              <button class="workflow-card" (click)="selectWorkflow(workflow)">
                <div class="workflow-icon" [style.background]="workflow.gradient">
                  <i [class]="workflow.icon"></i>
                </div>
                <div class="workflow-content">
                  <h3>{{ workflow.title }}</h3>
                  <p>{{ workflow.description }}</p>
                </div>
                <i class="ri-arrow-right-line workflow-arrow"></i>
              </button>
            }
          </div>
        </section>
      }

      <!-- Selected Workflow Panel -->
      @if (selectedWorkflow()) {
        <div class="workflow-panel">
          <div class="panel-header">
            <div class="panel-icon" [style.background]="selectedWorkflow()!.gradient">
              <i [class]="selectedWorkflow()!.icon"></i>
            </div>
            <h2>{{ selectedWorkflow()!.title }}</h2>
            <button class="close-btn" (click)="selectedWorkflow.set(null)">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div class="panel-content">
            <p>Configure your {{ selectedWorkflow()!.title }} workflow</p>
            <div class="form-group">
              <label>Campaign Objective</label>
              <select class="form-select">
                <option>Conversions</option>
                <option>Traffic</option>
                <option>Brand Awareness</option>
                <option>Lead Generation</option>
              </select>
            </div>
            <div class="form-group">
              <label>Target Audience</label>
              <input type="text" placeholder="Describe your ideal customer..." class="form-input" />
            </div>
            <div class="form-group">
              <label>Budget</label>
              <input type="text" placeholder="Enter daily budget..." class="form-input" />
            </div>
            <button class="generate-btn">
              <i class="ri-magic-line"></i>
              Generate with AI
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .ads-creator {
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 40px;
    }

    .header-icon {
      width: 72px;
      height: 72px;
      border-radius: 22px;
      background: linear-gradient(135deg, #f59e0b, #d97706);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(245, 158, 11, 0.3);
    }

    .header-icon i {
      font-size: 36px;
      color: white;
    }

    .header-content h1 {
      font-size: 32px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 8px;
    }

    .header-content p {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
    }

    .workflow-section {
      margin-bottom: 40px;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }

    .section-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .section-icon i {
      font-size: 22px;
      color: white;
    }

    .section-header h2 {
      font-size: 20px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 4px;
    }

    .section-header p {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
    }

    .workflows-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 16px;
    }

    .workflow-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: linear-gradient(180deg, rgba(20, 20, 32, 0.8) 0%, rgba(12, 12, 20, 0.9) 100%);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 18px;
      cursor: pointer;
      text-align: left;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .workflow-card:hover {
      border-color: rgba(139, 92, 246, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
    }

    .workflow-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .workflow-icon i {
      font-size: 24px;
      color: white;
    }

    .workflow-content {
      flex: 1;
    }

    .workflow-content h3 {
      font-size: 15px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 4px;
    }

    .workflow-content p {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);
    }

    .workflow-arrow {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.25);
      transition: all 0.2s;
    }

    .workflow-card:hover .workflow-arrow {
      color: #8b5cf6;
      transform: translateX(4px);
    }

    /* Panel */
    .workflow-panel {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 480px;
      background: linear-gradient(180deg, rgba(16, 16, 24, 0.98) 0%, rgba(8, 8, 15, 0.99) 100%);
      border-left: 1px solid rgba(255, 255, 255, 0.06);
      z-index: 200;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .panel-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .panel-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .panel-icon i {
      font-size: 22px;
      color: white;
    }

    .panel-header h2 {
      flex: 1;
      font-size: 18px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
    }

    .close-btn {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .close-btn i {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.6);
    }

    .panel-content {
      padding: 24px;
    }

    .panel-content > p {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 24px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 8px;
    }

    .form-input, .form-select {
      width: 100%;
      padding: 14px 18px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
      font-family: inherit;
      transition: all 0.2s;
    }

    .form-select {
      cursor: pointer;
    }

    .form-input:focus, .form-select:focus {
      outline: none;
      border-color: rgba(139, 92, 246, 0.4);
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
    }

    .generate-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 16px 24px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border: none;
      border-radius: 14px;
      font-size: 15px;
      font-weight: 600;
      color: white;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
      margin-top: 8px;
    }

    .generate-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
    }
  `]
})
export class AdsCreatorComponent {
  selectedWorkflow = signal<Workflow | null>(null);

  workflowCategories = [
    { id: 'launch', title: 'Launch', description: 'Create new campaigns from scratch', icon: 'ri-rocket-line', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
    { id: 'optimize', title: 'Optimize', description: 'Improve existing campaign performance', icon: 'ri-settings-3-line', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    { id: 'scale', title: 'Scale', description: 'Expand successful campaigns', icon: 'ri-line-chart-line', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
  ];

  workflows: Workflow[] = [
    { id: 'google-search', title: 'Google Search Ads', description: 'Create search campaigns with AI', icon: 'ri-google-fill', gradient: 'linear-gradient(135deg, #4285F4, #2a62bd)', category: 'launch' },
    { id: 'meta-campaign', title: 'Meta Campaign', description: 'Launch Facebook & Instagram ads', icon: 'ri-facebook-fill', gradient: 'linear-gradient(135deg, #1877F2, #0a5bb8)', category: 'launch' },
    { id: 'ab-test', title: 'A/B Test Creator', description: 'Generate test variants', icon: 'ri-flask-line', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)', category: 'optimize' },
    { id: 'bid-optimization', title: 'Bid Optimization', description: 'AI-powered bid strategy', icon: 'ri-money-dollar-circle-line', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)', category: 'optimize' },
    { id: 'creative-refresh', title: 'Creative Refresh', description: 'Update fatigued ad creatives', icon: 'ri-refresh-line', gradient: 'linear-gradient(135deg, #ec4899, #db2777)', category: 'optimize' },
    { id: 'scale-winners', title: 'Scale Winners', description: 'Expand top performers', icon: 'ri-bar-chart-grouped-line', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', category: 'scale' },
    { id: 'retargeting', title: 'Retargeting Setup', description: 'Re-engage past visitors', icon: 'ri-user-follow-line', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', category: 'scale' },
    { id: 'cross-platform', title: 'Cross-Platform Report', description: 'Unified performance analytics', icon: 'ri-file-chart-line', gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)', category: 'scale' },
  ];

  getWorkflows(category: string) {
    return this.workflows.filter(w => w.category === category);
  }

  selectWorkflow(workflow: Workflow) {
    this.selectedWorkflow.set(workflow);
  }
}
