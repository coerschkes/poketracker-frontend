import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrackerSetComponent } from './create-tracker-set.component';

describe('CreateTrackerSetComponent', () => {
  let component: CreateTrackerSetComponent;
  let fixture: ComponentFixture<CreateTrackerSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTrackerSetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTrackerSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
