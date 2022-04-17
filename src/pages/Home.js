import React, {Component} from "react";
import BookShield from "../components/BookShield";
import SearchBtn from "../components/SearchBtn";
import { getAll as getAllBooks} from "../BooksAPI";

export default class Home extends Component {
    state = {
        books: [],
    };

    componentDidMount() {
        this.updateBooks();
    };

    updateBooks() {
        getAllBooks()
            .then(books => {
                this.setState({books});
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const {books} = this.state;

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
                            onShelfUpdate={() => this.updateBooks()}
                        />
                        <BookShield
                            title="Want to Read"
                            books={books.filter(book => book.shelf === "wantToRead")}
                            onShelfUpdate={() => this.updateBooks()}
                        />
                        <BookShield
                            title="Read"
                            books={books.filter(book => book.shelf === "read")}
                            onShelfUpdate={() => this.updateBooks()}
                        />
                    </div>
                </div>
                <SearchBtn />
            </div>
        );
    };
}