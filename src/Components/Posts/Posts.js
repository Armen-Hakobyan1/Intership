import React, { Component } from "react";
import Pagination from "../Pagination/Pagination.js";
import './Posts.css';

class PostsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: this.props.posts,
      searchText: '',
    }
  }

  changeCurrentList = (posts) => {
    this.setState({
      currentList: posts
    });
  };

  handlePostsChange = (event) => {
    this.setState({
      searchText: event.target.value,
      currentList: []
    });

    const filteredPosts = this.props.posts.reduce((arr, post) => {
      if (post.postName.toLowerCase().includes(event.target.value.toLowerCase())) {
        arr.push(post);
      }

      return arr;
    }, []);

    this.setState({
      currentList: filteredPosts,
    })
  }

  render() {
    return (
      <div>
        <div className="postsDashboard">
          <input
            value={this.state.searchText}
            type="text"
            placeholder="search posts"
            className="input"
            onChange={this.handlePostsChange}
          />
        {this.state.currentList.map((post, index) => {
          return (
            <div className={post.disabled ? "red" : ""} key={index} >
              <ul className="comment">
                {post.postName}
                <div >
                  {post.comments.map((comment) => {
                    return (
                      <li key={`${comment.id}.${comment.rate}`}>
                        <span>{comment.content}</span><span>{comment.rate}</span>
                      </li>
                    );
                  })}
                </div>
              </ul>
            </div>
          );
        })}
        </div>
        <div>
          <Pagination
            posts={this.state.currentList}
            perPage={3}
            currentPage={1}
            changeCurrentList={this.changeCurrentList}
          />
        </div>
      </div>
    );
  }
}

export default PostsPage;