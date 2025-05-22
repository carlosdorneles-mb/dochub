import {Injectable} from '@angular/core';

/**
 * Service for managing local and session storage in the browser.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  /**
   * This function is responsible for saving the data to the browser's localStorage.
   * The data persists even after closing the browser or tab. It is only removed manually or by code.
   *
   * @param key - The key under which the data is stored.
   * @param value - The data to be stored.
   * @private
   */
  private saveToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * This function is responsible for retrieving the browser's localStorage data.
   *
   * @param key - The key of the data to retrieve.
   * @private
   */
  private getFromLocalStorage(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  /**
   * This function is responsible for saving the data to the browser's sessionStorage.
   * The data is kept only during the tab/window session. When the tab or window is closed, the data is deleted.
   *
   * @param key - The key under which the data is stored.
   * @param value - The data to be stored.
   * @private
   */
  private saveToSessionStorage(key: string, value: any): void {
    /** The data is kept only during the tab/window session. When the tab or window is closed, the data is deleted. **/
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * This function is responsible for retrieving the browser's sessionStorage data.
   *
   * @param key - The key of the data to retrieve.
   * @private
   */
  private getFromSessionStorage(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  /**
   * This function is responsible for saving the documentation that the user puts as a favorite.
   *
   * @param id - The ID of the documentation to be saved as a favorite.
   */
  setFavoriteId(id: number): void {
    const favoriteIds = this.getFavoriteIds();
    if (!favoriteIds.includes(id)) {
      favoriteIds.unshift(id);
    }
    this.saveToLocalStorage('favoriteIds', favoriteIds);
  }

  /**
   * This function is responsible for removing documentation from favorites.
   *
   * @param id - The ID of the documentation to be removed from favorites.
   */
  removeFavoriteId(id: number): void {
    const favoriteIds = this.getFavoriteIds();
    const index = favoriteIds.indexOf(id);
    if (index > -1) {
      favoriteIds.splice(index, 1);
      this.saveToLocalStorage('favoriteIds', favoriteIds);
    }
  }

  /**
   * This function is responsible for obtaining the documents that are in the favorite.
   *
   * @returns - An array of IDs of the favorite documents.
   */
  getFavoriteIds(): number[] {
    return this.getFromLocalStorage('favoriteIds') || [];
  }

  /**
   * This function is responsible for saving the documentation that the user has visited.
   *
   * @param id - The ID of the documentation to be saved as visited.
   */
  setLastVisitedId(id: number): void {
    const lastVisitedIds = this.getLastVisitedIds();
    if (!lastVisitedIds.includes(id)) {
      lastVisitedIds.unshift(id);
    }
    this.saveToLocalStorage('lastVisitedIds', lastVisitedIds);
  }

  /**
   * This function is responsible for obtaining the documentation that the user has visited.
   *
   * @returns - An array of IDs of the last visited documents.
   */
  getLastVisitedIds(): number[] {
    return this.getFromLocalStorage('lastVisitedIds') || [];
  }

  /**
   * This function is responsible for saving the last tab that the user accessed.
   *
   * @param tab - The name of the tab to be saved.
   */
  setTabSelected(tab: string): void {
    this.saveToLocalStorage('tabSelected', tab);
  }

  /**
   * This function is responsible for obtaining the last tab that the user accessed.
   *
   * @returns - The name of the last accessed tab.
   */
  getTabSelected(): string {
    return this.getFromLocalStorage('tabSelected');
  }
}
