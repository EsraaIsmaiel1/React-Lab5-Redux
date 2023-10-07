import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { deleteBook } from "../Store/Slices/bookSlice";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export function BookItem(props) {
  const [show, setShow] = useState(false);
  const { book } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteBook(book.id));
  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="container col-4 g-3 p-5">
      <div className="row">
        <Card border="primary" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's
              content.
            </Card.Text>
            <NavLink className="btn btn-primary mx-1 m-2" to={`/books/${book.id}/edit`}>
              Edit Book
            </NavLink>
            <NavLink className="btn btn-primary mx-1" onClick={handleShow}>
              View Book Details
            </NavLink>
            <i className="bi bi-trash text-danger mx-3" onClick={handleDelete}></i>
          </Card.Body>
        </Card>
      </div>
      <div className="row">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Title: {book.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Price : {book.price}</Modal.Body>
          <Modal.Body>Quantity : {book.quantity}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
