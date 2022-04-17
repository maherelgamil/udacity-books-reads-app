import React from 'react'
import { Routes ,Route } from 'react-router-dom';
import './App.css'
import Search from "./pages/Search";
import Home from "./pages/Home";
import {getAll as getAllBooks} from "./BooksAPI";

class BooksApp extends React.Component {

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
            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                books={books}
                                onShelfUpdate={() => this.updateBooks()}
                            />
                        }
                    />
                    <Route
                        path="/search"
                        element={
                            <Search
                                books={books}
                                onShelfUpdate={() => this.updateBooks()}
                            />
                        }
                    />
                </Routes>
            </div>
        );
    }
}

export default BooksApp
