import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Property } from "@app/_models/property";
import { environment } from "@environments/environment";
import { first, map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  /**
   *
   */
  constructor(private _http: HttpClient) {

  }

  getProperties(): Observable<Array<Property>> {
    return this._http.get<Array<Property>>(environment.apiUrl + "/Property")
      .pipe(
        map((properties: Array<Property>) => properties)
      );
  }

  getByKey(key: number): Observable<Property> {
    return this._http.get<Property>(environment.apiUrl + `/Property/${key}`)
  }
}