export class PokeapiUrlProvider {
  private static baseUrl(): string {
    return "https://pokeapi.co/api/v2/";
  }

  public static pokemonEndpoint(): string {
    return this.baseUrl() + "pokemon/";
  }
}
