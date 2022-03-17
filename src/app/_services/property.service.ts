import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Property } from "@app/_models/property";
import { environment } from "@environments/environment";
import { first, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  /**
   *
   */
  constructor(private _http : HttpClient) {
    
  }

  getAll() : Observable<Property[]> {
    return this._http.get<Property[]>(environment.apiUrl + "/Property");
  }

  getByKey(key: number) : Observable<Property> {
    return this._http.get<Property>(environment.apiUrl + `/Property/${key}`)
  }
}