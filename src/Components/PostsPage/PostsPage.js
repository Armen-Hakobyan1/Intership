import React, { Component } from "react";

class PostsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="postsDashboard">
        {this.props.posts.map((post, index) => {
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
    );
  }
}

export default PostsPage;