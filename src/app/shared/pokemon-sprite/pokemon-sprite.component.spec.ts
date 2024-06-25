import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PokemonSpriteComponent} from './pokemon-sprite.component';

describe('PokemonSpriteComponent', () => {
  let component: PokemonSpriteComponent;
  let fixture: ComponentFixture<PokemonSpriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonSpriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonSpriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
