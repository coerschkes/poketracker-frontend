import {Injectable} from "@angular/core";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class LookupTableService {
  constructor(private _httpClient: HttpClient) {
  }

  public lookup(path: string, key: string) {
    return this._httpClient
      .get(path, {responseType: "text"})
      .pipe(
        map(value => {
          const lines = value.split("\n");
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const columns = line.split(",");
            if (columns[1].toLowerCase() === key) {
              return columns;
            }
          }
          throw new Error(`Key ${key} not found in lookup table`);
        })
      );
  }
}
