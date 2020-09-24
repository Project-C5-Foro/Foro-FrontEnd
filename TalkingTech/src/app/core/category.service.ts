import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { Category, CategoryResponse} from '@models/category.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  createCategory(data: Category): Observable<CategoryResponse>{
    return this.http.post<CategoryResponse>(`${environment.API_Tt}/categories/`, data);
  }

  getCategory(): Observable<CategoryResponse[]>{
    return this.http.get(`${environment.API_Tt}/categories/`)
    .pipe(
      map((response: any) => response.results as CategoryResponse[])
    );
  }
}
