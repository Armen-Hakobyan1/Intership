import React from "react";
import './Board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
    };
  };

  addMaxRatePost = (maxRatePosts) => {
    const maxRatePostDetails = this.props.findPostWithMaxRate();

    const enabledPosts = this.props.posts.map((post) => {
      if (post?.id === maxRatePostDetails.postId) {
        post.disabled = true;
        post.maxRate = maxRatePostDetails.maxRate;
        maxRatePosts.push(post);
      };
      return post;
    });

    this.props.changePosts(enabledPosts);

    this.setState({
      board: maxRatePosts
    });
  };

  removePost = (postId, maxRatePosts) => {
    const enabledPosts = this.props.enabledPosts(postId);
    this.props.changePosts(enabledPosts);

    this.setState({
      board: maxRatePosts.filter((post) => postId !== post.id),
    });
  };

  changeOrder = (maxRatePosts) => {
    this.setState({
      board: maxRatePosts.reverse(),
    });
  }

  render() {
    const maxRatePosts = [ ...this.state.board];
    return (
      <div className="Board">
        <button className="button" onClick={() => this.addMaxRatePost(maxRatePosts)}>Add</button>
        <span> </span>
        <button className = "button" onClick={() => this.changeOrder(maxRatePosts)}>Assort</button>
        <div>{this.state.board.map((post, index) => {
          return (
            <div className="postname" key={index}>
              {post.postName}<br></br>Rate:{post.maxRate / 4}
               <button className="buttunRemove" onClick={() => this.removePost(post.id, maxRatePosts)}>
                X
              </button>
            </div>
          )
        }) }</div>
      </div>
    );
  }
}
export default Board;