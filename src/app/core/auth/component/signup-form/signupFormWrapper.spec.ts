import {SignupFormWrapper} from "./signupFormWrapper";

describe("SignupForm", () => {
  let formWrapper: SignupFormWrapper;

  beforeEach(async () => {
    formWrapper = new SignupFormWrapper();
  });

  it('should create formWrapper with valid equal to internal form valid', () => {
    expect(formWrapper.valid).toEqual(formWrapper.internalForm.valid);
  });

  it('should return empty email as default value if internal form email control is null', () => {
    expect(formWrapper.email).toEqual('');
  });

  it('should return email if email is set', () => {
    formWrapper.internalForm.get('email')?.setValue('email');
    expect(formWrapper.email).toEqual('email');
  });

  it('should return empty password as default value if internal form password control is null', () => {
    expect(formWrapper.password).toEqual('');
  });

  it('should return password if password is set', () => {
    formWrapper.internalForm.get('password')?.setValue('password');
    expect(formWrapper.password).toEqual('password');
  });

  it('should return truthy instance of internal form', () => {
    expect(formWrapper.internalForm).toBeTruthy();
  });

  it('should reset internal form on reset', () => {
    formWrapper.internalForm.get('email')?.setValue('email');
    formWrapper.internalForm.get('password')?.setValue('password');
    formWrapper.reset();
    expect(formWrapper.email).toEqual('');
    expect(formWrapper.password).toEqual('');
  });

  it('should return hasInvalidEmail true if email is touched and has error email', () => {
    formWrapper.internalForm.get('email')?.setValue('email');
    // set email error manually as it is set via error state matcher in component
    formWrapper.internalForm.get('email')?.setErrors({email: true});
    formWrapper.internalForm.get('email')?.markAsTouched();
    expect(formWrapper.hasInvalidEmail()).toBeTrue();
  });

  it('should return hasMissingEmail true if email is touched and empty', () => {
    formWrapper.internalForm.get('email')?.setValue('');
    // set required error manually as it is set via error state matcher in component
    formWrapper.internalForm.get('email')?.setErrors({required: true});
    formWrapper.internalForm.get('email')?.markAsTouched();
    expect(formWrapper.hasMissingEmail()).toBeTrue();
  });


  it('should return hasMissingPassword true if password is touched and empty', () => {
    formWrapper.internalForm.get('password')?.setValue('');
    // set required error manually as it is set via error state matcher in component
    formWrapper.internalForm.get('password')?.setErrors({required: true});
    formWrapper.internalForm.get('password')?.markAsTouched();
    expect(formWrapper.hasMissingPassword()).toBeTrue();
  });

  it('should return hasInvalidEmail false if email is not touched', () => {
    expect(formWrapper.hasInvalidEmail()).toBeFalse();
  });

  it('should return hasInvalidEmail false if email is touched but has no error email', () => {
    formWrapper.internalForm.get('email')?.markAsTouched();
    expect(formWrapper.hasInvalidEmail()).toBeFalse();
  });

  it('should return hasMissingEmail false if email is not touched', () => {
    expect(formWrapper.hasMissingEmail()).toBeFalse();
  });

  it('should should return hasMissingEmail false if email is touched but has no error required', () => {
    formWrapper.internalForm.get('email')?.markAsTouched();
    expect(formWrapper.hasMissingEmail()).toBeFalse();
  });

  it('should return hasMissingPassword false if password is not touched', () => {
    expect(formWrapper.hasMissingPassword()).toBeFalse();
  });

  it('should return hasMissingPassword false if password is touched but has no error required', () => {
    formWrapper.internalForm.get('password')?.markAsTouched();
    expect(formWrapper.hasMissingPassword()).toBeFalse();
  });
  //todo: test password repeat validity
});
