import React from "react";
import { Route } from "react-router-dom";

import BookshelfManager from "./BookshelfManager";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    myBooks: [],
    searchResult: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ myBooks: books });
    });
  }

  changeBookShelf = (book, newShelf) => {

    let books = this.state.myBooks;
    for (let i = 0; i < books.length; i++) {
      if (books[i].id === book.id) {
        books[i].shelf = String(newShelf);
      }
    }

    if (book.shelf === "none" && book.shelf !== String(newShelf)) {
      // let b = Object.assign({}, book);
      book.shelf = String(newShelf);
      //books.concat(book);
      books.push(book);
    }

    this.setState({myBooks: books});
    
    // this.setState({
    //   myBooks: this.state.myBooks.map(b => {
    //     if (b.id === book.id) b.shelf = newShelf;
    //     return b;
    //   })
    // });

    // BooksAPI.update(book, newShelf);
    BooksAPI.update(book, newShelf)
      .then(() => {
        this.setState({ myBooks: books });
      })
      .catch(e => {
        console.log(e);
      });
  };

  search = query => {
    BooksAPI.search(query).then(books => {
      this.setState({ searchResult: books });
    });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <BookshelfManager
              myBooks={this.state.myBooks}
              onChangeBookShelf={this.changeBookShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              myBooks={this.state.myBooks}
              searchResult={this.state.searchResult}
              onSearchBooks={this.search}
              onChangeBookShelf={this.changeBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
