import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  standalone: true,
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   * Transforms a URL into a trusted resource URL to safely bind in Angular templates.
   *
   * Use this pipe in templates to bypass Angular's security and allow embedding of external resources,
   * such as iframes or object tags, when you are sure the URL is safe.
   *
   * Example usage in a template:
   *   <iframe [src]="videoUrl | safe"></iframe>
   *
   * @param url The resource URL to be sanitized.
   * @returns A trusted resource URL that Angular can safely bind.
   */
  transform(url: string): unknown {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
