import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function BookDetails() {
  const { id } = useParams();
  const { books } = useSelector((state) => state.bookList);
  const getBookById = (bookId) => {
    return books.find((book) => book.id == bookId);
  };
  const book = getBookById(id);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return <div className="mt-5 p-5'"></div>;
}
