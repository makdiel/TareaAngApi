import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDetallePokemon } from './Interfaces/IDetallePokemon';
import { IListaPokemon } from './Interfaces/ListaPokemon';


@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private apiUrlBase = "https://pokeapi.co/api/v2"

  //HttpClient -> es lo mismo que usar Axios en React o Fetch

  constructor(private cliente: HttpClient) { }

  getPokemons(limit: number): Observable<IListaPokemon>{
    const resultado = this.cliente.get<IListaPokemon>(`${this.apiUrlBase}/pokemon/?limit=${limit}`)
    return resultado;
  }

  getDetallesPokemon(url: string): Observable<IDetallePokemon>{
    return this.cliente.get<IDetallePokemon>(url)
  }
}
