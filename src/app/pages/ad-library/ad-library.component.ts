import { Component } from '@angular/core';


@Component({
  selector: 'app-ad-library',
  standalone: true,
  imports: [],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="ri-image-line"></i> Ad Library</h1>
        <p>Browse and analyze competitor ads from Facebook Ad Library</p>
      </div>
      <div class="search-section">
        <div class="search-box">
          <i class="ri-search-line"></i>
          <input type="text" placeholder="Search competitor ads..." />
        </div>
        <button class="btn-primary"><i class="ri-search-2-line"></i> Search Ads</button>
      </div>
      <div class="coming-soon">
        <i class="ri-image-2-line"></i>
        <h2>Search for Competitor Ads</h2>
        <p>Enter a brand name to see their active Facebook and Instagram ads</p>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1400px; margin: 0 auto; }
    .page-header { margin-bottom: 32px; }
    .page-header h1 { display: flex; align-items: center; gap: 14px; font-size: 28px; font-weight: 700; color: rgba(255,255,255,0.95); margin-bottom: 8px; }
    .page-header h1 i { font-size: 32px; color: #ec4899; }
    .page-header p { font-size: 15px; color: rgba(255,255,255,0.5); }
    .search-section { display: flex; gap: 16px; margin-bottom: 40px; }
    .search-box { flex: 1; display: flex; align-items: center; gap: 12px; padding: 14px 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; }
    .search-box i { font-size: 20px; color: rgba(255,255,255,0.4); }
    .search-box input { flex: 1; background: none; border: none; outline: none; font-size: 15px; color: rgba(255,255,255,0.9); }
    .btn-primary { display: flex; align-items: center; gap: 8px; padding: 14px 28px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-weight: 600; font-size: 14px; border: none; border-radius: 14px; cursor: pointer; white-space: nowrap; }
    .coming-soon { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 40px; background: linear-gradient(180deg, rgba(20,20,32,0.8) 0%, rgba(12,12,20,0.9) 100%); border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; text-align: center; }
    .coming-soon i { font-size: 64px; color: rgba(255,255,255,0.2); margin-bottom: 24px; }
    .coming-soon h2 { font-size: 20px; font-weight: 600; color: rgba(255,255,255,0.9); margin-bottom: 8px; }
    .coming-soon p { font-size: 14px; color: rgba(255,255,255,0.5); }
  `]
})
export class AdLibraryComponent {}
