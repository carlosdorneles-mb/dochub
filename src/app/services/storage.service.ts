import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  saveToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  saveToSessionStorage(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getFromSessionStorage(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setFavoriteId(id: number): void {
    const favoriteIds = this.getFavoriteIds();
    if (!favoriteIds.includes(id)) {
      favoriteIds.unshift(id);
    }
    this.saveToLocalStorage('favoriteIds', favoriteIds);
  }

  removeFavoriteId(id: number): void {
    const favoriteIds = this.getFavoriteIds();
    const index = favoriteIds.indexOf(id);
    if (index > -1) {
      favoriteIds.splice(index, 1);
      this.saveToLocalStorage('favoriteIds', favoriteIds);
    }
  }

  getFavoriteIds(): number[] {
    return this.getFromLocalStorage('favoriteIds') || [];
  }

  setTabSelected(tab: string): void {
    this.saveToSessionStorage('tabSelected', tab);
  }

  getTabSelected(): string {
    return this.getFromSessionStorage('tabSelected');
  }
}
