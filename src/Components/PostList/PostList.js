import React, { Component } from "react";
import { posts } from "../../index/index.js";
import Board from "../Board/Board.js";
import PostsPage from "../Posts/Posts.js";
import './PostList.css';

class PostList extends Component {
  constructor() {
    super();
      this.state = {
      posts: posts,
    }
  }

  changePosts = (posts) => {
    this.setState({
      posts: posts
    });
  }

  findPostWithMaxRate = () => {
    return (
      this.state.posts.reduce((details, post) => {
        post.comments.map((comment) => {
          details.currentRate += comment.rate;
        })

        if ((details.currentRate > details.maxRate) && post.disabled === false) {
          details.maxRate = details.currentRate;
          details.postId = post.id;
        }

        details.currentRate = 0;

        return details;
      }, { currentRate: 0, postId: 0, maxRate: 0 })
    );
  };

  enabledPosts = (postId) => {
    return this.state.posts.map((post) => {
      if (post.id === postId) {
        post.disabled = false;
      }
      return post;
    })
  }

  render() {
    return (
      <div className="posts">
        <div className="postList">
          <PostsPage
            posts={this.state.posts}
          />
        </div>
        <Board
          posts={this.state.posts}
          changePosts={this.changePosts}
          findPostWithMaxRate={this.findPostWithMaxRate}
          enabledPosts={this.enabledPosts}
        />
        <Board
          posts={this.state.posts}
          changePosts={this.changePosts}
          findPostWithMaxRate={this.findPostWithMaxRate}
          enabledPosts={this.enabledPosts}
        />
      </div>
    );
  }
};

export default PostList;