import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: "First Post", content: "this is the First Post Content"},
  //   {title: "Second Post", content: "this is the Second Post Content"},
  //   {title: "Third Post", content: "this is the Third Post Content"}
  // ];
 posts: Post[] = [];
 private postsSub: Subscription = new Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[])=>{
      this.posts = posts;
    });
  }

  onDelete(postId: String) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
