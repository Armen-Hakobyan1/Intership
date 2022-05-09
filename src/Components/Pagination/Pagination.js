import React, { Component } from "react";
import './Pagination.css';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.pageIndex = this.props.currentPage - 1;
    this.postsQueue = [];
    this.pageNumbers = [];
  }

  componentDidMount() {
    this.composePosts();
    this.props.changeCurrentList(this.postsQueue[this.pageIndex]);
  }

  composePosts = () => {
    if (this.postsQueue.length < this.props.perPage) {
      for (let i = 0; i < this.props.posts.length; i += this.props.perPage) {
        const chunk = this.props.posts.slice(i, i + this.props.perPage);
        this.postsQueue.push(chunk);
      }
    }
  }

  nextPage = () => {
    if (this.postsQueue.length - 1 > this.pageIndex) {
      this.props.changeCurrentList(this.postsQueue[this.pageIndex += 1]);
    }
  };

  prevPage = () => {
    if (this.pageIndex) {
      this.props.changeCurrentList(this.postsQueue[this.pageIndex -= 1]);
    }
  };

  onPage = (page) => {
    this.props.changeCurrentList(this.postsQueue[page - 1]);
  }

  render() {
    for (let i = 1; i <= this.props.perPage; i++) {
      if (this.props.perPage > this.pageNumbers.length) {
        this.pageNumbers.push(i);
      }
    };

    return (
      <div>
        <ul className="pagination">
          <a
            href="!#"
            className="page-item1"
            onClick={this.prevPage}
          >
            Prev
          </a>
          {this.pageNumbers.map((page) =>
            <li
              className="page-item"
              key={page}
            >
              <a
                href="!#"
                className="page-link"
                onClick={() => this.onPage(page)}
              >
                {page}
              </a>
            </li>
          )}
          <a
            href="!#"
            className="page-item1"
            onClick={this.nextPage}
          >
            Next
          </a>
      </ul>
    </div>
    )
  }}
export default Pagination;