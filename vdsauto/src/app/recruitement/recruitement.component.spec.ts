import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitementComponent } from './recruitement.component';

describe('RecruitementComponent', () => {
  let component: RecruitementComponent;
  let fixture: ComponentFixture<RecruitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
