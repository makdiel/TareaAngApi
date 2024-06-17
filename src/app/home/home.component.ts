import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeapiService } from '../pokeapi.service';
import { IDetallePokemon } from '../Interfaces/IDetallePokemon';

import { IPokemon } from '../Interfaces/IPokemon';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  titulo: string = '';
  conteo: number = 0
  pokemons: IPokemon[] = []
  detallesPokemon: IDetallePokemon[] = []
  limite: number = 150
  
  constructor(private pokeapiService:PokeapiService, private ruta: ActivatedRoute){}

  ngOnInit(): void{
    this.pokeapiService.getPokemons(this.limite).subscribe(pokemons =>{
      this.conteo = pokemons.count
      this.pokemons = pokemons.results
      this.pokemons.forEach(detalle =>{
        this.pokeapiService.getDetallesPokemon(detalle.url).subscribe(detallePokemon =>{
          this.detallesPokemon.push(detallePokemon)
        })
      })
      
    })
  }
}
