import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PeliculaDetalle, RespuestaMDB, RespuestaCredits, Genre } from '../interfaces/interfaces';


const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  generos: Genre[] = [];

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  buscarPelicula(texto: string) {
    return this.ejecutarQuery(`/search/movie?query=${texto}`);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getPopular() {

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;
    return this.ejecutarQuery<RespuestaMDB>(query);

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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getPeliculaDetalle(id: number) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getActoresPelicula(id: number) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  cargarGeneros(): Promise<Genre[]> {
    return new Promise( resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`)
        .subscribe( resp => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.generos = resp['genres'];
      resolve(this.generos);
      });
    });
  }

}
