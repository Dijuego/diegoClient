import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Country } from '../country';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-country-edit',
  imports: [
        MatFormFieldModule,
        RouterLink,
        ReactiveFormsModule,
        MatInputModule
  ],
  templateUrl: './country-edit.component.html',
  styleUrl: './country-edit.component.scss'
})
export class CountryEditComponent implements OnInit{
  public country: Country | undefined;

  constructor(
    private http: HttpClient, 
    private activatedRoute: ActivatedRoute
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
      this.populateData();
      this.form = new FormGroup({
        name: new FormControl(`${this.country?.name}`, Validators.required),
        iso2: new FormControl(`${this.country?.iso2}`, Validators.required),
        iso3: new FormControl(`${this.country?.iso3}`, Validators.required),
      });
      
  }
  
  populateData(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get<Country>(`${environment.baseUrl}api/Countries/${id}`).subscribe({
      next: result => 
      {
        this.country = result;
        this.form.patchValue(result);
      },
      error: error => console.error(error)
    });

  }

  onSubmit(){

  }
}
