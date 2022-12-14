import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotmailComponent } from './forgotmail.component';

describe('ForgotmailComponent', () => {
  let component: ForgotmailComponent;
  let fixture: ComponentFixture<ForgotmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
