import React, {Component} from "react";
import BookShield from "../components/BookShield";
import SearchBtn from "../components/SearchBtn";

export default class Home extends Component {

    render() {
        const {books, onShelfUpdate} = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShield
                            title="Currently Reading"
                            books={books.filter(book => book.shelf === "currentlyReading")}
                            onShelfUpdate={onShelfUpdate}
                        />
                        <BookShield
                            title="Want to Read"
                            books={books.filter(book => book.shelf === "wantToRead")}
                            onShelfUpdate={onShelfUpdate}
                        />
                        <BookShield
                            title="Read"
                            books={books.filter(book => book.shelf === "read")}
                            onShelfUpdate={onShelfUpdate}
                        />
                    </div>
                </div>
                <SearchBtn />
            </div>
        );
    };
}