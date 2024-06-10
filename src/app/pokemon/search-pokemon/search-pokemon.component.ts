import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {

  // {..."a".."ab"...."abz".."ab"..."abc".....}
  searchTerms = new Subject<string>();
  // {...pokemonList(a)...pokemonList(ab)....}
  pokemons$: Observable<Pokemon[]>;               //quand une varibale contient un flux de donnée on ajoute un $ (convention)

  constructor(
    private router: Router,
    private pokemonService : PokemonService
  ) { }

  ngOnInit(){
    this.pokemons$ = this.searchTerms.pipe(
      // {..."a"."ab"...."abz"."ab"..."abc".....}
      debounceTime(300), // attendre 300ms de pause entre chaque requête
      // {..."ab"...."ab"..."abc".....}
      distinctUntilChanged(), // ignorer la recherche en cours si c'est la même que la précédente
      // {......."ab"......."abc".....}
      switchMap((term) => this.pokemonService.searchPokemonList(term)) // on retourne la liste des résultats correpsondant aux termes de la recherche
      // {.......pokemonList(ab).......pokemonList(abc).....}
    );
  }

  search(term : string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon : Pokemon){
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
