import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditionSelectorComponent} from './edition-selector.component';

describe('EditionSelectorComponent', () => {
  let component: EditionSelectorComponent;
  let fixture: ComponentFixture<EditionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditionSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
