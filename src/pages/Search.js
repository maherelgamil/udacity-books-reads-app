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
                            {results.map(book => (
                                <Book
                                    key={book.id}
                                    book={book}
                                    onShelfUpdate={() => {}}
                                />
                            ))}
                        </ol>
                    </div>
                ) : (
                    <div className="search-books-results">
                        <p className="no-results">
                            {search ? (
                                <div>
                                    <svg width="96" height="96" fill="none">
                                        <path
                                            d="M36 28.024A18.05 18.05 0 0025.022 39M59.999 28.024A18.05 18.05 0 0170.975 39"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                        <ellipse cx="37.5" cy="43.5" rx="4.5" ry="7.5" fill="currentColor"></ellipse>
                                        <ellipse cx="58.5" cy="43.5" rx="4.5" ry="7.5" fill="currentColor"></ellipse>
                                        <path
                                            d="M24.673 75.42a9.003 9.003 0 008.879 5.563m-8.88-5.562A8.973 8.973 0 0124 72c0-7.97 9-18 9-18s9 10.03 9 18a9 9 0 01-8.448 8.983m-8.88-5.562C16.919 68.817 12 58.983 12 48c0-19.882 16.118-36 36-36s36 16.118 36 36-16.118 36-36 36a35.877 35.877 0 01-14.448-3.017"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                        <path
                                            d="M41.997 71.75A14.94 14.94 0 0148 70.5c2.399 0 4.658.56 6.661 1.556a3 3 0 003.999-4.066 12 12 0 00-10.662-6.49 11.955 11.955 0 00-7.974 3.032c1.11 2.37 1.917 4.876 1.972 7.217z"
                                            fill="currentColor"></path>
                                    </svg>
                                    <p>No results found for "{search}"</p>

                                </div>
                            ) : (
                                <div>
                                    <span>Type book title or author to start search</span>
                                </div>
                            )}
                        </p>
                    </div>
                )}

            </div>
        );
    }
}