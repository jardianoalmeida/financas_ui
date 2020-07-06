import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestarFcmComponent } from './testar-fcm.component';

describe('TestarFcmComponent', () => {
  let component: TestarFcmComponent;
  let fixture: ComponentFixture<TestarFcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestarFcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestarFcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
