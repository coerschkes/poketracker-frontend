import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditAccordionComponent} from './edit-accordion.component';

describe('EditAccordionComponent', () => {
  let component: EditAccordionComponent;
  let fixture: ComponentFixture<EditAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
