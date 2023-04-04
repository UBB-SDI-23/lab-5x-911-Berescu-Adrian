import { Movie } from "./Movie"

export interface Director{
    id: number
    name: string
    dob: Date
    country: string
    films_directed: number
    nominations: number
    movie?: Movie[]
}

export interface DirectorStat{
    id: number
    name: string
    dob: Date
    country: string
    films_directed: number
    nominations: number
    movie?: Movie[]
    avg_movie_years?: number 
}