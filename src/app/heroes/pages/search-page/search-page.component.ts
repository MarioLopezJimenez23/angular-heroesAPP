import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public selectedHero?: Hero
  public heroes: Hero[] = []

  constructor( private heroesService: HeroesService,
                private router: Router){}


  searchHero(){
    const value: string = this.searchInput.value || '';
    this.heroesService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent){
    if(!event.option.value){
      this.selectedHero = undefined;
      return;
    }

    this.selectedHero = event.option.value;
    this.searchInput.setValue(this.selectedHero!.superhero)
    //this.router.navigate(['/heroes/list'])
  }

}
