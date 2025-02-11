import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBioComponent } from './change-bio.component';

describe('ChangeBioComponent', () => {
  let component: ChangeBioComponent;
  let fixture: ComponentFixture<ChangeBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeBioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
