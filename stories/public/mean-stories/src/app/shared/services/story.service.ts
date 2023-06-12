import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  baseUrl = "http://localhost:3000/stories";

  constructor(private _http: HttpClient) { }

  getAll(query: string): Observable<Story[]> {
    return this._http.get<Story[]>(this.baseUrl + "?" + query);
  }

  getStoryById(storyId: string): Observable<Story> {
    return this._http.get<Story>(this.baseUrl + "/" + storyId);
  }

  changePopularity(storyId: string): Observable<Story> {
    return this._http.get<Story>(this.baseUrl + "/popularity/" + storyId);
  }

}
