import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  platform: 'google' | 'meta' | 'shopify' | 'general';
  icon: string;
  slug: string;
  tags: string[];
  premium: boolean;
  usage: number;
  fields?: ToolField[];
}

export interface ToolField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: any;
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  toolCount: number;
  platform: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToolsDataService {
  private tools: Tool[] = [
    // Google Ads Tools
    {
      id: 'google-keyword-planner',
      name: 'Keyword Planner',
      description: 'Find the right keywords to reach your customers',
      category: 'Research',
      platform: 'google',
      icon: 'search',
      slug: 'keyword-planner',
      tags: ['keywords', 'research', 'seo'],
      premium: false,
      usage: 0,
      fields: [
        {
          name: 'seedKeywords',
          label: 'Seed Keywords',
          type: 'textarea',
          placeholder: 'Enter seed keywords, one per line',
          required: true
        },
        {
          name: 'location',
          label: 'Target Location',
          type: 'select',
          options: [
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
            { value: 'au', label: 'Australia' }
          ]
        }
      ]
    },
    {
      id: 'google-ad-copy-generator',
      name: 'Ad Copy Generator',
      description: 'Create compelling Google Ads copy that converts',
      category: 'Creative',
      platform: 'google',
      icon: 'edit_note',
      slug: 'ad-copy-generator',
      tags: ['copywriting', 'ads', 'creative'],
      premium: false,
      usage: 0,
      fields: [
        {
          name: 'product',
          label: 'Product/Service Name',
          type: 'text',
          placeholder: 'e.g., Running Shoes',
          required: true
        },
        {
          name: 'benefits',
          label: 'Key Benefits',
          type: 'textarea',
          placeholder: 'List main benefits or features',
          required: true
        },
        {
          name: 'tone',
          label: 'Tone of Voice',
          type: 'select',
          options: [
            { value: 'professional', label: 'Professional' },
            { value: 'friendly', label: 'Friendly' },
            { value: 'urgent', label: 'Urgent' },
            { value: 'casual', label: 'Casual' }
          ]
        }
      ]
    },
    {
      id: 'google-bid-optimizer',
      name: 'Bid Strategy Optimizer',
      description: 'Optimize your bidding strategy for maximum ROI',
      category: 'Optimization',
      platform: 'google',
      icon: 'trending_up',
      slug: 'bid-optimizer',
      tags: ['bidding', 'optimization', 'performance'],
      premium: true,
      usage: 0
    },
    // Meta/Facebook Tools
    {
      id: 'meta-audience-builder',
      name: 'Audience Builder',
      description: 'Build laser-targeted Facebook audiences',
      category: 'Targeting',
      platform: 'meta',
      icon: 'group',
      slug: 'audience-builder',
      tags: ['audience', 'targeting', 'facebook'],
      premium: false,
      usage: 0,
      fields: [
        {
          name: 'demographics',
          label: 'Demographics',
          type: 'text',
          placeholder: 'Age range, gender, location'
        },
        {
          name: 'interests',
          label: 'Interests',
          type: 'textarea',
          placeholder: 'Enter interests, one per line'
        }
      ]
    },
    {
      id: 'meta-creative-tester',
      name: 'Creative A/B Tester',
      description: 'Test and optimize your ad creatives',
      category: 'Testing',
      platform: 'meta',
      icon: 'science',
      slug: 'creative-tester',
      tags: ['testing', 'creative', 'optimization'],
      premium: true,
      usage: 0
    },
    {
      id: 'meta-roas-calculator',
      name: 'ROAS Calculator',
      description: 'Calculate and predict your return on ad spend',
      category: 'Analytics',
      platform: 'meta',
      icon: 'calculate',
      slug: 'roas-calculator',
      tags: ['roas', 'analytics', 'metrics'],
      premium: false,
      usage: 0,
      fields: [
        {
          name: 'adSpend',
          label: 'Ad Spend',
          type: 'number',
          placeholder: 'Enter total ad spend',
          required: true
        },
        {
          name: 'revenue',
          label: 'Revenue Generated',
          type: 'number',
          placeholder: 'Enter revenue from ads',
          required: true
        }
      ]
    },
    // General Marketing Tools
    {
      id: 'competitor-analyzer',
      name: 'Competitor Ad Analyzer',
      description: 'Analyze competitor advertising strategies',
      category: 'Research',
      platform: 'general',
      icon: 'analytics',
      slug: 'competitor-analyzer',
      tags: ['competitor', 'research', 'analysis'],
      premium: true,
      usage: 0
    },
    {
      id: 'landing-page-optimizer',
      name: 'Landing Page Optimizer',
      description: 'Optimize landing pages for conversions',
      category: 'Optimization',
      platform: 'general',
      icon: 'web',
      slug: 'landing-page-optimizer',
      tags: ['landing page', 'conversion', 'optimization'],
      premium: false,
      usage: 0
    },
    {
      id: 'campaign-budget-planner',
      name: 'Campaign Budget Planner',
      description: 'Plan and allocate your campaign budgets effectively',
      category: 'Planning',
      platform: 'general',
      icon: 'account_balance',
      slug: 'budget-planner',
      tags: ['budget', 'planning', 'finance'],
      premium: false,
      usage: 0
    }
  ];

  private categories: ToolCategory[] = [
    {
      id: 'research',
      name: 'Research & Analysis',
      description: 'Tools for market research and competitive analysis',
      icon: 'search',
      toolCount: 45,
      platform: 'all'
    },
    {
      id: 'creative',
      name: 'Creative & Copy',
      description: 'Generate ad copy, headlines, and creative ideas',
      icon: 'edit_note',
      toolCount: 38,
      platform: 'all'
    },
    {
      id: 'optimization',
      name: 'Optimization',
      description: 'Optimize campaigns, bids, and performance',
      icon: 'trending_up',
      toolCount: 52,
      platform: 'all'
    },
    {
      id: 'targeting',
      name: 'Audience Targeting',
      description: 'Build and refine audience segments',
      icon: 'group',
      toolCount: 29,
      platform: 'all'
    },
    {
      id: 'analytics',
      name: 'Analytics & Reporting',
      description: 'Track, measure, and report on performance',
      icon: 'analytics',
      toolCount: 43,
      platform: 'all'
    }
  ];

  getAllTools(): Observable<Tool[]> {
    return of(this.tools);
  }

  getToolsByPlatform(platform: string): Observable<Tool[]> {
    const filtered = platform === 'all' 
      ? this.tools 
      : this.tools.filter(tool => tool.platform === platform);
    return of(filtered);
  }

  getToolsByCategory(category: string): Observable<Tool[]> {
    const filtered = this.tools.filter(tool => 
      tool.category.toLowerCase() === category.toLowerCase()
    );
    return of(filtered);
  }

  getToolBySlug(slug: string): Observable<Tool | undefined> {
    const tool = this.tools.find(t => t.slug === slug);
    return of(tool);
  }

  getCategories(): Observable<ToolCategory[]> {
    return of(this.categories);
  }

  searchTools(query: string): Observable<Tool[]> {
    const lowercaseQuery = query.toLowerCase();
    const filtered = this.tools.filter(tool =>
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
    return of(filtered);
  }

  getToolCount(): number {
    return 207; // Total tools as mentioned in requirements
  }

  incrementToolUsage(toolId: string): void {
    const tool = this.tools.find(t => t.id === toolId);
    if (tool) {
      tool.usage++;
    }
  }
}
