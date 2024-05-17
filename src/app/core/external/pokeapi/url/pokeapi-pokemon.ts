import {HttpErrorResponse} from "@angular/common/http";

export interface PokeapiPokemon {
  name: string,
  dexNumber: number,
  spriteUrl: string,
  spriteShinyUrl: string,
  types: string[],
}

export interface PokeapiErrorResponse {
  code: number,
  message: string,
}

export class PokeapiErrorResponseFactory {
  public static fromResponse(response: HttpErrorResponse): PokeapiErrorResponse {
    if (response.error === null || response.error === undefined) {
      console.error(response)
      return {code: 0, message: "Unknown error occurred"}
    } else {
      return {
        code: response.status,
        message: response.error.message,
      }
    }
  };
}

export class PokeapiResponseFactory {
  public static fromObject(object: any): PokeapiPokemon {
    return {
      name: object.name,
      dexNumber: object.id,
      spriteUrl: object.sprites.other['official-artwork'].front_default,
      spriteShinyUrl: object.sprites.other['official-artwork'].front_shiny,
      types: object.types.map((type: any) => type.type.name),
    }
  }
}
