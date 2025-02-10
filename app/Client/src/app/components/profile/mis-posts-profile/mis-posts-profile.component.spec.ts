import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPostsProfileComponent } from './mis-posts-profile.component';

describe('MisPostsProfileComponent', () => {
  let component: MisPostsProfileComponent;
  let fixture: ComponentFixture<MisPostsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisPostsProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisPostsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
