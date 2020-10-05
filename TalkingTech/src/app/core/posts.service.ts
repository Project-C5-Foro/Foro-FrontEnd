import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

import { environment } from './../../environments/environment';
import { PostsResponse, PostCreate } from '@models/posts.model';
import { Recommended } from '@models/posts-recommended.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  getAllPosts(): Observable<PostsResponse[]>{
    const token = this.tokenService.getToken();
    return this.http.get<PostsResponse[]>(`${environment.API_Tt}/postsl/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
     })
    .pipe(
      map((response: any) => response.results as PostsResponse[])
    );
  }
  getPostsDetail(id: PostsResponse): Observable<PostsResponse>{
    return this.http.get<PostsResponse>(`${environment.API_Tt}/postsl/${id}/`);
  }
  createPost(data: PostCreate): Observable<PostsResponse>{
    console.log(data);
    return this.http.post<PostsResponse>(`${environment.API_Tt}/posts/`, data);
  }
  getAllPostRecommended(): Observable<Recommended[]> {
    const token = this.tokenService.getToken();
    return this.http.get<Recommended[]>(`${environment.API_Tt}/rankeds/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
     })
    .pipe(
      map((response: any) => response.results as Recommended[])
    );
  }
}
