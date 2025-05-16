import {Injectable} from '@angular/core';
import {ToastService} from '@services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  constructor(private toastService: ToastService) {
  }

  share(id: number): void {
    const url = `${window.location.origin}/#/docs/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      this.toastService.message("Link para compartilhamento copiado com sucesso!");
    }, () => {
      this.toastService.message("Falha ao copiar o link para a área de transferência.");
    });
  }
}
