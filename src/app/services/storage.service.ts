import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private saveToLocalStorage(key: string, value: any): void {
    /** The data persists even after closing the browser or tab. It is only removed manually or by code. **/
    localStorage.setItem(key, JSON.stringify(value));
  }

  private getFromLocalStorage(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  private saveToSessionStorage(key: string, value: any): void {
    /** The data is kept only during the tab/window session. When the tab or window is closed, the data is deleted. **/
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  private getFromSessionStorage(key: string): any {
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

  setLastVisitedId(id: number): void {
    const lastVisitedIds = this.getLastVisitedIds();
    if (!lastVisitedIds.includes(id)) {
      lastVisitedIds.unshift(id);
    }
    this.saveToLocalStorage('lastVisitedIds', lastVisitedIds);
  }

  getLastVisitedIds(): number[] {
    return this.getFromLocalStorage('lastVisitedIds') || [];
  }

  setTabSelected(tab: string): void {
    this.saveToLocalStorage('tabSelected', tab);
  }

  getTabSelected(): string {
    return this.getFromLocalStorage('tabSelected');
  }
}
