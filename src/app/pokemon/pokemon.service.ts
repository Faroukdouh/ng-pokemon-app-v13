import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()
export class PokemonService {

  constructor(private http : HttpClient){}

  // getPokemonList() : Observable<Pokemon[]> {
  //   return this.http.get<Pokemon[]>('api/pokemons').pipe(     
  //     tap((pokemonList) => console.table(pokemonList)),    // pas de probleme : afficher la table dans le console
  //     catchError((error) => {                             // probleme : catcher l'erreur
  //       console.log(error);                               // afficher l'erreur dans le console 
  //       return of([]);                                    // retourner une table vide
  //     })
  //   )
  // }

  // getPokemonById(pokemonId: number) : Observable<Pokemon | undefined> {
  //   return this.http.get<Pokemon>('api/pokemons/${pokemonId}').pipe(     
  //     tap((pokemon) => console.table(pokemon)),    
  //     catchError((error) => {                             
  //       console.log(error);                               
  //       return of(undefined);                                   
  //     })
  //   )
  // }

  getPokemonList() : Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(     
      tap((respone) => this.log(respone)),   
      catchError((error) => this.handleError(error,[]))
    );
  }


  getPokemonById(pokemonId: number) : Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(     
      tap((respone) => this.log(respone)),   
      catchError((error) => this.handleError(error,undefined))
    );
  }

  searchPokemonList(term : string) : Observable<Pokemon[]>{
    if (term.length <= 1) {
      return of([]);
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(     
      tap((respone) => this.log(respone)),   
      catchError((error) => this.handleError(error,[]))
    );
  }

// cette metode est parfaite pour un api REST qui respecte le bon fonctionnement
  // updatePokemon(pokemon : Pokemon) : Observable<Pokemon | undefined>{
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
  //   };
  //   return this.http.put('api/pokemons', pokemon, httpOptions).pipe(     
  //     tap((respone) => this.log(respone)),   
  //     catchError((error) => this.handleError(error,undefined))
  //   );
  // }

  // tanque on on un api qui ne respecte pas le bon fonctionnement donc on est obligé de modifier la métode par :
  updatePokemon(pokemon : Pokemon) : Observable<null>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
    };
    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(     
      tap((respone) => this.log(respone)),   
      catchError((error) => this.handleError(error,null))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
    };
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(     
      tap((respone) => this.log(respone)),   
      catchError((error) => this.handleError(error,null))
    );
  }


  deletePokemonById (pokemonId : number) : Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(     
      tap((respone) => this.log(respone)),   
      catchError((error) => this.handleError(error,null))
    );
  }


  private log(respone : any){
    console.table(respone);
  }


  private handleError(error : Error , errorValue : any){
    console.error(error);
    return of(errorValue);
  }


  getPokemonTypeList() : string[] {
    return ['Plante','Feu','Eau','Insecte','Normal','Electrik','Poison','Fée','Vol','Combat','Psy']
  }
}
