import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PokemonSelectorComponent} from './pokemon-selector.component';

describe('PokemonSelectorComponent', () => {
  let component: PokemonSelectorComponent;
  let fixture: ComponentFixture<PokemonSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
