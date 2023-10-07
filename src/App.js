import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { BookList } from "./components/BookList";
import { BookDetails } from "./components/BookDetails";
import { BookForm } from "./components/BookForm";

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="books/:id" element={<BookDetails />} />
        <Route path="/books/:id/edit" element={<BookForm />} />
      </Routes>
    </div>
  );
}
