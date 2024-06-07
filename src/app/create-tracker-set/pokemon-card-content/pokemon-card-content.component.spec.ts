import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PokemonCardContentComponent} from './pokemon-card-content.component';

describe('PokemonCardContentComponent', () => {
  let component: PokemonCardContentComponent;
  let fixture: ComponentFixture<PokemonCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
