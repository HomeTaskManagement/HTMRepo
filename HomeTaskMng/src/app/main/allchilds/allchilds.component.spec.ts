import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllchildsComponent } from './allchilds.component';

describe('AllchildsComponent', () => {
  let component: AllchildsComponent;
  let fixture: ComponentFixture<AllchildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllchildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllchildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
