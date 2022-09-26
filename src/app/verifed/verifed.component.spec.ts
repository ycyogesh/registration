import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifedComponent } from './verifed.component';

describe('VerifedComponent', () => {
  let component: VerifedComponent;
  let fixture: ComponentFixture<VerifedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
