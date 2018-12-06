import React from "react";
import PropTypes from "prop-types";

class Book extends React.Component {

  static propTypes = {
    bookInfo: PropTypes.object.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.changeShelf = this.changeShelf.bind(this);
  }

  changeShelf(event) {
    // 需要把bookInfo对象复制后再传到函数中，否则修改该对象
    this.props.onChangeBookShelf(Object.assign({}, this.props.bookInfo), event.target.value);
    //console.log(this.props.bookInfo);
  }

  render() {
    let { bookInfo } = this.props;
    if (!bookInfo) return <div />;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                "Url(" +
                (bookInfo.imageLinks && bookInfo.imageLinks.thumbnail) +
                ")"
            }}
          />
          <div className="book-shelf-changer">
            <select defaultValue={bookInfo.shelf} onChange={this.changeShelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookInfo.title}</div>
        <div className="book-authors">
          {bookInfo.authors && bookInfo.authors[0]}
        </div>
      </div>
    );
  }
}

export default Book;
