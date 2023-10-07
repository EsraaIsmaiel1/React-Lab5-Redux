import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../Store/Slices/bookSlice";
import { BookItem } from "./BookItem";
import { NavLink } from "react-router-dom";

export function BookList() {
  const { books, isLoading } = useSelector((state) => state.bookList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);
  return (
    <div className="bg p-5 bg-dark text-light mt-5">
      <h1>Books List</h1>
      <NavLink to={"/books/0/edit"} className="mb-5 btn btn-outline-primary">
        Add New Book
      </NavLink>
      <div className="container">
        {isLoading && <h1>Loading</h1>}
        <div className="row ">
          {!isLoading && books.map((book) => <BookItem key={book.id} book={book} />)}
        </div>
      </div>
    </div>
  );
}
