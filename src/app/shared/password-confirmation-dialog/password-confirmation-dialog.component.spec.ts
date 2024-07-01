import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PasswordConfirmationDialogComponent} from './password-confirmation-dialog.component';

describe('PasswordConfirmationDialogComponent', () => {
  let component: PasswordConfirmationDialogComponent;
  let fixture: ComponentFixture<PasswordConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
