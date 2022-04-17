import React, {Component} from "react";
import {Link} from "react-router-dom";
import {search as searchInBooks} from "../BooksAPI";
import Book from "../components/Book";

export default class Search extends Component {
    state = {
        search: "",
        results: []
    };

    handleSeach = (e) => {
        e.preventDefault();

        // update the state with the new search value
        this.setState({
            search: e.target.value.trim()
        })

        // if the search value is empty, clear the results
        if (this.state.search === "") {
            this.setState({
                results: []
            })
        } else {
            // otherwise, search for the books with the search value
            searchInBooks(this.state.search)
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
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.search}
                            onChange={(e) => this.handleSeach(e)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.results.map(book => (
                            <Book
                                key={book.id}
                                book={book}
                                onShelfUpdate={() => {}}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}