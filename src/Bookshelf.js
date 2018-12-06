import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Bookshelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired,
    shelfName: PropTypes.string.isRequired
  }

  state = {
    shelfNameDict: {
      currentlyReading: "Currently Reading",
      wantToRead: "Want To Read",
      read: "Read"
    }
  };

  render() {
    const { books, onChangeBookShelf, shelfName } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.state.shelfNameDict[shelfName]}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book bookInfo={book} onChangeBookShelf={onChangeBookShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
