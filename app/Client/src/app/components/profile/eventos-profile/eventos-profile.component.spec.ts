import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosProfileComponent } from './eventos-profile.component';

describe('EventosProfileComponent', () => {
  let component: EventosProfileComponent;
  let fixture: ComponentFixture<EventosProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventosProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
