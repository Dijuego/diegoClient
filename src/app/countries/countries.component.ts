import { Component, OnInit } from '@angular/core';
import { Country } from '../country';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-countries',
  imports: [
    RouterLink
  ],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent implements OnInit{
  public countries: Country[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getCountries();
  }
  
  getCountries() {
    this.http.get<Country[]>(`${environment.baseUrl}api/Countries`).subscribe({
      next: result => this.countries = result,
      error: error => console.error(error)
    });
  }
}
