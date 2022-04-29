import React from "react";
import './Board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
    }
  };

  addMaxRatePost = () => {
    const maxRatePostDetails = this.props.findPostWithMaxRate();

    const enabledPosts = this.props.posts.map((post) => {
      if (post?.id === maxRatePostDetails.postId) {
        post.disabled = true;
        post.maxRate = maxRatePostDetails.maxRate;
        this.state.board.push(post);
      };
      return post;
    });

    this.props.changePosts(enabledPosts);

    this.setState({
      board: this.state.board
    })
  };

  removePost = (postId) => {
    this.setState({
      board: this.state.board.filter(function (post) {
        return post.id !== postId;
      })
    });

    const enabledPosts = this.props.enabledPosts(postId);

    this.props.changePosts(enabledPosts);
  };

  changeOrder = () => {
    this.state.board.reverse();
    this.setState({
      board: this.state.board
    });
  }

  render() {
    return (
      <div className="Board">
        <button className="button" onClick={this.addMaxRatePost}>Add</button>
        <span> </span>
        <button className = "button" onClick={this.changeOrder}>Assort</button>
        <div>{this.state.board.map((post, index) => {
          return (
            <div className="postname" key={index}>
              {post.postName}<br></br>Rate:{post.maxRate / 4}
               <button className="buttunRemove" onClick={() => this.removePost(post.id)}>
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