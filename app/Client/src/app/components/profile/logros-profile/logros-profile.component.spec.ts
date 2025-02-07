import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogrosProfileComponent } from './logros-profile.component';

describe('LogrosProfileComponent', () => {
  let component: LogrosProfileComponent;
  let fixture: ComponentFixture<LogrosProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogrosProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogrosProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
