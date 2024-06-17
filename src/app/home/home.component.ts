import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeapiService } from '../pokeapi.service';
import { IDetallePokemon } from '../Interfaces/IDetallePokemon';
import { IPokemon } from '../Interfaces/IPokemon';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  titulo: string = '';
  conteo: number = 0
  pokemons: IPokemon[] = []
  detallesPokemon: IDetallePokemon[] = []
  limite: number = 20
  
  constructor(private pokeapiService:PokeapiService, private ruta: ActivatedRoute){}

  ngOnInit(): void{

    this.ruta.queryParams.subscribe(params => {
      const limiteParametro: number | undefined = params['limite']
      if(limiteParametro){
        this.limite = params['limite']
      }else{
        this.limite = 150
      }
    })
    
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
