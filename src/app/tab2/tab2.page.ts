import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Superman', 'Avengers', 'El Señor de los Anillos', 'Harry Potter'];

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) {}

  buscar(event) {
    const valor = event.detail.value;

    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;
    this.moviesService.buscarPelicula(valor)
    .subscribe(resp => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.peliculas = resp['results'];
      this.buscando = false;
    });
  }

  async detalle(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }


}
