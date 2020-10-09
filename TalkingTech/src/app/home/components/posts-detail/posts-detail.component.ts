import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PostsService } from '@core/posts.service';
import { PostsResponse, PostDetailResponse } from '@models/posts.model';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.scss']
})
export class PostsDetailComponent implements OnInit {

  postDetail: PostDetailResponse;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchPost(id);
    });
  }
  fetchPost(id: PostDetailResponse): void{
    this.postsService.getPostsDetail(id)
    .subscribe(postDetail => {
      this.postDetail = postDetail;
    });
  }
}
