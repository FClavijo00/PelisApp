import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private http: HttpClient ) { }

  getFeature() {
    return this.http.get('https://api.themoviedb.org/3/movie/550?api_key=514a9bfe9144d9a1f9ff9294e3637a9a');
  }
}
