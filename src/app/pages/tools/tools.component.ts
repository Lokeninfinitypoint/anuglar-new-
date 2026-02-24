import { Component, OnInit, signal, computed } from '@angular/core';

import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TOOLS, CATEGORIES, Tool, getToolsByCategory } from '../../data/tools.data';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="tools-page">
      <!-- Header -->
      <header class="page-header">
        <div class="header-info">
          <h1>All Tools</h1>
          <p>{{ TOOLS.length }} AI-powered marketing tools</p>
        </div>
        <div class="header-search">
          <i class="ri-search-line"></i>
          <input
            type="text"
            placeholder="Search tools..."
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearch($event)"
          />
          @if (searchQuery) {
            <button class="clear-btn" (click)="clearSearch()">
              <i class="ri-close-line"></i>
            </button>
          }
        </div>
      </header>

      <!-- Categories -->
      <nav class="categories">
        @for (cat of categories; track cat.id) {
          <button
            class="cat-btn"
            [class.active]="selectedCategory() === cat.id"
            (click)="selectCategory(cat.id)"
          >
            <i [class]="cat.icon"></i>
            <span>{{ cat.name }}</span>
            <span class="count">{{ cat.count }}</span>
          </button>
        }
      </nav>

      <!-- Results Info -->
      <div class="results-info">
        <span>Showing {{ filteredTools().length }} tools</span>
        @if (searchQuery) {
          <span class="search-term">for "{{ searchQuery }}"</span>
        }
      </div>

      <!-- Tools Grid -->
      <div class="tools-grid">
        @for (tool of filteredTools(); track tool.slug; let i = $index) {
          <a
            class="tool-card"
            [routerLink]="['/tools', tool.slug]"
            [style.--delay]="(i % 20) * 0.03 + 's'"
          >
            <div class="tool-icon">
              <i [class]="tool.icon"></i>
            </div>
            <div class="tool-content">
              <h3>{{ tool.name }}</h3>
              <p>{{ tool.description }}</p>
              <span class="tool-badge">{{ tool.badge }}</span>
            </div>
            <i class="ri-arrow-right-s-line tool-arrow"></i>
          </a>
        }
      </div>

      <!-- Empty State -->
      @if (filteredTools().length === 0) {
        <div class="empty-state">
          <i class="ri-search-line"></i>
          <h3>No tools found</h3>
          <p>Try a different search term or category</p>
          <button class="btn-reset" (click)="resetFilters()">Reset Filters</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .tools-page {
      max-width: 1400px;
      margin: 0 auto;
    }

    /* Header */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 32px;
      margin-bottom: 28px;
    }

    .header-info h1 {
      font-size: 28px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 4px;
    }

    .header-info p {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
    }

    .header-search {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 20px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      min-width: 320px;
      transition: all 0.2s;
    }

    .header-search:focus-within {
      border-color: rgba(139, 92, 246, 0.3);
      background: rgba(255, 255, 255, 0.05);
    }

    .header-search i {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.4);
    }

    .header-search input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
      font-family: inherit;
    }

    .header-search input::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    .clear-btn {
      width: 24px;
      height: 24px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .clear-btn i {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
    }

    /* Categories */
    .categories {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      overflow-x: auto;
      padding-bottom: 8px;
      scrollbar-width: none;
    }

    .categories::-webkit-scrollbar {
      display: none;
    }

    .cat-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s;
    }

    .cat-btn i {
      font-size: 16px;
    }

    .cat-btn:hover {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.9);
    }

    .cat-btn.active {
      background: rgba(139, 92, 246, 0.15);
      border-color: rgba(139, 92, 246, 0.3);
      color: #a5b4fc;
    }

    .count {
      padding: 2px 8px;
      font-size: 11px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 6px;
    }

    .cat-btn.active .count {
      background: rgba(139, 92, 246, 0.3);
    }

    /* Results Info */
    .results-info {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);
    }

    .search-term {
      color: #8b5cf6;
    }

    /* Tools Grid */
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 12px;
    }

    .tool-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 20px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 14px;
      text-decoration: none;
      opacity: 0;
      animation: fadeIn 0.4s ease forwards;
      animation-delay: var(--delay);
      transition: all 0.2s;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .tool-card:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(139, 92, 246, 0.2);
    }

    .tool-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .tool-icon i {
      font-size: 20px;
      color: #8b5cf6;
    }

    .tool-content {
      flex: 1;
      min-width: 0;
    }

    .tool-content h3 {
      font-size: 14px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tool-content p {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.45);
      margin-bottom: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tool-badge {
      display: inline-block;
      padding: 3px 8px;
      font-size: 10px;
      font-weight: 500;
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.6);
      border-radius: 4px;
    }

    .tool-arrow {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.2);
      transition: all 0.2s;
    }

    .tool-card:hover .tool-arrow {
      color: #8b5cf6;
      transform: translateX(4px);
    }

    /* Empty State */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 40px;
      text-align: center;
    }

    .empty-state i {
      font-size: 48px;
      color: rgba(255, 255, 255, 0.2);
      margin-bottom: 20px;
    }

    .empty-state h3 {
      font-size: 18px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 8px;
    }

    .empty-state p {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 24px;
    }

    .btn-reset {
      padding: 12px 24px;
      background: rgba(139, 92, 246, 0.15);
      border: 1px solid rgba(139, 92, 246, 0.3);
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #a5b4fc;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-reset:hover {
      background: rgba(139, 92, 246, 0.25);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        align-items: stretch;
      }

      .header-search {
        min-width: 100%;
      }

      .tools-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ToolsComponent implements OnInit {
  TOOLS = TOOLS;
  searchQuery = '';
  selectedCategory = signal('all');

  categories = [
    { id: 'all', name: 'All', icon: 'ri-apps-line', count: TOOLS.length },
    { id: 'meta', name: 'Meta/Facebook', icon: 'ri-facebook-fill', count: TOOLS.filter(t => t.category === 'meta').length },
    { id: 'google', name: 'Google Ads', icon: 'ri-google-fill', count: TOOLS.filter(t => t.category === 'google').length },
    { id: 'content', name: 'Content', icon: 'ri-quill-pen-line', count: TOOLS.filter(t => t.category === 'content').length },
    { id: 'seo', name: 'SEO', icon: 'ri-search-line', count: TOOLS.filter(t => t.category === 'seo').length },
    { id: 'social', name: 'Social', icon: 'ri-instagram-line', count: TOOLS.filter(t => t.category === 'social').length },
    { id: 'analytics', name: 'Analytics', icon: 'ri-bar-chart-line', count: TOOLS.filter(t => t.category === 'analytics').length },
    { id: 'ai', name: 'AI Tools', icon: 'ri-robot-2-line', count: TOOLS.filter(t => t.category === 'ai').length },
  ];

  filteredTools = computed(() => {
    let tools = this.selectedCategory() === 'all'
      ? TOOLS
      : TOOLS.filter(t => t.category === this.selectedCategory());

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      tools = tools.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.badge.toLowerCase().includes(query)
      );
    }

    return tools;
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectCategory(params['category']);
      }
    });
  }

  selectCategory(id: string) {
    this.selectedCategory.set(id);
  }

  onSearch(query: string) {
    this.searchQuery = query;
  }

  clearSearch() {
    this.searchQuery = '';
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory.set('all');
  }
}
