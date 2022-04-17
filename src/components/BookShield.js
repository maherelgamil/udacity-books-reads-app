import React, {Component} from "react";
import Book from "./Book";

export default class BookShield extends Component {
    render() {
        const {books, onShelfUpdate} = this.props;

        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map((book) => (
                    <Book
                        key={book.id}
                        book={book}
                        onShelfUpdate={onShelfUpdate}
                    />
                  ))}
                </ol>
              </div>
            </div>
        );
    }
}