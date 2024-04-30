import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AuthStateService} from "./core/auth/auth-state.service";
import {environment} from "../environments/environment";

describe('AppComponent', () => {
  let mockAuthState: any;
  let app: any;
  let fixture: any;

  beforeEach(async () => {
    mockAuthState = jasmine.createSpyObj("_authState", ['isLoggedIn'])
    await TestBed.configureTestingModule({
      providers: [{provide: AuthStateService, useValue: mockAuthState}],
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the app name from the environment if user is logged in`, () => {
    expect(app.title).toEqual(environment.APP_NAME);
  });

  it('should render title if user is logged in', () => {
    mockAuthState.isLoggedIn.and.returnValue(true)
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(environment.APP_NAME);
  });

  it('should not render title if user is not logged in', () => {
    mockAuthState.isLoggedIn.and.returnValue(false)
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')).toBeNull()
  });
});
