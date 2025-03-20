import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgIf} from '@angular/common';

import {Doc, DocType} from '../../models/doc.model';
import {ReadFileService} from '../../services/read-file.service';
import {SharedService} from '../../services/shared.service';
import {NotFoundComponent} from '../not-found/not-found.component';
import {RedocViewerComponent} from './viewers/redoc-viewer/redoc-viewer.component';
import {SwaggerViewerComponent} from './viewers/swagger-viewer/swagger-viewer.component';
import {HtmlViewerComponent} from './viewers/html-viewer/html-viewer.component';
import {MarkdownViewerComponent} from './viewers/markdown-viewer/markdown-viewer.component';
import {IframeViewerComponent} from './viewers/iframe-viewer/iframe-viewer.component';

@Component({
  standalone: true,
  selector: 'app-view-doc',
  imports: [
    NgIf,
    NotFoundComponent,
    RedocViewerComponent,
    SwaggerViewerComponent,
    HtmlViewerComponent,
    MarkdownViewerComponent,
    IframeViewerComponent,
  ],
  templateUrl: './view-doc.component.html',
  styleUrl: './view-doc.component.scss'
})
export class ViewDocComponent implements OnInit {
  notFound = false;
  protected data: Doc = {} as Doc;
  protected readonly DocType = DocType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readFileService: ReadFileService,
    private sharedService: SharedService,
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.fetchDoc(id);
  }

  fetchDoc(id: number): void {
    this.readFileService.fetchDocById(id)
      .subscribe((data: Doc | undefined) => {
        if (!data) {
          this.notFound = true;
          return;
        }
        this.data = data;
        this.sharedService.setData(data);
      });
  }
}
