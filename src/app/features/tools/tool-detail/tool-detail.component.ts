import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ToolsDataService, Tool } from '../../../core/services/tools-data.service';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-tool-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="tool-detail-container" *ngIf="tool">
      <!-- Header -->
      <div class="tool-header">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <div class="header-content">
          <div class="tool-title">
            <mat-icon class="tool-icon">{{ tool.icon }}</mat-icon>
            <div>
              <h1>{{ tool.name }}</h1>
              <p>{{ tool.description }}</p>
            </div>
          </div>
          <div class="tool-stats">
            <div class="stat">
              <mat-icon>auto_awesome</mat-icon>
              <span>{{ tool.usage }} uses</span>
            </div>
            <div class="stat" *ngIf="tool.premium">
              <mat-icon>star</mat-icon>
              <span>Premium</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="tool-content">
        <!-- Input Form -->
        <mat-card class="input-section glass-card">
          <mat-card-header>
            <mat-card-title>Input Parameters</mat-card-title>
            <mat-card-subtitle>Fill in the required information to generate results</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <form [formGroup]="toolForm" (ngSubmit)="onSubmit()">
              <div class="form-fields">
                <ng-container *ngFor="let field of tool.fields">
                  <!-- Text Input -->
                  <mat-form-field 
                    *ngIf="field.type === 'text'" 
                    appearance="outline"
                    class="full-width">
                    <mat-label>{{ field.label }}</mat-label>
                    <input 
                      matInput 
                      [formControlName]="field.name"
                      [placeholder]="field.placeholder">
                    <mat-error *ngIf="toolForm.get(field.name)?.hasError('required')">
                      {{ field.label }} is required
                    </mat-error>
                  </mat-form-field>

                  <!-- Textarea -->
                  <mat-form-field 
                    *ngIf="field.type === 'textarea'" 
                    appearance="outline"
                    class="full-width">
                    <mat-label>{{ field.label }}</mat-label>
                    <textarea 
                      matInput 
                      [formControlName]="field.name"
                      [placeholder]="field.placeholder"
                      rows="4">
                    </textarea>
                    <mat-error *ngIf="toolForm.get(field.name)?.hasError('required')">
                      {{ field.label }} is required
                    </mat-error>
                  </mat-form-field>

                  <!-- Select -->
                  <mat-form-field 
                    *ngIf="field.type === 'select'" 
                    appearance="outline"
                    class="full-width">
                    <mat-label>{{ field.label }}</mat-label>
                    <mat-select [formControlName]="field.name">
                      <mat-option 
                        *ngFor="let option of field.options" 
                        [value]="option.value">
                        {{ option.label }}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>

                  <!-- Number -->
                  <mat-form-field 
                    *ngIf="field.type === 'number'" 
                    appearance="outline"
                    class="full-width">
                    <mat-label>{{ field.label }}</mat-label>
                    <input 
                      matInput 
                      type="number"
                      [formControlName]="field.name"
                      [placeholder]="field.placeholder">
                    <mat-error *ngIf="toolForm.get(field.name)?.hasError('required')">
                      {{ field.label }} is required
                    </mat-error>
                  </mat-form-field>
                </ng-container>
              </div>

              <div class="form-actions">
                <button 
                  mat-raised-button 
                  color="primary" 
                  type="submit"
                  [disabled]="toolForm.invalid || isProcessing()">
                  <mat-icon>auto_awesome</mat-icon>
                  {{ isProcessing() ? 'Generating...' : 'Generate Results' }}
                </button>
                <button 
                  mat-stroked-button 
                  type="button"
                  (click)="resetForm()">
                  Reset
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>

        <!-- Results Section -->
        <mat-card 
          *ngIf="results()" 
          class="results-section glass-card"
          [@slideIn]>
          <mat-card-header>
            <mat-card-title>Generated Results</mat-card-title>
            <mat-card-subtitle>Here's what we generated for you</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="results-content">
              <pre>{{ results() | json }}</pre>
            </div>
            
            <div class="results-actions">
              <button mat-button (click)="copyResults()">
                <mat-icon>content_copy</mat-icon>
                Copy
              </button>
              <button mat-button (click)="downloadResults()">
                <mat-icon>download</mat-icon>
                Download
              </button>
              <button mat-button (click)="saveResults()">
                <mat-icon>save</mat-icon>
                Save
              </button>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Loading State -->
        <div *ngIf="isProcessing()" class="loading-state">
          <mat-spinner diameter="40"></mat-spinner>
          <p>Generating results...</p>
        </div>
      </div>

      <!-- Related Tools -->
      <div class="related-tools">
        <h2>Related Tools</h2>
        <div class="related-grid">
          <mat-card 
            *ngFor="let related of relatedTools" 
            class="related-card glass-card"
            [routerLink]="['/tools', related.slug]">
            <mat-icon>{{ related.icon }}</mat-icon>
            <h3>{{ related.name }}</h3>
            <p>{{ related.description }}</p>
          </mat-card>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div *ngIf="!tool && !isLoading" class="not-found">
      <mat-icon>error_outline</mat-icon>
      <h2>Tool not found</h2>
      <p>The tool you're looking for doesn't exist</p>
      <button mat-raised-button color="primary" routerLink="/tools">
        Browse All Tools
      </button>
    </div>
  `,
  styles: [`
    .tool-detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding-bottom: 48px;
    }

    /* Header */
    .tool-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 32px;
    }

    .header-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
    }

    .tool-title {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    .tool-icon {
      font-size: 3rem;
      color: var(--accent);
    }

    .tool-title h1 {
      font-size: 2rem;
      margin-bottom: 4px;
    }

    .tool-title p {
      color: var(--text-2);
    }

    .tool-stats {
      display: flex;
      gap: 24px;
    }

    .stat {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text-2);
    }

    /* Content */
    .tool-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 48px;
    }

    @media (max-width: 1024px) {
      .tool-content {
        grid-template-columns: 1fr;
      }
    }

    .input-section, .results-section {
      height: fit-content;
    }

    .form-fields {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }

    .full-width {
      width: 100%;
    }

    .form-actions {
      display: flex;
      gap: 12px;
    }

    /* Results */
    .results-content {
      background: var(--bg-base);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      margin-bottom: 16px;
      max-height: 400px;
      overflow-y: auto;
    }

    .results-content pre {
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: var(--font-mono);
      font-size: 0.875rem;
      color: var(--text-1);
    }

    .results-actions {
      display: flex;
      gap: 8px;
    }

    /* Loading */
    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px;
      gap: 16px;
    }

    .loading-state p {
      color: var(--text-2);
    }

    /* Related Tools */
    .related-tools h2 {
      margin-bottom: 24px;
      font-size: 1.5rem;
    }

    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }

    .related-card {
      padding: 24px;
      cursor: pointer;
      transition: all 0.3s var(--ease-out-expo);
    }

    .related-card:hover {
      transform: translateY(-2px);
      border-color: var(--accent);
    }

    .related-card mat-icon {
      font-size: 2rem;
      color: var(--accent);
      margin-bottom: 12px;
    }

    .related-card h3 {
      font-size: 1.125rem;
      margin-bottom: 4px;
    }

    .related-card p {
      color: var(--text-2);
      font-size: 0.875rem;
    }

    /* Not Found */
    .not-found {
      text-align: center;
      padding: 64px;
    }

    .not-found mat-icon {
      font-size: 4rem;
      color: var(--text-3);
      margin-bottom: 16px;
    }

    .not-found h2 {
      font-size: 1.5rem;
      margin-bottom: 8px;
    }

    .not-found p {
      color: var(--text-2);
      margin-bottom: 24px;
    }

    /* Material Overrides */
    ::ng-deep .mat-mdc-card {
      --mdc-elevated-card-container-color: transparent;
    }

    ::ng-deep .mat-mdc-form-field {
      --mdc-outlined-text-field-container-shape: var(--radius);
    }
  `],
  animations: [
    // Add slide in animation for results
  ]
})
export class ToolDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toolsService = inject(ToolsDataService);
  private apiService = inject(ApiService);
  private snackBar = inject(MatSnackBar);
  
  tool: Tool | undefined;
  toolForm!: FormGroup;
  isLoading = true;
  isProcessing = signal(false);
  results = signal<any>(null);
  relatedTools: Tool[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.loadTool(slug);
    });
  }

  loadTool(slug: string): void {
    this.toolsService.getToolBySlug(slug).subscribe(tool => {
      this.tool = tool;
      this.isLoading = false;
      
      if (tool) {
        this.buildForm();
        this.loadRelatedTools();
        this.toolsService.incrementToolUsage(tool.id);
      }
    });
  }

  buildForm(): void {
    if (!this.tool?.fields) return;
    
    const formControls: any = {};
    
    this.tool.fields.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      formControls[field.name] = ['', validators];
    });
    
    this.toolForm = this.fb.group(formControls);
  }

  loadRelatedTools(): void {
    if (!this.tool) return;
    
    this.toolsService.getToolsByCategory(this.tool.category).subscribe(tools => {
      this.relatedTools = tools
        .filter(t => t.id !== this.tool?.id)
        .slice(0, 3);
    });
  }

  onSubmit(): void {
    if (this.toolForm.invalid || !this.tool) return;
    
    this.isProcessing.set(true);
    const formData = this.toolForm.value;
    
    // Execute tool via Windmill
    this.apiService.executeScript(
      `tools/${this.tool.platform}/${this.tool.slug}`,
      formData
    ).subscribe({
      next: (response) => {
        this.results.set(response.result);
        this.isProcessing.set(false);
        this.snackBar.open('Results generated successfully!', 'Close', {
          duration: 3000
        });
      },
      error: (error) => {
        this.isProcessing.set(false);
        this.snackBar.open('Error generating results. Please try again.', 'Close', {
          duration: 5000
        });
      }
    });
  }

  resetForm(): void {
    this.toolForm.reset();
    this.results.set(null);
  }

  copyResults(): void {
    const resultsText = JSON.stringify(this.results(), null, 2);
    navigator.clipboard.writeText(resultsText);
    this.snackBar.open('Results copied to clipboard!', 'Close', {
      duration: 2000
    });
  }

  downloadResults(): void {
    const resultsText = JSON.stringify(this.results(), null, 2);
    const blob = new Blob([resultsText], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.tool?.slug}-results.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  saveResults(): void {
    // TODO: Implement save to user's history
    this.snackBar.open('Results saved to your history!', 'Close', {
      duration: 2000
    });
  }

  goBack(): void {
    this.router.navigate(['/tools']);
  }
}
