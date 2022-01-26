import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { RespuestaMDB, Pelicula } from '../interfaces/interfaces';

import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];

  constructor( private moviesService: MoviesService ) {}

  ngOnInit(): void {
      this.moviesService.getFeature().subscribe( (resp: RespuestaMDB) => {
        console.log('Resp:', resp);
        this.peliculasRecientes = resp.results;
      });
  }

}
