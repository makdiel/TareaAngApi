import { IPokemon } from "./IPokemon"

export interface IListaPokemon {
    count: number
    next: string
    previous: string | null
    results: IPokemon[]
}