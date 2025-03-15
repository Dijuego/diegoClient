import { Component, OnInit } from '@angular/core';
import { Country } from '../country';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { CountryPop } from '../country-pop';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-population',
  imports: [RouterLink],
  templateUrl: './country-population.component.html',
  styleUrl: './country-population.component.scss'
})
export class CountryPopulationComponent implements OnInit{
   public countryPop: CountryPop | undefined;
  
    constructor(
      private http: HttpClient, 
      private activatedRoute: ActivatedRoute
    ) {}


    ngOnInit(): void {
      this.getCountryPopulation();
    }
    
    getCountryPopulation() {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.http.get<CountryPop>(`${environment.baseUrl}api/Countries/GetPopulation/${id}`).subscribe({
          next: result => this.countryPop = result,
          error: error => console.error(error)
        });
      }
}
