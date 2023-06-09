import { Director } from "./Director"

export interface Movie{
    id: number
    title: string
    year: number
    genre: string
    synopsis: string
    director: Director
}