import {Injectable} from '@angular/core';
import {ToastService} from '@services/toast.service';
import {environment} from '@env/environment';

/**
 * Service to handle sharing functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class ShareService {
  constructor(private toastService: ToastService) {
  }

  /**
   * Share a document by copying its URL to the clipboard.
   *
   * @param id - The ID of the document to share.
   */
  share(id: number): void {
    const url = `${environment.baseUrl}/docs/${id}?utm_source=dochub&utm_medium=share`;
    navigator.clipboard.writeText(url).then(() => {
      this.toastService.message("Link para compartilhamento copiado com sucesso!");
    }, () => {
      this.toastService.message("Falha ao copiar o link para a área de transferência.");
    });
  }
}
