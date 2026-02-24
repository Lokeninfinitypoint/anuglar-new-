import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { ToolsDataService, Tool, ToolCategory } from '../../core/services/tools-data.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatBadgeModule,
    MatTabsModule
  ],
  template: `
    <div class="tools-container">
      <!-- Header -->
      <div class="tools-header">
        <div class="header-content">
          <h1 class="text-gradient">AI Marketing Tools</h1>
          <p class="subtitle">
            <span class="tool-count">207</span> AI-powered tools across Google, Meta & Shopify
          </p>
        </div>
        <div class="header-stats">
          <div class="stat-card glass-card">
            <mat-icon>auto_awesome</mat-icon>
            <div>
              <span class="stat-value">{{ usedToday }}</span>
              <span class="stat-label">Used Today</span>
            </div>
          </div>
          <div class="stat-card glass-card">
            <mat-icon>trending_up</mat-icon>
            <div>
              <span class="stat-value">{{ savedHours }}h</span>
              <span class="stat-label">Time Saved</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="search-section glass-card">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search tools</mat-label>
          <input 
            matInput 
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearchChange($event)"
            placeholder="Try 'keyword research' or 'ad copy'">
          <mat-icon matPrefix>search</mat-icon>
          <button 
            *ngIf="searchQuery" 
            mat-icon-button 
            matSuffix 
            (click)="clearSearch()">
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>

        <div class="filter-section">
          <mat-chip-set>
            <mat-chip 
              [selected]="selectedPlatform() === 'all'"
              (click)="selectPlatform('all')">
              All Platforms
              <span class="chip-count">207</span>
            </mat-chip>
            <mat-chip 
              [selected]="selectedPlatform() === 'google'"
              (click)="selectPlatform('google')">
              <img src="/assets/google-icon.svg" alt="Google" class="platform-icon">
              Google Ads
              <span class="chip-count">77</span>
            </mat-chip>
            <mat-chip 
              [selected]="selectedPlatform() === 'meta'"
              (click)="selectPlatform('meta')">
              <img src="/assets/meta-icon.svg" alt="Meta" class="platform-icon">
              Meta / Facebook
              <span class="chip-count">74</span>
            </mat-chip>
            <mat-chip 
              [selected]="selectedPlatform() === 'shopify'"
              (click)="selectPlatform('shopify')">
              <img src="/assets/shopify-icon.svg" alt="Shopify" class="platform-icon">
              Shopify
              <span class="chip-count">56</span>
            </mat-chip>
          </mat-chip-set>
        </div>
      </div>

      <!-- Categories -->
      <div class="categories-section">
        <h2>Browse by Category</h2>
        <div class="categories-grid">
          <div 
            *ngFor="let category of categories" 
            class="category-card glass-card"
            [class.selected]="selectedCategory() === category.id"
            (click)="selectCategory(category.id)">
            <mat-icon>{{ category.icon }}</mat-icon>
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
            <span class="tool-count">{{ category.toolCount }} tools</span>
          </div>
        </div>
      </div>

      <!-- Tools Grid -->
      <div class="tools-section">
        <div class="section-header">
          <h2>
            {{ selectedCategory() ? getCategoryName(selectedCategory()) : 'All Tools' }}
            <span class="result-count">({{ filteredTools().length }})</span>
          </h2>
          <div class="view-options">
            <button mat-icon-button [class.active]="viewMode() === 'grid'" (click)="setViewMode('grid')">
              <mat-icon>grid_view</mat-icon>
            </button>
            <button mat-icon-button [class.active]="viewMode() === 'list'" (click)="setViewMode('list')">
              <mat-icon>view_list</mat-icon>
            </button>
          </div>
        </div>

        <div class="tools-grid" [class.list-view]="viewMode() === 'list'">
          <div 
            *ngFor="let tool of filteredTools()" 
            class="tool-card glass-card"
            [routerLink]="['/tools', tool.slug]">
            <div class="tool-header">
              <mat-icon class="tool-icon">{{ tool.icon }}</mat-icon>
              <mat-chip *ngIf="tool.premium" class="premium-chip">
                <mat-icon>star</mat-icon>
                Premium
              </mat-chip>
            </div>
            <h3>{{ tool.name }}</h3>
            <p>{{ tool.description }}</p>
            <div class="tool-footer">
              <div class="tool-tags">
                <span *ngFor="let tag of tool.tags.slice(0, 2)" class="tag">
                  {{ tag }}
                </span>
              </div>
              <button mat-button color="primary">
                Use Tool
                <mat-icon>arrow_forward</mat-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="filteredTools().length === 0" class="empty-state">
          <mat-icon>search_off</mat-icon>
          <h3>No tools found</h3>
          <p>Try adjusting your search or filters</p>
          <button mat-button (click)="resetFilters()">Clear Filters</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tools-container {
      max-width: var(--max-w);
      margin: 0 auto;
      padding-bottom: 48px;
    }

    /* Header */
    .tools-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 48px;
      gap: 32px;
      flex-wrap: wrap;
    }

    .header-content h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .subtitle {
      color: var(--text-2);
      font-size: 1.125rem;
    }

    .tool-count {
      color: var(--accent);
      font-weight: 600;
    }

    .header-stats {
      display: flex;
      gap: 16px;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 24px;
    }

    .stat-value {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-1);
    }

    .stat-label {
      display: block;
      font-size: 0.75rem;
      color: var(--text-3);
    }

    /* Search Section */
    .search-section {
      padding: 32px;
      margin-bottom: 48px;
    }

    .search-field {
      width: 100%;
      margin-bottom: 24px;
    }

    .filter-section mat-chip {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      height: auto;
    }

    .platform-icon {
      width: 16px;
      height: 16px;
    }

    .chip-count {
      background: var(--surface-hover);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      margin-left: 4px;
    }

    /* Categories */
    .categories-section {
      margin-bottom: 48px;
    }

    .categories-section h2 {
      margin-bottom: 24px;
      font-size: 1.5rem;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }

    .category-card {
      padding: 24px;
      cursor: pointer;
      transition: all 0.3s var(--ease-out-expo);
    }

    .category-card:hover {
      transform: translateY(-2px);
      border-color: var(--accent);
    }

    .category-card.selected {
      border-color: var(--accent);
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
    }

    .category-card mat-icon {
      font-size: 2rem;
      color: var(--accent);
      margin-bottom: 12px;
    }

    .category-card h3 {
      font-size: 1.125rem;
      margin-bottom: 4px;
    }

    .category-card p {
      color: var(--text-2);
      font-size: 0.875rem;
      margin-bottom: 8px;
    }

    /* Tools Section */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .section-header h2 {
      font-size: 1.5rem;
    }

    .result-count {
      color: var(--text-3);
      font-weight: 400;
      font-size: 1rem;
    }

    .view-options {
      display: flex;
      gap: 8px;
    }

    .view-options button {
      color: var(--text-3);
    }

    .view-options button.active {
      color: var(--accent);
    }

    /* Tools Grid */
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    .tools-grid.list-view {
      grid-template-columns: 1fr;
    }

    .tool-card {
      padding: 24px;
      cursor: pointer;
      transition: all 0.3s var(--ease-out-expo);
      position: relative;
      overflow: hidden;
    }

    .tool-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--gradient-hero);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .tool-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
    }

    .tool-card:hover::before {
      opacity: 1;
    }

    .tool-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .tool-icon {
      font-size: 2.5rem;
      color: var(--accent);
    }

    .premium-chip {
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      color: var(--bg);
      font-size: 0.75rem;
      height: 24px;
    }

    .premium-chip mat-icon {
      font-size: 14px;
      width: 14px;
      height: 14px;
    }

    .tool-card h3 {
      font-size: 1.25rem;
      margin-bottom: 8px;
      color: var(--text-1);
    }

    .tool-card p {
      color: var(--text-2);
      font-size: 0.875rem;
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .tool-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }

    .tool-tags {
      display: flex;
      gap: 8px;
    }

    .tag {
      padding: 4px 8px;
      background: var(--surface-hover);
      border-radius: 4px;
      font-size: 0.75rem;
      color: var(--text-3);
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 64px 32px;
    }

    .empty-state mat-icon {
      font-size: 4rem;
      color: var(--text-3);
      margin-bottom: 16px;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      margin-bottom: 8px;
    }

    .empty-state p {
      color: var(--text-2);
      margin-bottom: 24px;
    }

    /* Material Overrides */
    ::ng-deep .mat-mdc-form-field {
      --mdc-outlined-text-field-container-shape: var(--radius);
    }

    ::ng-deep .mat-mdc-chip-set {
      gap: 12px;
    }

    ::ng-deep .mat-mdc-chip {
      --mdc-chip-container-shape-radius: 20px;
      --mdc-chip-container-height: 36px;
    }

    ::ng-deep .mat-mdc-chip.mat-mdc-chip-selected {
      --mdc-chip-elevated-container-color: var(--accent);
      --mdc-chip-label-text-color: white;
    }
  `]
})
export class ToolsComponent implements OnInit {
  private toolsService = inject(ToolsDataService);
  
