import {LoginFormComponent} from "./login-form.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe("LoginFormComponent", () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [LoginFormComponent, NoopAnimationsModule],
    });
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return min password len 6', () => {
    expect(component.MIN_PASSWORD_LENGTH).toBe(6);
  });

  it('should return valid equivalent to valid state of internal form', () => {
    expect(component.valid).toEqual(component.loginForm.valid);
  });

  it('should return not undefined internal form instance', () => {
    expect(component.loginForm).not.toBeUndefined();
  });

  it('should return not undefined error state matcher instance', () => {
    expect(component.ERROR_STATE_MATCHER).not.toBeUndefined();
  });

  it('should not show errors on initial state', () => {
    let errorTag = fixture.nativeElement.querySelector('mat-error');
    expect(errorTag).toBeNull();
  });

  it('should show email invalid error on invalid email', () => {
    component.loginForm.form.get('email')!.setValue('invalid');
    component.loginForm.form.get('email')!.markAsTouched()

    fixture.detectChanges();
    let matError = fixture.nativeElement.querySelectorAll('mat-error')[0];
    expect(matError).not.toBeNull();
    expect(matError.textContent).toEqual('Please enter a valid email address');
  });

  it('should show email required error on missing email', () => {
    component.loginForm.form.get('email')!.setValue('');
    component.loginForm.form.get('email')!.markAsTouched()

    fixture.detectChanges();
    let matError = fixture.nativeElement.querySelectorAll('mat-error')[0];
    expect(matError).not.toBeNull();
    expect(matError.textContent).toEqual('Email is required');
  });

  it('should show password required error on missing password', () => {
    component.loginForm.form.get('password')!.setValue('');
    component.loginForm.form.get('password')!.markAsTouched()

    fixture.detectChanges();
    let matError = fixture.nativeElement.querySelectorAll('mat-error')[0];
    expect(matError).not.toBeNull();
    expect(matError.textContent).toEqual('Password is required');
  });

  it('should not show password required error if only email is touched', () => {
    component.loginForm.form.get('email')!.setValue('invalid');
    component.loginForm.form.get('email')!.markAsTouched();

    fixture.detectChanges();
    let matError = fixture.nativeElement.querySelectorAll('mat-error');
    expect(matError.length).toBe(1);
  });

  it('should not show password required error and email required error if both inputs are touched', () => {
    component.loginForm.form.get('email')!.setValue('');
    component.loginForm.form.get('email')!.markAsTouched();
    component.loginForm.form.get('password')!.setValue('');
    component.loginForm.form.get('password')!.markAsTouched()

    fixture.detectChanges();
    let matError = fixture.nativeElement.querySelectorAll('mat-error');
    expect(matError.length).toBe(2);
  });
})
