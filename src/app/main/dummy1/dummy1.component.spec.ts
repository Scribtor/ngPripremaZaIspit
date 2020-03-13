import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dummy1Component } from './dummy1.component';

describe('Dummy1Component', () => {
  let component: Dummy1Component;
  let fixture: ComponentFixture<Dummy1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dummy1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dummy1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
