import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';

import {IDoc, DocTypeEnum} from '@models/doc.model';
import {ReadFileService} from '@services/read-file.service';
import {SharedService} from '@services/shared.service';
import {NotFoundComponent} from '@components/not-found/not-found.component';
import {RedocViewerComponent} from '@components/view-doc/viewers/redoc-viewer/redoc-viewer.component';
import {SwaggerViewerComponent} from '@components/view-doc/viewers/swagger-viewer/swagger-viewer.component';
import {MarkdownViewerComponent} from '@components/view-doc/viewers/markdown-viewer/markdown-viewer.component';
import {IframeViewerComponent} from '@components/view-doc/viewers/iframe-viewer/iframe-viewer.component';
import {LinkViewerComponent} from '@components/view-doc/viewers/link-viewer/link-viewer.component';
import {LoadingComponent} from '@components/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-view-doc',
  imports: [
    CommonModule,
    NotFoundComponent,
    RedocViewerComponent,
    SwaggerViewerComponent,
    MarkdownViewerComponent,
    IframeViewerComponent,
    LinkViewerComponent,
    LoadingComponent,
  ],
  templateUrl: './view-doc.component.html',
  styleUrl: './view-doc.component.scss'
})
export class ViewDocComponent implements OnInit {
  readonly DocTypeEnum = DocTypeEnum;

  protected isNotFound = false;
  protected isLoading = true;
  protected data: IDoc = {} as IDoc;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readFileService: ReadFileService,
    private sharedService: SharedService,
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params['id']);

    this.fetchIDoc(id);
  }

  fetchIDoc(id: number): void {
    this.readFileService.fetchIDocById(id)
      .subscribe((data: IDoc | undefined) => {
        this.isLoading = false;

        if (!data) {
          this.isNotFound = true;
          return;
        }

        this.data = data;
        this.sharedService.setData(this.data);
      });
  }
}
