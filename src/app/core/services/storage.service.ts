import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private prefix = environment.storage.prefix;

  set(key: string, value: any): void {
    const prefixedKey = this.prefix + key;
    const serialized = JSON.stringify(value);
    localStorage.setItem(prefixedKey, serialized);
  }

  get<T>(key: string): T | null {
    const prefixedKey = this.prefix + key;
    const item = localStorage.getItem(prefixedKey);
    
    if (!item) return null;
    
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    const prefixedKey = this.prefix + key;
    localStorage.removeItem(prefixedKey);
  }

  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
}
