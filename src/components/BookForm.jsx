import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBook, editBook } from "../Store/Slices/bookSlice";

export function BookForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { books } = useSelector((state) => state.bookList);

  const getBookById = (bookId) => {
    return books.find((book) => book.id == bookId);
  };

  const [bookValues, setFormValues] = useState({
    title: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (id !== "0") {
      const book = getBookById(id);
      if (book) {
        setFormValues({
          title: book.title,
          price: book.price,
          quantity: book.quantity,
        });
      }
    } else {
      setFormValues({
        title: "",
        price: "",
        quantity: "",
      });
    }
  }, [id, books]);

  const getInputValue = (e) => {
    setFormValues({
      ...bookValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === "0") {
      dispatch(addBook(bookValues)).then(() => {
        navigate("/");
      });
    } else {
      dispatch(editBook({ bookId: id, updatedBook: bookValues })).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <div className="container g-3 p-5">
      <form className="row" onSubmit={handleSubmit}>
        <h1>{id !== "0" ? "Edit Book" : "Add New Book"}</h1>
        <div className="col-9 p-3">
          <input
            type="text"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter Book Title"
            onChange={getInputValue}
            value={bookValues.title}
            name="title"
          />
        </div>
        <div className="col-9 p-3">
          <input
            type="text"
            className="form-control"
            id="inputPassword4"
            placeholder="Enter Book Price"
            onChange={getInputValue}
            value={bookValues.price}
            name="price"
          />
        </div>
        <div className="col-9 p-3">
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Enter Book Quantity"
            onChange={getInputValue}
            value={bookValues.quantity}
            name="quantity"
          />
        </div>
        <div className="col-12 p-4">
          <button type="submit" className="btn btn-info">
            {id !== "0" ? "Edit Book" : "Add New Book"}
          </button>
        </div>
      </form>
    </div>
  );
}
