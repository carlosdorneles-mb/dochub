import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';

import {IDoc, DocTypeEnum} from '@models/doc.model';
import {ReadFileService} from '@services/read-file.service';
import {TransmitterService} from '@services/transmitter.service';
import {StorageService} from '@services/storage.service';
import {NotFoundComponent} from '@components/pages/not-found/not-found.component';
import {RedocViewerComponent} from '@components/pages/view/viewers/redoc-viewer/redoc-viewer.component';
import {SwaggerViewerComponent} from '@components/pages/view/viewers/swagger-viewer/swagger-viewer.component';
import {MarkdownViewerComponent} from '@components/pages/view/viewers/markdown-viewer/markdown-viewer.component';
import {IframeViewerComponent} from '@components/pages/view/viewers/iframe-viewer/iframe-viewer.component';
import {LinkViewerComponent} from '@components/pages/view/viewers/link-viewer/link-viewer.component';
import {LoadingComponent} from '@components/shared/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-view',
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
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit, OnDestroy {
  readonly DocTypeEnum = DocTypeEnum;

  protected isNotFound = false;
  protected isLoading = true;
  protected data: IDoc = {} as IDoc;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readFileService: ReadFileService,
    private transmitterService: TransmitterService,
    private storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params['id']);

    this.fetchDoc(id);
    this.storageService.setLastVisitedId(id);
  }

  ngOnDestroy(): void {
    this.transmitterService.setData(null);
  }

  fetchDoc(id: number): void {
    this.readFileService.fetchDocById(id)
      .subscribe((data: IDoc | undefined) => {
        this.isLoading = false;

        if (!data) {
          this.isNotFound = true;
          return;
        }

        this.data = data;
        this.transmitterService.setData(this.data);
      });
  }
}
