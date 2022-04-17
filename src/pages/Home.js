import React, {Component} from "react";
import BookShield from "../components/BookShield";
import SearchBtn from "../components/SearchBtn";
import { getAll as getAllBooks, update as updateBook} from "../BooksAPI";

export default class Home extends Component {
    state = {
        books: [],
    };

    componentDidMount() {
        getAllBooks()
            .then(books => {
                this.setState({books});
            })
            .catch(error => {
                console.log(error);
            });
    };

    onChangeShelf = (book, shelf) => {
        // update shelf of book
        updateBook(book, shelf)
            .then(() => {
                // the update books state to update others books shelf
                getAllBooks()
                    .then(books => {
                        this.setState({books});
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShield
                            title="Currently Reading"
                            books={this.state.books.filter(book => book.shelf === "currentlyReading")}
                            onChangeShelf={this.onChangeShelf}
                        />
                        <BookShield
                            title="Want to Read"
                            books={this.state.books.filter(book => book.shelf === "wantToRead")}
                            onChangeShelf={this.onChangeShelf}
                        />
                        <BookShield
                            title="Read"
                            books={this.state.books.filter(book => book.shelf === "read")}
                            onChangeShelf={this.onChangeShelf}
                        />
                    </div>
                </div>
                <SearchBtn />
            </div>
        );
    };
}