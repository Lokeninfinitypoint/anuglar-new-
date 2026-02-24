import { Component, OnInit, signal } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TOOLS, Tool, getToolBySlug } from '../../data/tools.data';

@Component({
  selector: 'app-tool-detail',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="tool-page">
      <!-- Back Navigation -->
      <a routerLink="/tools" class="back-link">
        <i class="ri-arrow-left-line"></i>
        <span>All Tools</span>
      </a>

      @if (tool()) {
        <!-- Tool Header -->
        <header class="tool-header">
          <div class="tool-icon">
            <i [class]="tool()!.icon"></i>
          </div>
          <div class="tool-info">
            <span class="tool-badge">{{ tool()!.badge }}</span>
            <h1>{{ tool()!.name }}</h1>
            <p>{{ tool()!.description }}</p>
          </div>
          <div class="tool-meta">
            <div class="meta-item">
              <i class="ri-flashlight-line"></i>
              <span>1 credit per use</span>
            </div>
            <div class="meta-item">
              <i class="ri-time-line"></i>
              <span>~15 seconds</span>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <div class="tool-content">
          <!-- Input Section -->
          <section class="input-section">
            <div class="section-header">
              <h2>Input</h2>
              <span class="hint">Describe what you want to generate</span>
            </div>

            <div class="input-form">
              <div class="form-group">
                <label>Your Request</label>
                <textarea
                  [(ngModel)]="userInput"
                  placeholder="Be specific about what you want. Include details like target audience, tone, product/service, and any specific requirements..."
                  rows="6"
                ></textarea>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Tone</label>
                  <select [(ngModel)]="selectedTone">
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="persuasive">Persuasive</option>
                    <option value="friendly">Friendly</option>
                    <option value="formal">Formal</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Length</label>
                  <select [(ngModel)]="selectedLength">
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
              </div>

              <button
                class="generate-btn"
                [disabled]="isGenerating() || !userInput.trim()"
                (click)="generate()"
              >
                @if (isGenerating()) {
                  <i class="ri-loader-4-line spinning"></i>
                  <span>Generating...</span>
                } @else {
                  <i class="ri-magic-line"></i>
                  <span>Generate</span>
                }
              </button>
            </div>
          </section>

          <!-- Output Section -->
          <section class="output-section">
            <div class="section-header">
              <h2>Output</h2>
              @if (output()) {
                <div class="output-actions">
                  <button class="action-btn" (click)="copyOutput()">
                    <i class="ri-file-copy-line"></i>
                    Copy
                  </button>
                  <button class="action-btn" (click)="regenerate()">
                    <i class="ri-refresh-line"></i>
                    Regenerate
                  </button>
                </div>
              }
            </div>

            <div class="output-area" [class.has-content]="output()">
              @if (output()) {
                <div class="output-content">
                  {{ output() }}
                </div>
              } @else if (isGenerating()) {
                <div class="generating-state">
                  <div class="generating-animation">
                    <span></span><span></span><span></span>
                  </div>
                  <p>AI is working on your request...</p>
                </div>
              } @else {
                <div class="empty-output">
                  <i class="ri-file-text-line"></i>
                  <p>Your generated content will appear here</p>
                </div>
              }
            </div>
          </section>
        </div>

        <!-- Tips Section -->
        <aside class="tips-section">
          <h3><i class="ri-lightbulb-line"></i> Tips for better results</h3>
          <ul>
            <li>Be specific about your target audience</li>
            <li>Include relevant keywords or themes</li>
            <li>Mention the desired call-to-action</li>
            <li>Specify any brand guidelines or tone preferences</li>
          </ul>
        </aside>
      } @else {
        <!-- Tool Not Found -->
        <div class="not-found">
          <i class="ri-error-warning-line"></i>
          <h2>Tool not found</h2>
          <p>The tool you're looking for doesn't exist</p>
          <a routerLink="/tools" class="btn-back">Browse All Tools</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .tool-page {
      max-width: 1000px;
      margin: 0 auto;
    }

    /* Back Link */
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      text-decoration: none;
      margin-bottom: 24px;
      transition: color 0.2s;
    }

    .back-link:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    /* Header */
    .tool-header {
      display: flex;
      align-items: flex-start;
      gap: 24px;
      padding: 32px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 20px;
      margin-bottom: 28px;
    }

    .tool-icon {
      width: 72px;
      height: 72px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.15));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .tool-icon i {
      font-size: 32px;
      color: #8b5cf6;
    }

    .tool-info {
      flex: 1;
    }

    .tool-badge {
      display: inline-block;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 600;
      background: rgba(139, 92, 246, 0.15);
      color: #a5b4fc;
      border-radius: 6px;
      margin-bottom: 12px;
    }

    .tool-info h1 {
      font-size: 26px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 8px;
    }

    .tool-info p {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.55);
      line-height: 1.5;
    }

    .tool-meta {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);
    }

    .meta-item i {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.4);
    }

    /* Content */
    .tool-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 28px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .section-header h2 {
      font-size: 16px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
    }

    .hint {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.4);
    }

    /* Input Section */
    .input-section {
      padding: 28px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 10px;
    }

    textarea, select {
      width: 100%;
      padding: 14px 18px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
      font-family: inherit;
      resize: vertical;
      transition: all 0.2s;
    }

    textarea::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    textarea:focus, select:focus {
      outline: none;
      border-color: rgba(139, 92, 246, 0.4);
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
    }

    select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 14px center;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .generate-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 16px 24px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border: none;
      border-radius: 14px;
      font-size: 15px;
      font-weight: 600;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
      transition: all 0.3s;
    }

    .generate-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
    }

    .generate-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      100% { transform: rotate(360deg); }
    }

    /* Output Section */
    .output-section {
      padding: 28px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 20px;
    }

    .output-actions {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      transition: all 0.2s;
    }

    .action-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: white;
    }

    .output-area {
      min-height: 300px;
      padding: 20px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px dashed rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .output-area.has-content {
      align-items: flex-start;
      border-style: solid;
      border-color: rgba(255, 255, 255, 0.06);
    }

    .output-content {
      font-size: 14px;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.85);
      white-space: pre-wrap;
    }

    .empty-output, .generating-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .empty-output i {
      font-size: 40px;
      color: rgba(255, 255, 255, 0.15);
      margin-bottom: 16px;
    }

    .empty-output p, .generating-state p {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.4);
    }

    .generating-animation {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .generating-animation span {
      width: 12px;
      height: 12px;
      background: #8b5cf6;
      border-radius: 50%;
      animation: bounce 1.4s ease-in-out infinite;
    }

    .generating-animation span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .generating-animation span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
      40% { transform: scale(1); opacity: 1; }
    }

    /* Tips */
    .tips-section {
      padding: 24px;
      background: rgba(245, 158, 11, 0.05);
      border: 1px solid rgba(245, 158, 11, 0.15);
      border-radius: 16px;
    }

    .tips-section h3 {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 600;
      color: #fbbf24;
      margin-bottom: 16px;
    }

    .tips-section ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .tips-section li {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.6);
      padding-left: 20px;
      position: relative;
    }

    .tips-section li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: rgba(251, 191, 36, 0.6);
    }

    /* Not Found */
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 100px 40px;
      text-align: center;
    }

    .not-found i {
      font-size: 64px;
      color: rgba(255, 255, 255, 0.2);
      margin-bottom: 24px;
    }

    .not-found h2 {
      font-size: 24px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 8px;
    }

    .not-found p {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 24px;
    }

    .btn-back {
      padding: 14px 28px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      color: white;
      text-decoration: none;
    }

    /* Responsive */
    @media (max-width: 900px) {
      .tool-content {
        grid-template-columns: 1fr;
      }

      .tool-header {
        flex-direction: column;
      }

      .tips-section ul {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ToolDetailComponent implements OnInit {
  tool = signal<Tool | undefined>(undefined);
  userInput = '';
  selectedTone = 'professional';
  selectedLength = 'medium';
  isGenerating = signal(false);
  output = signal('');

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      const foundTool = TOOLS.find(t => t.slug === slug);
      this.tool.set(foundTool);
    });
  }

  generate() {
    if (!this.userInput.trim()) return;

    this.isGenerating.set(true);
    this.output.set('');

    // Simulate AI generation (replace with actual API call)
    setTimeout(() => {
      this.output.set(`Here's your generated ${this.tool()?.name} content:\n\n${this.userInput}\n\nGenerated with ${this.selectedTone} tone, ${this.selectedLength} length.\n\n[This is a demo output - connect to Windmill API for real AI generation]`);
      this.isGenerating.set(false);
    }, 2000);
  }

  regenerate() {
    this.generate();
  }

  copyOutput() {
    navigator.clipboard.writeText(this.output());
  }
}
