import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignupFormComponent} from './signup-form.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupFormComponent, NoopAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return valid equivalent to valid state of internal form', () => {
    expect(component.valid).toEqual(component.signupForm.valid);
  });

  it('should return not undefined internal form instance', () => {
    expect(component.signupForm).not.toBeUndefined();
  });

  it('should return not undefined error state matcher instance', () => {
    expect(component.ERROR_STATE_MATCHER).not.toBeUndefined();
  });

  it('should not show errors on initial state', () => {
    let errorTag = fixture.nativeElement.querySelector('mat-error');
    expect(errorTag).toBeNull();
  });

  it('should show email invalid error on invalid email', () => {
    component.signupForm.internalForm.get('email')!.setValue('invalid');
    component.signupForm.internalForm.get('email')!.markAsTouched()

    fixture.detectChanges();
    let matError = fixture.nativeElement.querySelectorAll('mat-error')[0];
    expect(matError).not.toBeNull();
    expect(matError.textContent).toEqual('Please enter a valid email address');
  });

  it('should show email required error on missing email', () => {
    component.signupForm.internalForm.get('email')!.setValue('');
    component.signupForm.internalForm.get('email')!.markAsTouched()

    fixture.detectChanges();
    let matError = fixture.nativeElement.querySelectorAll('mat-error')[0];
    expect(matError).not.toBeNull();
    expect(matError.textContent).toEqual('Email is required');
  });

  it('should show password required error on missing password', () => {
    component.signupForm.internalForm.get('password')!.setValue('');
    component.signupForm.internalForm.get('password')!.markAsTouched()

    fixture.detectChanges();
    let matError = fixture.nativeElement.querySelectorAll('mat-error')[0];
    expect(matError).not.toBeNull();
    expect(matError.textContent).toEqual('Password is required');
  });

  it('should not show password required error if only email is touched', () => {
    component.signupForm.internalForm.get('email')!.setValue('invalid');
    component.signupForm.internalForm.get('email')!.markAsTouched();

    fixture.detectChanges();
    let matError = fixture.nativeElement.querySelectorAll('mat-error');
    expect(matError.length).toBe(1);
  });

  it('should not show password required error and email required error if both inputs are touched', () => {
    component.signupForm.internalForm.get('email')!.setValue('');
    component.signupForm.internalForm.get('email')!.markAsTouched();
    component.signupForm.internalForm.get('password')!.setValue('');
    component.signupForm.internalForm.get('password')!.markAsTouched()

    fixture.detectChanges();
    let matError = fixture.nativeElement.querySelectorAll('mat-error');
    expect(matError.length).toBe(2);
  });

  it('should not show passwords not matching error if password and repeatPassword equal', () => {
    component.signupForm.internalForm.get('password')!.setValue('123456');
    component.signupForm.internalForm.get('password')!.markAsTouched()
    component.signupForm.internalForm.get('repeatPassword')!.setValue('123456');
    component.signupForm.internalForm.get('repeatPassword')!.markAsTouched()

    fixture.detectChanges();
    let matError = fixture.nativeElement.querySelectorAll('mat-error');
    expect(matError.length).toBe(0);
  });

  it('should show passwords not matching error if password and repeatPassword do not equal', () => {
    component.signupForm.internalForm.get('password')!.setValue('654321');
    component.signupForm.internalForm.get('password')!.markAsTouched()
    component.signupForm.internalForm.get('repeatPassword')!.setValue('123456');
    component.signupForm.internalForm.get('repeatPassword')!.markAsTouched()

    fixture.detectChanges();
    let matError = fixture.nativeElement.querySelectorAll('mat-error')[0];
    expect(matError).not.toBeNull();
    expect(matError.textContent).toEqual('Passwords do not match');
  });

  it('should not show passwords not matching if only password is touched', () => {
    component.signupForm.internalForm.get('password')!.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('mat-error')).toHaveSize(1);
    let matError = fixture.nativeElement.querySelectorAll('mat-error')[0];
    expect(matError).not.toBeNull();
    expect(matError.textContent).toEqual('Password is required');
  });
});
