import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, from, Observable, of, Subscription } from 'rxjs';
import {
  catchError,
  mergeAll,
  shareReplay,
  switchMap,
  tap,
  toArray,
} from 'rxjs/operators';
import {
  Paginator,
  Pokemon,
  PokemonUrl,
  ResponsePokemonByPaginator,
} from './pokemon';
import { Rx } from './rx';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ThemeService],
})
export class AppComponent implements OnInit, OnDestroy {
  pokemons?: Pokemon[];
  paginator = { limit: 10, offset: 0 };

  @Rx.AutoSubscription()
  subscription!: Subscription;
  constructor(private http: HttpClient) {}

  @Rx.Cache()
  private getPokemonByUrl(@Rx.CacheKey() url: string) {
    return this.http.get<Pokemon>(url);
  }

  ngOnInit(): void {
    this.loadPokemonPaginator();
  }

  nextPage() {
    this.paginator.offset += this.paginator.limit;
    this.loadPokemonPaginator();
  }

  prevPage() {
    this.paginator.offset -= this.paginator.limit;
    this.loadPokemonPaginator();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadPokemonPaginator() {
    this.paginatorPokemon(this.paginator.limit, this.paginator.offset);
  }

  @Rx.Debounce()
  @Rx.SwitchMap()
  private paginatorPokemon(limit: number, offset: number) {
    return this.http
      .get<ResponsePokemonByPaginator>(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      )
      .pipe(
        this.httpPokemonResultUrl((result) => result.url),
        tap((pokemons) => (this.pokemons = pokemons))
      );
  }

  private httpPokemonResultUrl(project: (data: PokemonUrl) => string) {
    return (source: Observable<ResponsePokemonByPaginator>) =>
      source.pipe(
        switchMap((response) => {
          return from(
            response.results.map((result) =>
              this.getPokemonByUrl(project(result)).pipe(
                catchError((err) => {
                  console.error(err);
                  return EMPTY;
                })
              )
            )
          ).pipe(mergeAll(), toArray());
        })
      );
  }
}
