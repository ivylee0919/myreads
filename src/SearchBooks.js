import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

class SearchBooks extends React.Component {
  state = {
    query: ""
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
    this.props.onSearchBooks(this.state.query);
  };

  getFixedResult = (myBooks, searchResult) => {
    // searchResult.map(b => {
    //   b.shelf = "none";
    //   myBooks.map(m => {
    //     if (b.id === m.id) {
    //       b.shelf = m.shelf;
    //     }
    //     return m;
    //   });
    //   return b;
    // });
    let newResult = searchResult;

    for (let i = 0; i < newResult.length; i++) {
      newResult[i].shelf = "none";

      for (let j = 0; j < myBooks.length; j++) {
        if (newResult[i].id === myBooks[j].id) {
          newResult[i].shelf = myBooks[j].shelf;
        }
      }
    }

    return newResult;
  };

  render() {
    const {
      myBooks,
      searchResult,
      onChangeBookShelf
    } = this.props;
    const { query } = this.state;

    let newResult;

    if (Array.isArray(myBooks) && Array.isArray(searchResult)) {
      newResult = this.getFixedResult(myBooks, searchResult);
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {Array.isArray(newResult) &&
              newResult.map(book => (
                <li key={book.id}>
                  <Book
                    bookInfo={book}
                    onChangeBookShelf={onChangeBookShelf}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
