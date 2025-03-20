import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RedocViewerComponent} from './redoc-viewer.component';

describe('RedocViewerComponent', () => {
  let component: RedocViewerComponent;
  let fixture: ComponentFixture<RedocViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedocViewerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RedocViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
