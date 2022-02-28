import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseAddComponent } from './lease-add.component';

describe('LeaseAddComponent', () => {
  let component: LeaseAddComponent;
  let fixture: ComponentFixture<LeaseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaseAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
