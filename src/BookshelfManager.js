import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Bookshelf from "./Bookshelf";

class BookshelfManager extends React.Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }


  state = {
    books: []
  };

  getShelfBooks = (myBooks, shelfName) =>
    myBooks.filter(b => b.shelf === shelfName);

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              books={this.props.myBooks.filter(b => b.shelf === "currentlyReading")}
              onChangeBookShelf={this.props.onChangeBookShelf}
              shelfName="currentlyReading"
            />
            <Bookshelf
              books={this.props.myBooks.filter(b => b.shelf === "read")}
              onChangeBookShelf={this.props.onChangeBookShelf}
              shelfName="read"
            />
            <Bookshelf
              books={this.props.myBooks.filter(b => b.shelf === "wantToRead")}
              onChangeBookShelf={this.props.onChangeBookShelf}
              shelfName="wantToRead"
            />
          </div>
        </div>
        <div className="open-search">
          <Link className="open-search-button" to="/search">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

export default BookshelfManager;