  // Signals
  selectedPlatform = signal<string>('all');
  selectedCategory = signal<string>('');
  viewMode = signal<'grid' | 'list'>('grid');
  searchQuery = '';
  filteredTools = signal<Tool[]>([]);
  
  // Data
  categories: ToolCategory[] = [];
  allTools: Tool[] = [];
  
  // Stats
  usedToday = 23;
  savedHours = 4.5;
  
  // Search subject
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.loadCategories();
    this.loadTools();
    
    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  loadCategories(): void {
    this.toolsService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadTools(): void {
    this.toolsService.getAllTools().subscribe(tools => {
      this.allTools = tools;
      this.applyFilters();
    });
  }

  selectPlatform(platform: string): void {
    this.selectedPlatform.set(platform);
    this.applyFilters();
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory.set(this.selectedCategory() === categoryId ? '' : categoryId);
    this.applyFilters();
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode.set(mode);
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilters();
  }

  performSearch(query: string): void {
    if (query) {
      this.toolsService.searchTools(query).subscribe(tools => {
        this.filteredTools.set(tools);
      });
    } else {
      this.applyFilters();
    }
  }

  applyFilters(): void {
    let filtered = [...this.allTools];
    
    // Platform filter
    if (this.selectedPlatform() !== 'all') {
      filtered = filtered.filter(tool => tool.platform === this.selectedPlatform());
    }
    
    // Category filter
    if (this.selectedCategory()) {
      filtered = filtered.filter(tool => 
        tool.category.toLowerCase() === this.selectedCategory().toLowerCase()
      );
    }
    
    this.filteredTools.set(filtered);
  }

  resetFilters(): void {
    this.selectedPlatform.set('all');
    this.selectedCategory.set('');
    this.searchQuery = '';
    this.applyFilters();
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.name || 'All Tools';
  }
}
