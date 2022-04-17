import React, {Component} from "react";
import {update as updateBook} from "../BooksAPI";

export default class Book extends Component {

    changeShelf = (book, shelf) => {
        updateBook(book, shelf)
            .then(() => {
                // fire event to update the shelf of the book
                this.props.onShelfUpdate();
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const {book, shelf} = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{
                                 width: 128,
                                 height: 193,
                                 backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
                             }}
                        ></div>
                        <div className="book-shelf-changer">
                            <select
                                value={shelf}
                                onChange={(e) => this.changeShelf(book, e.target.value)}
                            >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{ book.title }</div>
                    <div className="book-authors">{ book.authors }</div>
                </div>
            </li>
        );
    };
}