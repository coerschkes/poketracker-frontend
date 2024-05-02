import {LoginFormComponent} from "./login-form.component";
import {TestBed} from "@angular/core/testing";
import {FormBuilder} from "@angular/forms";

describe("LoginFormComponent", () => {
  let component: LoginFormComponent;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [LoginFormComponent],
      providers: [{provide: FormBuilder}],
    });
    component = TestBed.createComponent(LoginFormComponent).componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
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
    expect(component.errorStateMatcher).not.toBeUndefined();
  });
})
