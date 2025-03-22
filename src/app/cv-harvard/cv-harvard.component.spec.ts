import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvHarvardComponent } from './cv-harvard.component';

describe('CvHarvardComponent', () => {
  let component: CvHarvardComponent;
  let fixture: ComponentFixture<CvHarvardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvHarvardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvHarvardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
