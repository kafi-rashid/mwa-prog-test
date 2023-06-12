import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Station } from './stations/stations.component';

@Injectable({
  providedIn: 'root'
})
export class StationsDataService {
  private apiBaseUrl: string= "http://localhost:3300/api"

  constructor(private http:HttpClient) { }

  public getStations(params: string): Observable<Station[]> {
    const url: string= this.apiBaseUrl + "/stations" + params;
    
    return this.http.get<Station[]>(url);
  }

  public getStation(stationId: string): Observable<Station> {
    const url: string= this.apiBaseUrl + "/stations/" + stationId;
    
    return this.http.get<Station>(url);
  }

  public getCount(): Observable<number> {
    const url: string= this.apiBaseUrl + "/stations/count";
  
    return this.http.get<number>(url);
  }

  public deleteStations(stations: string[]): Observable<string[]> {
    const url: string= this.apiBaseUrl + "/stations/delete";
  
    return this.http.post<string[]>(url, stations);
  }

}
