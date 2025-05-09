import {Component, Input, AfterViewInit} from '@angular/core';
import {IDoc} from '@models/doc.model';
import {LoadingComponent} from '@components/loading/loading.component';

declare const showdown: any;
declare const hljs: any;

@Component({
  standalone: true,
  selector: 'app-markdown-viewer',
  imports: [
    LoadingComponent
  ],
  template: `
    <app-loading [isLoading]="isLoading"></app-loading>

    <div class="uk-container uk-container-expand uk-padding">
      <div id="markdown-container"></div>
    </div>
  `,
  styles: []
})
export class MarkdownViewerComponent implements AfterViewInit {
  protected isLoading = true;

  @Input() data: IDoc = {} as IDoc;

  ngAfterViewInit() {
    this.loadDoc();
  }

  loadDoc() {
    const showdownScript = document.createElement('script');
    showdownScript.src = 'https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js';
    document.body.appendChild(showdownScript);

    const highlightScript = document.createElement('script');
    highlightScript.src = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.0/build/highlight.min.js';
    document.body.appendChild(highlightScript);

    const highlightLink = document.createElement('link');
    highlightLink.href = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.0/build/styles/default.min.css';
    highlightLink.rel = 'stylesheet';
    document.body.appendChild(highlightLink);

    fetch(this.data.reference.source)
      .then(response => response.text())
      .then(text => {
        // Converter markdown para HTML
        const converter = new showdown.Converter();
        document.getElementById('markdown-container')!.innerHTML = converter.makeHtml(text);

        // Adicionar syntax highlighter
        hljs.highlightAll();
        this.isLoading = false;
      })
      .catch(err => console.error(err));
  }
}
