import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { TokenService } from './token.service';

import { Category, CategoryResponse} from '@models/category.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  createCategory(data: Category): Observable<CategoryResponse>{
    console.log(data);
    return this.http.post<CategoryResponse>(`${environment.API_Tt}/categories/`, data);
  }

  getCategory(): Observable<CategoryResponse[]>{
    const token = this.tokenService.getToken();
    return this.http.get(`${environment.API_Tt}/categories/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
     })
    .pipe(
      map((response: any) => response.results as CategoryResponse[])
    );
  }
  // editCategory(id: string): Observable<CategoryResponse> {
  //   return this.http.put<CategoryResponse>(`${environment.API_Tt}/categories/${id}/`)
  // }
}
