import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaMDB } from '../interfaces/interfaces';


const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getFeature() {

    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const month = today.getMonth() + 1;

    let monthString;

    if ( month < 10 ) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const inicio = `${ today.getFullYear() }-${ monthString }-01`;
    const fin = `${ today.getFullYear() }-${ monthString }-${ lastDay }`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }
}
