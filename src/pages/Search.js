import React, {Component} from "react";
import {Link} from "react-router-dom";
import {search as searchInBooks} from "../BooksAPI";
import Book from "../components/Book";

export default class Search extends Component {
    state = {
        search: "",
        results: []
    };

    handleSearch = (e) => {
        e.preventDefault();

        // update the state with the new search value
        this.setState({
            search: e.target.value
        })

        let trimmedSearch = e.target.value.trim();

        // if the search value is empty, clear the results
        if (trimmedSearch === "") {
            this.setState({
                results: []
            })
        } else {
            // otherwise, search for the books with the search value
            searchInBooks(trimmedSearch)
                .then(data => {
                    if (data.error) {
                        this.setState({
                            results: []
                        })
                    } else {
                        this.setState({
                            results: data
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        results: []
                    })

                    console.log(error);
                })
        }
    };

    render() {
        const { search, results} = this.state;
        const { books, onShelfUpdate} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={search}
                            onChange={(e) => this.handleSearch(e)}
                        />
                    </div>
                </div>
                {results.length ? (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {results.map(book => {
                                // default book shelf value to none
                                let bookShelf = "none";

                                // if the book is already on a shelf, switch the shelf value
                                books.forEach(b => {
                                    if (b.id === book.id) {
                                        bookShelf = b.shelf;
                                    }
                                });

                                return (
                                    <Book
                                        key={book.id}
                                        book={book}
                                        shelf={bookShelf}
                                        onShelfUpdate={onShelfUpdate}
                                    />
                                )
                            })}
                        </ol>
                    </div>
                ) : (
                    <div className="search-books-results">
                        <div className="no-results">
                            {search ? (
                                <div>
                                    <span>No results found for "{search}"</span>
                                </div>
                            ) : (
                                <div>
                                    <span>Type book title or author to start search</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        );
    }
}